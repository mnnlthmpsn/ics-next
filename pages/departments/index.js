import { Fragment, useContext, useEffect, useState } from "react"
import { add_department, get_all_departments } from "../../api/teacher"
import BreadCrumb from "../../components/breadcrumb"
import { showToast } from "../../components/helpers"
import { Input } from "../../components/input"
import Modal from "../../components/modal"
import Navbar from "../../components/navbar"
import Table from "../../components/table"
import { ModalContext } from "../../contexts/modalContext"

const Department = () => {

    const { open, open_modal, close_modal } = useContext(ModalContext)
    const [allDepartments, setAllDepartments] = useState([])
    const [department, setDepartment] = useState('')

    useEffect(() => {
        getDepartments()
    }, [])

    const HEADINGS = ['Title', 'Teachers']

    const getDepartments = async () => {
        try {
            const res = await get_all_departments()
            setAllDepartments(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const addDepartment = async e => {
        e.preventDefault()
        try {
            const res = await add_department(department)
            res.status === 200
                ? (
                    showToast('success', 'Department Added successfully'),
                    clearFields(),
                    getDepartments(),
                    close_modal()
                )
                : showToast('error', 'Error adding department')
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const clearFields = () => {
        setDepartment('')
    }

    return (
        <Fragment>
            <Navbar />
            {open &&
                <Modal open={open} title='Add Department'>
                    <form className="grid grid-cols gap-6 py-5" onSubmit={addDepartment}>
                        {/* modal email */}
                        <Input
                            label='Department Title'
                            placeholder='eg: Mathematics Department'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            }
                            value={department}
                            onChange={e => setDepartment(e.target.value)}
                        />
                        <button type='submit' className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue">
                            Add Department
                        </button>
                    </form>
                </Modal>
            }
            <div className="container">
                <BreadCrumb currentPage='Classes' prevPage='Dashboard' prevLink='/dashboard' />
                <div className="container">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-500 font-bold mb-2">Departments</p>
                        <button onClick={open_modal}
                            className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
                        >
                            Add Department
                        </button>
                    </div>
                    <Table data={allDepartments} headings={HEADINGS} role='dept' />
                </div>
            </div>
        </Fragment>
    )
}

export default Department