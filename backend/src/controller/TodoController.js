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
      if (completed === 'true') {
        query.where('completed').equals(true);
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
  update: async (req, res) => {
    let requestData = {
      ...req.body,
      updatedAt: Date.now(),
    };
    const reqId = parseInt(req.params.id, 10);
    if (req.body.referenceIds.includes(reqId)) {
      res.status(500).json({
        errorMsg: '자신의 ID를 참조 ID로 추가할 수 없습니다. ID를 확인해주세요.',
      });
      return;
    }
    const todos = await Todo.find().where('id').in(req.body.referenceIds);
    if (req.body.referenceIds.length !== todos.length) {
      res.status(500).json({
        errorMsg: '존재하지 않는 ID에 대한 요청이 있습니다. ID를 확인해주세요.',
      });
      return;
    }
    if (req.body.completed && !todos.every((todo) => todo.completed)) {
      res.status(500).json({
        errorMsg: '참조하고 있는 Todo ID 모두 완료 상태가 아니라면 Todo를 완료할 수 없습니다.',
      });
      return;
    }
    const referenceTodos = await Todo.find().where('referenceIds').in(reqId);
    if (referenceTodos.length > 0 && referenceTodos.some((todo) => todo.completed)) {
      res.status(500).json({
        errorMsg: '참조하고 있는 완료 된 Todo가 있습니다.',
      });
      return;
    }
    Todo.findOneAndUpdate({ id: req.params.id }, requestData,(err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(204).end();
    });
  },
};

module.exports = todoController;
