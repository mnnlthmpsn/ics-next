import { useRouter } from "next/router"
import { Fragment, useState } from "react"
import { get_blk_students } from "../api/student"
import { showToast } from "./helpers"

const Table = props => {

    const [open, setOpen] = useState(false)
    const [students, setStudents] = useState([])
    const router = useRouter()

    const getStudents = async studs => {
        try {
            if (studs.length === 0) { return showToast('error', 'There are no students') }
            else {
                const query = []
                studs.map(stud => query.push(`id_in=${stud.id}`))
                const payload = query.join('&')
                const res = await get_blk_students(payload)
                res.status === 200 && setStudents(res.data)
                setOpen(true)
            }
        } catch (err) {
            console.log(err)
            showToast('error', err.messasge)
        }
    }

    return (
        <Fragment>

            {
                open && <div className="absolute top-0 bg-white inset-0 flex justify-center opacity-90 transition-all transform duration-500 ease-in-out">
                    <div className="border w-1/2 bg-gray-100 rounded mt-24 mb-10 overflow-y-auto opacity-full relative">
                        <div className="flex justify-between rounded-t px-10 items-center fixed bg-gray-600 w-1/2">
                            <p className="text-lg py-4 font-extrabold text-gray-400">Students</p>
                            <button onClick={() => setOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-10 flex flex-col mt-16">
                            {
                                students.map((stud, index) => (
                                    <p className="stud.id">{index + 1}. {stud.firstname} {stud.lastname}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
            }

            <div className="w-full overflow-hidden border border-gray-300 rounded-b-lg mb-5">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr
                                className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                            >
                                {
                                    props.headings.map((heading, i) => (
                                        <th className="px-4 py-3" key={i}>{heading}</th>
                                    ))
                                }
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                        >
                            {
                                props.data.length > 0
                                    ? props.data.map((data, index) => (
                                        <tr className="text-gray-700 dark:text-gray-400" key={index}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    <div>
                                                        {props.role === 'parent' && <p className="font-semibold">{data.firstname}</p>}
                                                        {props.role === 'student' && <p className="font-semibold">{data.firstname}</p>}
                                                        {props.role === 'clss' && <p className="font-semibold">{data.firstname}</p>}
                                                        {props.role === 'assignment' && <p className="font-semibold">{data.class.title}</p>}
                                                        {props.role === 'dept' && <p className="font-semibold">{data.title}</p>}
                                                        {props.role === 'attendance' && <p className="font-semibold">{data.date}</p>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {props.role === 'parent' && <p className="font-semibold">{data.lastname}</p>}
                                                {props.role === 'student' && <p className="font-semibold">{data.lastname}</p>}
                                                {props.role === 'clss' && <p className="font-semibold">{data.lastname}</p>}
                                                {props.role === 'assignment' && <p className="font-semibold capitalize">{data.overdue.toString()}</p>}
                                                {props.role === 'dept' && <p className="font-semibold capitalize">{data.teachers.length}</p>}
                                                {props.role === 'attendance' && <p className="font-semibold capitalize">{data.clss.title}</p>}
                                            </td>
                                            {
                                                props.role !== 'clss' && <td className="px-4 py-3 text-sm">
                                                    {props.role === 'parent' && <p>{data.email}</p>}
                                                    {props.role === 'student' && <p>{data.clss.title}</p>}
                                                    {props.role === 'assignment' && <a href={`${data?.assignment[0].url}`} className="font-semibold text-blue-500" download>{data?.assignment[0]?.name}</a>}
                                                    {props.role === 'attendance' && <p className="font-semibold">{data.description}</p>}
                                                </td>
                                            }
                                            <td className="px-4 py-3 text-sm">
                                                {props.role === 'parent' && <p>{data.phone}</p>}
                                                {props.role === 'student' && <p>{data.gender}</p>}
                                                {props.role === 'clss' && <p>{data.gender}</p>}
                                                {props.role === 'assignment' && <p className="font-semibold">{data.solutions?.length}</p>}
                                                {props.role === 'attendance' && <a className="font-semibold text-blue-500 cursor-pointer" onClick={() => getStudents(data.students)}>{data.students.length}</a>}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <button
                                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                        aria-label="Edit"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-blue-400"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                        aria-label="Delete"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-red-400"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr>
                                        <td>
                                            <p className="p-4 text-gray-400 text-md font-semibold">No Data found</p>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default Table