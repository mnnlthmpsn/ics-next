import { Fragment, useEffect, useState } from "react"
import { get_all_attendances } from "../../api/teacher"
import BreadCrumb from "../../components/breadcrumb"
import Navbar from "../../components/navbar"
import Table from "../../components/table"
import { showToast } from "../../components/helpers"
import Link from "next/link"

const Attendance = () => {

    const [attendances, setAttendances] = useState([])

    const HEADINGS = ['Date', 'Class', 'Description', 'Students']

    useEffect(() => {
        getAttendances()
    }, [])

    const getAttendances = async () => {
        try {
            const res = await get_all_attendances()
            res.status === 200 && setAttendances(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    return (
        <Fragment>
            <Navbar />
            <div className="container ">
                <div className="flex justify-between">
                    <BreadCrumb currentPage='Attendance' prevPage='Dashboard' prevLink='/dashboard' />
                    <div className="mt-28">
                        <Link href="/attendance/new"><a className="border border-blue-500 text-blue-700 bg-blue-200 py-2 px-4 rounded-lg hidden md:block">Take Attendance</a></Link>
                        <button className="border border-blue-500 text-blue-700 bg-blue-200 py-2 px-4 rounded-lg block md:hidden">Take</button>
                    </div>
                </div>
                {
                    attendances.length > 0
                    ? <Table data={attendances} headings={HEADINGS} role='attendance'/> 
                    : <p className="text-center mt-5">No Attendance taken yet</p>
                }
            </div>
        </Fragment>
    )
}

export default Attendance