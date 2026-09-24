const port = process.env.PORT || 3001;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.t4ao1fy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
);

const UsersModel = require('./models/Users');

// Express 4 does not catch rejected promises from async handlers; without this
// wrapper any DB error (e.g. an invalid ObjectId) becomes an unhandled
// rejection and crashes the whole process.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get('/users', asyncHandler(async (req, res) => {
  const users = await UsersModel.find();
  res.json(users);
}));

app.post('/users/createuser', asyncHandler(async (req, res) => {
  const user = req.body;
  const newUser = new UsersModel(user);
  await newUser.save();
  res.json(newUser);
}));

app.delete('/users/deleteuser/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await UsersModel.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User deleted' });
}));

app.put('/users/updateuser/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const updated = await UsersModel.findByIdAndUpdate(id, user);
  if (!updated) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User updated' });
}));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid user id' });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
