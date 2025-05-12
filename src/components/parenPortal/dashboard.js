import React, { useState } from "react";
import "./dashboard.css";
import { linkStudentToParent, loadStudentDetail } from "../../actions/student";
import FullPageSpinner from "../layout/FullPageSpinner";
import { useSelector } from "react-redux";
import ProductCarousel from "./ProductCarousel";
import { toast } from "react-toastify";
import { ROLES } from "../../utils/constants";

const Dashboard = () => {
  const [stuId, setStuId] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const onStudentSearch = async () => {
    // setShowStuDetail(true);
    if (stuId.length) {
      setLoading(true);
      const response = await loadStudentDetail(stuId);
      if (response.statusCode === 404) {
        toast.error(response.message, { position: "top-right" });
        setShowDetail(false);
      } else {
        setStudent(response);
        setShowDetail(true);
      }
      setLoading(false);
    } else {
      toast.error("Enter valid USID.", { position: "top-right" });
    }
  };

  const addStudentToParent = async () => {
    setLoading(true);
    const response = await linkStudentToParent({ stuId, parentId: user.id });
    if ([404, 400, 500].includes(response.statusCode)) {
      toast.error(response.message, { position: "top-right" });
    } else {
      setShowDetail(false);
      setStuId("");
      toast.success("Child added successfully!", { position: "top-right" });
    }
    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Banner */}

      {/* Dashboard Content */}
      <div className="container">
        <div>
          {user.role === ROLES.PARENT && (
            <div className="row">
              <div className="col-md-12">
                <div className="mt-4">
                  <div className="search-child-box w-50 mx-auto">
                    <p className="mb-2">Student USID:</p>
                    <div className="row">
                      <div className="col-md-9">
                        <input
                          type="text"
                          placeholder="Student USID."
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
                        <strong>USID: </strong> {student?.usid}
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
          )}
          {/* <div className="mt-4 pt-4">
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
          </div> */}
          <div className="my-4 pt-4 row">
            <h4 className="col-md-12 mb-4 text-primary">
              School Uniform Essentials
            </h4>
            <ProductCarousel type="bundle" />
          </div>
          {/* <div className="my-4 pt-4 row">
            <h4 className="col-md-12 mb-4 text-primary">Gallery</h4>
            <ProductCarousel type="gallery" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
