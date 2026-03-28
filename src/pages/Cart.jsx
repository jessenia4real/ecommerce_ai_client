import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [showCheckoutMsg, setShowCheckoutMsg] = useState(false);

  const handleCheckout = () => {
    setShowCheckoutMsg(true);
    setTimeout(() => setShowCheckoutMsg(false), 3000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cart-empty-content"
        >
          <FiShoppingBag className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet.</p>
          <button onClick={() => navigate('/shop')} className="cart-shop-btn">
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cart-header"
        >
          <button onClick={() => navigate(-1)} className="cart-back-btn">
            <FiArrowLeft /> Continue Shopping
          </button>
          <h1>Shopping Cart ({cartItems.length} items)</h1>
          <button onClick={clearCart} className="cart-clear-btn">
            <FiTrash2 /> Clear Cart
          </button>
        </motion.div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cart-item"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                  onClick={() => navigate(`/product/${item._id}`)}
                />
                
                <div className="cart-item-details">
                  <h3 onClick={() => navigate(`/product/${item._id}`)}>
                    {item.name}
                  </h3>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-quantity">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="cart-remove-btn"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cart-summary"
          >
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row">
              <span>Tax</span>
              <span>${(cartTotal * 0.1).toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>${(cartTotal * 1.1).toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            
            {showCheckoutMsg && (
              <motion.p 
                className="checkout-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Checkout coming soon! This is a demo project.
              </motion.p>
            )}
            
            <p className="secure-note">
              🔒 Secure checkout powered by Stripe
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
