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

const postTweet = async(payload)=>{
    try {
        const result = await axios.post(`${config.domain}/tweet/post_tweet/`,payload)
        return result
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

const findOwnTweet = async(id)=>{
    try {
        const result = await axios.get(`${config.domain}/tweet/own_tweet/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const findSavedTweet = async(id)=>{
    try {
        const result = await axios.get(`${config.domain}/tweet/saved_tweet/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const findLikedTweet = async(id)=>{
    try {
        const result = await axios.get(`${config.domain}/tweet/liked_tweet/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const findProfile = async(id)=>{
    try {
        const result = await axios.get(`${config.domain}/tweet/profile_tweet/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

export default {list,postTweet,listTopTweet,listLatestTweet,findOwnTweet,findSavedTweet,findLikedTweet,findProfile}