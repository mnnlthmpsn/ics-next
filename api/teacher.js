import axios from "axios"

const apiURL = process.env.NODE_ENV == 'production' 
    ? 'https://next-ics.herokuapp.com' 
    : 'http://localhost:1337'

export const get_all_teachers = async () => {
    try {
        return await axios.get(`${apiURL}/users?user_role=teacher`)
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
        return await axios.get(`${apiURL}/clsses?_sort=title:ASC`)
    } catch (err) {
        throw err
    }
} 

export const get_teacher_class = async tid => {
    try {
       return await axios.get(`${apiURL}/clsses?teacher.id=${tid}`) 
    } catch (err) {
        throw err
    }
}

export const get_classes_for_teacher = async tid => {
    try {
        return await axios.get(`${apiURL}/clsses?teacher.id=${tid}&_sort=title:ASC`)
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

export const upload_report = async fd => {
    try {
        return await axios.post(`${apiURL}/reports`, fd)
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

export const get_all_departments = async () => {
    try {
        return await axios.get(`${apiURL}/departments`)
    } catch (err) {
        throw err
    }
}

export const add_department = async title => {
    try {
        return await axios.post(`${apiURL}/departments`, {title})
    } catch (err) {
        throw err
    }
}

// attendance
export const get_all_attendances = async () => {
    try {
        return await axios.get(`${apiURL}/attendances`)
    } catch (err) {
        throw err
    }
}

export const take_attendance = async payload => {
    try {
        return await axios.post(`${apiURL}/attendances`, payload)
    } catch (err) {
        throw err
    }
}

export const all_announcements = async () => {
    try {
        return await axios.get(`${apiURL}/announcements`)
    } catch (err) {
        throw err
    }
}

export const add_announcement = async payload => {
    try {
        return await axios.post(`${apiURL}/announcements`, payload)
    } catch (err) {
        throw err
    }
}