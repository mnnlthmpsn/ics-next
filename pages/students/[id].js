import { Fragment, useContext, useEffect, useState } from "react"
import { get_all_reports, get_student, get_student_reports } from "../../api/student"
import { showToast } from "../../components/helpers"
import { ModalContext } from '../../contexts/modalContext'

import Modal from '../../components/modal'
import { Button } from '../../components/input'
import Navbar from "../../components/navbar"
import SideBar from "../../components/sidebar"
import BreadCrumb from "../../components/breadcrumb"
import { upload_report } from "../../api/teacher"

const StudentDetail = ({ query }) => {

    const { open, open_modal, close_modal } = useContext(ModalContext)
    const [file, setFile] = useState(false)
    const [student, setStudent] = useState({})
    const [reports, setReports] = useState([])

    const uploadReport = async e => {
        e.preventDefault()

        let formData = new FormData()
        const payload = { student: query.id }

        formData.append('files.file', file)
        formData.append('data', JSON.stringify(payload))

        try {
            const res = await upload_report(formData)
            res.status === 200 && (showToast('success', 'Report uploaded successfully'), close_modal(), reports.push(res.data))
        } catch (err) {
            showToast('error', err.msg)
        }

    }

    const getStudentDetails = async () => {
        try {
            const res = await get_student(query.id)
            console.log(res.data)
            setStudent(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const getStudentReports = async () => {
        try {
            const res = await get_student_reports(query.id)
            console.log(res.data)
            setReports(res.data)
        } catch (err) {
            showToast('error', err.msg)
        }
    }

    const handleChange = e => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        getStudentDetails()
        getStudentReports()
    }, [])

    return <Fragment>
        {open &&
            <Modal open={open} title='Upload Report'>
                <p className="font-bold text-red-400 text-sm text-center">uploaded files must be in "jpeg, jpg or png formats"</p>
                <form onSubmit={uploadReport}>
                    <div className="grid grid-cols gap-6 py-5">
                        <label className="text-gray-400 font-bold">Choose File</label>
                        <input type="file" accept="image/png, image/jpg, image/jpeg" className='border-4 py-12 px-2 rounded-lg border-dashed' onChange={handleChange} />
                    </div>
                    <div className="flex justify-end">
                        {/* modal button */}
                        <Button
                            btnText='Upload Report'
                            color='green'
                            textColor='white'
                            type='submit'
                        />
                    </div>
                </form>
            </Modal>
        }
        <Navbar />
        <div className="container p-5 md:pl-32">
            <SideBar menu='assignments' />
            <BreadCrumb currentPage='Student Details' prevPage='Student' prevLink='/students' />
            <div className="flex flex-col items-center">
                <div className="rounded-full my-8 md:my-0 border-2 p-5 w-24 h-24 flex self-center items-center justify-center">
                    <p className="italic text-gray-400">profile</p>
                </div>
                {/* name */}
                <div className="flex justify-between items-center space-x-5 py-5">
                    <p className="text-2xl">{student.firstname} {student.lastname}</p>
                    <button className="border border-green-500 text-green-700 bg-green-200 py-2 px-6 rounded-lg" onClick={open_modal}>Upload Result</button>
                </div>

                {/* details */}
                <div className="flex space-x-6 justify-between items-center w-full md:w-1/2">
                    <p>Username: </p>
                    <p>{student.profile?.username} </p>
                </div>

                <hr className="border w-full md:w-1/2 my-3" />
                <div className="flex space-x-6 justify-between items-center w-full md:w-1/2">
                    <p>Fullname: </p>
                    <p>{student.firstname} {student.lastname} </p>
                </div>

                <hr className="border w-full md:w-1/2 my-3" />

                <div className="flex space-x-6 justify-between items-center w-full md:w-1/2">
                    <p>Email: </p>
                    <p>{student.profile?.email} </p>
                </div>

                <hr className="border w-full md:w-1/2 my-3" />

                <div className="flex space-x-6 justify-between items-center w-full md:w-1/2">
                    <p>Class: </p>
                    <p>{student.clss?.title} </p>
                </div>

                <hr className="border w-full md:w-1/2 my-3" />

                <div className="flex space-x-6 justify-between items-center w-full md:w-1/2">
                    <p>Parents: </p>
                    {
                        student.parents?.map(parent => (
                            <p key={parent.id}>{parent.firstname} - {parent.lastname} - {parent.email}</p>
                        ))
                    }
                </div>

                <hr className="border w-full md:w-1/2 my-3" />

                <div className="flex space-x-6 justify-between items-center w-full md:w-1/2">
                    <p>Teachers: </p>
                    {
                        student.teachers?.map(teacher => (
                            <p key={teacher.id}>{teacher.firstname} - {teacher.lastname} - {teacher.email}</p>
                        ))
                    }
                </div>

                <hr className="border w-full md:w-1/2 my-3" />

                <div className="flex space-x-6 justify-between items-center w-full md:w-1/2">
                    <p>Gender: </p>
                    <p>{student.gender}</p>
                </div>
            </div>

            <p className="py-5 text-xl font-bold">Reports</p>
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-6">
                {
                    reports.length < 1
                        ? <p className="text-center">No Transcripts uploaded</p>
                        : reports.map(report => (
                            <div className="p-5 border-dotted border-4 rounded-lg w-full text-center md:text-left" key={report.id}>
                                <a href={report.file[0]?.url} target="_blank" className="text-blue-500 hover:underline cursor-pointer">{report.file[0]?.name}</a>
                            </div>
                        ))
                }
            </div>
        </div>
    </Fragment>
}

StudentDetail.getInitialProps = ({ query }) => {
    return { query }
}

export default StudentDetail