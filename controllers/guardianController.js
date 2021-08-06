import { signup } from "../api/base"
import { get_all_parents, get_parent } from "../api/guardian"
import { showToast } from "../components/helpers"

export const addGuardianController = async guardian => {
    try {
        if (guardian.email === '' || guardian.phone === '' || guardian.firstname === '' || guardian.lastname === '') {
            throw { message: 'Please fill all fields' }
        }

        // NB: Default Password is phone of guardian
        const payload = {
            email: guardian.email,
            username: guardian.email,
            phone: guardian.phone,
            password: guardian.phone,
            firstname: guardian.firstname,
            lastname: guardian.lastname,
            is_teacher: false
        }

        // check if parent exists
        const res = await checkGuardianExistenceController(guardian.email)

        if (res.status === 200) {
            return res.data.length > 0 ? {
                status: res.status,
                data: {
                    user: {
                        id: res.data[0].id,
                        email: res.data[0].email
                    }
                }
            } : await signup(payload)
        }

    } catch (err) {
        showToast('error', err.message)
    }
}

export const checkGuardianExistenceController = async email => {
    try {
        return await get_parent(email)
    } catch (err) {
        showToast('error', err.message)
    }
}