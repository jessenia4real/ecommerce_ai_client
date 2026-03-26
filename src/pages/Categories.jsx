import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import products from "../data/products";
import "./Categories.css";

const categoryMeta = [
  { slug: "electronics", name: "Electronics", emoji: "🖥️", color: "#0d2137",
    gradient: "linear-gradient(135deg, #0d2137, #1a3a5c)",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=500&fit=crop",
    description: "Cutting-edge gadgets and technology for the modern world." },
  { slug: "fashion", name: "Fashion", emoji: "👗", color: "#2d0a2b",
    gradient: "linear-gradient(135deg, #2d0a2b, #4a1942)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
    description: "Timeless pieces and trend-forward styles for every occasion." },
  { slug: "jewellery", name: "Jewellery", emoji: "💎", color: "#3a2500",
    gradient: "linear-gradient(135deg, #3a2500, #5c3d00)",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=500&fit=crop",
    description: "Exquisite pieces crafted from the finest precious metals and gems." },
  { slug: "accessories", name: "Accessories", emoji: "👜", color: "#0a2418",
    gradient: "linear-gradient(135deg, #0a2418, #1a3a2a)",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=500&fit=crop",
    description: "The finishing touches that complete every outfit." },
  { slug: "footwear", name: "Footwear", emoji: "👟", color: "#2a0d0d",
    gradient: "linear-gradient(135deg, #2a0d0d, #4a1a1a)",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=500&fit=crop",
    description: "Step in style with our curated collection of shoes and boots." },
  { slug: "beauty", name: "Beauty", emoji: "💄", color: "#200a2e",
    gradient: "linear-gradient(135deg, #200a2e, #3a1a4a)",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop",
    description: "Luxury skincare, makeup and fragrance for your daily rituals." },
];

const Categories = () => {
  const navigate = useNavigate();

  const getCategoryCount = (slug) =>
    products.filter((p) => p.category === slug).length;

  return (
    <div className="categories-page">
      <div className="categories-page__header">
        <motion.h1
          className="categories-page__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          All Categories
        </motion.h1>
        <motion.p
          className="categories-page__subtitle"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Explore our full range of curated collections
        </motion.p>
      </div>

      <div className="categories-page__grid">
        {categoryMeta.map((cat, i) => (
          <motion.div
            key={cat.slug}
            className="cat-page-card"
            onClick={() => navigate(`/category/${cat.slug}`)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -5 }}
          >
            <div className="cat-page-card__image-wrap">
              <img src={cat.image} alt={cat.name} className="cat-page-card__image" />
              <div className="cat-page-card__image-overlay" style={{ background: cat.gradient + "cc" }} />
            </div>
            <div className="cat-page-card__body">
              <div className="cat-page-card__top">
                <span className="cat-page-card__emoji">{cat.emoji}</span>
                <div>
                  <h2 className="cat-page-card__name">{cat.name}</h2>
                  <p className="cat-page-card__count">{getCategoryCount(cat.slug)} products</p>
                </div>
              </div>
              <p className="cat-page-card__desc">{cat.description}</p>
              <div className="cat-page-card__cta">
                <span>Browse {cat.name}</span>
                <FiArrowRight />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;