import React, { useEffect, useState, useMemo } from "react";
import FullPageSpinner from "../layout/FullPageSpinner";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // useEffect to fetch product data from API (commented out for now)
  /*useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchAllProducts();
        setProducts(Array.isArray(response) ? response : []);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);*/

  // Dummy data for now
  useEffect(() => {
    setProducts([
      {
        id: 1,
        productName: "Notebook",
        category: "Stationery",
        price: 50,
        stock: 100,
      },
      {
        id: 2,
        productName: "Pencil",
        category: "Stationery",
        price: 10,
        stock: 200,
      },
      {
        id: 3,
        productName: "Backpack",
        category: "Accessories",
        price: 1200,
        stock: 50,
      },
      {
        id: 4,
        productName: "Water Bottle",
        category: "Accessories",
        price: 300,
        stock: 80,
      },
      {
        id: 5,
        productName: "Pen",
        category: "Stationery",
        price: 20,
        stock: 150,
      },
    ]);
  }, []);

  // ✅ Filtering products based on search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return loading ? (
    <FullPageSpinner loading={loading} />
  ) : (
    <div className="container py-4">
      <h2>Product Management</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
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

export default ProductManagement;
