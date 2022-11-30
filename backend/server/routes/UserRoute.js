import { Router } from "express";
import indexController from "../controllers/IndexController";
import verifyToken from '../../middleware/verifyToken'

const router= new Router()
router.get('/',indexController.UserController.findAll)
router.get('/:username',indexController.UserController.findOne)
router.post('/register', indexController.UserController.Register);
router.post('/login', indexController.UserController.Login);
router.get('/token', indexController.RefreshTokenController.refreshToken);
router.delete('/logout', indexController.UserController.Logout);
// router.get('/users',verifyToken.verifyToken, indexController.UserController.findAll);


export default router