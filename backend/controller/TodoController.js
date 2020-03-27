const Todo = require('../model/Todo');

const todoController = {
  list: (req, res, next) => {
    Todo.find((err, todos) => {
      if (err) return next(err);
      res.json(todos);
    });
  },
  create: (req, res, next) => {
    const todo = new Todo(req.body);
    todo.save()
      .then(() => {
        res.json(todo);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  },
};

module.exports = todoController;
