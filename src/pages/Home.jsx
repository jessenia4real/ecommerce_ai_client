import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import { productAPI, categoryAPI } from "../services/api";
import "./Home.css";

const features = [
  { icon: FiTruck, title: "Free Shipping", desc: "On all orders over $75" },
  { icon: FiShield, title: "Secure Payments", desc: "256-bit SSL encryption" },
  { icon: FiRefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: FiZap, title: "Fast Delivery", desc: "2-3 business day delivery" },
];

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productAPI.getFeatured(),
          categoryAPI.getAll()
        ]);
        setFeaturedProducts(productsRes.data.products.slice(0, 8));
        setCategories(categoriesRes.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
              key={cat._id}
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
                <span className="category-card__emoji">{cat.icon}</span>
                <h3 className="category-card__name">{cat.name}</h3>
                <p className="category-card__count">{cat.productCount} items</p>
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
        {loading ? (
          <div className="home__loading">
            <div className="home__loading-spinner"></div>
            <p>Loading featured products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        )}
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