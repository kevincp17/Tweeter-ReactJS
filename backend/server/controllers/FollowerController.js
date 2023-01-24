import { sequelize } from "../models/init-models"
const { Op } = require("sequelize");
const findAll=async (req,res)=>{
    try{
        const follower=await req.context.models.followers.findAll({
            include:[{all:true}],
            where:{follower_user_id:req.params.id}
        })
        return res.send(follower)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findMostFollower=async (req,res)=>{
    try{
        await sequelize.query(
            'select u.user_id,u.name,u.photo,u.bio,COUNT(f.follower_id) as followers from users u full join followers f on u.user_id=f.follower_user_id where u.user_id!=:UserId group by u.user_id,u.name,u.photo,u.bio order by followers DESC',
        {replacements : {UserId : req.params.id},type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    }catch(error){
        return res.status(404).send(error)
    }
}



const findWhoToFollow=async (req,res)=>{
    try{
        await sequelize.query(
            'select u.name,u.photo,u.bio,COUNT(f.follower_id) from users u full join followers f on u.user_id=f.follower_user_id where f.follower_user_id!=:followerUserId OR f.follower_user_id is null group by u.name,u.photo,u.bio',
        {replacements : {followerUserId : req.params.id},type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    }catch(error){
        return res.status(404).send(error)
    }
}

const findUserFollower=async (req,res)=>{
    try{
        const follower=await req.context.models.followers.findAll({
            include:[{all:true}],
            where:{follower_user_id:req.params.id}
        })
        return res.send(follower)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findUserFollowing=async (req,res)=>{
    try{
        const follower=await req.context.models.followers.findAll({
            include:[{all:true}],
            where:{follower_id:req.params.id}
        })
        return res.send(follower)
    }catch(error){
        return res.status(404).send(error)
    }
}

export default{
    findAll,
    findWhoToFollow,
    findMostFollower,
    findUserFollower,
    findUserFollowing
}