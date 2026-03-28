import { Link } from "react-router-dom";
import { useState } from "react";
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiArrowRight } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  const categories = ["Electronics", "Fashion", "Jewellery", "Accessories", "Footwear", "Beauty"];
  const company = ["About Us", "Careers", "Press", "Blog"];
  const support = ["FAQ", "Shipping Info", "Returns", "Track Order", "Contact Us"];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-icon">◎</span> LUXE
          </Link>
          <p className="footer__tagline">
            Curated luxury for the modern lifestyle. Discover pieces that define who you are.
          </p>
          <div className="footer__socials">
            {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
              <a key={i} href="#" className="footer__social-link" aria-label="Social">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Categories</h4>
          <ul className="footer__col-list">
            {categories.map((cat) => (
              <li key={cat}>
                <Link to={`/category/${cat.toLowerCase()}`} className="footer__col-link">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Company</h4>
          <ul className="footer__col-list">
            {company.map((item) => (
              <li key={item}>
                <a href="#" className="footer__col-link">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Support</h4>
          <ul className="footer__col-list">
            {support.map((item) => (
              <li key={item}>
                <a href="#" className="footer__col-link">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__newsletter">
          <h4 className="footer__col-title">Stay in the Loop</h4>
          <p className="footer__newsletter-text">
            Get exclusive deals and new arrivals straight to your inbox.
          </p>
          <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
            <FiMail className="footer__newsletter-icon" />
            <input
              type="email"
              placeholder="Your email address"
              className="footer__newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer__newsletter-btn" aria-label="Subscribe">
              <FiArrowRight />
            </button>
          </form>
          {subscribed && <p className="footer__newsletter-success">Thanks for subscribing!</p>}
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {new Date().getFullYear()} LUXE. All rights reserved.
        </p>
        <div className="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;