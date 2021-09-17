import { signup } from "../api/base"
import { get_parent } from "../api/guardian"
import { add_student } from "../api/student"
import { showToast } from "../components/helpers"
import { checkGuardianExistenceController } from "./guardianController"

export const addStudentController = async student => {
    try {

        // check if guardians exists
        const gd_1 = await checkGuardianExistenceController(student.guardian_1)

        // only check if email was entered for guardian 2
        const gd_2 = student.guardian_2 !== '' ? await checkGuardianExistenceController(student.guardian_2) : null
        // if guardian_1 exists
        if (gd_1.data.length > 0) {
            // if bot emails are the same exists
            if (student.guardian_1 === student.guardian_2) {
                showToast('warning', 'Emails cannot be the same')
            } else {
                let gd1_email = gd_1.data[0].email
                let gd2_email
                // assign id of guardian 2 if it exists
                gd_2 === null
                    ? ''
                    : gd_2.data.length > 0
                        ? (gd2_email = gd_2.data[0].email)
                        : showToast('warning', 'Guardian 2 Email does not exist')

                return finalizeSignUp(student)
            }
        } else {
            showToast('warning', 'Guardian 1 does not exist')
        }
        // check if student exists
        // else add student 
    } catch (err) {
        showToast('error', err.message.toString())
    }
}

const finalizeSignUp = async data => {
    try {
        // get details for parents
        let parents = []

        // get guardian 1 details and push to parents array
        if (data.guardian_1 != '') {
            const res = await get_parent(data.guardian_1)
            parents.push(res.data[0])
        }

        if (data.guardian_2 !== '') {
            const res = await get_parent(data.guardian_2)
            parents.push(res.data[0])
        }

        let email = `${data?.lastname.toLowerCase().replace(/\s/g, "")}.${data?.firstname.toLowerCase().replace(/\s/g, "")}@ics.com`
        let username = `${data?.lastname.toLowerCase().replace(/\s/g, "")}.${data?.firstname.toLowerCase().replace(/\s/g, "")}`
        let password = `${data?.lastname.toLowerCase().replace(/\s/g, "")}.${data?.firstname.toLowerCase().replace(/\s/g, "")}`

        const stud_payload = {
            email: email,
            username: username,
            phone: '0540609437',
            password: password,
            firstname: data?.firstname,
            lastname: data?.lastname,
            user_role: 'student'
        }

        const user_res = await signup(stud_payload)

        const payload = {
            parents: parents,
            firstname: data?.firstname,
            lastname: data?.lastname,
            gender: data?.gender,
            clss: data?.class,
            age: data?.age,
            extra_curricular_activities: data?.extra_curricular_activities,
            profile: user_res?.data?.user?.id.toString()
        }

        return await add_student(payload)

    } catch (err) {
        console.error(err)
        showToast('error', 'An error occured adding Student')
    }
}