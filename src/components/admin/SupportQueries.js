import React, { useEffect, useState, useMemo } from "react";
import FullPageSpinner from "../layout/FullPageSpinner";

const SupportQueries = () => {
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 10;

  useEffect(() => {
    const fetchQueries = async () => {
      setLoading(true);
      try {
        // Simulating API fetch with dummy data
        const response = [
          { id: 1, user: "John Doe", issue: "Login Issue", status: "Open" },
          {
            id: 2,
            user: "Jane Smith",
            issue: "Payment Failure",
            status: "Resolved",
          },
          {
            id: 3,
            user: "Alice Johnson",
            issue: "Bug Report",
            status: "In Progress",
          },
          { id: 4, user: "Bob Brown", issue: "Access Denied", status: "Open" },
        ];
        setQueries(response);
      } catch (error) {
        setQueries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQueries();
  }, []);

  const filteredQueries = useMemo(() => {
    return queries.filter(
      (query) =>
        query.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.issue.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [queries, searchTerm]);

  const totalPages = Math.ceil(filteredQueries.length / queriesPerPage);
  const displayedQueries = filteredQueries.slice(
    (currentPage - 1) * queriesPerPage,
    currentPage * queriesPerPage
  );

  return loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
    <div className="container py-4">
      <h2>Support Queries</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search queries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Issue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {displayedQueries.length > 0 ? (
            displayedQueries.map((query) => (
              <tr key={query.id}>
                <td>{query.id}</td>
                <td>{query.user}</td>
                <td>{query.issue}</td>
                <td>{query.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No queries found.
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

export default SupportQueries;
