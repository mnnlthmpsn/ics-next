import { Fragment, useContext, useEffect, useState } from "react"
import { add_class, get_all_classes, get_all_teachers } from "../../api/teacher"
import BreadCrumb from "../../components/breadcrumb"
import ClassCard from "../../components/classCard"
import { showToast } from "../../components/helpers"
import { Input, Select } from "../../components/input"
import Modal from "../../components/modal"
import Navbar from "../../components/navbar"
import { ModalContext } from "../../contexts/modalContext"

const Clss = () => {

    const { open, open_modal, close_modal } = useContext(ModalContext)
    const [allClasses, setAllClasses] = useState([])
    const [teachers, setTeachers] = useState([])
    const [clss, setClass] = useState({
        teacher: '',
        title: ''
    })

    useEffect(() => {
        getClasses()
        getTeachers()
    }, [])

    const getClasses = async () => {
        try {
            const res = await get_all_classes()
            setAllClasses(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const getTeachers = async () => {
        try {
            const tempTeach = await get_all_teachers()
            if (tempTeach.status === 200) {
                const temp = []
                tempTeach.data.map(teacher => {
                    temp.push({ key: `${teacher.firstname} ${teacher.lastname}`, value: teacher.id })
                })
                setTeachers(temp)
            }
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const addClass = async e => {
        e.preventDefault()
        try {
            const payload = {
                teacher: clss.teacher,
                title: clss.title
            }

            const res = await add_class(payload)
            res.status === 200
                ? (
                    showToast('success', 'Class Added successfully'),
                    clearFields(),
                    getClasses(),
                    close_modal()
                )
                : showToast('error', 'Error adding class')
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const clearFields = () => {
        setClass({
            teacher: '',
            title: ''
        })
    }

    return (
        <Fragment>
            <Navbar />
            {open &&
                <Modal open={open} title='Add Class'>
                    <form className="grid grid-cols gap-6 py-5" onSubmit={addClass}>
                        {/* modal email */}
                        <Input
                            label='Class Title'
                            placeholder='eg: Class 1'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            }
                            value={clss.title}
                            onChange={e => setClass({ ...clss, title: e.target.value })}
                        />
                        <Select
                            label='Teacher'
                            value={clss.teacher}
                            placeholder='Teacher'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                            }
                            options={teachers}
                            onChange={e => setClass({ ...clss, teacher: e.target.value })}
                        />
                        <button type='submit' className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue">
                            Add Class
                        </button>
                    </form>
                </Modal>
            }
            <div className="container">
            <BreadCrumb currentPage='Classes' prevPage='Dashboard' prevLink='/dashboard' />
            <div className="container">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-500 font-bold mb-2">Classes</p>
                    <button onClick={open_modal}
                        className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
                    >
                        Add Class
                    </button>
                </div>
                <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center mb-12">
                    {
                        allClasses.length > 0
                            ? allClasses.map((clss, index) => (
                                <ClassCard teacher={`${clss.teacher.firstname} ${clss.teacher.lastname}`} clss={clss.title} key={index} id={clss.id}/>
                            ))
                            : <p className="text-center mt-2">Classes haven't been added</p>
                    }
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default Clss