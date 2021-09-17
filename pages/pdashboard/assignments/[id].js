import { Fragment, useState, useContext, useEffect } from "react";
import { get_assignment_for_class } from "../../../api/teacher";
import BreadCrumb from "../../../components/breadcrumb";
import Navbar from "../../../components/navbar";
import Modal from '../../../components/modal'
import { showToast } from "../../../components/helpers";
import { ModalContext } from "../../../contexts/modalContext";
import { get_my_details } from "../../../api/base";

const Assignments = ({ query }) => {
  const { open, open_modal } = useContext(ModalContext);

  const [assignments, setAssignments] = useState([]);
  const [currentFile, setCurrentFile] = useState([]);
  const [home, setHome] = useState("/pdashboard")

  const openMyModal = async (url) => {
    setCurrentFile(url);
    open_modal();
  };

  const getAssignments = async () => {
    try {
        const res = await get_assignment_for_class(query.id)
        console.log(res.data)
        setAssignments(res.data)
    } catch (err) {
        showToast('error', err.message)
    }
  }

  const currentUser = async () => {
    const res = await get_my_details()
    res.data.user_role === 'student' && setHome('/sdashboard')
    getAssignments()
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
          currentPage="Assignments"
          prevPage="Dashboard"
          prevLink={home}
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
  );
};

Assignments.getInitialProps = ({ query }) => {
  return { query };
};

export default Assignments;
