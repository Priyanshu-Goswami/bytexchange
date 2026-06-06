import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function PostItem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ['Books', 'Electronics', 'Gaming Items', 'Study Notes'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('price', formData.price);
      if (image) {
        data.append('image', image);
      }

      await API.post('/items', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/my-listings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in">
      <div className="post-item-card">
        <h3>📦 Post Item for Sale</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Item Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Data Structures Textbook (3rd Edition)"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe condition, any defects, reason for selling..."
              required
            />
          </div>
          <div className="row g-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                placeholder="0"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Item Photo</label>
            <div className="file-upload-area" onClick={() => document.getElementById('imageInput').click()}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px' }} />
              ) : (
                <>
                  <div style={{ fontSize: '2rem', opacity: 0.5 }}>📷</div>
                  <p>Click to upload an image</p>
                </>
              )}
            </div>
            <input
              id="imageInput"
              type="file"
              className="d-none"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
            />
            <small className="text-muted d-block mt-1">Max 10MB. Accepted: JPG, PNG, WebP</small>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostItem;
