import axios from "axios"

const apiURL = process.env.NODE_ENV == 'production' 
    ? 'https://next-ics.herokuapp.com' 
    : 'http://localhost:1337'

export const signup = async payload => {
    try {
        return await axios.post(`${apiURL}/auth/local/register`, payload)
    } catch (err) {
        throw err
    }
}

export const login = async payload => {
    try {
        const res = await axios.post(`${apiURL}/auth/local`, payload)
        if (res.status === 200) {
            sessionStorage.setItem('auth', res.data.jwt)
            return res
        }
    } catch (err) {
        throw err
    }
}