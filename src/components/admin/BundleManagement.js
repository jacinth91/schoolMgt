import React, { useEffect, useState, useMemo } from "react";
import FullPageSpinner from "../layout/FullPageSpinner";
import { fetchAllBundles } from "../../actions/product";
import QuickViewModal from "../parenPortal/products/QuickViewModal";

const BundleManagement = () => {
  const [bundles, setBundles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const getBundles = async () => {
      setLoading(true);
      try {
        const response = await fetchAllBundles();
        setBundles(Array.isArray(response) ? response : []);
      } catch (error) {
        setBundles([]);
      } finally {
        setLoading(false);
      }
    };
    getBundles();
  }, []);

  const filteredBundles = useMemo(() => {
    return bundles.filter((bundle) =>
      bundle.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bundles, searchTerm]);

  const totalPages = Math.ceil(filteredBundles.length / itemsPerPage);
  const paginatedBundles = filteredBundles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const transformBundle = (bundle) => {
    return {
      bundle_id: bundle.id,
      bundle_name: bundle.name,
      gender: bundle.gender,
      image: bundle.image,
      applicable_classes: bundle.applicableClasses,
      class_name: bundle.applicableClasses.split(", ")[0],
      bundle_total: parseFloat(bundle.totalPrice),
      products: bundle.bundleProducts.map((bp) => ({
        product_id: bp.product.id,
        product_name: bp.product.name,
        unit_price: parseFloat(bp.product.unitPrice),
        quantity: bp.quantity,
        optional: bp.optional,
      })),
    };
  };

  const onView = (bundle) => {
    setSelectedBundle(transformBundle(bundle));
  };

  return loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
    <div className="container py-4">
      <h2>Bundle Management</h2>
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
            <th>Gender</th>
            <th>Suitable Classes</th>
            <th>Student Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBundles.length > 0 ? (
            paginatedBundles.map((bundle) => (
              <tr key={bundle.id}>
                <td>{bundle.id}</td>
                <td>{bundle.name}</td>
                <td>{bundle.gender}</td>
                <td>{bundle.applicableClasses}</td>
                <td>{bundle.studentType}</td>
                <td>{bundle.totalPrice}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => onView(bundle)}
                  >
                    <em className="bi bi-eye" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No bundles found.
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
      {selectedBundle && (
        <QuickViewModal
          bundle={selectedBundle}
          onClose={() => setSelectedBundle(null)}
          showAction={false}
        />
      )}
    </div>
  );
};

export default BundleManagement;
