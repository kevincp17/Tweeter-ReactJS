import axios from 'axios'
import config from '../config/config'

const list = async(id)=>{
    try {
        const result = await axios.get(`${config.domain}/reply/${id}`)
        return result.data
    } catch (error) {
        return await error.message
    }
}

export default {list}