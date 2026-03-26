import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX,
  FiStar, FiArrowRight, FiTruck, FiShield, FiRefreshCw,
  FiHeadphones, FiChevronLeft, FiChevronRight, FiInstagram,
  FiTwitter, FiFacebook, FiYoutube, FiMapPin, FiMail, FiPhone
} from 'react-icons/fi';
import { products, categories } from '../data/products';
import './LandingPage.css';

// ─── Reusable fade-in section wrapper ────────────────────────────────────────
function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

const heroSlides = [
  {
    tag: 'Summer Collection 2025',
    headline: 'Elevate\nYour Style',
    sub: 'Discover curated pieces crafted for the modern lifestyle.',
    cta: 'Shop Collection',
    badge: 'Up to 60% Off',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=650&fit=crop',
    accent: '#c9a84c',
  },
  {
    tag: 'New Electronics Drop',
    headline: 'Tech That\nInspires',
    sub: 'From wearables to home audio — the future is here.',
    cta: 'Explore Tech',
    badge: 'Free Shipping',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=900&h=650&fit=crop',
    accent: '#3b82f6',
  },
  {
    tag: 'Premium Footwear',
    headline: 'Walk With\nConfidence',
    sub: 'Handpicked footwear for every occasion and terrain.',
    cta: 'Shop Footwear',
    badge: 'New Arrivals',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=650&fit=crop',
    accent: '#f43f5e',
  },
];

const features = [
  { icon: FiTruck, label: 'Free Delivery', desc: 'On orders above ₹999' },
  { icon: FiShield, label: 'Secure Payments', desc: '100% protected transactions' },
  { icon: FiRefreshCw, label: 'Easy Returns', desc: '30-day hassle-free returns' },
  { icon: FiHeadphones, label: '24/7 Support', desc: 'Always here to help you' },
];

const testimonials = [
  { name: 'Priya S.', city: 'Mumbai', text: 'Absolutely love the quality! My order arrived in 2 days, perfectly packaged. LUXE is now my go-to for everything.', rating: 5, avatar: 'https://i.pravatar.cc/80?img=47' },
  { name: 'Arjun M.', city: 'Bangalore', text: 'The smartwatch I bought exceeded my expectations. Genuine product, great price. Will definitely order again!', rating: 5, avatar: 'https://i.pravatar.cc/80?img=68' },
  { name: 'Riya K.', city: 'Delhi', text: 'Returns were so easy and customer support was incredibly helpful. Rare to find such a smooth experience.', rating: 5, avatar: 'https://i.pravatar.cc/80?img=44' },
];

