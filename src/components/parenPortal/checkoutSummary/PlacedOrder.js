import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./PlaceOrder.css";
import { toast } from "react-toastify";
import { PAYMENT_MODE } from "../../../utils/constants";
import {
  getCartDetail,
  loadingCartChange,
  orderPlaced,
} from "../../../actions/product";
import FullPageSpinner from "../../layout/FullPageSpinner";

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cartData } = useSelector((state) => ({
    user: state.auth.user,
    cartData: state.product,
  }));
  const method = location.state?.method || "na";

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        dispatch(getCartDetail(user.id));
      } catch (error) {
        toast.error("Failed to load cart items!", { position: "top-right" });
      }
    };
    if (!cartData?.items?.length) {
      fetchCart();
    }
  }, [dispatch, cartData?.items?.length]);

  useEffect(() => {
    if (cartData?.items?.length) {
      const total = cartData.items.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
        0
      );
      const quantity = cartData.items.reduce(
        (acc, item) => acc + (item.quantity || 0),
        0
      );

      setTotalQuantity(quantity);
      setGrandTotal(total);
    } else {
      setTotalQuantity(0);
      setGrandTotal(0);
    }
  }, [cartData?.items]);

  const handlePlaceOrder = () => {
    if (!cartData?.items?.length) {
      toast.warning("Your cart is empty!", { position: "top-right" });
      return;
    }
    dispatch(loadingCartChange(true));
    dispatch(orderPlaced({ parentId: user.id, paymentMethod: method }))
      .then(() => {
        toast.success("Order placed successfully!", { position: "top-right" });
        navigate("/thankyou");
      })
      .catch(() => {
        toast.error(
          "Something went wrong on our end. Please try again later.",
          { position: "top-right" }
        );
      });
  };

  return cartData?.loading ? (
    <FullPageSpinner loading={cartData?.loading} />
  ) : (
    <div className="container py-4">
      <div className="row">
        {/* Left Column - Order Summary */}
        <div className="col-lg-8">
          <div className="mb-3 fs-3">Order Items</div>
          {cartData?.items?.length ? (
            cartData.items.map((item) => (
              <div key={item.bundleId} className="card default-card ">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3 text-center p-2">
                    <img
                      src={item.bundle?.image}
                      className="img-fluid rounded shadow-sm"
                      alt={item.bundle?.name || "Product"}
                      style={{ maxHeight: "120px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title text-dark fw-bold">
                        {item.bundle?.name || "Unknown Product"}
                      </h5>
                      <p className="text-muted">₹{item.price || 0}</p>
                      <p className="small mb-1">
                        <strong>Classes:</strong>{" "}
                        {item.bundle.applicableClasses || "N/A"}
                      </p>
                      <p className="small mb-1">
                        <strong>Gender:</strong>{" "}
                        {item.bundle.gender || "Unisex"}
                      </p>
                      <p className="small mb-1">
                        <strong>Quantity:</strong> {item.quantity || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">Your cart is empty 🛒</p>
          )}
        </div>
        {/* Right Column - Shipping & Payment */}
        <div className="col-lg-4">
          {/* Shipping Details */}
          <div className="fs-3 mb-3">Order Summary</div>
          {/* Payment & Total Summary */}
          <div className="card default-card ">
            <h4 className="mb-3 text-primary">💳 Payment & Shipping</h4>
            <p className="d-flex justify-content-between fw-bold">
              <span>Total Items:</span> <span>{totalQuantity}</span>
            </p>
            <p className="d-flex justify-content-between text-dark">
              <span>Shipping Charges:</span> <span>Free</span>
            </p>
            <p className="d-flex justify-content-between text-dark fw-bold">
              <span>Grand Total:</span>{" "}
              <strong>₹{grandTotal.toFixed(2)}</strong>
            </p>
            <p className="d-flex justify-content-between">
              <span>Payment Mode:</span>
              <strong>{PAYMENT_MODE[method] || "Credit Card"}</strong>
            </p>
            <hr />
            <div className="fs-5 shipping-title">Shipping details</div>
            <p className=" mb-1">{user?.parentName}</p>
            <p className="shipping-details">
              {user?.address || "No address provided"}
            </p>
            <hr />

            <button
              className="btn btn-primary w-100 mt-3 text-white"
              onClick={handlePlaceOrder}
              disabled={!cartData?.items?.length}
            >
              🛍️ Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
