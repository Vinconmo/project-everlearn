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
    const {title, dueDate, isCompleted} = ctx.request.body;
    const goal = await db.Goal.findByPk(goalId)
    // updates only values passed with request
    if (title) goal.title = title;
    if (dueDate) goal.dueDate = dueDate;
    if (isCompleted !== undefined) goal.isCompleted = isCompleted;
    const updatedGoal = await goal.save();
    ctx.status = 200;
    ctx.body = updatedGoal;
  } catch (error) {
    ctx.status = 404
    ctx.body = {
      error, msg: 'No entry with this id found'
    }
    console.log(`Error in goals/updateGoal: ${error}`)
  }
}

const deleteGoal = async (ctx) => {
  try {
    const {goalId} = ctx.params;
    const goal = await db.Goal.findByPk(goalId)
    const deletedGoal = await goal.destroy()
    ctx.status = 200;
    ctx.body = goal;
  } catch (error) {
    ctx.status = 404
    ctx.body = {
      error, msg: 'No entry with this id found'
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
