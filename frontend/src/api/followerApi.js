import axios from 'axios'
import config from '../config/config'

const listMostFollower = async(id)=>{
    try {
        const result = await axios.get(`${config.domain}/follower/popular/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const list = async(id)=>{
    try {
        const result = await axios.get(`${config.domain}/follower/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const listFollowing = async(id)=>{
    try {
        const result = await axios.get(`${config.domain}/follower/following/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

const listWhoToFollow = async(id)=>{
    try {
        const result = await axios.get(`${config.domain}/follower/follow/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}



export default {listMostFollower,list,listFollowing,listWhoToFollow}