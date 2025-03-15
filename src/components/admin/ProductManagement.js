import React, { useState } from "react";

const productsData = [
  {
    id: 1,
    name: "Yellow Jacket",
    size: "S",
    gender: "Male",
    price: 500,
    house: "Red",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "String Skirt",
    size: "M",
    gender: "Male",
    price: 600,
    house: "Green",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "White CC Tee",
    size: "M",
    gender: "Female",
    price: 700,
    house: "Yellow",
    image: "https://via.placeholder.com/50",
  },
];

const ProductManagement = () => {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");

  // Uncomment the following code to fetch products from an API
  /*
  useEffect(() => {
    fetch("/api/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);
  */

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product Management</h2>
        <button className="btn btn-success">
          <i className="bi bi-plus-lg me-2"></i> Add Product
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Size</th>
              <th>Gender</th>
              <th>Price</th>
              <th>House</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.size}</td>
                <td>{product.gender}</td>
                <td>{product.price}</td>
                <td>{product.house}</td>
                <td>
                  <img src={product.image} alt={product.name} width="50" />
                </td>
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
                      onClick={() => deleteProduct(product.id)}
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

export default ProductManagement;
