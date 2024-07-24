const postTodo = async (ctx) => {
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

const updateTodo = async (ctx) => {
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

const deleteTodo = async (ctx) => {
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

module.exports = {
  postTodo,
  updateTodo,
  deleteTodo,
}
