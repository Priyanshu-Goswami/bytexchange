import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-2">
      <div className="item-card">
        <div className="card-img-wrapper">
          <img
            src={item.image}
            alt={item.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x220?text=No+Image';
            }}
          />
          <span className="category-badge">{item.category}</span>
        </div>
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
          <p className="card-price">₹{item.price}</p>
          <Link to={`/item/${item._id}`} className="btn-view">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
