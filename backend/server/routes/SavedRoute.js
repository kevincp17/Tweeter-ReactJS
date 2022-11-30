import { Router } from "express";
import indexController from "../controllers/IndexController";

const router= new Router()
router.post('/', indexController.SavedController.create);
router.delete('/:twid/:uid',indexController.SavedController.deleted)

export default router