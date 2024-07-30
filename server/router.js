'use strict';

const router = require('@koa/router')();
const goalsController = require('./controller/goals');
const todosController = require('./controller/todos');
const geminiController = require('./controller/gemini')

// goal routes
router.get('/goal', goalsController.getAll);
router.get('/goal/:goalId', goalsController.getById)
router.post('/goal', goalsController.postGoal);
router.put('/goal/:goalId', goalsController.updateGoal);
router.delete('/goal/:goalId', goalsController.deleteGoal);

// to-do routes
router.post('/goal/:goalId', todosController.postTodo);
router.put('/goal/todo/:todoId', todosController.updateTodo);
router.delete('/goal/todo/:todoId', todosController.deleteTodo);

// gemini routes
router.post('/goal/:goalId/ai', geminiController.generateTodos);

router.all('/(.*)', (ctx, error) => {
  ctx.status(404)
  ctx.body({
    error, msg: 'This url does not exist'
  })
})

module.exports = router;
