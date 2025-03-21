import React, { useEffect, useState, useMemo } from "react";
import { fetchALLStudent } from "../../actions/student";
import FullPageSpinner from "../layout/FullPageSpinner";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const getStudents = async () => {
      setLoading(true);
      try {
        const response = await fetchALLStudent();

        if (Array.isArray(response) && response.length > 0) {
          setStudents(response);
        } else {
          setStudents([]);
        }
      } catch (error) {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    getStudents();
  }, []);

  // ✅ Correcting the filter function
  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.studentName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
    <div className="container py-4">
      <h2>Student Management</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Section</th>
            <th>Age</th>
            <th>House</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents.length > 0 ? (
            paginatedStudents.map((student) => (
              <tr key={student.usid}>
                <td>{student.usid}</td>
                <td>{student.studentName}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.age}</td>
                <td>{student.house}</td>
                <td>{student.gender}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentManagement;
