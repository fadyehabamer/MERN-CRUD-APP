const mongoose = require('mongoose');
const app = require('./app');
const { getMongoUri } = require('./db');

const port = process.env.PORT || 3001;

mongoose.connect(getMongoUri());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
