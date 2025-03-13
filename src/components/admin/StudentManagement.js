import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const studentsData = [
  { id: 1, name: "John Doe", grade: "5th", section: "A", age: 10 },
  { id: 2, name: "Jane Smith", grade: "6th", section: "B", age: 11 },
  { id: 3, name: "Alice Johnson", grade: "5th", section: "C", age: 10 },
];

const StudentManagement = () => {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Student Management</h2>
        <button className="btn btn-success">
          <i className="bi bi-plus-lg me-2"></i> Add Student
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Section</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.section}</td>
                <td>{student.age}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-warning btn-sm">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteStudent(student.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
