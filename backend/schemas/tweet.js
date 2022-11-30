const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tweet', {
    tweet_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tweet_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    time_created: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tweet',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tweet_pkey",
        unique: true,
        fields: [
          { name: "tweet_id" },
        ]
      },
    ]
  });
};
