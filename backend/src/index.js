const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todos = require('./router/todos');
const app = express();
const port = 8080;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/todo')
  .then(() => console.log('connected successful'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/todos', todos);
app.listen(port, () => console.log(`Todo app listening on port ${port}!`));
