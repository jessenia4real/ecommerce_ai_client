import { motion } from "framer-motion";
import { FiZap, FiClock } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "./Deals.css";

// Simulate "deals" — products with a discount tag
const dealProducts = products
  .map((p) => ({
    ...p,
    originalPrice: +(p.price * (1 + Math.random() * 0.5 + 0.2)).toFixed(2),
    discount: Math.floor(Math.random() * 40 + 20),
  }))
  .sort(() => Math.random() - 0.5)
  .slice(0, 12);

const DealCard = ({ product, index }) => (
  <motion.div
    className="deal-card"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    whileHover={{ y: -6 }}
  >
    <div className="deal-card__image-wrap">
      <img src={product.image} alt={product.name} className="deal-card__image" />
      <div className="deal-card__discount-badge">-{product.discount}%</div>
    </div>
    <div className="deal-card__body">
      <span className="deal-card__category">{product.category}</span>
      <h3 className="deal-card__name">{product.name}</h3>
      <div className="deal-card__prices">
        <span className="deal-card__price">${product.price.toFixed(2)}</span>
        <span className="deal-card__original">${product.originalPrice.toFixed(2)}</span>
      </div>
      <button className="deal-card__btn">Add to Cart</button>
    </div>
  </motion.div>
);

const Deals = () => {
  return (
    <div className="deals-page">
      {/* Hero */}
      <div className="deals-page__hero">
        <div className="deals-page__hero-content">
          <motion.div
            className="deals-page__hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FiZap /> FLASH SALE
          </motion.div>
          <motion.h1
            className="deals-page__hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Up to 60% Off
          </motion.h1>
          <motion.p
            className="deals-page__hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Limited time deals on premium products. Updated daily.
          </motion.p>
          <motion.div
            className="deals-page__timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <FiClock />
            <span>Ends in: </span>
            <strong>07:43:22</strong>
          </motion.div>
        </div>
      </div>

      {/* Products */}
      <div className="deals-page__body">
        <div className="deals-page__header">
          <h2 className="deals-page__section-title">Today's Deals</h2>
          <p className="deals-page__section-sub">{dealProducts.length} deals available</p>
        </div>
        <div className="deals-page__grid">
          {dealProducts.map((product, i) => (
            <DealCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deals;