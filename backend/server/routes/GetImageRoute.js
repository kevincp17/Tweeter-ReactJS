import { Router } from "express";
import uploadDownload from '../../middleware/uploadDownload'

const router= new Router()
router.get('/file/:filename',uploadDownload.showFile)


export default router