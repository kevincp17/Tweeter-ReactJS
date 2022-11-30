const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tweet_content', {
    tweet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tweet',
        key: 'tweet_id'
      }
    },
    tweet_body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tweet_content',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tweet_content_pkey",
        unique: true,
        fields: [
          { name: "tweet_id" },
        ]
      },
    ]
  });
};
