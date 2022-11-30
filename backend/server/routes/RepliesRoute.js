import { Router } from "express";
import indexController from "../controllers/IndexController";

const router= new Router()
router.get('/:id',indexController.RepliesController.findAll)
router.post('/', indexController.RepliesController.create);
export default router