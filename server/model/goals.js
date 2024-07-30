'use strict';

const {DataTypes} = require('sequelize')

// export as function for model to be called by db
module.exports = (sequelize) => {
  const Goal = sequelize.define('Goal', {
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
  });
  // creates table relation to todo table
  Goal.associate = db => db.Goal.hasMany(db.Todo, {
    onDelete: 'CASCADE', //! why is that not setting
  })
  return Goal;
}
