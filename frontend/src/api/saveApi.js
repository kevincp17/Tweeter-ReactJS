import axios from 'axios'
import config from '../config/config'

const create = async(payload)=>{
    try {
        const result = await axios.post(`${config.domain}/save`,payload)
        return result
    } catch (error) {
        return error.message
    }
}

const deleted = async(twid,uid)=>{
    try {
        const result = await axios.delete(`${config.domain}/save/${twid}/${uid}`)
        return result
    } catch (error) {
        return await error.message
    }
}

export default {create,deleted}
