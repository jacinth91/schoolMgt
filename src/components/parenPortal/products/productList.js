import { Search } from "lucide-react";
import { useState } from "react";

import "../styles/productList.css";
import ProductSlider from "./productListSlider";

const ProductList = ({ products, categories, showSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="product-container">
      {/* Search Bar */}
      {showSearch && (
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Category Sliders */}
      <div className="category-section">
        {categories.map((category) => (
          <ProductSlider
            key={category.id}
            category={category}
            products={products}
          />
        ))}
      </div>

      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <div className="no-products">
          No products found matching your search.
        </div>
      )}
    </main>
  );
};

export default ProductList;
