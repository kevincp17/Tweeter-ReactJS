const create=async (req,res)=>{
    try{
        const saved=await req.context.models.saved.create({
            tweet_id: req.body.tweet_id,
            user_id: req.body.user_id
        })
        return res.send(saved)
    }catch(error){
        return res.status(404).send(error)
    }
}

const deleted=async (req,res)=>{
    try{
        const saved=await req.context.models.saved.destroy({
            where:{tweet_id: req.params.twid,user_id:req.params.uid}
        })
        return res.send('delete '+saved+' rows')
    }catch(error){
        return res.status(404).send(error)
    }
}

export default{
    create,
    deleted
}