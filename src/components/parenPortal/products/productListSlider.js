import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/productList.css";

const ProductSlider = ({ category, products }) => {
  const scrollContainer = React.useRef(null);

  const scroll = (direction) => {
    const container = scrollContainer.current;
    if (container) {
      const scrollAmount = direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="category-container">
      <div className="category-header">
        <div className="category-title">
          <category.icon className="category-icon" />
          <h2>{category.name}</h2>
        </div>
        <div className="category-controls">
          <button onClick={() => scroll("left")} className="category-button">
            <ChevronLeft />
          </button>
          <button onClick={() => scroll("right")} className="category-button">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div ref={scrollContainer} className="category-scroll">
        {products.filter((p) => p.category === category.id).map((product) => {
          const Icon = product.icon;
          return (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-card-content">
                <div className="product-header">
                  <Icon className="product-icon" />
                  <span className="product-price">${product.price}</span>
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSlider;
