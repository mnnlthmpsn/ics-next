import { Fragment, useState, useContext, useEffect } from "react";
import { get_announcement_for_class } from "../../../api/teacher";
import BreadCrumb from "../../../components/breadcrumb";
import Navbar from "../../../components/navbar";
import Modal from '../../../components/modal'
import { showToast } from "../../../components/helpers";
import { ModalContext } from "../../../contexts/modalContext";
import { get_my_details } from "../../../api/base";

const Announcement = ({ query }) => {
  const { open, open_modal } = useContext(ModalContext);

  const [announcements, setAnnouncements] = useState([]);
  const [description, setDescription] = useState([]);
  const [home, setHome] = useState('/pdashboard')

  const openMyModal = async (desc) => {
    setDescription(desc);
    open_modal();
  };

  const getAnnouncements = async () => {
    try {
        const res = await get_announcement_for_class(query.id)
        setAnnouncements(res.data)
    } catch (err) {
        showToast('error', err.message)
    }
  }

  const currentUser = async () => {
    const res = await get_my_details()
    res.data.user_role === 'student' && setHome('/sdashboard')
    getAnnouncements()
  }

  useEffect(() => {
      currentUser()
  }, [])

  return (
    <Fragment>
      {open && (
        <Modal>
          <p>{description}</p>
        </Modal>
      )}
      <Navbar />
      <div className="mt-24 mx-5 md:mx-32">
        <BreadCrumb
          currentPage="Assignments"
          prevPage="Dashboard"
          prevLink={home}
        />
        {announcements.length ? (
          announcements.map((announcement) => (
            <div className="border rounded p-5" key={announcement.id}>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    <p className="font-bold text-2xl tex-gray-400">Title: {announcement.title}</p>
                </div>
                <button
                  onClick={() => openMyModal(announcement.description)}
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
            No Announcements
          </p>
        )}
      </div>
    </Fragment>
  );
};

Announcement.getInitialProps = ({ query }) => {
  return { query };
};

export default Announcement;
