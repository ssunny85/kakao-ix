const express = require('express');
const router = express.Router();
const TodoController = require('../controller/TodoController');

router.get('/', TodoController.list);
router.post('/', TodoController.create);

module.exports = router;
