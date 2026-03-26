import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ cartCount = 0 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/categories", label: "Categories" },
    { to: "/deals", label: "Deals" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">◎</span>
          <span className="navbar__logo-text">LUXE</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="navbar__links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            className="navbar__icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <FiSearch />
          </button>
          <Link to="/account" className="navbar__icon-btn" aria-label="Account">
            <FiUser />
          </Link>
          <Link to="/cart" className="navbar__icon-btn navbar__cart-btn" aria-label="Cart">
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="navbar__cart-badge">{cartCount}</span>
            )}
          </Link>
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`navbar__search ${searchOpen ? "navbar__search--open" : ""}`}>
        <form onSubmit={handleSearch} className="navbar__search-form">
          <FiSearch className="navbar__search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar__search-input"
            autoFocus={searchOpen}
          />
          <button type="submit" className="navbar__search-btn">Search</button>
        </form>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;