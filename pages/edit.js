import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { update_user } from "../api/base";
import BreadCrumb from "../components/breadcrumb";
import { showToast } from "../components/helpers";
import Navbar from "../components/navbar";

const EditPage = () => {
  const [dummy, setDummy] = useState({});
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("edit"));
    console.log(user)
    setDummy(user);
    setEmail(!!user.profile ? user.profile.email : user.email);
    setFname(!!user.profile ? user.profile.firstname: user.firstname);
    setLname(!!user.profile ? user.profile.lastname : user.lastname);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = !!dummy.profile ? dummy.profile.id : dummy.id

    const payload = {
      email,
      firstname: fname,
      lastname: lname,
    };

    try {
      const res = await update_user(user_id, payload);
      console.log(res)
      res.status === 200
        ? (showToast("success", "User updated successfully"), router.replace(`${!!dummy.profile ? `${dummy.profile.user_role}s` : `${dummy.user_role}s`}`))
        : showToast("error", "Could not update User details");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="px-5 md:px-20 w-screen">
        <div className="flex justify-between">
          <BreadCrumb
            currentPage="Change Password"
            prevPage="Dashboard"
            prevLink="/dashboard"
          />
        </div>
        <div className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="pt-5 md:pt-16 w-full md:w-1/2"
          >
            <label className="block mt-4 text-sm">
              <span className="text-gray-400 font-semibold">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
              />
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-400 font-semibold">Firstname</span>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
                required
              />
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-400 font-semibold">Lastname</span>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
                required
              />
            </label>

            <button
              type="submit"
              className="block w-full px-4 py-3 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditPage;
