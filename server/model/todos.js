'use strict';

const {DataTypes} = require('sequelize')

// export as function for model to be called by db
module.exports = (sequelize) => {
  const Todo = sequelize.define('Todo', {
    // id auto generated
    titleTodo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDateTodo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isCompletedTodo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    resource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  })
  // creates table relation to goal table
  Todo.associate = db => db.Todo.belongsTo(db.Goal)
  return Todo;
}
