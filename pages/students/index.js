import { Fragment, useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import { showToast } from '../../components/helpers'


import BreadCrumb from "../../components/breadcrumb"
import Navbar from "../../components/navbar"
import Table from "../../components/table"
import { get_all_students } from "../../api/student"
import SideBar from "../../components/sidebar"
import { get_students_for_parent } from "../../api/guardian"
import { get_teacher, get_teacher_class } from "../../api/teacher"


const Student = () => {

    const router = useRouter()
    const [allStudents, setAllStudents] = useState([])
    const [user, setCurrentUser] = useState({})

    const getCurrentUser = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'))
            setCurrentUser(user)

            if (user.user_role === 'admin' || user.user_role === 'teacher') {
                getAllStudents()
            } 
            
            if (user.role === 'parent') {
                getAllStudentsForParents(user.id.toString())
            } 
        } catch (err) {
            // an err occured
        }
    }

    const getAllStudentsForClass = async id => {
        // get particular teacher
        const clss = await get_teacher_class(id)
        console.log(clss)
    }

    useEffect(() => {
        // if jwt isn't found
        const jwt = sessionStorage.getItem('auth')
        !jwt && router.replace('/')

        getCurrentUser()
    }, [])

    const getAllStudentsForParents = async id => {
        try {
            const res = await get_students_for_parent(id)
            setAllStudents(res.data)
        } catch (err) {
            throw err
        }
    }

    const getAllStudents = async () => {
        try {
            const res = await get_all_students()
            setAllStudents(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const searchStudent = e => {
        if (e.target.value == '') {
          getAllStudents()
        } else {
          var nw = allStudents.filter(
            (student) =>
              student.firstname.toUpperCase().includes(e.target.value.toUpperCase()) ||
              student.lastname.toUpperCase().includes(e.target.value.toUpperCase())
          );
          setAllStudents(nw)
        }
      }

    const HEADINGS = ['Firstname', 'Lastname', 'Class', 'Gender']

    return (
        <Fragment>
            <Navbar />
            <div className="container p-5 md:pl-40">
                <SideBar menu='students' />
                <div className="flex justify-between">
                    <BreadCrumb currentPage='Students' prevPage='Dashboard' prevLink='/dashboard' />
                    <div className={`mt-28 ${user.user_role === 'admin' || user.user_role === 'teacher' ? '' : 'hidden'}`}>
                        <Link href='/students/add'>
                            <button className="border border-blue-500 text-blue-700 bg-blue-200 py-2 px-4 rounded-lg">Add Student</button>
                        </Link>
                    </div>
                </div>
                <input type="text" onChange={searchStudent} placeholder="Search Student" className="block w-1/2 p-4 my-2 rounded mt-1 text-sm border text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"/>
                <Table data={allStudents} headings={HEADINGS} role='student' />
            </div>
        </Fragment>
    )
}

export default Student