import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const findAll=async (req,res)=>{
    try{
        const user=await req.context.models.users.findAll({
            // attributes:['user_id','name','username','password'],
            include:{all:true}
        })
        return res.send(user)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne=async (req,res)=>{
    try{
        const user=await req.context.models.users.findOne({
            where:{username:req.params.username}
        })
        return res.send(user)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOneFollower=async (req,res)=>{
    const checkFollower=req.followers
    // console.log(checkFollower[1].follower_id);
    try{
        for(let i=0;i<Object.keys(checkFollower).length;i++){
            const user=await req.context.models.users.findOne({
                where:{user_id:checkFollower[i].follower_id}
            })
        }
        
        return res.send(user)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findUserTweeter=async (req,res)=>{
    const checkTweeter=req.tweets
    if(checkTweeter){
        console.log(checkTweeter.tweet_user_id);
    }
    try{
        const user=await req.context.models.users.findAll()
        return res.send(user)
    }catch(error){
        return res.status(404).send(error)
    }
}

const Register = async(req, res) => {
    const { name,username,password} = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await req.context.models.users.create({
            name: name,
            username:username,
            password: hashPassword
        });
        return res.send("Registration Successful");
    } catch (error) {
        return res.status(404).send(error)
    }
}

const Login = async(req, res) => {
    try {
        const user = await req.context.models.users.findAll({
            where:{
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].user_id;
        const name = user[0].name;
        const username = user[0].username;
        
        const accessToken = jwt.sign({userId, name, username}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        console.log(accessToken);
        const refreshToken = jwt.sign({userId, name, username}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await req.context.models.users.update({refresh_token: refreshToken},{
            where:{
                user_id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.send({ accessToken });
    } catch (error) {
        console.log('salah');
        return res.status(404).send(error)
    }
}

const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);
    if(!refreshToken) return res.sendStatus(204);
    const user = await req.context.models.users.findOne({
        where:{
            refresh_token: refreshToken
        }
    });
    
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].user_id;
    await req.context.models.users.update({refresh_token: null},{
        where:{
            user_id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.send(200);
}

export default{
    findAll,
    findUserTweeter,
    findOneFollower,
    findOne,
    Register,
    Login,
    Logout
}