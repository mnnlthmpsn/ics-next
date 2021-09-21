import { Fragment, useEffect, useState } from "react"
import BreadCrumb from "../../components/breadcrumb"
import Navbar from "../../components/navbar"
import Link from 'next/link'
import { get_all_teachers } from "../../api/teacher"
import { showToast } from "../../components/helpers"
import Table from "../../components/table"

const Teacher = () => {

    const [teachers, setTeachers] = useState([])
    const [user, setUser] = useState({})

    const getCurrentUser = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        setUser(user)
        getTeachers()
    }

    const getTeachers = async () => {
        try {
            const res = await get_all_teachers()
            console.log(res.data)
            setTeachers(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const HEADINGS = ['Firstname', 'Lastname', 'Email', 'Phone']

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <Fragment>
            <Navbar />
            <div className="container p-5 md:pl-40">
                <div className="flex justify-between">
                    <BreadCrumb currentPage='Teachers' prevPage='Dashboard' prevLink='/dashboard' />
                    <div className={`mt-28 ${user.user_role === 'admin' || user.user_role === 'teacher' ? '' : 'hidden'}`}>
                        <Link href='/new-teacher'>
                            <button className="border border-blue-500 text-blue-700 bg-blue-200 py-2 px-4 rounded-lg">Add Teacher</button>
                        </Link>
                    </div>
                </div>
                <Table data={teachers} headings={HEADINGS} role='teacher' />
            </div>
        </Fragment>
    )
}

export default Teacher