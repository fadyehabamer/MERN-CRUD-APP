const port = 3001;
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

// get takes two arguments, the first is the route, the second is a callback function
app.get('/users', (req, res) => {
  const usersArr = UsersModel.find().then((users) => {
    res.json(users);
  });
});

app.post('/users/createuser', async (req, res) => {
  const user = req.body;
  const newUser = new UsersModel(user);
  await newUser.save();
  res.json(newUser);
});

app.delete('users/deleteuser/:id', async (req, res) => {
    const id = req.params.id;
    await UsersModel.findByIdAndDelete(id);
    res.json({message: 'User deleted'});
});

app.put('/updateuser/:id', async (req, res) => {
    const id = req.params.id;      
    const user = req.body;
    await UsersModel.findByIdAndUpdate(id, user);
    res.json({message: 'User updated'});
});



app.listen(port, () => {
  console.log('Server is running... on port 3001');
});
