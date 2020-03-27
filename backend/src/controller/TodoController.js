const moment = require('moment');
const Todo = require('../model/Todo');

const todoController = {
  list: (req, res) => {
    const searchType = req.query.type;
    const searchText = req.query.text;
    const completed = req.query.completed;
    const todo = Todo.find((err, todos) => {
        if (err) return res.status(500).send(err);
        res.json(todos);
      });
    if (searchType && searchText) {
      switch (searchType) {
        case 'content':
          todo.regex(searchType, `.*${searchText}.*`);
          break;
        case 'createdAt':
          todo.gte('createdAt', moment(searchText, 'YYYY-MM-DD').startOf('day').toDate().getTime());
          todo.lte('createdAt', moment(searchText, 'YYYY-MM-DD').endOf('day').toDate().getTime());
          break;
      }
    }
    if (completed) {
      todo.where('completed').equals(completed === 'true');
    }
    todo
      .sort({ id: -1 });
  },
  create: (req, res) => {
    const todo = new Todo(req.body);
    todo.save()
      .then(() => {
        res.status(201).end();
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  delete: (req, res) => {
    Todo.findOneAndDelete({ id: req.params.id }, (err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(204).end();
    });
  },
  update: (req, res) => {
    let requestData = {
      ...req.body,
      updatedAt: Date.now(),
    };
    Todo.findOneAndUpdate({ id: req.params.id }, requestData, (err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(204).end();
    });
  },
};

module.exports = todoController;
