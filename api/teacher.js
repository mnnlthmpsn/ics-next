import axios from "axios"

const apiURL = process.env.NODE_ENV == 'production' 
    ? 'https://next-ics.herokuapp.com/' 
    : 'http://localhost:1337'

export const get_all_teachers = async () => {
    try {
        return await axios.get(`${apiURL}/users?is_teacher=true`)
    } catch (err) {
        throw err
    }
}

export const get_all_classes = async () => {
    try {
        return await axios.get(`${apiURL}/clsses`)
    } catch (err) {
        throw err
    }
} 