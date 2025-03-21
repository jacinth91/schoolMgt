import { useState } from "react";
import QuickViewModal from "./QuickViewModal";
import "./productList.css";

const mockBundles = [
  {
    id: 1,
    name: "Grade 5 Stationery Kit",
    grade: 5,
    price: 1500,
    image:
      "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742542815/samples/shoe.jpg",
    items: ["Notebooks", "Pens", "Geometry Box"],
  },
  {
    id: 2,
    name: "Art & Craft Kit",
    grade: 4,
    price: 1200,
    image:
      "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742542815/samples/shoe.jpg",
    items: ["Color Pencils", "Sketchbook", "Watercolors"],
  },
  {
    id: 3,
    name: "Science Experiment Kit",
    grade: 6,
    price: 2000,
    image:
      "https://res.cloudinary.com/dwgfx9feh/image/upload/v1742542815/samples/shoe.jpg",
    items: ["Magnets", "Test Tubes", "Chemicals"],
  },
];

export default function ProductListing() {
  const [bundles, setBundles] = useState(mockBundles);
  const [sortOrder, setSortOrder] = useState("default");
  const [search, setSearch] = useState("");
  const [selectedBundle, setSelectedBundle] = useState(null);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    let sortedBundles = [...bundles];
    if (order === "price-low-high") {
      sortedBundles.sort((a, b) => a.price - b.price);
    } else if (order === "price-high-low") {
      sortedBundles.sort((a, b) => b.price - a.price);
    }
    setBundles(sortedBundles);
  };

  const filteredBundles = bundles.filter((bundle) =>
    bundle.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
        <input
          type="text"
          placeholder="Search bundles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mb-2 mb-md-0 w-100 w-md-75"
        />
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

      <div className="row g-4">
        {filteredBundles.map((bundle) => (
          <div key={bundle.id} className="col-12 col-sm-6 col-md-4">
            <div className="card product-card shadow-sm border-0 h-100">
              <div className="position-relative">
                <img
                  src={bundle.image}
                  className="card-img-top"
                  alt={bundle.name}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
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
                <h5 className="card-title fw-bold">{bundle.name}</h5>
                <p className="text-muted mb-1">Grade: {bundle.grade}</p>
                <p className="small">Includes: {bundle.items.join(", ")}</p>
                <p className="fw-bold text-primary fs-5">₹{bundle.price}</p>

                <button className="btn btn-outline-primary mt-auto">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedBundle && (
        <QuickViewModal
          bundle={selectedBundle}
          onClose={() => setSelectedBundle(null)}
        />
      )}
    </div>
  );
}
