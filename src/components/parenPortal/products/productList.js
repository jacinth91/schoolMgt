import { useEffect, useState } from "react";
import QuickViewModal from "./QuickViewModal";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchLinkedBundles } from "../../../actions/product";
import FullPageSpinner from "../../layout/FullPageSpinner";
import { toast } from "react-toastify";
import { loadUser } from "../../../actions/auth";

const ProductListing = () => {
  const { user } = useSelector((state) => state.auth);
  const [bundles, setBundles] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [search, setSearch] = useState("");
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({}); // Track selected student for each bundle

  const dispatch = useDispatch();

  const getBundles = async () => {
    if (!user.students?.length) {
      setBundles([]);
      setLoading(false);
      return;
    }

    try {
      const bundleResponses = await Promise.all(
        user.students.map((id, index) => {
          let type =
            user?.studentData[index].boardingStatus === "Yes"
              ? "Hostel"
              : user?.studentData[index]?.studentType;
          return fetchLinkedBundles(id, type);
        })
      );
      setBundles(bundleResponses.flat());
    } catch (error) {
      setBundles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(loadUser());
    getBundles();
  }, [user.students?.length]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    let sortedBundles = [...bundles];

    if (event.target.value === "price-low-high") {
      sortedBundles.sort((a, b) => a.bundle_total - b.bundle_total);
    } else if (event.target.value === "price-high-low") {
      sortedBundles.sort((a, b) => b.bundle_total - a.bundle_total);
    }

    setBundles(sortedBundles);
  };

  const handleStudentChange = (bundleId, studentId) => {
    setSelectedStudent((prev) => ({ ...prev, [bundleId]: studentId }));
  };

  const addToCartClick = async (bundleId, quantity) => {
    const studentId = selectedStudent[bundleId];
    if (!studentId) {
      toast.error("Please select a student before adding to cart.", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    const body = { bundleId, quantity, parentId: user.id, studentId };

    try {
      await dispatch(addToCart(body));
      toast.success("Product added to cart successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to add product to cart.", { position: "top-right" });
    } finally {
      setLoading(false);
      setSelectedBundle(null);
    }
  };

  const filteredBundles = bundles.filter((bundle) =>
    bundle.bundle_name?.toLowerCase().includes(search?.toLowerCase())
  );

  return loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            placeholder="Search bundles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control mb-2 mb-md-0 w-100 w-md-75"
          />
        </div>
        <div className="col-md-4">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="form-select w-100 w-md-25 ms-md-3"
          >
            <option value="default">Sort by</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {filteredBundles.length > 0 ? (
          <div className="row g-4">
            {filteredBundles.map((bundle) => (
              <div key={bundle.bundle_id} className="col-12 col-sm-6 col-md-6">
                <div className="card product-card shadow-sm border-0 h-100">
                  <div className="position-relative">
                    <img
                      src={bundle.image}
                      className="card-img-top"
                      alt={bundle.name}
                      style={{ maxHeight: "350px" }}
                    />
                    <div className="card-img-overlay d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => setSelectedBundle(bundle)}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title fw-bold">{bundle.bundle_name}</h5>
                    <div className="bundle-details">
                      <strong>Designed For:</strong>{" "}
                      <span>{bundle.gender}</span>
                      <strong>Recommended For:</strong>{" "}
                      <span>{bundle.class_name}</span>
                      <strong>Suitable For Classes:</strong>{" "}
                      <span>{bundle.applicable_classes}</span>
                    </div>
                    <p className="fw-bold text-primary fs-5">
                      ₹{bundle.bundle_total}
                    </p>

                    {/* Student Selection (Dropdown) */}
                    {user.studentData.length > 0 && (
                      <div className="student-selection mb-3">
                        <select
                          className="form-select mt-2"
                          value={selectedStudent[bundle.bundle_id] || ""}
                          onChange={(e) =>
                            handleStudentChange(
                              bundle.bundle_id,
                              e.target.value
                            )
                          }
                        >
                          <option value="" disabled>
                            Select Student
                          </option>
                          {user.studentData.map((student) => (
                            <option key={student.id} value={student.id}>
                              {student.studentName}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <button
                      className="btn btn-outline-primary mt-auto"
                      onClick={() => addToCartClick(bundle.bundle_id, 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <h4 className="text-muted">No products found</h4>
          </div>
        )}
      </div>

      {selectedBundle && (
        <QuickViewModal
          bundle={selectedBundle}
          onClose={() => setSelectedBundle(null)}
          onAddToCart={addToCartClick}
          showAction={true}
          user={user}
        />
      )}
    </div>
  );
};

export default ProductListing;
