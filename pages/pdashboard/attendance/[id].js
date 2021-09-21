import { Fragment, useContext, useEffect, useState } from "react"
import { get_my_details } from "../../../api/base"
import { getStudentAttendance } from "../../../api/student"
import BreadCrumb from "../../../components/breadcrumb"
import { showToast } from "../../../components/helpers"
import Navbar from "../../../components/navbar"
import { ModalContext } from "../../../contexts/modalContext"

const Attendance = ({ query }) => {

    const [home, setHome] = useState('/pdashboard')
    const [attendances, setAttendances] = useState([])
    const { open, open_modal } = useContext(ModalContext)

    const getAttendance = async () => {
        try {
        //    get student attendance
        const res = await getStudentAttendance(query.id)
        console.log(res.data)
        setAttendances(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
      }
    
      const currentUser = async () => {
        const res = await get_my_details()
        res.data.user_role === 'student' && setHome('/sdashboard')
        getAttendance()
      }
    
      useEffect(() => {
          currentUser()
      }, [])

    return (
        <Fragment>
      {open && (
        <Modal>
          <a href={currentFile} target="_blank" rel="noopener noreferrer">
            <img src={currentFile} alt="" className="w-full h-full" />
          </a>
        </Modal>
      )}
      <Navbar />
      <div className="mt-24 mx-5 md:mx-32">
        <BreadCrumb
          currentPage="Attendance"
          prevPage="Dashboard"
          prevLink={home}
        />
        {attendances.length ? (
          attendances.map((attendance) => (
            <div className="border rounded p-5" key={attendance.id}>
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center w-full">
                    <div>
                    <p><span className="font-bold">Date</span>: {attendance.date}</p>
                    <p><span className="font-bold">Description</span>: {attendance.description}</p>
                    </div>
                    <p className="font-bold text-green-500">Present</p>
                    {/* <p className="border-l-2 pl-2">Overdue: {assignment.overdue.toString()}</p> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="border p-5 rounded text-center font-bold text-2xl text-gray-400">
            No attendance taken for student
          </p>
        )}
      </div>
    </Fragment>
    )
}

Attendance.getInitialProps = ({ query }) => { 
    return { query }
 }

export default Attendance