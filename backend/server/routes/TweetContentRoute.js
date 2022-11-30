import { Router } from "express";
import indexController from "../controllers/IndexController";

const router= new Router()
router.get('/',indexController.TweetContentController.findAll)
router.get('/:id',indexController.TweetContentController.findOne)


export default router