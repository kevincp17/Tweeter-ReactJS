import { Router } from "express";
import indexController from "../controllers/IndexController";

const router= new Router()
router.get('/',indexController.TweetController.findAll)
router.get('/latest_tweet',indexController.TweetController.findLatestTweet)

router.get('/:id',indexController.TweetController.findOne)
router.get('/own_tweet/:id',indexController.TweetController.findOwnTweet)
router.get('/saved_tweet/:id',indexController.TweetController.findSavedTweet)
router.get('/liked_tweet/:id',indexController.TweetController.findLikedTweet)
router.get('/profile_tweet/:id',indexController.TweetController.findTweetProfile)
router.get('/top_tweet',indexController.TweetController.findTopTweet)

router.post('/post_tweet',indexController.TweetController.createTweetNext,indexController.TweetContentController.createTweetContent)





export default router