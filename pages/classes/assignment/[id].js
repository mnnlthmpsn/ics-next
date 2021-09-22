import { Fragment, useContext, useEffect, useState } from "react"
import { get_assignment_for_class } from "../../../api/teacher"
import BreadCrumb from "../../../components/breadcrumb"
import { showToast } from "../../../components/helpers"
import Modal from "../../../components/modal"
import Navbar from "../../../components/navbar"
import { ModalContext } from "../../../contexts/modalContext"

const AssignmentForClass = ({ query }) => {

    const [assignments, setAssignments] = useState([])
    const { open, open_modal } = useContext(ModalContext)
    const [currentFile, setCurrentFile] = useState([])

    const getAssignmentforClass = async () => {
        try {
            const res = await get_assignment_for_class(query.id)
            setAssignments(res.data)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    const openMyModal = async (url) => {
        setCurrentFile(url);
        open_modal();
      };

    useEffect(() => {
        getAssignmentforClass()
    }, [])
    return(
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
          currentPage="Assignments"
          prevPage="Classes"
          prevLink="/classes"
        />
        {assignments.length ? (
          assignments.map((assignment) => (
            <div className="border rounded p-5" key={assignment.id}>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <p>{assignment.assignment[0].name}</p>
                    <p className="border-l-2 pl-2">Overdue: {assignment.overdue.toString()}</p>
                </div>
                <button
                  onClick={() => openMyModal(assignment.assignment[0].url)}
                  type="button"
                  className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="border p-5 rounded text-center font-bold text-2xl text-gray-400">
            No assignments uploaded yet
          </p>
        )}
      </div>
    </Fragment>
    )
}

AssignmentForClass.getInitialProps = ({ query }) => {
    return { query }
}

export default AssignmentForClass