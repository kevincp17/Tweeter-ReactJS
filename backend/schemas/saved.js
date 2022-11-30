const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saved', {
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
    }
  }, {
    sequelize,
    tableName: 'saved',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "saved_pkey",
        unique: true,
        fields: [
          { name: "tweet_id" },
          { name: "user_id" },
        ]
      },
    ]
  });
};
