import { Fragment, useEffect, useState } from "react";
import { get_students_for_parent } from "../../api/guardian";
import Navbar from "../../components/navbar";
import Link from 'next/link'

const ParentDashboard = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [students, setStudents] = useState([]);

  const getCurrentUser = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      getStudents(user.id);
      setCurrentUser(user);
    } catch (err) {
      // an err occured
    }
  };

  const getStudents = async (id) => {
    const res = await get_students_for_parent(id);
    setStudents(res.data);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="mt-24 space-y-4">
        <div className="flex justify-between items-center mx-5 md:mx-32">
        <p className="font-bold text-3xl text-gray-400">
          Parent View
        </p>
        <Link href='/change-password'><p className="text-blue-400 hover:underline cursor-pointer">Change Password</p></Link>
        </div>
        {students.map((student) => (
          <div className="border p-5 mx-5 md:mx-32 rounded">
            <div className="grid md:grid-cols-2 divide-x">
              <div className="border-r pr-5">
                <p className="text-xl text-gray-400 font-bold">
                  Student Details
                </p>
                {/* name */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 font-bold">Name:</p>
                  <p className="pl-2">
                    {student.firstname} {student.lastname}
                  </p>
                </div>

                {/* class */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 font-bold">Class:</p>
                  <p className="pl-2">{student.clss.title}</p>
                </div>

                {/* Age */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 font-bold">Age:</p>
                  <p className="pl-2">{student.age} yrs</p>
                </div>

                {/* Age */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 font-bold">Activities:</p>
                  <p className="pl-2">{student.extra_curricular_activities}</p>
                </div>
              </div>
              <div className="pl-5">
                <p className="text-xl text-gray-400 font-bold text-right">Actions</p>
                <div className="flex space-x-4 justify-end">
                    <button type='button' className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-500 hover:bg-green-500 focus:outline-none focus:shadow-outline-blue">
                        <Link href={`/pdashboard/reports/${student.id}`}>Reports</Link>
                    </button>
                    <button type='button' className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue">
                        <Link href={`/pdashboard/assignments/${student.clss.id}`}>Assignments</Link>
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ParentDashboard;
