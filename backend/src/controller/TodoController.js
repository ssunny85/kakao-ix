const Todo = require('../model/Todo');

const todoController = {
  list: (req, res, next) => {
    Todo
      .find((err, todos) => {
        if (err) return next(err);
        res.json(todos);
      })
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
};

module.exports = todoController;
