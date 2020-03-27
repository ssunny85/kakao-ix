const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todos = require('./router/todos');
const app = express();
const port = 8080;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/local')
  .then(() => console.log('connected successful'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/todos', todos);
// app.get('/todos', (req, res) => res.send([
//     {
//       id: 1,
//       item: 'todo1',
//       createdAt: '2020-03-20',
//       updatedAt: '2020-03-21',
//       referenceId: [],
//     },
//     {
//       id: 2,
//       item: 'todo2',
//       createdAt: '2020-03-20',
//       updatedAt: '2020-03-21',
//       referenceId: [1],
//     },
//   ])
// );
//
// app.get('/todos/1', (req, res) => res.send({
//     id: 1,
//     content: 'todo1',
//     createdAt: '2020-03-20',
//     updatedAt: '2020-03-21',
//     referenceId: [],
//   })
// );
app.listen(port, () => console.log(`Todo app listening on port ${port}!`));
