import { Fragment, useEffect, useState, useContext } from "react"
import BreadCrumb from "../../components/breadcrumb"
import Navbar from "../../components/navbar"
import Table from "../../components/table"
import { get_class, upload_assignment } from "../../api/teacher"
import { ModalContext } from "../../contexts/modalContext"
import Modal from "../../components/modal"
import { showToast } from "../../components/helpers"

const ContactDetail = ({ query }) => {

    const { open, open_modal, close_modal } = useContext(ModalContext)


    const [clss, setClass] = useState({})
    const [students, setStudents] = useState([])
    const [file, setFile] = useState(false)

    const HEADINGS = ['Firstname', 'Lastname', 'Gender']

    useEffect(() => {
        getClassDetails()
    }, [])

    const getClassDetails = async () => {
        try {
            const res = await get_class(query.id)
            setClass(res.data)
            setStudents(res.data.students)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const uploadAssignment = async e => {
        e.preventDefault()

        let formData = new FormData()
        const payload = { class: clss.id }

        formData.append('files.assignment', file)
        formData.append('data', JSON.stringify(payload))

        try {
            const res = await upload_assignment(formData)
            res.status === 200 && (showToast('success', 'Assignment uploaded successfully'), close_modal())
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = e => {
        setFile(e.target.files[0])
    }

    return (
        <Fragment>
            <Navbar />
            {open &&
                <Modal open={open} title='Upload Assignment'>
                    <form className="grid grid-cols gap-6 py-5" onSubmit={uploadAssignment}>
                        {/* modal email */}
                        <label className="text-gray-400 font-bold">Choose File</label>
                        <input type="file" className='border-4 py-12 px-2 rounded-lg border-dashed' onChange={handleChange} />
                        <button type='submit'
                            className="flex justify-center w-auto px-4 py-3 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                                <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                            </svg>
                            Upload Assignment
                        </button>
                    </form>
                </Modal>
            }
            <div className="container">
                <BreadCrumb currentPage='Class Details' prevPage='Classes' prevLink='/classes' />
                <div className="flex item-center justify-end space-x-1">
                    <button onClick={open_modal}
                        className="flex w-auto px-4 py-3 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-500 hover:bg-green-500 focus:outline-none focus:shadow-outline-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                        </svg>
                        View Assignments
                    </button>
                    <button onClick={open_modal}
                        className="flex w-auto px-4 py-3 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                            <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                        </svg>
                        Upload Assignment
                    </button>
                </div>
                <div className="flex item-center justify-between px-4 py-2 bg-gray-50 border mt-2 rounded-t-lg">
                    <p className="text-gray-400 font-bold">{clss.title} Students</p>
                    <p><span className="text-gray-400 font-bold">Teacher</span>: Jojo Jojo</p>
                </div>
                <Table data={students} headings={HEADINGS} role='clss' />
            </div>
        </Fragment>
    )

}

ContactDetail.getInitialProps = ({ query }) => {
    return { query }
}

export default ContactDetail