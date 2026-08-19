import React from 'react';
import './oil&serum.css';

import serum1 from '../assets/serum1.jpg';
import serum2 from '../assets/serum2.jpg';
import oil from '../assets/oil.jpg';

const OilSerum = ({ onAddToCart }) => {
  const oilSerumProducts = [
    {
      id: 'serum-1',
      name: 'Glow & Hydrating Serum',
      sub: 'Premium Nourishing Facial Serum',
      price: 'Rs. 1,650 PKR',
      image: serum1,
      bg: '#f4efe6'
    },
    {
      id: 'serum-2',
      name: 'Radiance Botanical Serum',
      sub: 'Luxury Repair & Shine Serum',
      price: 'Rs. 1,550 PKR',
      image: serum2,
      bg: '#ede8e1'
    },
    {
      id: 'oil-1',
      name: 'Nourishing Hair & Body Oil',
      sub: 'Pure Herbal Botanical Essential Oil',
      price: 'Rs. 1,350 PKR',
      image: oil,
      bg: '#f0ebe6'
    }
  ];

  return (
    <div className="oilserum-section">
      <div className="oilserum-header text-center">
        <span className="oilserum-tagline">NATURAL ESSENTIALS</span>
        <h2 className="oilserum-title">OIL & SERUM</h2>
      </div>

      <div className="oilserum-grid">
        {oilSerumProducts.map((item) => (
          <div key={item.id} className="oilserum-card">
            <div
              className="oilserum-img-frame"
              style={{ backgroundColor: item.bg }}
            >
              <img src={item.image} alt={item.name} className="oilserum-img" />
            </div>

            <div className="oilserum-info">
              <h3 className="oilserum-name">{item.name}</h3>
              <p className="oilserum-sub">{item.sub}</p>
              <span className="oilserum-price">{item.price}</span>

              <div className="oilserum-actions">
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

export default OilSerum;
