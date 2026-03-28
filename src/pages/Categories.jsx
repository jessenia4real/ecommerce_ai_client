import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { categoryAPI } from "../services/api";
import "./Categories.css";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAll();
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="categories-page">
        <div className="categories-page__loading">
          <div className="categories-page__loading-spinner"></div>
          <p>Loading categories...</p>
        </div>
      </div>
    );
  }

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
        {categories.map((cat, i) => (
          <motion.div
            key={cat._id}
            className="cat-page-card"
            onClick={() => navigate(`/category/${cat.slug}`)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -5 }}
          >
            <div className="cat-page-card__image-wrap">
              <img src={cat.image} alt={cat.name} className="cat-page-card__image" />
              <div className="cat-page-card__image-overlay" style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}dd)` }} />
            </div>
            <div className="cat-page-card__body">
              <div className="cat-page-card__top">
                <span className="cat-page-card__emoji">{cat.icon}</span>
                <div>
                  <h2 className="cat-page-card__name">{cat.name}</h2>
                  <p className="cat-page-card__count">{cat.productCount} products</p>
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