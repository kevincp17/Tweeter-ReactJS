const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('replies', {
    tweet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tweet',
        key: 'tweet_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'replies',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "replies_pkey",
        unique: true,
        fields: [
          { name: "tweet_id" },
          { name: "user_id" },
        ]
      },
    ]
  });
};
