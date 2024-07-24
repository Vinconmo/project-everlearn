const getAll = async (ctx) => {
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

const postGoal = async (ctx) => {
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

const updateGoal = async (ctx) => {
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

const deleteGoal = async (ctx) => {
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

module.exports = {
  getAll,
  postGoal,
  updateGoal,
  deleteGoal
}