// ─── Star rating component ────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(n => (
        <FiStar key={n} className={`star ${n <= Math.floor(rating) ? 'star-filled' : 'star-empty'}`} />
      ))}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        <div className="product-badge" style={{ background: product.badgeColor }}>{product.badge}</div>
        <button className={`wishlist-btn ${wished ? 'wished' : ''}`} onClick={() => setWished(p => !p)}>
          <FiHeart />
        </button>
        <div className="product-overlay">
          <button className={`add-cart-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating-row">
          <Stars rating={product.rating} />
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="product-price-row">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          <span className="product-original">₹{product.originalPrice.toLocaleString()}</span>
          <span className="product-discount">{discount}% off</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [slide, setSlide] = useState(0);
  const [cartCount, setCartCount] = useState(3);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setSlide(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = ['Home', 'Shop', 'Categories', 'Deals', 'About'];
  const current = heroSlides[slide];

  return (
    <div className="lp-root">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header className={`lp-nav ${scrolled ? 'lp-nav-scrolled' : ''}`}>
        <div className="lp-nav-inner">
          <div className="lp-brand">
            <span className="lp-brand-icon">⬡</span>
            <span className="lp-brand-name">LUXE</span>
          </div>

          <nav className="lp-nav-links">
            {navLinks.map(link => (
              <a key={link} href="#" className="lp-nav-link">{link}</a>
            ))}
          </nav>

          <div className="lp-nav-actions">
            <button className="nav-icon-btn" onClick={() => setSearchOpen(p => !p)}><FiSearch /></button>
            <button className="nav-icon-btn"><FiUser /></button>
            <button className="nav-icon-btn cart-btn">
              <FiShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="nav-hamburger" onClick={() => setMenuOpen(p => !p)}>
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div className="lp-search-bar" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
              <div className="lp-search-inner">
                <FiSearch className="lsearch-icon" />
                <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for products, brands, categories..." className="lsearch-input" />
                {query && <button className="lsearch-clear" onClick={() => setQuery('')}><FiX /></button>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav className="lp-mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {navLinks.map(link => (
                <a key={link} href="#" className="mobile-link" onClick={() => setMenuOpen(false)}>{link}</a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO SLIDER ─────────────────────────────────────────────────────── */}
      <section className="lp-hero">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            className="hero-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img src={current.image} alt="hero" className="hero-img" />
            <div className="hero-img-overlay" />
            <div className="hero-content">
              <motion.span className="hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>{current.tag}</motion.span>
              <motion.h1 className="hero-headline" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {current.headline.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
              </motion.h1>
              <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>{current.sub}</motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <button className="hero-cta-btn" style={{ background: current.accent === '#c9a84c' ? 'linear-gradient(135deg,#c9a84c,#a8873a)' : `linear-gradient(135deg,${current.accent},${current.accent}cc)` }}>
                  {current.cta} <FiArrowRight />
                </button>
                <span className="hero-badge" style={{ borderColor: current.accent, color: current.accent }}>{current.badge}</span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider controls */}
        <button className="hero-arrow left" onClick={() => setSlide(p => (p - 1 + heroSlides.length) % heroSlides.length)}><FiChevronLeft /></button>
        <button className="hero-arrow right" onClick={() => setSlide(p => (p + 1) % heroSlides.length)}><FiChevronRight /></button>

        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`hero-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </section>

      {/* ── FEATURES BAR ────────────────────────────────────────────────────── */}
      <Section className="lp-features">
        <div className="lp-features-inner">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} className="feature-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="feature-icon-wrap"><Icon className="feature-icon" /></div>
                <div>
                  <p className="feature-label">{f.label}</p>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ── CATEGORIES ──────────────────────────────────────────────────────── */}
      <Section className="lp-categories">
        <div className="lp-section-header">
          <div>
            <span className="section-tag">Browse by Type</span>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <a href="#" className="section-link">View All <FiArrowRight /></a>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="category-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <img src={cat.image} alt={cat.name} className="category-img" loading="lazy" />
              <div className="category-overlay" style={{ background: `linear-gradient(to top, ${cat.color}cc, transparent)` }} />
              <div className="category-info">
                <span className="category-icon">{cat.icon}</span>
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-count">{cat.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── FEATURED PRODUCTS ───────────────────────────────────────────────── */}
      <Section className="lp-products">
        <div className="lp-section-header">
          <div>
            <span className="section-tag">Handpicked for You</span>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <a href="#" className="section-link">View All <FiArrowRight /></a>
        </div>
        <div className="products-grid">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </Section>

      {/* ── OFFER BANNERS ───────────────────────────────────────────────────── */}
      <Section className="lp-offers">
        <div className="lp-section-header">
          <div>
            <span className="section-tag">Limited Time</span>
            <h2 className="section-title">Hot Deals</h2>
          </div>
        </div>
        <div className="offers-grid">
          {/* Big banner */}
          <motion.div
            className="offer-card offer-big"
            whileHover={{ scale: 1.015 }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=450&fit=crop" alt="offer" className="offer-img" />
            <div className="offer-overlay offer-overlay-dark" />
            <div className="offer-content">
              <span className="offer-chip">Flash Sale</span>
              <h3 className="offer-title">Electronics Mega Sale</h3>
              <p className="offer-sub">Up to 70% off on top brands. Limited stock!</p>
              <div className="offer-countdown">
                {['12h', '34m', '56s'].map((t, i) => (
                  <div key={i} className="countdown-block">
                    <span className="countdown-num">{t}</span>
                  </div>
                ))}
              </div>
              <button className="offer-btn">Shop Now <FiArrowRight /></button>
            </div>
          </motion.div>

          {/* Small banners */}
          <div className="offers-small-col">
            {[
              { color: '#1a0a2e', accent: '#8b5cf6', label: 'Fashion Week', title: 'Style Refresh', sub: 'New season, new you. 40% off clothing.', img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&h=280&fit=crop' },
              { color: '#0a1a0a', accent: '#10b981', label: 'Green Deal', title: 'Eco Products', sub: 'Sustainable choices. Free delivery.', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=280&fit=crop' },
            ].map((b, i) => (
              <motion.div
                key={i}
                className="offer-card offer-small"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <img src={b.img} alt={b.title} className="offer-img" />
                <div className="offer-overlay" style={{ background: `linear-gradient(135deg, ${b.color}ee, transparent)` }} />
                <div className="offer-content">
                  <span className="offer-chip" style={{ background: b.accent }}>{b.label}</span>
                  <h3 className="offer-title offer-title-sm">{b.title}</h3>
                  <p className="offer-sub offer-sub-sm">{b.sub}</p>
                  <button className="offer-btn-outline" style={{ borderColor: b.accent, color: b.accent }}>
                    Grab Deal <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────────── */}
      <Section className="lp-testimonials">
        <div className="lp-section-header centered">
          <span className="section-tag">What Customers Say</span>
          <h2 className="section-title">Loved by Millions</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              <div className="tcard-top">
                <img src={t.avatar} alt={t.name} className="tcard-avatar" />
                <div>
                  <p className="tcard-name">{t.name}</p>
                  <p className="tcard-city"><FiMapPin size={11} /> {t.city}</p>
                </div>
                <Stars rating={t.rating} />
              </div>
              <p className="tcard-text">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── NEWSLETTER ──────────────────────────────────────────────────────── */}
      <Section className="lp-newsletter">
        <div className="newsletter-inner">
          <div className="newsletter-text">
            <span className="section-tag">Stay in the Loop</span>
            <h2 className="newsletter-title">Get Exclusive Deals<br />in Your Inbox</h2>
            <p className="newsletter-sub">Join 500,000+ subscribers and never miss a sale.</p>
          </div>
          <div className="newsletter-form">
            <div className="newsletter-input-wrap">
              <FiMail className="newsletter-icon" />
              <input type="email" placeholder="Enter your email address" className="newsletter-input" />
            </div>
            <button className="newsletter-btn">Subscribe <FiArrowRight /></button>
          </div>
        </div>
        <div className="newsletter-bg-orb" />
      </Section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="lp-brand-icon">⬡</span>
              <span className="lp-brand-name">LUXE</span>
            </div>
            <p className="footer-brand-desc">Curating premium products for the modern lifestyle. Quality, speed, and trust — always.</p>
            <div className="footer-socials">
              {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="social-icon-link"><Icon /></a>
              ))}
            </div>
          </div>

          {[
            { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog', 'Partners'] },
            { title: 'Support', links: ['Help Center', 'Track Order', 'Returns', 'Shipping', 'Contact Us'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'] },
          ].map(col => (
            <div key={col.title} className="footer-col">
              <h4 className="footer-col-title">{col.title}</h4>
              {col.links.map(link => <a key={link} href="#" className="footer-link">{link}</a>)}
            </div>
          ))}

          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-item"><FiMapPin /><span>Mumbai, Maharashtra, India</span></div>
            <div className="footer-contact-item"><FiMail /><span>hello@luxestore.in</span></div>
            <div className="footer-contact-item"><FiPhone /><span>+91 98765 43210</span></div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 LUXE Store. All rights reserved.</p>
          <div className="footer-pay-icons">
            {['Visa', 'MC', 'UPI', 'PayPal', 'GPay'].map(p => (
              <span key={p} className="pay-tag">{p}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
