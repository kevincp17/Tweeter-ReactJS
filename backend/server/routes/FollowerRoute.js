import { Router } from "express";
import indexController from "../controllers/IndexController";

const router= new Router()
router.get('/:id',indexController.FollowerController.findAll)
router.get('/next/:id',indexController.FollowerController.findUserFollower)

export default router