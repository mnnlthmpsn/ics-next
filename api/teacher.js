import axios from "axios"

const apiURL = process.env.NODE_ENV == 'production' 
    ? 'https://next-ics.herokuapp.com' 
    : 'http://localhost:1337'

export const get_all_teachers = async () => {
    try {
        return await axios.get(`${apiURL}/users?is_teacher=true`)
    } catch (err) {
        throw err
    }
}

// classes
export const add_class = async payload => {
    try {
        return await axios.post(`${apiURL}/clsses`, payload)
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

export const get_class = async class_id => {
    try {
        return await axios.get(`${apiURL}/clsses/${class_id}`)
    } catch (err) {
        throw err
    }
}

export const upload_assignment = async fd => {
    try {
        return await axios.post(`${apiURL}/assignments`, fd)
    } catch (err) {
        throw err
    }
}

export const get_assignments = async () => {
    try {
        return await axios.get(`${apiURL}/assignments`)
    } catch (err) {
        throw err
    }
}

// upload assignment
