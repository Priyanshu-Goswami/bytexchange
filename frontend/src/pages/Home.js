import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="animate-in">
      {/* Hero Section */}
      <div className="hero-section text-center">
        <h1>Buy & Sell on Campus</h1>
        <p className="lead mt-3">
          The trusted marketplace for students. Find great deals on textbooks, electronics, 
          gaming gear and more — all from your fellow students.
        </p>
        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/browse" className="btn btn-hero-primary">
            Browse Items →
          </Link>
          {user ? (
            <Link to="/post-item" className="btn btn-hero-secondary">
              Sell Something
            </Link>
          ) : (
            <Link to="/register" className="btn btn-hero-secondary">
              Create Account
            </Link>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="row g-3 mt-2">
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
        <h4>How UniKart Works</h4>
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
        <p>UniKart © 2024 — Built for students, by students.</p>
      </div>
    </div>
  );
}

export default Home;
