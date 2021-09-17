import { Fragment, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { get_all_classes, get_all_teachers } from "../../api/teacher";
import BreadCrumb from "../../components/breadcrumb";
import { showToast } from "../../components/helpers";
import { Button, Input, Select } from "../../components/input";
import Modal from "../../components/modal";
import Navbar from "../../components/navbar";

import { ModalContext } from "../../contexts/modalContext";
import { addGuardianController } from "../../controllers/guardianController";
import { addStudentController } from "../../controllers/studentController";
import SideBar from "../../components/sidebar";

const AddStudent = () => {
  const { open, open_modal, close_modal } = useContext(ModalContext);
  const router = useRouter();

  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    age: "",
    teacher: "",
    class: "",
    gender: "",
    guardian_1: "",
    guardian_2: "",
    extra_curricular_activities: "",
  });

  const [guardian, setGuardian] = useState({
    email: "",
    phone: "",
    firstname: "",
    lastname: "",
  });

  const [currentModal, setCurrentModal] = useState("1");
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(async () => {
    try {
      const tempTeach = await get_all_teachers();
      const tempClass = await get_all_classes();

      // teachers
      if (tempTeach.status === 200) {
        const temp = [];
        tempTeach.data.map((teacher) => {
          temp.push({
            key: `${teacher.firstname} ${teacher.lastname}`,
            value: teacher.id,
          });
        });
        setTeachers(temp);
      }

      // classes
      if (tempClass.status === 200) {
        const temp = [];
        tempClass.data.map((clss) => {
          temp.push({ key: clss.title, value: clss.id });
        });
        setClasses(temp);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const openGuardianModal = (fieldID) => {
    // keep track of which field is being filled (guardian 1 or guardian 2)
    setCurrentModal(fieldID);
    open_modal();
  };

  const GENDER = [
    { key: "Male", val: "M" },
    { key: "Female", val: "F" },
  ];

  const handleStudentSubmit = async (e) => {
      console.log(student)
    e.preventDefault();
    try {
      const res = await addStudentController(student);
      res.status === 200 &&
        (router.replace("/students"),
        showToast(
          "success",
          `${student.firstname} ${student.lastname} added successfully`
        ));
    } catch (err) {
      showToast("error", err.message);
    }
  };

  const handleGuardianSubmit = async (e) => {
    e.preventDefault();

    // call controller to add guardian
    const res = await addGuardianController(guardian);
    res.status === 200 &&
      // show toast is successful
      showToast("success", "Guardian added successfully"),
      // empty form fields
      setGuardian({ email: "", phone: "", firstname: "", lastname: "" }),
      // set student guardian with email from response
      currentModal === "1"
        ? setStudent({ ...student, guardian_1: res.data.user.email })
        : setStudent({ ...student, guardian_2: res.data.user.email })

    close_modal();
  };

  return (
    <Fragment>
      {/* modal */}
      {open && (
        <Modal open={open} title="Add Guardian">
          <form onSubmit={handleGuardianSubmit}>
            <div className="grid grid-cols gap-6 py-5">
              {/* modal email */}
              <Input
                label="Guardian Email"
                placeholder="Enter Guardian Email"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
                value={guardian.email}
                onChange={(e) =>
                  setGuardian({ ...guardian, email: e.target.value })
                }
              />

              {/* modal phone */}
              <Input
                label="Guardian Phone"
                placeholder="Enter Guardian Phone"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.924 2.617a.997.997 0 00-.215-.322l-.004-.004A.997.997 0 0017 2h-4a1 1 0 100 2h1.586l-3.293 3.293a1 1 0 001.414 1.414L16 5.414V7a1 1 0 102 0V3a.997.997 0 00-.076-.383z" />
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                }
                value={guardian.phone}
                onChange={(e) =>
                  setGuardian({ ...guardian, phone: e.target.value })
                }
              />

              {/* modal firstname */}
              <Input
                label="Guardian Firstname"
                placeholder="Enter Guardian Firstname"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                value={guardian.firstname}
                onChange={(e) =>
                  setGuardian({ ...guardian, firstname: e.target.value })
                }
              />

              {/* modal lastname */}
              <Input
                label="Guardian Lastname"
                placeholder="Enter Guardian Lastname"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                value={guardian.lastname}
                onChange={(e) =>
                  setGuardian({ ...guardian, lastname: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end">
              {/* modal button */}
              <Button
                btnText="Add Guardian"
                color="blue"
                textColor="white"
                type="submit"
              />
            </div>
          </form>
        </Modal>
      )}
      <Navbar />
      <div className="container">
        <SideBar menu="students" />
        <BreadCrumb
          currentPage="Add Student"
          prevPage="Students"
          prevLink="/students"
        />
        <div>
          <form
            className="form mb-10 p-10 border rounded-lg bg-gray-50 shadow-sm"
            onSubmit={handleStudentSubmit}
          >
            <p className="text-gray-400 font-bold">Add Student</p>
            <div className="grid grid-cols lg:grid-cols-2 gap-6 py-5">
              {/* student firstname */}
              <Input
                label="Firstname"
                placeholder="Enter Firstname"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                value={student.firstname}
                onChange={(e) =>
                  setStudent({ ...student, firstname: e.target.value })
                }
              />

              {/* student lastname */}
              <Input
                label="Lastname"
                placeholder="Enter Lastname"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
                value={student.lastname}
                onChange={(e) =>
                  setStudent({ ...student, lastname: e.target.value })
                }
              />

              {/* student Age */}
              <Input
                label="Age"
                placeholder="Enter Age"
                type="number"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                value={student.age}
                onChange={(e) =>
                  setStudent({ ...student, age: e.target.value })
                }
              />

              {/* student gender */}
              <Select
                label="Gender"
                value={student.gender}
                placeholder="Gender"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
                options={GENDER}
                onChange={(e) =>
                  setStudent({ ...student, gender: e.target.value })
                }
              />

              {/* student teacher */}
              <Select
                label="Teacher"
                value={student.teacher}
                placeholder="Teacher"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
                options={teachers}
                onChange={(e) =>
                  setStudent({ ...student, teacher: e.target.value })
                }
              />

              {/* Student Class */}
              <Select
                label="Class"
                value={student.class}
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
                  setStudent({ ...student, class: e.target.value })
                }
              />

              <Input
                label="Guardian 1"
                placeholder="Guardian 1 Email"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
                trailingIcon={
                  <button onClick={() => openGuardianModal("1")} type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                }
                value={student.guardian_1}
                onChange={(e) =>
                  setStudent({ ...student, guardian_1: e.target.value })
                }
              />

              <Input
                label="Guardian 2 (Optional)"
                placeholder="Guardian 2 Email"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
                trailingIcon={
                  <button onClick={() => openGuardianModal("2")} type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                }
                value={student.guardian_2.email}
                onChange={(e) =>
                  setStudent({ ...student, guardian_2: e.target.value })
                }
              />

              <div className="col-span-2">
                <label htmlFor="">Extra Curricular Activities</label>
                <textarea
                  cols="30"
                  rows="5"
                  className="block w-full pl-10 py-4 rounded mt-1 text-sm border text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input"
                  value={student.extra_curricular_activities}
                  onChange={(e) =>
                    setStudent({
                      ...student,
                      extra_curricular_activities: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end">
              {/* Student Button */}
              <Button
                btnText="Add Student"
                color="blue"
                textColor="white"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddStudent;
