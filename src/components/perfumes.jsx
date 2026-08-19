import React from 'react';
import './perfumes.css';
import perfume1 from '../assets/perfume1.jpeg';
import perfume2 from '../assets/perfume2.jpeg';

const Perfumes = ({ onAddToCart }) => {
  const perfumeProducts = [
    {
      id: 'perfume-1',
      name: 'Oud E Rauf',
      sub: 'Pure Cambodian Agarwood',
      price: 'Rs. 3299 PKR',
      image: perfume1,
      bg: '#f4efe6'
    },
    {
      id: 'perfume-2',
      name: 'Mens 44',
      sub: 'Signature Spices & Cedar',
      price: 'Rs. 3299 PKR',
      image: perfume2,
      bg: '#f2eae0'
    }
  ];

  return (
    <div className="perfumes-section">
      <div className="perfumes-header text-center">
        <span className="perfumes-tagline">PERFUME COLLECTION</span>
        <h2 className="perfumes-title">OUR PRODUCTS</h2>
      </div>

      <div className="perfumes-grid">
        {perfumeProducts.map((item) => (
          <div key={item.id} className="perfume-card">
            <div
              className="perfume-img-frame"
              style={{ backgroundColor: item.bg }}
            >
              <img src={item.image} alt={item.name} className="perfume-img" />
            </div>

            <div className="perfume-info">
              <h3 className="perfume-name">{item.name}</h3>
              <p className="perfume-sub">{item.sub}</p>
              <span className="perfume-price">{item.price}</span>

              <div className="perfume-actions">
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

export default Perfumes;
