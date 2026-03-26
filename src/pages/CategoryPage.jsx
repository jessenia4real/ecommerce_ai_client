import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiGrid, FiList } from "react-icons/fi";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "./CategoryPage.css";

const categoryMeta = {
  electronics: { name: "Electronics", emoji: "🖥️", color: "#1a3a5c",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1400&h=500&fit=crop",
    desc: "Cutting-edge gadgets and technology" },
  fashion: { name: "Fashion", emoji: "👗", color: "#4a1942",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=500&fit=crop",
    desc: "Timeless pieces and trend-forward styles" },
  jewellery: { name: "Jewellery", emoji: "💎", color: "#5c3d00",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&h=500&fit=crop",
    desc: "Exquisite precious metals and gems" },
  accessories: { name: "Accessories", emoji: "👜", color: "#1a3a2a",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1400&h=500&fit=crop",
    desc: "The finishing touches that complete every outfit" },
  footwear: { name: "Footwear", emoji: "👟", color: "#4a1a1a",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&h=500&fit=crop",
    desc: "Step in style with our curated collection" },
  beauty: { name: "Beauty", emoji: "💄", color: "#3a1a4a",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&h=500&fit=crop",
    desc: "Luxury skincare, makeup and fragrance" },
};

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [layout, setLayout] = useState("grid");
  const [sortBy, setSortBy] = useState("default");

  const meta = categoryMeta[slug];
  let categoryProducts = products.filter((p) => p.category === slug);

  if (sortBy === "price-asc") categoryProducts = [...categoryProducts].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") categoryProducts = [...categoryProducts].sort((a, b) => b.price - a.price);
  if (sortBy === "rating") categoryProducts = [...categoryProducts].sort((a, b) => b.rating - a.rating);

  if (!meta) {
    return (
      <div className="cat-page cat-page--404">
        <h2>Category not found</h2>
        <button onClick={() => navigate("/categories")}>← Back to Categories</button>
      </div>
    );
  }

  return (
    <div className="cat-page">
      {/* Hero Banner */}
      <div className="cat-page__hero" style={{ "--cat-color": meta.color }}>
        <img src={meta.image} alt={meta.name} className="cat-page__hero-img" />
        <div className="cat-page__hero-overlay" />
        <div className="cat-page__hero-content">
          <button className="cat-page__back-btn" onClick={() => navigate("/categories")}>
            <FiArrowLeft /> All Categories
          </button>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="cat-page__emoji">{meta.emoji}</span>
            <h1 className="cat-page__title">{meta.name}</h1>
            <p className="cat-page__desc">{meta.desc}</p>
            <span className="cat-page__badge">{categoryProducts.length} products</span>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="cat-page__controls">
        <div className="cat-page__controls-inner">
          <p className="cat-page__result-count">
            Showing <strong>{categoryProducts.length}</strong> products in{" "}
            <strong>{meta.name}</strong>
          </p>
          <div className="cat-page__controls-right">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cat-page__sort"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <div className="cat-page__layout-btns">
              <button
                className={`cat-page__layout-btn ${layout === "grid" ? "active" : ""}`}
                onClick={() => setLayout("grid")}
                aria-label="Grid view"
              >
                <FiGrid />
              </button>
              <button
                className={`cat-page__layout-btn ${layout === "list" ? "active" : ""}`}
                onClick={() => setLayout("list")}
                aria-label="List view"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="cat-page__body">
        {categoryProducts.length > 0 ? (
          <div className={`cat-page__grid ${layout === "list" ? "cat-page__grid--list" : ""}`}>
            {categoryProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="cat-page__empty">
            <span>📭</span>
            <h3>No products in this category yet</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;