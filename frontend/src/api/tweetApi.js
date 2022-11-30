import axios from 'axios'
import config from '../config/config'

const list = async()=>{
    try {
        const result = await axios.get(`${config.domain}/tweet/`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const listTopTweet = async()=>{
    try {
        const result = await axios.get(`${config.domain}/tweet/top_tweet`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const listLatestTweet = async()=>{
    try {
        const result = await axios.get(`${config.domain}/tweet/latest_tweet`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

export default {list,listTopTweet,listLatestTweet}