const router = require('@koa/router')();
const goalsController = require('./controller/goals');
const todosController = require('./controller/todos');

// goal routes
router.get('/goal', goalsController.getAll);
// ^ maybe with individual goal param
router.post('/goal', goalsController.postGoal);
router.put('/goal/:goalId', goalsController.updateGoal);
router.delete('/goal/:goalId', goalsController.deleteGoal);

// to-do routes
router.post('/goal/:goalId', todosController.postTodo);
router.put('/goal/:goalId/:todoId', todosController.updateTodo);
router.delete('/goal/:goalId/:todoId', todosController.deleteTodo);

router.all('/(.*)', (ctx, error) => {
  ctx.status(404)
  ctx.body({
    error, msg: 'This url does not exist'
  })
})

module.exports = router;
