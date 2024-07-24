export const goalsController = {};

goalsController.getAll = (ctx) => {
  try {
    ctx.status = 200;
    ctx.body;
  } catch (error) {
    ctx.status(500)
    ctx.body({
      error, msg: 'Request failed'
    })
    console.log(`Error in goals/getAll: ${error}`)
  }
}

goalsController.postGoal = (ctx) => {
  try {
    ctx.status = 201;
    ctx.body;
  } catch (error) {
    ctx.status(500)
    ctx.body({
      error, msg: 'Request failed'
    })
    console.log(`Error in goals/postGoal: ${error}`)
  }
}

goalsController.updateGoal = (ctx) => {
  try {
    const {goalId} = ctx.params;
    ctx.status = 200;
    ctx.body;
  } catch (error) {
    ctx.status(500)
    ctx.body({
      error, msg: 'Request failed'
    })
    console.log(`Error in goals/updateGoal: ${error}`)
  }
}

goalsController.deleteGoal = (ctx) => {
  try {
    const {goalId} = ctx.params;
    ctx.status = 200;
    ctx.body;
  } catch (error) {
    ctx.status(500)
    ctx.body({
      error, msg: 'Request failed'
    })
    console.log(`Error in goals/deleteGoal: ${error}`)
  }
}
