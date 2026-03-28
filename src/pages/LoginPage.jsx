import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import './LoginPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email required';
    if (formData.password.length < 6) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store token and user data
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        // Use window.location for more reliable navigation
        window.location.href = '/home';
        return;
      } else {
        setErrors({ submit: data.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  return (
    <div className="login-root">
      <div className="login-bg">
        <div className="login-orb orb-a" />
        <div className="login-orb orb-b" />
        <div className="login-orb orb-c" />
        <div className="login-grid" />
      </div>

      <div className="login-container">
        <motion.div
          className="login-strip"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="login-strip-content">
            <span className="login-strip-brand">⬡ LUXE</span>
            <div className="login-strip-taglines">
              {['Premium.', 'Fast.', 'Yours.'].map((t, i) => (
                <motion.span key={i} className="strip-tagline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.2 }}>
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=900&fit=crop"
            alt="luxury shopping"
            className="login-strip-img"
          />
        </motion.div>

        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="login-mobile-brand">⬡ LUXE</div>

          <div className="login-header">
            <div className="login-welcome-badge">Welcome back</div>
            <h1 className="login-title">Sign in to your<br />account</h1>
            <p className="login-subtitle">Enter your credentials to continue shopping</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <motion.div
              className={`login-field ${errors.email ? 'field-error' : ''}`}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="login-label">Email Address</label>
              <div className="login-input-wrap">
                <FiMail className="linput-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="login-input"
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="login-error">{errors.email}</span>}
            </motion.div>

            <motion.div
              className={`login-field ${errors.password ? 'field-error' : ''}`}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="login-label-row">
                <label className="login-label">Password</label>
                <button type="button" className="login-forgot">Forgot password?</button>
              </div>
              <div className="login-input-wrap">
                <FiLock className="linput-icon" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className="login-input"
                  autoComplete="current-password"
                />
                <button type="button" className="lpwd-toggle" onClick={() => setShowPwd(p => !p)} tabIndex={-1}>
                  {showPwd ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && <span className="login-error">{errors.password}</span>}
            </motion.div>

            <motion.div className="login-remember" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <label className="remember-label">
                <input type="checkbox" className="remember-check" />
                <span className="remember-custom" />
                Keep me signed in
              </label>
            </motion.div>

            {errors.submit && (
              <motion.div 
                className="login-error" 
                style={{ textAlign: 'center', marginBottom: '10px' }}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
              >
                {errors.submit}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className={`login-btn ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              {loading ? (
                <span className="lbtn-inner"><span className="lspinner" /> Signing in...</span>
              ) : (
                <span className="lbtn-inner">Login to LUXE <FiArrowRight /></span>
              )}
            </motion.button>

            <div className="login-divider">
              <span />
              <p>or continue with</p>
              <span />
            </div>

            <div className="login-socials">
              {[
                { name: 'Google', img: 'https://www.svgrepo.com/show/475656/google-color.svg' },
                { name: 'Apple', img: 'https://www.svgrepo.com/show/452234/apple.svg' },
              ].map((s) => (
                <button key={s.name} type="button" className="social-btn">
                  <img src={s.img} alt={s.name} className="social-icon" />
                  {s.name}
                </button>
              ))}
            </div>
          </form>

          <motion.p className="login-signup-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            New to LUXE?{' '}
            <Link to="/signup" className="login-link">Create an account</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}