import React from 'react';
import './cap.css';

import cap1 from '../assets/cap1.jpeg';
import cap2 from '../assets/cap2.jpeg';
import cap3 from '../assets/cap3.jpeg';
import cap4 from '../assets/cap4.jpeg';

const Cap = ({ onAddToCart }) => {
  const capProducts = [
    {
      id: 'cap-1',
      name: 'The Royal Bronze Edition',
      sub: 'Handcrafted Velvet Namaz Cap',
      price: 'Rs. 1,050 PKR',
      image: cap1,
      bg: '#f4efe6'
    },
    {
      id: 'cap-2',
      name: 'Noir Classic Cap',
      sub: 'Premium Black Embroidered Cap',
      price: 'Rs. 1,050 PKR',
      image: cap2,
      bg: '#ede8e1'
    },
    {
      id: 'cap-3',
      name: 'Royal Midnight Cap',
      sub: 'Traditional Deep Navy Cap',
      price: 'Rs. 1,000 PKR',
      image: cap3,
      bg: '#f0ebe6'
    },
    {
      id: 'cap-4',
      name: 'Sultan Ivory Cap',
      sub: 'Bespoke Handcrafted Namaz Cap',
      price: 'Rs. 1,100 PKR',
      image: cap4,
      bg: '#f5eee8'
    }
  ];

  return (
    <div className="cap-section">
      <div className="cap-header text-center">
        <span className="cap-tagline">ISLAMIC ESSENTIALS</span>
        <h2 className="cap-title">NAMAZ CAPS</h2>
      </div>

      <div className="cap-grid">
        {capProducts.map((item) => (
          <div key={item.id} className="cap-card">
            <div
              className="cap-img-frame"
              style={{ backgroundColor: item.bg }}
            >
              <img src={item.image} alt={item.name} className="cap-img" />
            </div>

            <div className="cap-info">
              <h3 className="cap-name">{item.name}</h3>
              <p className="cap-sub">{item.sub}</p>
              <span className="cap-price">{item.price}</span>

              <div className="cap-actions">
                <button
                  type="button"
                  className="btn-add-cart"
                  onClick={() => onAddToCart && onAddToCart(item)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cap;
