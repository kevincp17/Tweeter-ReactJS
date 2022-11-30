const create=async (req,res)=>{
    try{
        const likes=await req.context.models.likes.create({
            tweet_id: req.body.tweet_id,
            user_id: req.body.user_id
        })
        return res.send(likes)
    }catch(error){
        return res.status(404).send(error)
    }
}

const deleted=async (req,res)=>{
    try{
        const likes=await req.context.models.likes.destroy({
            where:{tweet_id: req.params.twid,user_id:req.params.uid}
        })
        return res.send('delete '+likes+' rows')
    }catch(error){
        return res.status(404).send(error)
    }
}

export default{
    create,
    deleted
}