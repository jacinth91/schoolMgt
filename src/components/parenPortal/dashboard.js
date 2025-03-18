import React, { useState } from "react";
import TopSellingProducts from "./TopSellingProduct";
import "./dashboard.css";
import { loadStudentDetail } from "../../actions/student";
import FullPageSpinner from "../layout/FullPageSpinner";

const Dashboard = () => {
  const [stuId, setStuId] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  const onStudentSearch = async () => {
    // setShowStuDetail(true);
    if (stuId.length) {
      setLoading(true);
      const response = await loadStudentDetail(stuId);
      setLoading(false);
      setStudent(response);
      setShowDetail(true);
    }
  };

  const addStudentToParent = () => {
    setShowDetail(false);
    setStuId("");
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Banner */}

      {/* Dashboard Content */}
      <div className="container">
        <div>
          <div className="row">
            <div className="col-md-12">
              <div className="mt-4">
                <div className="search-child-box w-50 mx-auto">
                  <p className="mb-2">Enrollment No. / Admission Number:</p>
                  <div className="row">
                    <div className="col-md-9">
                      <input
                        type="text"
                        placeholder="Student enrollment no."
                        value={stuId}
                        onChange={(e) => setStuId(e.target.value)}
                      />
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-primary mt-1"
                        onClick={() => onStudentSearch()}
                      >
                        Search <em className="bi-search ps-2"></em>
                      </button>
                    </div>
                  </div>
                  {loading && <FullPageSpinner loading={loading} />}
                  {showDetail && (
                    <div className="mt-2">
                      <strong>Enrollment ID: </strong> {student?.usid}
                      <div>
                        <strong>Student Name: </strong>
                        {student?.studentName}
                      </div>
                      <div>
                        <strong>Grade: </strong>
                        {student?.class}
                      </div>
                      <div>
                        <strong>Section: </strong>
                        {student?.section}
                      </div>
                      <div>
                        <strong>House: </strong>
                        {student?.house}
                      </div>
                      <div>
                        <strong>Campus: </strong>
                        {student?.campus}
                      </div>
                      <div>
                        <strong>Gender: </strong>
                        {student?.gender}
                      </div>
                      <div className="text-center">
                        <button
                          className="btn btn-success mt-5 mx-auto"
                          onClick={() => addStudentToParent()}
                        >
                          Add Child<em className="bi-plus ps-2"></em>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4">
            <div className="row">
              <div className="col-md-6">
                <TopSellingProducts category={"Regular Uniform"} />
              </div>
              <div className="col-md-6">
                <TopSellingProducts category={"Sports Uniform"} />
              </div>
              <div className="col-md-6">
                <TopSellingProducts category={"Accessories"} />
              </div>
              <div className="col-md-6">
                <TopSellingProducts category={"Sportopia"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
