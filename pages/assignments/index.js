import { Fragment, useEffect, useState, useContext } from "react"
import Navbar from "../../components/navbar"
import BreadCrumb from "../../components/breadcrumb"
import Table from '../../components/table'
import { showToast } from "../../components/helpers"
import { get_all_classes, get_assignments, upload_assignment } from "../../api/teacher"
import { ModalContext } from '../../contexts/modalContext'
import Modal from "../../components/modal"
import { Button, Select } from "../../components/input"
import SideBar from "../../components/sidebar"

const Assignments = () => {

    const { open, open_modal, close_modal } = useContext(ModalContext)

    const [assignments, setAssignments] = useState([])
    const [file, setFile] = useState(false)
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState('')
    const HEADINGS = ['Class', 'Overdue', 'File', 'Solutions']


    useEffect(() => {
        getAllAssignments()
        getClasses()
    }, [])

    const getAllAssignments = async () => {
        try {
            const res = await get_assignments()
            res.status === 200 && setAssignments(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const getClasses = async () => {
        try {
            const tempClass = await get_all_classes()
            if (tempClass.status === 200) {
                const temp = []
                tempClass.data.map(clss => {
                    temp.push({ key: clss.title, value: clss.id })
                })
                setClasses(temp)
            }
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const handleChange = e => {
        setFile(e.target.files[0])
    }

    const uploadAssignment = async e => {
        e.preventDefault()

        let formData = new FormData()
        const payload = { class: selectedClass }

        formData.append('files.assignment', file)
        formData.append('data', JSON.stringify(payload))

        try {
            const res = await upload_assignment(formData)
            res.status === 200 && (showToast('success', 'Assignment uploaded successfully'), close_modal())
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Fragment>
            {open &&
                <Modal open={open} title='Upload Assignment'>
                    <form onSubmit={uploadAssignment}>
                        <div className="grid grid-cols gap-6 py-5">
                            <Select
                                label='Class'
                                value={selectedClass.id}
                                placeholder='Class'
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                }
                                options={classes}
                                onChange={e => setSelectedClass(e.target.value)}
                            />

                            <label className="text-gray-400 font-bold">Choose File</label>
                            <input type="file" className='border-4 py-12 px-2 rounded-lg border-dashed' onChange={handleChange} />
                        </div>
                        <div className="flex justify-end">
                            {/* modal button */}
                            <Button
                                btnText='Upload Assignment'
                                color='blue'
                                textColor='white'
                                type='submit'
                            />
                        </div>
                    </form>
                </Modal>
            }
            <Navbar />
            <div className="container">
                <SideBar menu='assignments' />
                <div className="flex justify-between">
                    <BreadCrumb currentPage='Assignments' prevPage='Dashboard' prevLink='/dashboard' />
                    <div className="mt-28 mr-10">
                        <button onClick={open_modal}
                            className="border border-blue-500 text-blue-700 bg-blue-200 py-2 px-4 rounded-lg">Upload Assignment</button>
                    </div>
                </div>
                <Table data={assignments} headings={HEADINGS} role='assignment' />
            </div>
        </Fragment>
    )
}

export default Assignments