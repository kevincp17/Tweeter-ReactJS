import { Router } from "express";
import indexController from "../controllers/IndexController";

const router= new Router()
router.get('/',indexController.TweetController.findAll)
router.get('/saved_tweet',indexController.TweetController.findSavedTweet)
router.get('/latest_tweet',indexController.TweetController.findLatestTweet)

router.get('/:id',indexController.TweetController.findOne)
router.get('/profile_tweet/:id',indexController.TweetController.findTweetProfile)
router.get('/top_tweet',indexController.TweetController.findTopTweet)





export default router