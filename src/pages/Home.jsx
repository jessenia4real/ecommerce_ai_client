import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "./Home.css";

const categories = [
  { name: "Electronics", slug: "electronics", count: "2,458 items", color: "#1a3a5c", emoji: "🖥️",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop" },
  { name: "Fashion", slug: "fashion", count: "5,892 items", color: "#4a1942", emoji: "👗",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop" },
  { name: "Jewellery", slug: "jewellery", count: "1,245 items", color: "#5c3d00", emoji: "💎",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop" },
  { name: "Accessories", slug: "accessories", count: "3,120 items", color: "#1a3a2a", emoji: "👜",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop" },
  { name: "Footwear", slug: "footwear", count: "2,780 items", color: "#4a1a1a", emoji: "👟",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop" },
  { name: "Beauty", slug: "beauty", count: "4,560 items", color: "#3a1a4a", emoji: "💄",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop" },
];

const features = [
  { icon: FiTruck, title: "Free Shipping", desc: "On all orders over $75" },
  { icon: FiShield, title: "Secure Payments", desc: "256-bit SSL encryption" },
  { icon: FiRefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: FiZap, title: "Fast Delivery", desc: "2-3 business day delivery" },
];

const featuredProducts = products.slice(0, 8);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&h=900&fit=crop"
            alt="Hero"
            className="hero__bg-img"
          />
          <div className="hero__bg-overlay" />
        </div>
        <div className="hero__content">
          <motion.span
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            SUMMER COLLECTION 2025
          </motion.span>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Elevate
            <br />
            Your Style
          </motion.h1>
          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Discover curated pieces crafted for the modern lifestyle.
          </motion.p>
          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <button className="hero__cta-primary" onClick={() => navigate("/shop")}>
              Shop Collection <FiArrowRight />
            </button>
            <button className="hero__cta-secondary" onClick={() => navigate("/deals")}>
              Up to 60% Off
            </button>
          </motion.div>
        </div>
        <div className="hero__scroll-hint">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Features Bar */}
      <section className="features-bar">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            className="features-bar__item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            viewport={{ once: true }}
          >
            <Icon className="features-bar__icon" />
            <div>
              <strong>{title}</strong>
              <span>{desc}</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Shop by Category
          </motion.h2>
          <button className="section-view-all" onClick={() => navigate("/categories")}>
            View All <FiArrowRight />
          </button>
        </div>

        <div className="categories-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              className="category-card"
              onClick={() => navigate(`/category/${cat.slug}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <img src={cat.image} alt={cat.name} className="category-card__img" />
              <div className="category-card__overlay" style={{ background: `linear-gradient(to top, ${cat.color}dd, transparent)` }} />
              <div className="category-card__body">
                <span className="category-card__emoji">{cat.emoji}</span>
                <h3 className="category-card__name">{cat.name}</h3>
                <p className="category-card__count">{cat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          <button className="section-view-all" onClick={() => navigate("/shop")}>
            View All <FiArrowRight />
          </button>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <motion.div
          className="promo-banner__inner"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="promo-banner__content">
            <span className="promo-banner__tag">LIMITED TIME OFFER</span>
            <h2 className="promo-banner__title">Up to 60% Off<br />Summer Essentials</h2>
            <p className="promo-banner__desc">Elevate your wardrobe without breaking the bank. Deals updated daily.</p>
            <button className="promo-banner__btn" onClick={() => navigate("/deals")}>
              Shop Deals <FiArrowRight />
            </button>
          </div>
          <div className="promo-banner__image">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop" alt="Sale" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;