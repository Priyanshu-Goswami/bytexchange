import { useState, useEffect } from 'react';
import API from '../services/api';
import ItemCard from '../components/ItemCard';

function BrowseItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['Books', 'Electronics', 'Gaming Items', 'Study Notes'];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/items');
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchItems();
      return;
    }
    try {
      setLoading(true);
      const { data } = await API.get(`/items/search?q=${searchQuery}`);
      setItems(data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    if (!category) {
      fetchItems();
      return;
    }
    try {
      setLoading(true);
      const { data } = await API.get(`/items/category/${category}`);
      setItems(data);
    } catch (error) {
      console.error('Error filtering:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <h2>Browse Items</h2>
        <p>Discover great deals from students on campus</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-search" type="submit">
              🔍 Search
            </button>
            {(searchQuery || selectedCategory) && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory(''); fetchItems(); }}
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Category Filter Chips */}
      <div className="filter-chips">
        <button
          className={`filter-chip ${!selectedCategory ? 'active' : ''}`}
          onClick={() => handleCategoryFilter('')}
        >
          All Items
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="spinner-modern"></div>
          <p className="loading-text">Loading items...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h5>No items found</h5>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="row g-4">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseItems;
