import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { signup } from "../api/base";
import { showToast } from "../components/helpers";
import router, { useRouter } from "next/router";
import { get_all_classes } from "../api/teacher";
import Navbar from "../components/navbar";
import BreadCrumb from "../components/breadcrumb";

const NewTeacher = () => {
  const [classes, setClassess] = useState([]);
  const [user, setUser] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    class: "",
    user_role: "teacher",
    phone: "",
    password: "",
  });

  const getClasses = async () => {
    try {
      const res = await get_all_classes();
      res.status === 200 && setClassess(res.data);
    } catch (err) {
      showToast("error", err.message);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(user);
      res.status === 200
        ? (showToast("success", "Teacher created successfully"), router.replace('/teachers'))
        : showToast("error", "Error creating Teacher");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="container p-5 md:pl-40">
        <div className="flex justify-between">
          <BreadCrumb
            currentPage="Add Teacher"
            prevPage="Teachers"
            prevLink="/teachers"
          />
        </div>
        <form className="space-y-4 w-full md:w-3/4" onSubmit={handleSubmit}>
          <label className="block text-sm">
            <span className="text-gray-400 font-semibold">Email</span>
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                  username: e.target.value,
                })
              }
              className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
              placeholder="teacher@teacher.com"
              required
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-400 font-semibold">Password</span>
            <input
              type="password"
              value={user.password}
              minLength="8"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
              placeholder="***************"
              required
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-400 font-semibold">Firstname</span>
            <input
              value={user.firstname}
              required
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
              placeholder="Jane Doe"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-400 font-semibold">Lastname</span>
            <input
              required
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
              placeholder="Jane Doe"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-400 font-semibold">Phone</span>
            <input
              required
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg"
              placeholder="Jane Doe"
            />
          </label>

          <label className="block text-sm">
            <span className="text-gray-400 font-semibold">Class</span>
            <select className="block w-full mt-1 text-sm border border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-blue-300 focus:ring-2 form-input p-3 rounded-lg">
              <option value="" disabled selected>
                -- Select Class --
              </option>
              {classes.map((clss) => (
                <option key={clss.id} value={clss.id}>
                  {clss.title}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="block w-full px-4 py-3 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue"
          >
            Create Account
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewTeacher;
