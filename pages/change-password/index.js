import { Fragment, useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import BreadCrumb from "../../components/breadcrumb";
import { showToast } from "../../components/helpers";
import { change_password } from "../../api/base";

const ChangePassword = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [homepage, setHomepage] = useState('/dashboard')
  const [pwd, setPwd] = useState({
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user.user_role === 'parent') {
      setHomepage('/pdashboard')
    }
    else if (user.user_role === 'student') {
      setHomepage('/sdashboard')
    }
    else {
      setHomepage('/dashboard')
    }
    setCurrentUser(user);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const payload = {
        old_password: pwd.old_password,
        new_password: pwd.new_password,
        user_id: currentUser.id,
      };

      const res = await change_password(payload);

      console.log(res)
      res.data.resp_code === '000' ? showToast('success', res.data.resp_desc) : showToast('error', res.data.resp_desc)
    } catch (err) {
      showToast("error", "Error changing password");
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
            prevLink={homepage}
          />
        </div>
       <div className="w-full flex justify-center">
       <form onSubmit={handleSubmit} className="pt-5 md:pt-16 w-full md:w-1/2">
          <label className="block text-sm">
            <span className="text-gray-400 font-semibold">Old Password</span>
            <input
              type="password"
              value={pwd.old_password}
              required
              onChange={(e) => setPwd({ ...pwd, old_password: e.target.value })}
              className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
            />
          </label>
          <label className="block mt-4 text-sm">
            <span className="text-gray-400 font-semibold">New Password</span>
            <input
              type="password"
              value={pwd.newpassword}
              onChange={(e) => setPwd({ ...pwd, new_password: e.target.value })}
              className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
              type="password"
              minLength="8"
              required
            />
          </label>

          <button
            type="submit"
            className="block w-full px-4 py-3 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
          >
            Change Password
          </button>
        </form>
       </div>
      </div>
    </Fragment>
  );
};

export default ChangePassword;
