import React, { useState } from "react";

const OrderHistory = () => {
  const initialOrders = [
    {
      id: "OD-1",
      product: "Shirt",
      quantity: 2,
      payment: "UPI",
      date: "12-2-2024",
    },
    {
      id: "OD-2",
      product: "Trouser",
      quantity: 1,
      payment: "Net Banking",
      date: "22-6-2024",
    },
    {
      id: "OD-3",
      product: "Belt",
      quantity: 5,
      payment: "Debit Card",
      date: "06-9-2024",
    },
    {
      id: "OD-4",
      product: "Shoe",
      quantity: 1,
      payment: "Credit Card",
      date: "11-1-2025",
    },
    {
      id: "OD-5",
      product: "Suite",
      quantity: 1,
      payment: "Paypal",
      date: "18-2-2025",
    },
    {
      id: "OD-6",
      product: "Shirt",
      quantity: 2,
      payment: "UPI",
      date: "12-2-2024",
    },
    {
      id: "OD-7",
      product: "Trouser",
      quantity: 1,
      payment: "Net Banking",
      date: "22-6-2024",
    },
    {
      id: "OD-8",
      product: "Belt",
      quantity: 5,
      payment: "Debit Card",
      date: "06-9-2024",
    },
    {
      id: "OD-9",
      product: "Shoe",
      quantity: 1,
      payment: "Credit Card",
      date: "11-1-2025",
    },
    {
      id: "OD-10",
      product: "Suite",
      quantity: 1,
      payment: "Paypal",
      date: "18-2-2025",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [sortOrder, setSortOrder] = useState("Latest");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sortedOrders = [...orders].sort((a, b) => {
      return order === "Latest"
        ? new Date(b.date.split("-").reverse().join("-")) -
            new Date(a.date.split("-").reverse().join("-"))
        : new Date(a.date.split("-").reverse().join("-")) -
            new Date(b.date.split("-").reverse().join("-"));
    });
    setOrders(sortedOrders);
  };

  return (
    <div className="container mt-4 pb-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-primary fw-bold">Order History</h5>
        <div className="d-flex">
          {/* Sorting Dropdown */}
          <select
            className="form-select me-2"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Order Table */}
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>Products Ordered</th>
            <th>Quantity</th>
            <th>Payment Method</th>
            <th>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, itemsPerPage).map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.payment}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Dropdown */}
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex w-25 float-end mt-2">
            <select
              className="form-select"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5 Products Per Page</option>
              <option value={10}>10 Products Per Page</option>
              <option value={20}>20 Products Per Page</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
