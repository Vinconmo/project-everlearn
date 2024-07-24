export const todosController = {};

todosController.postTodo = (ctx) => {
  try {
    ctx.status = 201;
    ctx.body;
  } catch (error) {
    ctx.status(500)
    ctx.body({
      error, msg: 'Request failed'
    })
    console.log(`Error in Todos/postTodo: ${error}`)
  }
}

todosController.updateTodo = (ctx) => {
  try {
    const {goalId, todoId} = ctx.params;
    ctx.status = 200;
    ctx.body;
  } catch (error) {
    ctx.status(500)
    ctx.body({
      error, msg: 'Request failed'
    })
    console.log(`Error in Todos/updateTodo: ${error}`)
  }
}

todosController.deleteTodo = (ctx) => {
  try {
    const {goalId, todoId} = ctx.params;
    ctx.status = 200;
    ctx.body;
  } catch (error) {
    ctx.status(500)
    ctx.body({
      error, msg: 'Request failed'
    })
    console.log(`Error in Todos/deleteTodo: ${error}`)
  }
}
