import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await API.get(`/items/${id}`);
        setItem(data);
      } catch (err) {
        setError('Item not found');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-modern"></div>
        <p className="loading-text">Loading item details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-icon">😕</div>
        <h5>{error}</h5>
        <Link to="/browse" className="btn btn-primary mt-3">Back to Browse</Link>
      </div>
    );
  }

  return (
    <div className="animate-in">
      <Link to="/browse" className="btn btn-outline-primary mb-4" style={{ fontSize: '0.85rem' }}>
        ← Back to Browse
      </Link>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="item-detail-img">
            <img
              src={item.image}
              alt={item.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x400?text=No+Image';
              }}
            />
          </div>
        </div>
        <div className="col-md-6 item-detail-info">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge-category">{item.category}</span>
            <span className={`badge-status ${item.status === 'Available' ? 'badge-available' : 'badge-sold'}`}>
              {item.status}
            </span>
          </div>
          <h2>{item.title}</h2>
          <p className="item-detail-price mt-2">₹{item.price}</p>
          
          <hr style={{ borderColor: '#e2e8f0' }} />
          
          <h6 style={{ fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>Description</h6>
          <p style={{ color: '#64748b', lineHeight: 1.7 }}>{item.description}</p>
          
          <hr style={{ borderColor: '#e2e8f0' }} />
          
          {item.seller && (
            <div className="seller-card">
              <h5>👤 Seller Information</h5>
              <div className="seller-info">
                <p><strong>Name:</strong> {item.seller.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${item.seller.email}`} style={{ color: '#4f46e5' }}>{item.seller.email}</a></p>
                <p><strong>Phone:</strong> <a href={`tel:${item.seller.phone}`} style={{ color: '#4f46e5' }}>{item.seller.phone}</a></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
