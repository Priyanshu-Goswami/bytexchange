import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="animate-in">
      {/* Hero Section */}
      <div className="hero-section text-center">
        <div className="hero-badge">
          <span className="badge-icon">🎓</span>
          Your Campus Marketplace
        </div>
        <h1>
          Buy & Sell <span className="text-highlight">Campus Essentials</span> with Fellow Students
        </h1>
        <p className="hero-description">
          The trusted student marketplace. Find great deals on textbooks, electronics, 
          gaming gear and more — all from verified students on your campus.
        </p>
        <div className="hero-actions">
          <Link to="/browse" className="btn-hero-primary">
            Browse Items
          </Link>
          {user ? (
            <Link to="/post-item" className="btn-hero-secondary">
              Sell Something
            </Link>
          ) : (
            <Link to="/register" className="btn-hero-secondary">
              Create Account
            </Link>
          )}
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-icon">✓</span>
            <span><strong>500+</strong> Items Listed</span>
          </div>
          <div className="hero-stat">
            <span className="stat-icon">✓</span>
            <span><strong>200+</strong> Active Students</span>
          </div>
          <div className="hero-stat">
            <span className="stat-icon">✓</span>
            <span><strong>6</strong> Categories</span>
          </div>
        </div>
      </div>

      {/* Accent Bar */}
      <div className="accent-bar"></div>

      {/* Categories */}
      <div className="section-header mt-5">
        <span className="section-badge">Browse Categories</span>
        <h2>Find What <span className="text-highlight">You Need</span></h2>
        <p>Explore items across popular categories listed by students on campus.</p>
      </div>
      <div className="row g-3">
        <div className="col-6 col-md-3">
          <Link to="/browse" className="text-decoration-none">
            <div className="category-card">
              <span className="icon">📚</span>
              <h5>Books</h5>
              <p>Textbooks & references</p>
            </div>
          </Link>
        </div>
        <div className="col-6 col-md-3">
          <Link to="/browse" className="text-decoration-none">
            <div className="category-card">
              <span className="icon">💻</span>
              <h5>Electronics</h5>
              <p>Laptops & gadgets</p>
            </div>
          </Link>
        </div>
        <div className="col-6 col-md-3">
          <Link to="/browse" className="text-decoration-none">
            <div className="category-card">
              <span className="icon">🎮</span>
              <h5>Gaming</h5>
              <p>Consoles & games</p>
            </div>
          </Link>
        </div>
        <div className="col-6 col-md-3">
          <Link to="/browse" className="text-decoration-none">
            <div className="category-card">
              <span className="icon">📝</span>
              <h5>Study Notes</h5>
              <p>Handwritten & digital</p>
            </div>
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works text-center">
        <h4>How <span className="text-highlight">byteXchange</span> Works</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="step-item">
              <div className="step-number">1</div>
              <h5>Create Account</h5>
              <p>Sign up in seconds with your email</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="step-item">
              <div className="step-number">2</div>
              <h5>List Your Items</h5>
              <p>Upload photos and set your price</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="step-item">
              <div className="step-number">3</div>
              <h5>Connect & Sell</h5>
              <p>Buyers contact you directly</p>
            </div>
          </div>
        </div>
      </div>

      <div className="app-footer">
        <p>byteXchange © 2024 — Built for students, by students.</p>
      </div>
    </div>
  );
}

export default Home;
