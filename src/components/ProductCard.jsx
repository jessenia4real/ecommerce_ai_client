import { useState } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product, index = 0 }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`product-card__star ${i < Math.floor(rating) ? "product-card__star--filled" : ""}`}
      />
    ));
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6 }}
    >
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        <div className="product-card__overlay">
          <button
            className={`product-card__wishlist ${wishlisted ? "product-card__wishlist--active" : ""}`}
            onClick={() => setWishlisted(!wishlisted)}
            aria-label="Add to wishlist"
          >
            <FiHeart />
          </button>
        </div>
        <div className="product-card__category-badge">
          {product.category}
        </div>
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>

        <div className="product-card__rating">
          <div className="product-card__stars">
            {renderStars(product.rating)}
          </div>
          <span className="product-card__rating-val">{product.rating}</span>
        </div>

        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>
          <motion.button
            className={`product-card__cart-btn ${addedToCart ? "product-card__cart-btn--added" : ""}`}
            onClick={handleAddToCart}
            whileTap={{ scale: 0.93 }}
          >
            <FiShoppingCart />
            <span>{addedToCart ? "Added!" : "Add to Cart"}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;