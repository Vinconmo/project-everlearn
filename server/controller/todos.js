'use strict';

const db = require("../db");
const {generateTodos} = require('./gemini')

const postTodo = async (ctx) => {
  try {
    const {goalId} = ctx.params;
    const {
      titleTodo,
      dueDateTodo,
      resource,
      comments,
    } = ctx.request.body
    const todo = await db.Todo.create({
      titleTodo,
      dueDateTodo,
      resource,
      comments,
      GoalId: goalId,
    })
    ctx.status = 201;
    ctx.body = todo;
    //
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      error, msg: 'Request failed'
    }
    console.log(`Error in Todos/postTodo: ${error}`)
  }
}

const updateTodo = async (ctx) => {
  try {
    const {todoId} = ctx.params;
    const {
      titleTodo,
      dueDateTodo,
      resource,
      comments,
      isCompletedTodo,
    } = ctx.request.body
    const todo = await db.Todo.findByPk(todoId)
    // updates only values passed with request
    if (titleTodo) todo.titleTodo = titleTodo;
    if (dueDateTodo) todo.dueDateTodo = dueDateTodo;
    if (resource) todo.resource = resource;
    if (comments) todo.comments = comments;
    if (isCompletedTodo !== undefined) todo.isCompletedTodo = isCompletedTodo;
    const updatedTodo = await todo.save();
    ctx.status = 200;
    ctx.body = updatedTodo;
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      error, msg: 'No entry with this id found'
    }
    console.log(`Error in Todos/updateTodo: ${error}`)
  }
}

const deleteTodo = async (ctx) => {
  try {
    const {todoId} = ctx.params;
    const todo = await db.Todo.findByPk(todoId)
    await todo.destroy()
    ctx.status = 200;
    ctx.body = todo;
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      error, msg: 'No entry with this id found'
    }
    console.log(`Error in Todos/deleteTodo: ${error}`)
  }
}

module.exports = {
  postTodo,
  updateTodo,
  deleteTodo,
}
