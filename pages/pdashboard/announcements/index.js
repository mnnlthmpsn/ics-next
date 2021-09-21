import { Fragment, useState, useEffect } from "react";
import { get_my_details } from "../../../api/base";
import Navbar from "../../../components/navbar";
import BreadCrumb from "../../../components/navbar";
import { showToast } from "../../../components/helpers";
import { get_parent_announcements } from "../../../api/guardian";

const ParentAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [cuser, setCurrentUser] = useState({});

  const currentUser = async () => {
    const res = await get_my_details();
    setCurrentUser(res.data);
    getParentAnnouncements(res.data.id);
  };

  const getParentAnnouncements = async (id) => {
    try {
      const res = await get_parent_announcements(id);
      setAnnouncements(res.data);
    } catch (err) {
      showToast("error", err.message);
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="mt-24 mx-5 md:mx-32">
        <BreadCrumb
          currentPage="Attendance"
          prevPage="Dashboard"
          prevLink="/pdashboard"
        />
        <div className="space-y-5">
        {announcements.length ? (
          announcements.map((annc) => (
            <div className="border rounded p-5" key={annc.id}>
              <div className="flex justify-between items-center">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <p>
                      <span className="font-bold">title</span>: {annc.title}
                    </p>
                    <p>
                      <span className="font-bold">Message</span>: {annc.message}
                    </p>
                  </div>
                  {/* <p className="font-bold text-green-500">Present</p> */}
                  {/* <p className="border-l-2 pl-2">Overdue: {assignment.overdue.toString()}</p> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="border p-5 rounded text-center font-bold text-2xl text-gray-400">
            No announcements for you
          </p>
        )}
        </div>
      </div>
    </Fragment>
  );
};

export default ParentAnnouncement;
