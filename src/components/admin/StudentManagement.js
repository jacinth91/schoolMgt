import React, { useEffect, useState, useMemo } from "react";
import {
  createStudent,
  deleteStudent,
  fetchALLStudent,
  updateStudentDetail,
} from "../../actions/student";
import FullPageSpinner from "../layout/FullPageSpinner";
import PopupDialog from "../layout/PopupDialog";
import { reverseTransform, transform } from "../../services/helper";
import ConfirmModal from "../layout/ConfirmModal";
import {
  boardingStatusList,
  campusList,
  classList,
  genderList,
  houseList,
  sectionList,
  studentTypeList,
} from "../../utils/constants";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedId, setSelectedId] = useState();
  const [showConfirm, setShowConfirm] = useState(false);

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

  const admissionYears = Array.from({ length: 11 }, (_, i) => {
    const year1 = 2015 + i;
    const year2 = year1 + 1;
    return { key: `${year1}-${year2}`, label: `${year1}-${year2}` };
  });

  const addStudentClick = () => {
    const dropdownData = {
      boardingStatus: boardingStatusList,

      gender: genderList,

      studentType: studentTypeList,
      house: houseList,
      class: classList,
      section: sectionList,
      campus: campusList,
    };

    const data = [
      {
        label: "USID",
        value: "",
        editable: true,
        options: null,
      },
      {
        label: "Student Name",
        value: "",
        editable: true,
        options: null,
      },
      {
        label: "Student Type",
        value: "",
        editable: true,
        options: dropdownData.studentType,
      },
      {
        label: "Admission Year",
        value: "",
        editable: true,
        options: admissionYears,
      },
      {
        label: "Boarding Status",
        value: "",
        editable: true,
        options: dropdownData.boardingStatus,
      },
      {
        label: "Gender",
        value: "",
        editable: true,
        options: dropdownData.gender,
      },
      {
        label: "Campus",
        value: "",
        editable: true,
        options: dropdownData.campus,
      },
      {
        label: "Class",
        value: "",
        editable: true,
        options: dropdownData.class,
      },
      {
        label: "Section",
        value: "",
        editable: true,
        options: dropdownData.section,
      },
      {
        label: "Address",
        value: "",
        editable: true,
        options: null,
      },
      {
        label: "House",
        value: "",
        editable: true,
        options: dropdownData.house,
      },
    ];
    setSelectedId(null);
    setSelectedRow(data);
    setShowPopup(true);
  };

  const onDeleteClick = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const deleteConfirmClick = async () => {
    setLoading(true);
    await deleteStudent(selectedId);
    setShowConfirm(false);
    setLoading(false);
    setStudents(students.filter((student) => student.id !== selectedId));
    setSelectedId(null);
  };

  const onEditStudentClick = (data) => {
    const nonEditableFields = ["usid"];
    const skipKeys = ["id"];
    const dropdownData = [
      {
        boardingStatus: boardingStatusList,
      },
      {
        gender: genderList,
      },
      {
        studentType: studentTypeList,
      },
      { admissionYear: admissionYears },
      { house: houseList },
      { class: classList },
      { section: sectionList },
      { campus: campusList },
    ];
    setSelectedId(data.usid);
    const result = transform(data, skipKeys, nonEditableFields, dropdownData);
    setSelectedRow(result);
    setShowPopup(true);
  };

  const handleSave = async (updatedData) => {
    try {
      setLoading(true);
      setSelectedRow(updatedData);
      const apiBody = reverseTransform(selectedRow);
      if (selectedId) {
        const response = await updateStudentDetail(apiBody, selectedId);
        if (response.success) {
          setStudents((prevStudents) =>
            prevStudents.map((student) =>
              student.id === response.student.id ? response.student : student
            )
          );
        }
      } else {
        const newStudent = await createStudent(apiBody);
        setStudents([...students, newStudent]);
      }
    } catch (error) {
      setSelectedId(null);
    } finally {
      setShowPopup(false);
      setLoading(false);
    }
  };

  // ✅ Correcting the filter function
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const nameMatch = student.studentName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const usidMatch = student.usid
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return nameMatch || usidMatch;
    });
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
      <button
        className="btn btn-success mb-3 float-end"
        onClick={() => {
          addStudentClick();
        }}
      >
        Add Student
      </button>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="w-100 overflow-x-auto">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>USID</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Section</th>
              <th>House</th>
              <th>Gender</th>
              <th>Actions</th>
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
                  <td>{student.house}</td>
                  <td>{student.gender}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onEditStudentClick(student)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeleteClick(student.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
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
      </div>

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
      {showPopup && (
        <PopupDialog
          data={selectedRow}
          onSave={handleSave}
          onCancel={() => setShowPopup(false)}
          header={"Edit Student"}
        />
      )}
      <ConfirmModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={deleteConfirmClick}
        message="Are you sure you want to delete this student?"
      />
    </div>
  );
};

export default StudentManagement;
