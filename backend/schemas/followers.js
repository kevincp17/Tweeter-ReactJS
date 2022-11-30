const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('followers', {
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    follower_user_id: {
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
    tableName: 'followers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "followers_pkey",
        unique: true,
        fields: [
          { name: "follower_id" },
          { name: "follower_user_id" },
        ]
      },
    ]
  });
};
