import { Sequelize } from "sequelize";
import config from '../../config/config'

	const sequelize=new Sequelize(
  		config.db_name,
  		config.db_username,
  		config.db_password,
  	{
    		dialect:'postgres',
    		pool:{
      			max:5,
      			min:0,
      			acquire:30000,
      			idle:10000
    		}
  	}
	)

  var DataTypes = require("sequelize").DataTypes;
var _followers = require("./followers");
var _likes = require("./likes");
var _replies = require("./replies");
var _retweets = require("./retweets");
var _saved = require("./saved");
var _tweet = require("./tweet");
var _tweet_content = require("./tweet_content");
var _users = require("./users");
var _views = require("./views");

function initModels(sequelize) {
  var followers = _followers(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);
  var replies = _replies(sequelize, DataTypes);
  var retweets = _retweets(sequelize, DataTypes);
  var saved = _saved(sequelize, DataTypes);
  var tweet = _tweet(sequelize, DataTypes);
  var tweet_content = _tweet_content(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var views = _views(sequelize, DataTypes);

  tweet.belongsToMany(users, { as: 'user_id_users', through: likes, foreignKey: "tweet_id", otherKey: "user_id" });
  tweet.belongsToMany(users, { as: 'user_id_users_replies', through: replies, foreignKey: "tweet_id", otherKey: "user_id" });
  tweet.belongsToMany(users, { as: 'user_id_users_retweets', through: retweets, foreignKey: "tweet_id", otherKey: "user_id" });
  tweet.belongsToMany(users, { as: 'user_id_users_saveds', through: saved, foreignKey: "tweet_id", otherKey: "user_id" });
  users.belongsToMany(tweet, { as: 'tweet_id_tweets', through: likes, foreignKey: "user_id", otherKey: "tweet_id" });
  users.belongsToMany(tweet, { as: 'tweet_id_tweet_replies', through: replies, foreignKey: "user_id", otherKey: "tweet_id" });
  users.belongsToMany(tweet, { as: 'tweet_id_tweet_retweets', through: retweets, foreignKey: "user_id", otherKey: "tweet_id" });
  users.belongsToMany(tweet, { as: 'tweet_id_tweet_saveds', through: saved, foreignKey: "user_id", otherKey: "tweet_id" });
  users.belongsToMany(users, { as: 'follower_user_id_users', through: followers, foreignKey: "follower_id", otherKey: "follower_user_id" });
  users.belongsToMany(users, { as: 'follower_id_users', through: followers, foreignKey: "follower_user_id", otherKey: "follower_id" });
  likes.belongsTo(tweet, { as: "tweet", foreignKey: "tweet_id"});
  tweet.hasMany(likes, { as: "likes", foreignKey: "tweet_id"});
  replies.belongsTo(tweet, { as: "tweet", foreignKey: "tweet_id"});
  tweet.hasMany(replies, { as: "replies", foreignKey: "tweet_id"});
  retweets.belongsTo(tweet, { as: "tweet", foreignKey: "tweet_id"});
  tweet.hasMany(retweets, { as: "retweets", foreignKey: "tweet_id"});
  saved.belongsTo(tweet, { as: "tweet", foreignKey: "tweet_id"});
  tweet.hasMany(saved, { as: "saveds", foreignKey: "tweet_id"});
  tweet_content.belongsTo(tweet, { as: "tweet", foreignKey: "tweet_id"});
  tweet.hasOne(tweet_content, { as: "tweet_content", foreignKey: "tweet_id"});
  views.belongsTo(tweet, { as: "tweet", foreignKey: "tweet_id"});
  tweet.hasMany(views, { as: "views", foreignKey: "tweet_id"});
  followers.belongsTo(users, { as: "follower", foreignKey: "follower_id"});
  users.hasMany(followers, { as: "followers", foreignKey: "follower_id"});
  followers.belongsTo(users, { as: "follower_user", foreignKey: "follower_user_id"});
  users.hasMany(followers, { as: "follower_user_followers", foreignKey: "follower_user_id"});
  likes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(likes, { as: "likes", foreignKey: "user_id"});
  replies.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(replies, { as: "replies", foreignKey: "user_id"});
  retweets.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(retweets, { as: "retweets", foreignKey: "user_id"});
  saved.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(saved, { as: "saveds", foreignKey: "user_id"});
  tweet.belongsTo(users, { as: "tweet_user", foreignKey: "tweet_user_id"});
  users.hasMany(tweet, { as: "tweets", foreignKey: "tweet_user_id"});

  return {
    followers,
    likes,
    replies,
    retweets,
    saved,
    tweet,
    tweet_content,
    users,
    views,
  };
}

const models=initModels(sequelize);
	export default models
	export {sequelize}