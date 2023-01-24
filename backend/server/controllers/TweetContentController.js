const findAll=async (req,res)=>{
    try{
        const tweet_content=await req.context.models.tweet_content.findAll()
        return res.send(tweet_content)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne=async (req,res)=>{
    try{
        const tweet_content=await req.context.models.tweet_content.findOne({
            where:{tweet_id:req.params.id}
        })
        return res.send(tweet_content)
    }catch(error){
        return res.status(404).send(error)
    }
}

const createTweetContent=async (req,res)=>{
    const tweets=req.tweets
    console.log(tweets);
    try{
        const tweet_content=await req.context.models.tweet_content.create({
            tweet_id:tweets.tweet_id,
            tweet_body:req.body.tweet_body,
            picture:req.body.picture
        })
        return res.send(tweet_content)
    }catch(error){
        return res.status(404).send(error)
    }
}

export default{
    findAll,
    findOne,
    createTweetContent
}