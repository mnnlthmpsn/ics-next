import { Switch } from "@headlessui/react"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { get_all_students, get_all_students_for_class } from "../../api/student"
import { get_all_classes, take_attendance } from "../../api/teacher"
import BreadCrumb from "../../components/breadcrumb"
import { showToast } from "../../components/helpers"
import { Button, Input, Select } from "../../components/input"
import Navbar from "../../components/navbar"

const TakeAttendance = () => {

    const router = useRouter()

    const [students, setStudents] = useState([])
    const [selectedClass, setSelectedClass] = useState('')
    const [classes, setClasses] = useState([])
    const [attendance, setAttendance] = useState([])
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    const testData = ['Joe', 'Kobby', 'Ama']

    const [enabled, setEnabled] = useState(
        new Array(testData.length).fill(false)
    )

    const handleChange = pos => {
        const updatedCheckedState = enabled.map((item, index) => {
            if (index === pos) {
                if (enabled[index] === false) { setAttendance([...attendance, students[index].id]) }
                if (enabled[index] === true) { setAttendance(attendance.filter((data, index) => data !== students[index].id)) }
            }
            return index === pos ? !item : item
        })

        setEnabled(updatedCheckedState)
    }

    const getStudents = async class_id => {
        setSelectedClass(class_id)
        try {
            const res = await get_all_students_for_class(class_id)
            res.status === 200 && setStudents(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const getAllClasses = async () => {
        try {
            const tempClss = await get_all_classes()
            if (tempClss.status === 200) {
                const temp = []
                tempClss.data.map(clss => {
                    temp.push({ key: `${clss.title}`, value: clss.id })
                })
                setClasses(temp)
            }
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const takeAttendance = async e => {
        e.preventDefault()
        try {
            const payload = {
                students: attendance,
                date: new Date().toISOString().slice(0, 10),
                clss: selectedClass,
                description
            }

            if (attendance.length === 0) { return showToast('error', 'Please tick students present') } else {
                const res = await take_attendance(payload)
                res.status === 200 && router.replace('/attendance')
            }
        } catch (err) {
            showToast('error', err.message)
        }
    }

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10)
        setDate(today)

        getAllClasses()
    }, [])

    return (
        <Fragment>
            <Navbar />
            <div className="container">
                <BreadCrumb currentPage='Take Attendance' prevPage='Dashboard' prevLink='/dashboard' />
                <form className="grid md:grid-cols-2 gap-4" onSubmit={takeAttendance}>
                    <Input
                        type='date'
                        label='Date'
                        value={date}
                        readOnly={true}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>}
                    />
                    <Select
                        label='Select Class'
                        placeholder='Class'
                        options={classes}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                        }
                        onChange={e => getStudents(e.target.value)}
                    />

                    <div className="col-span-2">
                        <label htmlFor="description">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="block w-full pl-10 py-4 rounded mt-1 text-sm border text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"></textarea>
                    </div>

                    <p className="col-span-2 font-bold text-lg text-gray-500">Students</p>
                    <div className="col-span-2 border rounded-xl py-5">
                        {
                            students.length > 0
                                ? students.map((student, index) => (
                                    <div className="flex justify-between mx-5 items-center space-y-5" key={index}>
                                        <p>{student.firstname} {student.lastname}</p>
                                        <Switch
                                            checked={enabled[index]}
                                            onChange={() => handleChange(index)}
                                            className={`${enabled[index] ? 'bg-green-400' : 'bg-gray-400'} relative inline-flex flex-shrink-0 h-[18px] w-[34px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={`${enabled[index] ? 'translate-x-4' : 'translate-x-0'} pointer-events-none inline-block h-[14px] w-[14px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                            />
                                        </Switch>
                                    </div>
                                ))
                                : <p className="text-center">No Students found</p>
                        }
                    </div>
                    <div className="flex justify-end col-span-2">
                        <Button btnText='Done' type='submit' color='blue' textColor='white' />
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default TakeAttendance