const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('views', {
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
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'views',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "views_pkey",
        unique: true,
        fields: [
          { name: "tweet_id" },
          { name: "user_id" },
        ]
      },
    ]
  });
};
