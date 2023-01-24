import { sequelize } from "../models/init-models"
const { Op } = require("sequelize");
const findAll=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findAll({ 
            include:{all:true},
            order:[
                ['time_created','DESC']
            ]  
        })
        return res.send(tweet)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findAll({ 
            include:{all:true}  
        })
        return res.send(tweet)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOwnTweet=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findAll({ 
            include:{all:true},
            where: {tweet_user_id:req.params.id},
            order:[
                ['time_created','DESC']
            ]
        })
        return res.send(tweet)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findTopTweet=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findAll({
            include:{all:true},
            attributes: [[sequelize.fn('SUM', sequelize.where(sequelize.fn('count', sequelize.col('likes.tweet_id')),'+',sequelize.fn('count', sequelize.col('saveds.tweet_id')))),total_likes]], 
            group: ["tweet.tweet_id"],
            order:[
                ['total_likes','DESC']
            ]
        })
        return res.send(tweet)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findLatestTweet=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findAll({
            include:{all:true},
            order:[
                ['time_created','DESC']
            ]
        })
        return res.send(tweet)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findSavedTweet=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findAll({
            include:{all:true},
            where: {'$saveds.user_id$':req.params.id}
        })
        return res.send(tweet)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findLikedTweet=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findAll({
            include:{all:true},
            where: {'$likes.user_id$':req.params.id}
        })
        return res.send(tweet)
    }catch(error){
        return res.status(404).send(error)
    }
}


const findTweetProfile=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findOne({
            include:{all:true},
            where:{tweet_user_id:req.params.id}
        })
        return res.send(tweet)
    }catch(error){
        return res.status(404).send(error)
    }
}

const createTweetNext=async (req,res,next)=>{
    try{
        const tweet=await req.context.models.tweet.create({
            tweet_user_id:req.body.tweet_user_id,
            time_created:Date.now()
        })
        req.tweets=tweet
        console.log(req.tweets);
        next()
    }catch(error){
        return res.status(404).send(error)
    }
}

export default{
    findAll,
    findOne,
    findOwnTweet,
    findTweetProfile,
    findTopTweet,
    findLatestTweet,
    findSavedTweet,
    findLikedTweet,
    createTweetNext
}