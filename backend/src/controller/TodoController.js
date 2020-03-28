const moment = require('moment');
const Todo = require('../model/Todo');

const todoController = {
  list: async (req, res) => {
    const searchType = req.query.type;
    const searchText = req.query.text;
    const completed = req.query.completed;
    const pageNo = parseInt(req.query.pageNo, 10) || 1;
    const pageLimit = 3;

    const queryWithCondition = (query) => {
      if (searchType && searchText) {
        switch (searchType) {
          case 'content':
            query.regex(searchType, `.*${searchText}.*`);
            break;
          case 'createdAt':
            query.gte('createdAt', moment(searchText, 'YYYY-MM-DD').startOf('day').toDate().getTime());
            query.lte('createdAt', moment(searchText, 'YYYY-MM-DD').endOf('day').toDate().getTime());
            break;
        }
      }
      if (completed) {
        query.where('completed').equals(completed === 'true');
      }
      return query;
    };

    try {
      const totalCount = await queryWithCondition(Todo.count());
      const todos = await queryWithCondition(Todo.find())
        .limit(pageLimit)
        .skip(pageLimit * (pageNo - 1))
        .sort({id: -1})
        .exec();

      const result = {
        paging: {
          no: pageNo,
          limit: pageLimit,
          total: totalCount,
        },
        todos: todos.map(todo => {
          return {
            id: todo.id,
            content: todo.content,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
            referenceIds: todo.referenceIds,
          };
        }),
      };

      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
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
