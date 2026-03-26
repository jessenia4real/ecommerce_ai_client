import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "./Shop.css";

const CATEGORIES = ["all", "electronics", "fashion", "jewellery", "accessories", "footwear", "beauty"];
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name A-Z" },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState([0, 2500]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [activeCategory, sortBy, search, priceRange]);

  return (
    <div className="shop">
      {/* Header */}
      <div className="shop__header">
        <div className="shop__header-inner">
          <motion.h1
            className="shop__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            All Products
          </motion.h1>
          <p className="shop__count">{filtered.length} items found</p>
        </div>
      </div>

      <div className="shop__body">
        {/* Sidebar */}
        <aside className="shop__sidebar">
          <div className="shop__filter-group">
            <h3 className="shop__filter-title"><FiFilter /> Filters</h3>
          </div>

          <div className="shop__filter-group">
            <h4 className="shop__filter-subtitle">Search</h4>
            <div className="shop__search-wrap">
              <FiSearch className="shop__search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="shop__search-input"
              />
              {search && (
                <button className="shop__search-clear" onClick={() => setSearch("")}>
                  <FiX />
                </button>
              )}
            </div>
          </div>

          <div className="shop__filter-group">
            <h4 className="shop__filter-subtitle">Category</h4>
            <div className="shop__cat-list">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`shop__cat-btn ${activeCategory === cat ? "shop__cat-btn--active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="shop__filter-group">
            <h4 className="shop__filter-subtitle">Max Price: ${priceRange[1]}</h4>
            <input
              type="range"
              min={0}
              max={2500}
              step={50}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, +e.target.value])}
              className="shop__range"
            />
            <div className="shop__range-labels">
              <span>$0</span>
              <span>$2,500</span>
            </div>
          </div>

          <button
            className="shop__reset-btn"
            onClick={() => { setActiveCategory("all"); setSearch(""); setPriceRange([0, 2500]); setSortBy("default"); }}
          >
            Reset Filters
          </button>
        </aside>

        {/* Products */}
        <main className="shop__main">
          {/* Sort bar */}
          <div className="shop__sort-bar">
            <span className="shop__sort-label">Sort by</span>
            <div className="shop__sort-wrap">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="shop__sort-select"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <FiChevronDown className="shop__sort-chevron" />
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="shop__grid">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="shop__empty">
              <div className="shop__empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;