import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ordersData = [
  {
    id: 1,
    parentName: "John Doe",
    studentName: "Sam Doe",
    totalAmount: 1500,
    date: "2025-03-10",
    status: "Pending",
  },
  {
    id: 2,
    parentName: "Jane Smith",
    studentName: "Emma Smith",
    totalAmount: 2000,
    date: "2025-03-11",
    status: "Completed",
  },
  {
    id: 3,
    parentName: "Alice Johnson",
    studentName: "Jake Johnson",
    totalAmount: 1800,
    date: "2025-03-12",
    status: "Shipped",
  },
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(ordersData);
  const [searchTerm, setSearchTerm] = useState("");

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Order Management</h2>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by Parent or Student Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Parent Name</th>
              <th>Student Name</th>
              <th>Total Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.parentName}</td>
                <td>{order.studentName}</td>
                <td>{order.totalAmount}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
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
                      onClick={() => deleteOrder(order.id)}
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

export default OrderManagement;
