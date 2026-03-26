import { motion } from "framer-motion";
import { FiAward, FiGlobe, FiHeart, FiUsers } from "react-icons/fi";
import "./About.css";

const stats = [
  { label: "Products", value: "20K+", icon: FiAward },
  { label: "Countries", value: "85+", icon: FiGlobe },
  { label: "Happy Customers", value: "1.2M", icon: FiHeart },
  { label: "Team Members", value: "340+", icon: FiUsers },
];

const team = [
  { name: "Aria Lux", role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&face" },
  { name: "Marcus Chen", role: "Head of Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&face" },
  { name: "Priya Nair", role: "Chief Curator",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&face" },
];

const About = () => {
  return (
    <div className="about">
      {/* Hero */}
      <section className="about__hero">
        <div className="about__hero-bg">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop" alt="About" />
          <div className="about__hero-overlay" />
        </div>
        <motion.div
          className="about__hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="about__hero-badge">OUR STORY</span>
          <h1 className="about__hero-title">Where Luxury<br />Meets Lifestyle</h1>
          <p className="about__hero-subtitle">
            Founded in 2019, LUXE is dedicated to curating the finest products from around the world — delivered to your door.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="about__stats">
        {stats.map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={label}
            className="about__stat"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Icon className="about__stat-icon" />
            <div className="about__stat-value">{value}</div>
            <div className="about__stat-label">{label}</div>
          </motion.div>
        ))}
      </section>

      {/* Mission */}
      <section className="about__mission">
        <motion.div
          className="about__mission-inner"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="about__mission-text">
            <span className="about__label">OUR MISSION</span>
            <h2 className="about__mission-title">Crafting the World's Most Thoughtful Shopping Experience</h2>
            <p>
              We believe luxury shouldn't be intimidating. Every product on LUXE is hand-picked by our team of expert curators — people who understand that true quality transcends trends.
            </p>
            <p>
              From sourcing sustainable materials to partnering with independent artisans, we're building a marketplace that honours craftsmanship and values the people behind the products.
            </p>
          </div>
          <div className="about__mission-image">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=500&fit=crop" alt="Mission" />
          </div>
        </motion.div>
      </section>

      {/* Team */}
      <section className="about__team">
        <div className="about__team-header">
          <span className="about__label">THE PEOPLE</span>
          <h2 className="about__team-title">Meet the Team</h2>
        </div>
        <div className="about__team-grid">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className="about__team-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="about__team-avatar">
                <img src={member.image} alt={member.name} />
              </div>
              <h3 className="about__team-name">{member.name}</h3>
              <p className="about__team-role">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;