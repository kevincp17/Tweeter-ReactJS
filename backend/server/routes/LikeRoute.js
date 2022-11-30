import { Router } from "express";
import indexController from "../controllers/IndexController";

const router= new Router()
router.post('/', indexController.LikeController.create);
router.delete('/:twid/:uid',indexController.LikeController.deleted)

export default router