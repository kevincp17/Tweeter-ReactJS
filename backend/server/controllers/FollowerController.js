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

export default{
    findAll,
    findUserFollower
}