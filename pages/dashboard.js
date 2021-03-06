import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from "react"
import { get_student_count } from '../api/student'

import Navbar from "../components/navbar"
import { NavMain } from '../components/navMain'
import { showToast } from '../components/helpers'
import { get_parent_count, get_teacher_count } from '../api/guardian'

const Dashboard = () => {

    const router = useRouter()

    const [studentCount, setStudentCount] = useState(0)
    const [parentCount, setParentCount] = useState(0)
    const [teacherCount, setTeacherCount] = useState(0)
    const [currentUser, setCurrentUser] = useState({})

    const getStudentCount = async () => {
        try {
            const res = await get_student_count()
            res.status === 200 & (
                setStudentCount(res.data)
            )
        } catch (err) {
            showToast('error', 'An error occured getting Student Count')
        }
    }

    const getCurrentUser = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'))
            setCurrentUser(user)
        } catch (err) {
            // an err occured
        }
    }

    const getParentCount = async () => {
        try {
            const res = await get_parent_count()
            res.status === 200 & (
                setParentCount(res.data)
            )
        } catch (err) {
            console.log(err)
            showToast('error', 'An error occured getting Parent Count')
        }
    }

    const getTeacherCount = async () => {
        try {
            const res = await get_teacher_count()
            res.status === 200 & (
                setTeacherCount(res.data)
            )
        } catch (err) {
            showToast('error', 'An error occured getting Parent Count')
        }
    }

    useEffect(() => {
        // if jwt isn't found
        const jwt = sessionStorage.getItem('auth')
        !jwt && router.replace('/')
        getCurrentUser()
        getStudentCount()
        getParentCount()
        getTeacherCount()
    }, [])

    return (
        <Fragment>
            <Navbar />
            <div className="container p-5 md:pl-20">
                {/* information center */}
                <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 place-items-center mb-10 mt-32 ${currentUser.user_role === 'admin' || currentUser.user_role === 'teacher' ? '' : 'hidden'}`}>
                    <div className="flex items-center w-full rounded-lg p-4 border border-blue-200 text-sm lg:text-lg">
                        <svg className="h-10 w-10 text-blue-400"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        <p className="ml-10 font-bold text-blue-400">{studentCount} Students</p>
                    </div>
                    <div className="flex items-center w-full rounded-lg p-4 border border-green-200 text-sm lg:text-lg">
                        <svg className="h-10 w-10 text-green-500"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="ml-10 font-bold text-green-500">{parentCount} Parents</p>
                    </div>
                    <div className="flex items-center w-full rounded-lg p-4 border border-red-200 text-sm lg:text-lg" >
                        <svg className="h-10 w-10 text-red-400"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="ml-10 font-bold text-red-400">{teacherCount} Teachers</p>
                    </div>
                    <div className="flex items-center w-full rounded-lg p-4 border border-gray-200 text-sm lg:text-lg">
                        <svg className="h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="ml-10 font-bold text-gray-400 text-sm">Last Login</p>
                            <p className="ml-10 text-gray-400 text-xs">...</p>
                        </div>
                    </div>
                </div>

                {/* actions */}
                <div className={`border-2 border-dotted rounded-xl bg-gray-50 my-10 ${currentUser.user_role === 'admin' || currentUser.user_role === 'teacher' ? '' : 'mt-24'}`}>
                    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-y-10 p-16 place-items-center">

                        {/* Students */}
                        {
                            currentUser.user_role !== 'student' && <NavMain
                            title='Students'
                            path='/students'
                            icon={
                                <svg className="h-32 w-32"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            }
                        />
                        }

                        {/* Parents */}
                        {
                            currentUser.user_role !== 'parent' && currentUser.user_role !== 'student' && <NavMain
                            title='Parents'
                            path='/parents'
                            icon={
                                <svg className="h-32 w-32"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            }
                        />
                        }

                        {
                            currentUser.user_role === 'admin' && <NavMain
                            title='Teachers'
                            path='/teachers'
                            icon={
                                <svg className="h-32 w-32"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            }
                        />
                        }

                        {/* Assignments */}
                        {
                            currentUser.user_role !== 'parent'  && <NavMain
                            title='Assignments'
                            path='/assignments'
                            icon={
                                <svg className="h-32 w-32"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                            }
                        />
                        }

                        {/* Departments */}
                        {
                            currentUser.user_role === 'admin' && currentUser.user_role !== 'parent' && currentUser.user_role !== 'student' && <NavMain
                            title='Departments'
                            path='/departments'
                            icon={
                                <svg className="h-32 w-32"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            }
                        />
                        }

                        {/* Classes */}
                        {
                            currentUser.user_role !== 'parent' && <NavMain
                            title='Classes'
                            path='/classes'
                            icon={
                                <svg className="h-32 w-32"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                            }
                        />
                        }

                        {/* Attendance */}
                        {
                            currentUser.user_role !== 'parent' && currentUser.user_role !== 'student' && <NavMain
                            title='Attendance'
                            path='/attendance'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                        }

                        {/* Announcements */}
                        {
                            currentUser.user_role !== 'parent' && <NavMain
                            title='Announcements'
                            path='/announcements'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                        }

                        {/* Parent Announcement */}
                        {
                            currentUser.user_role !== 'parent' && <NavMain
                            title='Parent Announcements'
                            path='/announcements/parents'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                                </svg>
                            }
                        />
                        }

                        {/* Comments */}
                        {
                            currentUser.user_role !== 'parent' && <NavMain
                            title='Comments'
                            path='/comments'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokewinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            }
                        />
                        }

                        {/* Change Password */}
                        {
                            currentUser.user_role !== 'parent' && <NavMain
                            title='Change Password'
                            path='/change-password'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                                </svg>
                            }
                        />
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard