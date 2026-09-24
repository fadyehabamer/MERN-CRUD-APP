const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3001;

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.t4ao1fy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
