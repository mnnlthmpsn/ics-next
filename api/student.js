import axios from "axios"

const apiURL = process.env.NODE_ENV == 'production' 
    ? 'https://next-ics.herokuapp.com' 
    : 'http://localhost:1337'

export const add_student = async student => {
    try {
        return await axios.post(`${apiURL}/students`, student)
    } catch (err) {
        throw err
    }
}

export const get_all_students = async () => {
    try {
        return await axios.get(`${apiURL}/students`)
    } catch (err) {
        throw err
    }
}

export const get_all_students_for_class = async class_id => {
    try {
        return await axios.get(`${apiURL}/students?clss.id=${class_id}`)
    } catch (err) {
        throw err
    }
}

export const get_student_count = async () => {
    try {
        return await axios.get(`${apiURL}/students/count`)
    } catch (err) {
        throw err
    }
}

export const get_blk_students = async query => {
    try {
       return await axios.get(`${apiURL}/students?${query}`) 
    } catch (err) {
        throw err
    }
}