import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function MyListings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});

  const categories = ['Books', 'Electronics', 'Gaming Items', 'Study Notes'];

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const { data } = await API.get('/items/my-listings');
      setItems(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await API.delete(`/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      alert('Failed to delete item');
    }
  };

  const startEdit = (item) => {
    setEditingItem(item._id);
    setEditForm({
      title: item.title,
      description: item.description,
      category: item.category,
      price: item.price,
      status: item.status
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
      const { data } = await API.put(`/items/${id}`, editForm);
      setItems(items.map((item) => (item._id === id ? data : item)));
      setEditingItem(null);
    } catch (error) {
      alert('Failed to update item');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-modern"></div>
        <p className="loading-text">Loading your listings...</p>
      </div>
    );
  }

  return (
    <div className="animate-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-header mb-0">
          <h2>My Listings</h2>
          <p className="mb-0">Manage your posted items</p>
        </div>
        <Link to="/post-item" className="btn btn-primary">
          + New Listing
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h5>No listings yet</h5>
          <p>Start selling by posting your first item</p>
          <Link to="/post-item" className="btn btn-primary mt-2">Post an Item</Link>
        </div>
      ) : (
        <div className="listings-table">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  {editingItem === item._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="title"
                          value={editForm.title}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          name="category"
                          value={editForm.category}
                          onChange={handleEditChange}
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          name="price"
                          value={editForm.price}
                          onChange={handleEditChange}
                          style={{ width: '80px' }}
                        />
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          name="status"
                          value={editForm.status}
                          onChange={handleEditChange}
                        >
                          <option value="Available">Available</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEditSubmit(item._id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setEditingItem(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '8px' }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/44?text=•';
                            }}
                          />
                          <span style={{ fontWeight: 600, color: '#1e293b' }}>{item.title}</span>
                        </div>
                      </td>
                      <td><span className="badge-category">{item.category}</span></td>
                      <td style={{ fontWeight: 700, color: '#4f46e5' }}>₹{item.price}</td>
                      <td>
                        <span className={`badge-status ${item.status === 'Available' ? 'badge-available' : 'badge-sold'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="btn-edit"
                            onClick={() => startEdit(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyListings;
