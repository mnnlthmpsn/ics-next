import { Fragment, useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Link from 'next/link'
import { get_my_details, get_particular_student } from "../../api/base";

const StudentDashboard = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [profile, setProfile] = useState([]);

  const getCurrentUser = async () => {
    try {
      const res = await get_my_details()
      setCurrentUser(res.data);

      const stud = await get_particular_student(res.data.id)
      console.log(stud.data[0])
      setProfile(stud.data[0])
    } catch (err) {
      // an err occured
    }
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
          Student View
        </p>
        <Link href='/change-password'><p className="text-blue-400 hover:underline cursor-pointer">Change Password</p></Link>
        </div>
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
                    {profile.firstname} {profile.lastname}
                  </p>
                </div>

                {/* class */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 font-bold">Class:</p>
                  <p className="pl-2">{profile.clss?.title}</p>
                </div>

                {/* Age */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 font-bold">Age:</p>
                  <p className="pl-2">{profile.age} yrs</p>
                </div>

                {/* Age */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-400 font-bold">Activities:</p>
                  <p className="pl-2">{profile.extra_curricular_activities}</p>
                </div>
              </div>
              <div className="pl-5">
                <p className="text-xl text-gray-400 font-bold text-right">Actions</p>
                <div className="flex space-x-4 justify-end">
                    <button type='button' className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white duration-150 bg-green-400 border border-transparent rounded-lg active:bg-green-500 hover:bg-green-500 focus:outline-none focus:shadow-outline-green">
                        <Link href={`/pdashboard/reports/${profile.id}`}>Reports</Link>
                    </button>
                    <button type='button' className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue">
                        <Link href={`/pdashboard/assignments/${profile.clss?.id}`}>Assignments</Link>
                    </button>
                    <button type='button' className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-yellow-500 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-yellow">
                        <Link href={`/sdashboard/announcements/${profile.clss?.id}`}>Announcements</Link>
                    </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </Fragment>
  );
};

export default StudentDashboard;
