import React, { useEffect, useState, useMemo } from "react";
import FullPageSpinner from "../layout/FullPageSpinner";
// import {  updateOrderStatus } from "../../actions/order";
import { Modal, Button, Form } from "react-bootstrap";
import { fetchAllOrders } from "../../actions/product";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const response = await fetchAllOrders();
        setOrders(Array.isArray(response) ? response : []);
      } catch (error) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order?.parent?.parentName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order?.id?.toString().includes(searchTerm)
    );
  }, [orders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onView = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status); // Set initial status
    setShowModal(true);
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;

    try {
      // await updateOrderStatus(selectedOrder.id, newStatus);
      // setOrders((prevOrders) =>
      //   prevOrders.map((order) =>
      //     order.id === selectedOrder.id
      //       ? { ...order, status: newStatus }
      //       : order
      //   )
      // );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
    <div className="container py-4">
      <h2>Order Management</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by Parent Name or Order ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Parent Name</th>
            <th>Contact Number</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.parent?.parentName}</td>
                <td>{order.parent?.phoneNumber}</td>
                <td>{order.totalPrice}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onView(order)}
                  >
                    <em className="bi bi-eye" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No orders found.
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

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>
                <strong>Order ID:</strong> {selectedOrder.id}
              </p>
              <p>
                <strong>Total Price:</strong> {selectedOrder.totalPrice}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              <hr />
              <h5>Parent Details</h5>
              <p>
                <strong>Name:</strong> {selectedOrder.parent.parentName}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.parent.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.parent.address}
              </p>
              <p>
                <strong>Campus:</strong> {selectedOrder.parent.campus}
              </p>
              <p>
                <strong>Students:</strong>{" "}
                {selectedOrder.parent.students.join(", ")}
              </p>

              {/* Status Update */}
              <hr />
              <h5>Update Status</h5>
              <Form.Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderManagement;
