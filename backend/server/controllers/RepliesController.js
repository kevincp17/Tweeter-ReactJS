const findAll=async (req,res)=>{
    try{
        const replies=await req.context.models.replies.findAll({
            include:{all:true},
            where:{tweet_id:req.params.id}
        })
        return res.send(replies)
    }catch(error){
        return res.status(404).send(error)
    }
}

const create=async (req,res)=>{
    try{
        const replies=await req.context.models.replies.create({
            tweet_id:req.body.tweet_id,
            user_id:req.body.user_id,
            reply:req.body.reply
        })
        return res.send(replies)
    }catch(error){
        return res.status(404).send(error)
    }
}

export default{
    findAll,
    create
}