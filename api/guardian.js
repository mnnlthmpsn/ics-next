import axios from "axios"

const apiURL = process.env.NODE_ENV == 'production' 
    ? 'https://next-ics.herokuapp.com' 
    : 'http://localhost:1337'

export const get_all_parents = async () => {
    try {
        const res = await axios.get(`${apiURL}/users?user_role=parent`)
        return res
    } catch (err) {
        throw err
    }
}

export const get_parent = async email => {
    try {
        const res = await axios.get(`${apiURL}/users?user_role=parent&email=${email}`)
        return res
    } catch (err) {
        
    }
}

export const get_parent_count = async () => {
    try {
        const res = await axios.get(`${apiURL}/users/count?user_role=parent`)
        return res
    } catch (err) {
        throw err
    }
}

export const get_teacher_count = async () => {
    try {
        const res = await axios.get(`${apiURL}/users/count?user_role=teacher`)
        return res
    } catch (err) {
        throw err
    }
}