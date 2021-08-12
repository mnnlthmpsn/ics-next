import { Fragment, useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import BreadCrumb from "../../components/breadcrumb"
import Table from '../../components/table'
import { showToast } from "../../components/helpers"
import { get_assignments } from "../../api/teacher"
import Link from "next/link"

const Assignments = () => {

    const [assignments, setAssignments] = useState([])
    const HEADINGS = ['Class', 'Overdue', 'File', 'Solutions']

    useEffect(() => {
        getAllAssignments()
    }, [])

    const getAllAssignments = async () => {
        try {
            const res = await get_assignments()
            console.log(res)
            res.status === 200 && setAssignments(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    return (
        <Fragment>
            <Navbar />
            <div className="container">
                <div className="flex justify-between">
                    <BreadCrumb currentPage='Assignments' prevPage='Dashboard' prevLink='/dashboard' />
                    <div className="mt-28 mr-10">
                        <Link href='/students/add'>
                            <button className="border border-blue-500 text-blue-700 bg-blue-200 py-2 px-4 rounded-lg">Upload Assignment</button>
                        </Link>
                    </div>
                </div>
                <Table data={assignments} headings={HEADINGS} role='assignment' />
            </div>
        </Fragment>
    )
}

export default Assignments