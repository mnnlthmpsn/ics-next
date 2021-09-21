import { Fragment, useEffect, useState } from "react";
import { new_parent_announcement } from "../../../api/base";
import { get_all_parents } from "../../../api/guardian";
import BreadCrumb from "../../../components/breadcrumb";
import { showToast } from "../../../components/helpers";
import { Button } from "../../../components/input";
import Navbar from "../../../components/navbar";
import SideBar from "../../../components/sidebar";

const ParentAnnouncement = () => {
  const [parents, setParents] = useState([]);
  const [parentIDs, setParentIDs] = useState([])
  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
    parents: [],
  });

  const getAllParents = async () => {
    try {
      const res = await get_all_parents();
      res.status === 200 && setParents(res.data);

      const ids = res.data.map(parent => parent.id)
      setParentIDs(ids)
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const handleParentSelect = (e) => {
    if (e.target.value === "all") {
      setAnnouncement({...announcement, parents: parentIDs})
      return;
    } else {
      setAnnouncement({ ...announcement, parents: [e.target.value] });
      return;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        const res = await new_parent_announcement(announcement)
        console.log(res)
    } catch (err) {
        showToast('error', err.message)
    }
  };

  useEffect(() => {
    getAllParents();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <SideBar menu="announcement" />
      <div className="container mx-5">
        <BreadCrumb
          currentPage="Take Attendance"
          prevPage="Dashboard"
          prevLink="/dashboard"
        />
        <form className="space-y-6 mr-5 md:mr-0" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="parents">Parents</label>
            <select
              onChange={handleParentSelect}
              className="block w-full p-4 rounded mt-1 text-sm border text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
            >
              <option value="" selected disabled>
                -- Select Target --
              </option>
              {parents.length && (
                <>
                  <option value="all">All</option>
                  {parents.map((parent) => (
                    <option value={parent.id} key={parent.id}>
                      {parent.firstname} {parent.lastname} - {parent.email}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <div>
            <label htmlFor="#">Title</label>
            <input
              value={announcement.title}
              onChange={(e) =>
                setAnnouncement({ ...announcement, title: e.target.value })
              }
              type="text"
              className="block w-full p-4 rounded mt-1 text-sm border text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
            />
          </div>
          <div>
            <label htmlFor="description">Message</label>
            <textarea
              rows="10"
              value={announcement.message}
              onChange={(e) =>
                setAnnouncement({
                  ...announcement,
                  message: e.target.value,
                })
              }
              className="block w-full p-4 rounded mt-1 text-sm border text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
            ></textarea>
          </div>
          <div className="flex justify-end col-span-2">
            <Button
              btnText="Done"
              type="submit"
              color="blue"
              textColor="white"
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ParentAnnouncement;
