import React from 'react';
import './giftboxes.css';

import giftbox1 from '../assets/giftbox1.jpeg';


const Giftboxes = ({ onAddToCart, onViewItem }) => {
  const giftboxProducts = [
    {
      id: 'giftbox-1',
      name: 'The Royal Marble Edition',
      sub: 'Luxury White Marble Attar Gift Set',
      price: 'Rs. 250 PKR',
      image: giftbox1,
      bg: '#f7f4ee'
    }
  ];

  return (
    <div className="giftboxes-section">
      <div className="giftboxes-header text-center">
        <span className="giftboxes-tagline">EXCLUSIVE GIFTING</span>
        <h2 className="giftboxes-title">ATTAR GIFTBOXES</h2>
      </div>

      <div className="giftboxes-grid">
        {giftboxProducts.map((item) => (
          <div key={item.id} className="giftbox-card">
            <div
              className="giftbox-img-frame"
              style={{ backgroundColor: item.bg }}
            >
              <img src={item.image} alt={item.name} className="giftbox-img" />
            </div>

            <div className="giftbox-info">
              <h3 className="giftbox-name">{item.name}</h3>
              <p className="giftbox-sub">{item.sub}</p>
              <span className="giftbox-price">{item.price}</span>

              <div className="giftbox-actions">
                <button
                  type="button"
                  className="btn-add-cart"
                  onClick={() => onViewItem ? onViewItem(item) : (onAddToCart && onAddToCart(item))}
                >
                  VIEW ITEM
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Giftboxes;
