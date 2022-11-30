const jwt = require('jsonwebtoken')
const passport = require('passport')
const Strategy = require('passport-local').Strategy

import bcrypt from 'bcrypt';

const jwtSecret = process.env.JWT_SECRET || 'myjwt'
const adminPassword = process.env.ADMIN_PASSWORD || 'secret'
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' }
import models from '../models/init-models'

const { Op } = require("sequelize");

passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async function (username, password, cb) {
        try {
            const result = await models.users.findOne({
                subQuery: false, //tambain ini biar bisa join ke users_email
                include:[
                    {model:models.roles, as:'usro_role_id_roles'},
                    {model:models.users_email, as:'users_emails'}
                ],  
                // where: {
                //     user_name: username,
                // }
                where: { 
                    [Op.or]: [
                        { user_name: username },
                        { '$users_emails.pmail_address$': username } //bungkus pake $$ biar bisa di panggil
                    ]
                }
            });
            if(result == null) return cb(null, { message: 'Incorrect username or email.' }); //check apakah username atau email ada di database
            const { user_name, user_entity_id, user_password,usro_role_id_roles:[{role_name}],users_emails:[{pmail_address}]} = result.dataValues;
            
            const compare = await bcrypt.compare(password, user_password);
            if(!compare) return cb(null, { message: 'Incorrect password.' }); //check apakah password benar
            if (compare) return cb(null, { username: user_name, userId: user_entity_id, userRoles: role_name,userEmail:pmail_address, message: 'Login success' }); //kalau benar kirim ini !
        } catch (error) {
            return cb(null, {message:error.message})
        }

        cb(null, false)
    }
))

const authenticate = passport.authenticate('local', { session: false })

module.exports = {
    authenticate,
    login: login,
    ensureAdmin: ensureAdmin,
    ensureSeller: ensureSeller,
    refreshToken : refreshToken,
    logout: logout,
    verify: verifyToken
}

async function logout(req, res) {
    res.clearCookie('jwt')
    return res.status(202).json({ message: "Logout success" });
}

async function verifyToken(req, res,next) {
    const token = req.cookies.jwt
    if(!token) return res.status(401).json({ message: "No token provided" });
    try {
        // const decoded = jwt.verify(token, jwtSecret)
        // req.user = decoded
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) return res.status(401).json({ message: "Invalid token" });
            req.user = decoded.username
            next()
        })
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
}


async function login(req, res, next) {
    if(req.user.username == null){ //kalau data tidak ditemukan
        // res.cookie('jwt', null, { httpOnly: true })
        res.status(404).json({ success: false, token: null, message: req.user.message });
    } else{ //kalau data ditemukan
        const token = await sign({ username: req.user.username, roleType: req.user.userRoles });
        const { userId, username, email, userRoles, userEmail } = req.user;

        res.cookie('jwt', token, { httpOnly: true })
        res.json({ profile: { userId, username, email, userRoles, userEmail }, success: true, token: token })
    }
}


async function sign(payload) {
    const token = await jwt.sign(payload, jwtSecret, jwtOpts)
    return token
}

async function ensureSeller(req, res, next) {
    const jwtString = req.headers.authorization || req.cookies.jwt
    const payload = await verify(jwtString)
    if (payload.username) {
        req.user = payload;
        if (req.user.roleType === 'Seller') req.isSeller = true;
        return next();
    }

    const err = new Error('Unauthorized');
    err.statusCode = 401;
    next(err);
}

async function ensureAdmin(req, res, next) {
    const jwtString = req.headers.authorization || req.cookies.jwt
    const payload = await verify(jwtString)
    if (payload.username === 'admin') return next()
    const err = new Error('Unauthorized')
    err.statusCode = 401
    next(err)
}

async function verify(jwtString = '') {
    jwtString = jwtString.replace(/^Bearer /i, '')
    try {
        const payload = await jwt.verify(jwtString, jwtSecret)
        return payload
    } catch (err) {
        err.statusCode = 401
        throw err
    }
}

async function refreshToken(req, res) {
    try{
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(401).json({ message: "Refresh Token is required!" });
    }catch(err){
        console.log(log)
    }
}