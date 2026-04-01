import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiArrowRight, FiCheck } from 'react-icons/fi';
import { authAPI } from '../services/api';
import './SignupPage.css';

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 + 0.3, duration: 0.4, ease: 'easeOut' },
  }),
};

const fields = [
  { name: 'name', label: 'Full Name', type: 'text', icon: FiUser, placeholder: 'John Doe' },
  { name: 'email', label: 'Email Address', type: 'email', icon: FiMail, placeholder: 'john@example.com' },
  { name: 'phone', label: 'Phone Number', type: 'tel', icon: FiPhone, placeholder: '+91 98765 43210' },
  { name: 'password', label: 'Password', type: 'password', icon: FiLock, placeholder: 'Min. 8 characters' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: FiLock, placeholder: 'Repeat your password' },
];

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState({ password: false, confirmPassword: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Valid email required';
    if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone)) e.phone = 'Valid phone required';
    if (formData.password.length < 8) e.password = 'Min. 8 characters';
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    
    try {
      const { confirmPassword, ...registerData } = formData;
      const data = await authAPI.register(registerData);
      if (data.success) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => { window.location.href = '/login'; }, 1500);
      } else {
        setLoading(false);
        setErrors({ submit: data.message || 'Registration failed' });
      }
    } catch (error) {
      setLoading(false);
      setErrors({ submit: error.message || 'Network error. Please try again.' });
    }
  };

  const handleChange = (e) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    setErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  const togglePwd = (field) => setShowPwd(p => ({ ...p, [field]: !p[field] }));

  return (
    <div className="signup-root">
      <div className="signup-bg">
        <div className="signup-bg-orb orb1" />
        <div className="signup-bg-orb orb2" />
        <div className="signup-bg-grid" />
      </div>

      <div className="signup-container">
        {/* Left Panel */}
        <motion.div
          className="signup-panel-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="signup-brand">
            <span className="signup-brand-icon">⬡</span>
            <span className="signup-brand-name">LUXE</span>
          </div>
          <div className="signup-left-content">
            <h2 className="signup-left-headline">Shop the future.<br />Today.</h2>
            <p className="signup-left-sub">Join 2 million+ customers who trust LUXE for premium products, fast delivery, and unmatched quality.</p>
            <div className="signup-perks">
              {['Free delivery on first 3 orders', 'Exclusive member-only deals', '24/7 luxury customer support', 'Easy 30-day returns'].map((perk, i) => (
                <motion.div key={i} className="signup-perk" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                  <FiCheck className="perk-icon" />
                  <span>{perk}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="signup-left-image-wrap">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=700&fit=crop" alt="fashion" className="signup-left-img" />
            <div className="signup-left-img-overlay" />
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="signup-panel-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="signup-form-wrap">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h1 className="signup-title">Create Account</h1>
              <p className="signup-subtitle">Fill in your details to get started</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="signup-form" noValidate>
              {fields.map((field, i) => {
                const Icon = field.icon;
                const isPwd = field.type === 'password';
                const inputType = isPwd ? (showPwd[field.name] ? 'text' : 'password') : field.type;
                return (
                  <motion.div key={field.name} className={`signup-field ${errors[field.name] ? 'field-error' : ''}`} custom={i} variants={inputVariants} initial="hidden" animate="visible">
                    <label className="signup-label">{field.label}</label>
                    <div className="signup-input-wrap">
                      <Icon className="input-icon" />
                      <input
                        type={inputType}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="signup-input"
                        autoComplete="off"
                      />
                      {isPwd && (
                        <button type="button" className="pwd-toggle" onClick={() => togglePwd(field.name)} tabIndex={-1}>
                          {showPwd[field.name] ? <FiEyeOff /> : <FiEye />}
                        </button>
                      )}
                    </div>
                    {errors[field.name] && <span className="signup-error">{errors[field.name]}</span>}
                  </motion.div>
                );
              })}

              {errors.submit && (
                <motion.div 
                  className="signup-error" 
                  style={{ textAlign: 'center', marginBottom: '10px' }}
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                >
                  {errors.submit}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className={`signup-btn ${loading ? 'btn-loading' : ''} ${success ? 'btn-success' : ''}`}
                disabled={loading || success}
                whileHover={{ scale: loading || success ? 1 : 1.02 }}
                whileTap={{ scale: loading || success ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {success ? (
                  <span className="btn-inner"><FiCheck /> Account Created!</span>
                ) : loading ? (
                  <span className="btn-inner"><span className="spinner" /> Creating Account...</span>
                ) : (
                  <span className="btn-inner">Create Account <FiArrowRight /></span>
                )}
              </motion.button>
            </form>

            <motion.p className="signup-login-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              Already have an account?{' '}
              <Link to="/login" className="signup-link">Sign in</Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
