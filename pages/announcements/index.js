import { Fragment, useState, useContext, useEffect } from "react";
import BreadCrumb from "../../components/breadcrumb";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import { ModalContext } from "../../contexts/modalContext";
import { Input, Select } from "../../components/input";
import Modal from "../../components/modal";
import { showToast } from "../../components/helpers";
import {
  add_announcement,
  all_announcements,
  get_all_classes,
  get_classes_for_teacher,
} from "../../api/teacher";
import { del_anc } from "../../api/base";

const Announcements = () => {
  const { open, open_modal, close_modal } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [announcement, setAnnouncement] = useState({
    title: "",
    clss: "",
    description: "",
  });
  const [currentUser, setCurrentUser] = useState({})

  const [announcements, setAnnouncements] = useState([]);

  const getAllAnnouncements = async () => {
    try {
      const res = await all_announcements();
      setAnnouncements(res.data);
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const getClasses = async (id='') => {
    try {
        const tempClss = id === '' ? await get_all_classes() : await get_classes_for_teacher(id)
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

const getCurrentUser = async () => {
    try {
        const user = JSON.parse(sessionStorage.getItem('user'))
        setCurrentUser(user)
        user.user_role === 'admin' ? getClasses() : getClasses(user.id.toString())
    } catch (err) {
        // an err occured
    }
}

const delete_announcement = async id => {
  try {
    const res = await del_anc(id)
    res.status === 200 && showToast('succes', 'Announcement deleted successfully')
    window.location.reload()
  } catch (err) {
    showToast('error', err.message)
  }
}

  const addAnnouncement = async (e) => {
    console.log(announcement)
    e.preventDefault();
    try {
      const res = await add_announcement(announcement);
      res.status === 200 &&
        showToast("success", "Announcement added successfully"),
        close_modal();
      setIsLoading(!isLoading);
      setAnnouncement({ title: "", description: "", clss: "" });
    } catch (err) {
      showToast("error", err.message);
    }
  };

  useEffect(() => {
    getAllAnnouncements();
    getCurrentUser()
  }, [isLoading]);

  return (
    <Fragment>
      <Navbar />
      <SideBar menu="announcements" />
      {open && (
        <Modal open={open} title="Add Announcement">
          <form
            className="grid grid-cols gap-6 py-5"
            onSubmit={addAnnouncement}
          >
            <Select
              label="Class"
              value={announcement.clss}
              placeholder="Class"
              icon={
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
              }
              options={classes}
              onChange={(e) =>
                setAnnouncement({ ...announcement, clss: e.target.value })
              }
            />
            {/* modal email */}
            <Input
              label="Title"
              placeholder="eg: Exams Schedule"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              }
              value={announcement.title}
              onChange={(e) =>
                setAnnouncement({ ...announcement, title: e.target.value })
              }
            />
            <textarea
              value={announcement.description}
              className="border border-gray-200 focus:outline-none focus:border-gray-300 rounded text-gray-500 p-4 w-full"
              rows="2"
              onChange={(e) =>
                setAnnouncement({
                  ...announcement,
                  description: e.target.value,
                })
              }
            ></textarea>
            <button
              type="submit"
              className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
            >
              Add Announcement
            </button>
          </form>
        </Modal>
      )}
      <div className="container relative mb-5">
        <BreadCrumb
          currentPage="Announcements"
          prevPage="Dashboard"
          prevLink="/dashboard"
        />
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 font-bold mb-2">Announcements</p>
          <button
            onClick={open_modal}
            className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
          >
            Add Announcement
          </button>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {announcements.length > 0 ? (
            announcements.map((anc) => (
              <div
                className="flex justify-between items-center border rounded-lg border-gray-300 p-5 shadow-sm bg-white"
                key={anc.id}
              >
                <div>
                  <p className="font-bold text-lg text-gray-600">{anc.title}</p>
                  <p className="text-gray-400">{anc.description}</p>
                </div>
                {
                  currentUser.user_role === 'admin' && <svg
                  onClick={() => delete_announcement(anc.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-400 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                }
              </div>
            ))
          ) : (
            <p className="text-center mt-24 font-bold text-xl text-gray-400">
              Add & Show Announcements here
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Announcements;
