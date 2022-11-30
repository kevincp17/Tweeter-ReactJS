import { sequelize } from "../models/init-models"
const { Op } = require("sequelize");
const findAll=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findAll({ include:{all:true}  })
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

const findTopTweet=async (req,res)=>{
    try{
        const tweet=await req.context.models.tweet.findAll({
            include:{all:true},
            attributes: [[sequelize.fn('count', sequelize.col('likes.user_id')),total_likes]], 
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
            attributes: [['saved.tweet_id', 'savedTweet']],
            where:{
                savedTweet:{
                    [Op.ne]: null
                }
            }
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

export default{
    findAll,
    findOne,
    findTweetProfile,
    findTopTweet,
    findLatestTweet,
    findSavedTweet
}