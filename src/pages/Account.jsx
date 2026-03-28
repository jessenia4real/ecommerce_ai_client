import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiHeart, FiLogOut, FiMapPin, FiCreditCard } from 'react-icons/fi';
import './Account.css';

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      window.location.href = '/login';
      return;
    }
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="account-page">
        <div className="account-loading">
          <div className="account-spinner"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-sidebar">
          <div className="account-profile">
            <div className="account-avatar">
              <FiUser />
            </div>
            <h2 className="account-name">{user.name}</h2>
            <p className="account-email">{user.email}</p>
          </div>
          
          <nav className="account-nav">
            <Link to="/account" className="account-nav-item active">
              <FiUser /> Profile
            </Link>
            <Link to="/orders" className="account-nav-item">
              <FiShoppingBag /> Orders
            </Link>
            <Link to="/wishlist" className="account-nav-item">
              <FiHeart /> Wishlist
            </Link>
            <Link to="/addresses" className="account-nav-item">
              <FiMapPin /> Addresses
            </Link>
            <Link to="/payment" className="account-nav-item">
              <FiCreditCard /> Payment Methods
            </Link>
          </nav>
          
          <button className="account-logout" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
        
        <div className="account-content">
          <h1 className="account-title">My Account</h1>
          
          <div className="account-stats">
            <div className="account-stat-card">
              <FiShoppingBag className="stat-icon" />
              <div>
                <span className="stat-value">0</span>
                <span className="stat-label">Orders</span>
              </div>
            </div>
            <div className="account-stat-card">
              <FiHeart className="stat-icon" />
              <div>
                <span className="stat-value">0</span>
                <span className="stat-label">Wishlist</span>
              </div>
            </div>
            <div className="account-stat-card">
              <FiMapPin className="stat-icon" />
              <div>
                <span className="stat-value">0</span>
                <span className="stat-label">Addresses</span>
              </div>
            </div>
          </div>
          
          <div className="account-info">
            <h3>Account Information</h3>
            <div className="account-info-grid">
              <div className="account-info-item">
                <label>Full Name</label>
                <p>{user.name}</p>
              </div>
              <div className="account-info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="account-info-item">
                <label>Role</label>
                <p>{user.role || 'Customer'}</p>
              </div>
              <div className="account-info-item">
                <label>Member Since</label>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
