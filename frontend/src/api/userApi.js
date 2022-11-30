import axios from 'axios'
import config from '../config/config'

const findOne = async(username)=>{
    try {
        const result = await axios.get(`${config.domain}/user/${username}`)
        return result.data
    } catch (error) {
        return error
    }
}

const login = async(payload)=>{
    try {
        const result = await axios.post(`${config.domain}/user/login/`,payload)
        return result.data
    } catch (error) {
        return error.message
    }
}

const register = async(payload)=>{
    try {
        const result = await axios.post(`${config.domain}/user/register/`,payload)
        return result.data
    } catch (error) {
        return error.message
    }
}

const logout = async(payload)=>{
    try {
        const result = await axios.delete(`${config.domain}/user/logout/`,payload)
        return result
    } catch (error) {
        return await error.message
    }
}

export default {findOne,login,register,logout}
