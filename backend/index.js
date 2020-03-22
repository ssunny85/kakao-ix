const express = require('express');
const app = express();
const port = 8080;

app.get('/todos', (req, res) => res.send([
    {
      id: 1,
      content: 'todo1',
      createdOn: '2020-03-20',
      updatedOn: '2020-03-21',
      referenceId: [],
    },
    {
      id: 2,
      content: 'todo2',
      createdOn: '2020-03-20',
      updatedOn: '2020-03-21',
      referenceId: [1],
    },
  ])
);

app.get('/todos/1', (req, res) => res.send({
    id: 1,
    content: 'todo1',
    createdOn: '2020-03-20',
    updatedOn: '2020-03-21',
    referenceId: [],
  })
);
app.listen(port, () => console.log(`Todo app listening on port ${port}!`));
