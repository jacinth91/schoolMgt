import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import {
  addToCart,
  deleteCartItem,
  getCartDetail,
} from "../../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import FullPageSpinner from "../../layout/FullPageSpinner";

const fallbackImage =
  "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742726808/WhatsApp_Image_2025-03-22_at_11.55.58_AM_1_ekrabi.jpg";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cartData } = useSelector((state) => ({
    user: state.auth.user,
    cartData: state.product,
  }));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        dispatch(getCartDetail(user.id));
      } catch (error) {
        toast.error("Failed to load cart items!", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    if (cartData?.items?.length) {
      const total = cartData.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const quantity = cartData.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      setTotalPrice(total);
      setTotalQuantity(quantity);
    } else {
      setTotalPrice(0);
      setTotalQuantity(0);
    }
  }, [cartData?.items]);

  const handleQuantityChange = (bundleId, quantity) => {
    if (quantity < 1) {
      handleRemove(bundleId);
    } else {
      const body = {
        bundleId: bundleId,
        quantity: quantity,
        parentId: user.id,
      };
      setLoading(true);
      dispatch(addToCart(body))
        .then(() => {
          toast.success("Quantity updated!", { position: "top-right" });
        })
        .catch(() => {
          toast.error("Failed to update quantity!", { position: "top-right" });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleRemove = (bundleId) => {
    setLoading(true);

    dispatch(deleteCartItem({ parentId: user.id, bundleId: bundleId }))
      .then(() => {
        toast.info("Item removed from cart!", { position: "top-right" });
      })
      .catch(() => {
        toast.error("Failed to remove item from cart!", {
          position: "top-right",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheckout = () => {
    if (cartData.items.length === 0) {
      toast.warning("Your cart is empty!", { position: "top-right" });
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="container py-4">
      {loading ? (
        <FullPageSpinner loading={loading} />
      ) : !cartData?.items?.length ? (
        <p className="text-muted text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            {cartData.items.map((item) => (
              <div
                key={item.bundleId}
                className="card cart-item mb-3 shadow-lg border-0 rounded"
              >
                <div className="row g-0 align-items-center">
                  <div className="col-md-3 text-center p-2">
                    <img
                      src={item.image || fallbackImage}
                      className="img-fluid rounded shadow-sm"
                      alt={item.bundle?.name}
                      style={{ maxHeight: "120px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title text-dark fw-bold">
                        {item.bundle?.name}
                      </h5>
                      <p className="text-muted">₹{item.price}</p>
                      <p className="small mb-1">
                        <strong>Classes:</strong>{" "}
                        {item.bundle.applicableClasses || "N/A"}
                      </p>
                      <p className="small mb-1">
                        <strong>Gender:</strong>{" "}
                        {item.bundle.gender || "Unisex"}
                      </p>
                      <p className="small mb-2">
                        <strong>Type:</strong>{" "}
                        {item.bundle.studentType || "Existing"}
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary rounded-circle px-3"
                          onClick={() =>
                            handleQuantityChange(
                              item.bundleId,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span className="mx-2 fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-primary rounded-circle px-3"
                          onClick={() =>
                            handleQuantityChange(
                              item.bundleId,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 text-end pe-3">
                    <button
                      className="btn btn-outline-danger rounded-pill px-4"
                      onClick={() => handleRemove(item.bundleId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4">
            <div className="card p-4 shadow-lg border-0 rounded">
              <h4 className="text-center mb-3 text-primary">🛍 Cart Summary</h4>
              <p className="d-flex justify-content-between fw-bold">
                <span>Total Items:</span> <span>{totalQuantity}</span>
              </p>
              <p className="d-flex justify-content-between text-dark fw-bold">
                <span>Total Price:</span> <strong>₹{totalPrice}</strong>
              </p>
              <button
                className="btn btn-success w-100 mt-3 rounded-pill"
                onClick={handleCheckout}
              >
                Proceed to Checkout 🛒
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
