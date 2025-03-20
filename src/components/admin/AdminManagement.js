import React, { useEffect, useState, useMemo } from "react";
// import { fetchAllAdmins } from "../../actions/admin";
import FullPageSpinner from "../layout/FullPageSpinner";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  //   useEffect(() => {
  //     const getAdmins = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await fetchAllAdmins();

  //         if (Array.isArray(response) && response.length > 0) {
  //           setAdmins(response);
  //         } else {
  //           setAdmins([]);
  //         }
  //       } catch (error) {
  //         setAdmins([]);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     getAdmins();
  //   }, []);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAdmins([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "Super Admin",
        },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
        {
          id: 3,
          name: "Alice Johnson",
          email: "alice@example.com",
          role: "Admin",
        },
        {
          id: 4,
          name: "Bob Brown",
          email: "bob@example.com",
          role: "Super Admin",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) =>
      admin.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [admins, searchTerm]);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
    <div className="container py-4">
      <h2>Admin Management</h2>

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
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAdmins.length > 0 ? (
            paginatedAdmins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Remove</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No admins found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

export default AdminManagement;
