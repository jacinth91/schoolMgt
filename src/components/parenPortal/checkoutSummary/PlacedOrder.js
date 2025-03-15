import React from "react";

const PlacedOrder = () => {
  const orderDetails = {
    shippingAddress:
      "DPS High School, Plot No: A-345, Behind Nexus Mall, KPHB, Kukatpally, Hyderabad, Telangana",
    paymentMethod: "Cash on Delivery (COD)",
    items: [
      {
        name: "DPS White Shirt Full Sleeve",
        size: 30,
        quantity: 1,
        price: 378,
        total: 378,
      },
    ],
    itemTotal: 378,
    shippingCost: 100,
    gst: 0,
    total: 478,
  };

  const handlePlaceOrder = () => {
    // API call to place the order
    // fetch("/api/place-order", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(orderDetails),
    // })
    // .then(response => response.json())
    // .then(data => console.log("Order Placed", data))
    // .catch(error => console.error("Error placing order", error));
  };

  return (
    <div className="container my-4">
      <div className="row">
        {/* Shipping Details */}
        <div className="col-md-8 border p-3">
          <h5 className="text-primary">Shipping Details</h5>
          <p>{orderDetails.shippingAddress}</p>

          <h5 className="text-primary mt-3">Payment Method</h5>
          <p>Method: {orderDetails.paymentMethod}</p>

          <h5 className="text-primary mt-3">Order Items</h5>
          {orderDetails.items.map((item, index) => (
            <p key={index}>
              {item.name} - Size: {item.size} - {item.quantity} x ₹{item.price}{" "}
              = ₹{item.total}
            </p>
          ))}
        </div>

        {/* Order Summary */}
        <div className="col-md-4 border p-3">
          <h5 className="text-primary">Order Summary</h5>
          <p>Items: ₹{orderDetails.itemTotal}</p>
          <p>Shipping: ₹{orderDetails.shippingCost}</p>
          {orderDetails.itemTotal < 378 && (
            <small className="text-danger">
              Free Shipping on orders above ₹378. Add items worth ₹
              {378 - orderDetails.itemTotal} for free delivery.
            </small>
          )}
          <p>GST: ₹{orderDetails.gst}</p>
          <hr />
          <h6>Total: ₹{orderDetails.total}</h6>
          <button className="btn btn-success w-100" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacedOrder;
