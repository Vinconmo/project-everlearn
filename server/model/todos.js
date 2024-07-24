const {sequelize} = require('../db');
const {DataTypes} = require('sequelize');

// export as function for model to be called by db
module.exports = () => {
  const Todo = sequelize.define('todo', {
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
  Todo.associate = db => db.todo.belongsTo(db.goal)
  return Todo;
}
