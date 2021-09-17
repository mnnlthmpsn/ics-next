import { Fragment, useContext, useEffect, useState } from "react";
import { get_student_reports } from "../../../api/student";
import BreadCrumb from "../../../components/breadcrumb";
import { showToast } from "../../../components/helpers";
import Modal from "../../../components/modal";
import Navbar from "../../../components/navbar";
import { ModalContext } from "../../../contexts/modalContext";

const Reports = ({ query }) => {
  const [reports, setReports] = useState([]);
  const { open, open_modal } = useContext(ModalContext);
  const [currentFile, setCurrentFile] = useState("");

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    try {
      const res = await get_student_reports(query.id);
      console.log(res);
      res.status === 200
        ? setReports(res.data)
        : showToast("error", "Sorry an error occured");
    } catch (err) {
      showToast("error", "Sorry an error occured");
    }
  };

  const openMyModal = async (url) => {
    setCurrentFile(url);
    open_modal();
  };

  return (
    <Fragment>
      {open && (
        <Modal>
          <a href={currentFile} target="_blank" rel="noopener noreferrer">
            <img src={currentFile} alt="" className="w-full h-full" />
          </a>
        </Modal>
      )}
      <Navbar />
      <div className="mt-24 mx-5 md:mx-32">
        <BreadCrumb
          currentPage="Reports"
          prevPage="Dashboard"
          prevLink="/pdashboard"
        />
        {reports.length ? (
          reports.map((report) => (
            <div className="border rounded p-5" key={report.id}>
              <div className="flex justify-between items-center">
                <p>{report.file[0].name}</p>
                <button
                  onClick={() => openMyModal(report.file[0].url)}
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
            No report uploaded yet
          </p>
        )}
      </div>
    </Fragment>
  );
};

Reports.getInitialProps = ({ query }) => {
  return { query };
};

export default Reports;
