import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="byteXchange" className="brand-logo" />
          <span className="brand-text">
            <span className="brand-name">byte<span className="brand-highlight">X</span>change</span>
            <span className="brand-subtitle">Campus Marketplace</span>
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/browse') ? 'active' : ''}`} to="/browse">Browse</Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/post-item') ? 'active' : ''}`} to="/post-item">Sell Item</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/my-listings') ? 'active' : ''}`} to="/my-listings">My Listings</Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav align-items-center gap-2">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link user-greeting">👋 {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn-nav-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/login') ? 'active' : ''}`} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary btn-sm px-3" to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
