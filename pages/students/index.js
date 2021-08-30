import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import { showToast } from '../../components/helpers'

import BreadCrumb from "../../components/breadcrumb"
import Navbar from "../../components/navbar"
import Table from "../../components/table"
import { get_all_students } from "../../api/student"
import SideBar from "../../components/sidebar"


const Student = () => {

    const router = useRouter()
    const [allStudents, setAllStudents] = useState([])

    useEffect(() => {
        // if jwt isn't found
        const jwt = sessionStorage.getItem('auth')
        !jwt && router.replace('/')

        getAllStudents()
    }, [])

    const getAllStudents = async () => {
        try {
            const res = await get_all_students()
            console.log(res.data)
            setAllStudents(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const HEADINGS = ['Firstname', 'Lastname', 'Class', 'Gender']

    return (
        <Fragment>
            <Navbar />
            <div className="container">
                <SideBar menu='students' />
                <div className="flex justify-between">
                    <BreadCrumb currentPage='Students' prevPage='Dashboard' prevLink='/dashboard' />
                    <div className="mt-28 mr-10">
                        <Link href='/students/add'>
                            <button className="border border-blue-500 text-blue-700 bg-blue-200 py-2 px-4 rounded-lg hover:animate-pulse">Add Student</button>
                        </Link>
                    </div>
                </div>
                <Table data={allStudents} headings={HEADINGS} role='student' />
            </div>
        </Fragment>
    )
}

export default Student