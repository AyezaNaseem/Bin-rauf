import React from 'react';
import './bestsellers.css';

import best1 from '../assets/best1.jpeg';
import best2 from '../assets/best2.jpeg';
import best3 from '../assets/best3.jpeg';
import best5 from '../assets/best5.jpeg';
import best6 from '../assets/bestseller.jpeg';

const BestSellers = ({ onAddToCart, onViewItem }) => {
  const bestProducts = [
    {
      id: 'best-1',
      name: 'Oud E Rauf',
      sub: 'Pure Cambodian Agarwood',
      price: 'Rs. 3,299 PKR',
      image: best6,
      bg: '#f4efe6'
    },
    {
      id: 'best-2',
      name: 'Oud ul Arab',
      sub: 'Pure Arabian Oud Oil',
      price: 'Rs. 3,500 PKR',
      image: best5,
      bg: '#f2eae0'
    },
    {
      id: 'best-3',
      name: 'Stronger Amber',
      sub: 'Intense Oriental Amber',
      price: 'Rs. 2,500 PKR',
      image: best3,
      bg: '#f5f0eb'
    },
    {
      id: 'best-4',
      name: 'Sultan Ivory Cap',
      sub: 'Bespoke Handcrafted NamazCap',
      price: 'Rs. 1,100 PKR',
      image: best1,
      bg: '#efebe4'
    },
    {
      id: 'best-5',
      name: 'Royal Midnight Cap',
      sub: 'Traditional Deep Navy Cap',
      price: 'Rs. 1,000 PKR',
      image: best2,
      bg: '#f1ebe3'
    }
  ];

  return (
    <div className="bestsellers-section">
      <div className="bestsellers-header text-center">
        <span className="bestsellers-tagline">MOST LOVED COLLECTION</span>
        <h2 className="bestsellers-title">BEST SELLING PRODUCTS</h2>
      </div>

      <div className="bestsellers-grid">
        {bestProducts.map((item) => (
          <div key={item.id} className="bestsellers-card">
            <div
              className="bestsellers-img-frame"
              style={{ backgroundColor: item.bg }}
            >
              <span className="best-seller-badge">BESTSELLER</span>
              <img src={item.image} alt={item.name} className="bestsellers-img" />
            </div>

            <div className="bestsellers-info">
              <h3 className="bestsellers-name">{item.name}</h3>
              <p className="bestsellers-sub">{item.sub}</p>
              <span className="bestsellers-price">{item.price}</span>

              <div className="bestsellers-actions">
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

export default BestSellers;
