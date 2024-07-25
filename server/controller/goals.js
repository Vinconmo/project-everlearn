'use strict';

const db = require('../db');

const getAll = async (ctx) => {
  try {
    const goals = await db.Goal.findAll({});
    ctx.status = 200;
    ctx.body = goals;
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      error, msg: 'Request failed'
    }
    console.log(`Error in goals/getAll: ${error}`)
  }
}

const postGoal = async (ctx) => {
  try {
    const {title, dueDate} = ctx.request.body;
    const goal = await db.Goal.create({title, dueDate})
    ctx.status = 201;
    ctx.body = goal;
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      error, msg: 'Request failed'
    }
    console.log(`Error in goals/postGoal: ${error}`)
  }
}

const updateGoal = async (ctx) => {
  try {
    const {goalId} = ctx.params;
    const {title, dueDate} = ctx.req.body;
    const goal = db.Goal.update(
      {title, dueDate},
      {where: {id: goalId}}
    )
    ctx.status = 200;
    ctx.body = goal
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      error, msg: 'Request failed'
    }
    console.log(`Error in goals/updateGoal: ${error}`)
  }
}

const deleteGoal = async (ctx) => {
  try {
    const {goalId} = ctx.params;
    const goal = db.Goal.destroy(
      {where: {id: goalId}}
    )
    ctx.status = 200;
    ctx.body = goal;
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      error, msg: 'Request failed'
    }
    console.log(`Error in goals/deleteGoal: ${error}`)
  }
}

module.exports = {
  getAll,
  postGoal,
  updateGoal,
  deleteGoal
}
