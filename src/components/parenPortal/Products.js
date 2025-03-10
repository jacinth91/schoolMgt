import React from "react";
import { Notebook, Pencil, Calculator, Backpack } from "lucide-react";

import ProductList from "./products/productList";
const products = [
  {
    id: 1,
    name: "Premium Notebook",
    price: 12.99,
    icon: Notebook,
    category: 1,
    description: "High-quality spiral notebook with 200 pages",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 2,
    name: "Mechanical Pencil Set",
    price: 8.99,
    icon: Pencil,
    category: 2,
    description: "5-pack of 0.7mm mechanical pencils",
    image:
      "https://images.unsplash.com/photo-1596558450268-9c27524ba856?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 3,
    name: "Scientific Calculator",
    price: 29.99,
    icon: Calculator,
    category: 3,
    description: "Advanced scientific calculator for math and science",
    image:
      "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 1,
    name: "Premium Notebook",
    price: 12.99,
    icon: Notebook,
    category: 1,
    description: "High-quality spiral notebook with 200 pages",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 2,
    name: "Mechanical Pencil Set",
    price: 8.99,
    icon: Pencil,
    category: 2,
    description: "5-pack of 0.7mm mechanical pencils",
    image:
      "https://images.unsplash.com/photo-1596558450268-9c27524ba856?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 3,
    name: "Scientific Calculator",
    price: 29.99,
    icon: Calculator,
    category: 3,
    description: "Advanced scientific calculator for math and science",
    image:
      "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 1,
    name: "Premium Notebook",
    price: 12.99,
    icon: Notebook,
    category: 1,
    description: "High-quality spiral notebook with 200 pages",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 2,
    name: "Mechanical Pencil Set",
    price: 8.99,
    icon: Pencil,
    category: 2,
    description: "5-pack of 0.7mm mechanical pencils",
    image:
      "https://images.unsplash.com/photo-1596558450268-9c27524ba856?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 3,
    name: "Scientific Calculator",
    price: 29.99,
    icon: Calculator,
    category: 3,
    description: "Advanced scientific calculator for math and science",
    image:
      "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 1,
    name: "Premium Notebook",
    price: 12.99,
    icon: Notebook,
    category: 1,
    description: "High-quality spiral notebook with 200 pages",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 2,
    name: "Mechanical Pencil Set",
    price: 8.99,
    icon: Pencil,
    category: 2,
    description: "5-pack of 0.7mm mechanical pencils",
    image:
      "https://images.unsplash.com/photo-1596558450268-9c27524ba856?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 3,
    name: "Scientific Calculator",
    price: 29.99,
    icon: Calculator,
    category: 3,
    description: "Advanced scientific calculator for math and science",
    image:
      "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 1,
    name: "Premium Notebook",
    price: 12.99,
    icon: Notebook,
    category: 1,
    description: "High-quality spiral notebook with 200 pages",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 2,
    name: "Mechanical Pencil Set",
    price: 8.99,
    icon: Pencil,
    category: 2,
    description: "5-pack of 0.7mm mechanical pencils",
    image:
      "https://images.unsplash.com/photo-1596558450268-9c27524ba856?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 3,
    name: "Scientific Calculator",
    price: 29.99,
    icon: Calculator,
    category: 3,
    description: "Advanced scientific calculator for math and science",
    image:
      "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 1,
    name: "Premium Notebook",
    price: 12.99,
    icon: Notebook,
    category: 1,
    description: "High-quality spiral notebook with 200 pages",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 2,
    name: "Mechanical Pencil Set",
    price: 8.99,
    icon: Pencil,
    category: 2,
    description: "5-pack of 0.7mm mechanical pencils",
    image:
      "https://images.unsplash.com/photo-1596558450268-9c27524ba856?auto=format&fit=crop&q=80&w=500&h=400",
  },
  {
    id: 3,
    name: "Scientific Calculator",
    price: 29.99,
    icon: Calculator,
    category: 3,
    description: "Advanced scientific calculator for math and science",
    image:
      "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=500&h=400",
  },
];

const categories = [
  { id: 1, name: "Notebooks", icon: Notebook },
  { id: 2, name: "Pencils & Pens", icon: Pencil },
  { id: 3, name: "Backpacks", icon: Backpack },
];

const Products = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Banner */}

      {/* Dashboard Content */}
      <div className="container">
        <div className="mt-4">
          <ProductList
            products={products}
            categories={categories}
            showSearch={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
