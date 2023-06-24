const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Streamer = sequelize.define('Streamer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  upvotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  downvotes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Streamer;
