import { Router } from "express";
import indexController from "../controllers/IndexController";

const router= new Router()
router.get('/:id',indexController.FollowerController.findAll)
router.get('/next/:id',indexController.FollowerController.findUserFollower)
router.get('/following/:id',indexController.FollowerController.findUserFollowing)
router.get('/follow/:id',indexController.FollowerController.findWhoToFollow)
router.get('/popular/:id',indexController.FollowerController.findMostFollower)

export default router