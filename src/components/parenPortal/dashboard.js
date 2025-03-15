import React, { useState } from "react";
import TopSellingProducts from "./TopSellingProduct";
import "./dashboard.css";

const Dashboard = () => {
  const [stuId, setStuId] = useState();
  const [showStuDetail, setShowStuDetail] = useState(false);

  const onStudentSearch = () => {
    setShowStuDetail(true);
  };

  const addStudentToParent = () => {
    setShowStuDetail(false);
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
                  {showStuDetail && (
                    <div>
                      <span>Enrollment ID: SCD123</span>
                      <div>
                        <strong>John Smith</strong>
                      </div>
                      <div>
                        <strong>1st Grade</strong>
                      </div>
                      <div>
                        <strong>A Section</strong>
                      </div>
                      <div>
                        <strong>House Red</strong>
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
