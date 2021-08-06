import axios from "axios"

const apiURL = process.env.NODE_ENV == 'production' 
    ? 'https://next-ics.herokuapp.com/' 
    : 'http://localhost:1337'

export const get_all_parents = async () => {
    try {
        const res = await axios.get(`${apiURL}/users?is_teacher=false`)
        return res
    } catch (err) {
        throw err
    }
}

export const get_parent = async email => {
    try {
        const res = await axios.get(`${apiURL}/users?is_teacher=false&email=${email}`)
        return res
    } catch (err) {
        
    }
}

export const get_parent_count = async () => {
    try {
        const res = await axios.get(`${apiURL}/users/count?is_teacher=false`)
        return res
    } catch (err) {
        throw err
    }
}

export const get_teacher_count = async () => {
    try {
        const res = await axios.get(`${apiURL}/users/count?is_teacher=true`)
        return res
    } catch (err) {
        throw err
    }
}