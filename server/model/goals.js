const {sequelize} = require('../db');
const {DataTypes} = require('sequelize');

// export as function for model to be called by db
module.exports = () => {
  const Goal = sequelize.define('goal', {
    // id auto generated
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  })
  // creates table relation to todo table
  Goal.associate = db => db.goal.hasMany(db.todo)
  return Goal;
}
