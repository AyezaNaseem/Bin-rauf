import React from 'react';
import './attar.css';

import attar1 from '../assets/attar1.jpeg';
import attar2 from '../assets/attar2.jpeg';
import attar3 from '../assets/attar3.jpeg';
import attar4 from '../assets/attar4.jpeg';
import attar5 from '../assets/attar5.jpeg';
import attar6 from '../assets/attar6.jpeg';
import attar7 from '../assets/attar7.jpeg';
import attar8 from '../assets/attar8.jpeg';
import attar9 from '../assets/attar9.jpeg';
import attar10 from '../assets/attar10.jpeg';
import attar11 from '../assets/attar11.jpeg';
import attar12 from '../assets/attar12.jpeg';
import attar13 from '../assets/attar13.jpeg';
import attar14 from '../assets/attar14.jpeg';
import attar15 from '../assets/attar15.jpeg';
import attar16 from '../assets/attar16.jpeg';
import attar17 from '../assets/attar17.jpeg';
import attar18 from '../assets/attar18.jpeg';
import attar19 from '../assets/attar19.jpeg';
import attar20 from '../assets/attar20.jpeg';
import attar21 from '../assets/attar21.jpeg';
import attar22 from '../assets/attar22.jpeg';

const Attar = ({ onAddToCart }) => {
  const attarProducts = [
    {
      id: 'attar-1',
      name: 'Hacivet',
      sub: 'Concentrated Perfume Oil',
      price: 'Rs. 3,500 PKR',
      image: attar1,
      bg: '#f4efe6'
    },
    {
      id: 'attar-2',
      name: 'Office For Men',
      sub: 'Fresh & Executive Attar',
      price: 'Rs. 1,800 PKR',
      image: attar2,
      bg: '#f2eae0'
    },
    {
      id: 'attar-3',
      name: 'Janan Sports',
      sub: 'Energizing Sporty Blend',
      price: 'Rs. 1,800 PKR',
      image: attar3,
      bg: '#f5f0eb'
    },
    {
      id: 'attar-4',
      name: 'Baccarat 540',
      sub: 'Rich Amber & Floral Scent',
      price: 'Rs. 1,600 PKR',
      image: attar4,
      bg: '#efebe4'
    },
    {
      id: 'attar-5',
      name: 'Oud Ul Arab',
      sub: 'Pure Arabian Oud Oil',
      price: 'Rs. 3,500 PKR',
      image: attar5,
      bg: '#f3eee7'
    },
    {
      id: 'attar-6',
      name: 'Legend',
      sub: 'Classic & Timeless Scent',
      price: 'Rs. 1,500 PKR',
      image: attar6,
      bg: '#f1ebe3'
    },
    {
      id: 'attar-7',
      name: 'Romantic Coffee',
      sub: 'Warm & Inviting Aroma',
      price: 'Rs. 2,200 PKR',
      image: attar7,
      bg: '#f4ece1'
    },
    {
      id: 'attar-8',
      name: 'White Oud',
      sub: 'Elegant Soft Woody Notes',
      price: 'Rs. 1,850 PKR',
      image: attar8,
      bg: '#f0ebe6'
    },
    {
      id: 'attar-9',
      name: 'Stronger Amber',
      sub: 'Intense Oriental Amber',
      price: 'Rs. 2,500 PKR',
      image: attar9,
      bg: '#f5eee8'
    },
    {
      id: 'attar-10',
      name: 'Blue Oud',
      sub: 'Deep Aquatic Oud Blend',
      price: 'Rs. 1,800 PKR',
      image: attar10,
      bg: '#ede7df'
    },
    {
      id: 'attar-11',
      name: 'Mushk Mataf',
      sub: 'Sacred Oriental Musk',
      price: 'Rs. 1,850 PKR',
      image: attar11,
      bg: '#f3ece3'
    },
    {
      id: 'attar-12',
      name: 'Husn E Yousaf',
      sub: 'Radiant Floral & Herbal Notes',
      price: 'Rs. 1,000 PKR',
      image: attar12,
      bg: '#f6f0e8'
    },
    {
      id: 'attar-13',
      name: 'Blue Sea',
      sub: 'Cool Aquatic Breeze',
      price: 'Rs. 1,000 PKR',
      image: attar13,
      bg: '#ebf2f5'
    },
    {
      id: 'attar-14',
      name: 'Dirham',
      sub: 'Traditional Arabic Blend',
      price: 'Rs. 1,000 PKR',
      image: attar14,
      bg: '#f2eae1'
    },
    {
      id: 'attar-15',
      name: 'Sabaya',
      sub: 'Delicate Sweet Floral Essence',
      price: 'Rs. 1,000 PKR',
      image: attar15,
      bg: '#f5ebe6'
    },
    {
      id: 'attar-16',
      name: 'Dunhill',
      sub: 'Sophisticated & Refined Notes',
      price: 'Rs. 1,000 PKR',
      image: attar16,
      bg: '#ede8e1'
    },
    {
      id: 'attar-17',
      name: 'Desire Dunhill',
      sub: 'Passionate Woody Fragrance',
      price: 'Rs. 1,400 PKR',
      image: attar17,
      bg: '#f3e9e3'
    },
    {
      id: 'attar-18',
      name: 'Silk Musk',
      sub: 'Smooth & Velvet Musk',
      price: 'Rs. 2,500 PKR',
      image: attar18,
      bg: '#f5efe8'
    },
    {
      id: 'attar-19',
      name: 'Ameer Ul Oud',
      sub: 'Rich Royal Oud Elixir',
      price: 'Rs. 1,600 PKR',
      image: attar19,
      bg: '#eee6dc'
    },
    {
      id: 'attar-20',
      name: 'Gucci Flora',
      sub: 'Blossoming Floral Bouquet',
      price: 'Rs. 1,600 PKR',
      image: attar20,
      bg: '#f4ede6'
    },
    {
      id: 'attar-21',
      name: 'White Musk',
      sub: 'Pure Soft Clean Musk',
      price: 'Rs. 1,600 PKR',
      image: attar21,
      bg: '#f7f2ed'
    },
    {
      id: 'attar-22',
      name: 'Super Sultan',
      sub: 'Majestic Imperial Blend',
      price: 'Rs. 2,200 PKR',
      image: attar22,
      bg: '#f0e8de'
    }
  ];

  return (
    <div className="attar-section">
      <div className="attar-header text-center">
        <span className="attar-tagline">LUXURY ATTAR COLLECTION</span>
        <h2 className="attar-title">PURE ATTARS</h2>
      </div>

      <div className="attar-grid">
        {attarProducts.map((item) => (
          <div key={item.id} className="attar-card">
            <div
              className="attar-img-frame"
              style={{ backgroundColor: item.bg }}
            >
              <img src={item.image} alt={item.name} className="attar-img" />
            </div>

            <div className="attar-info">
              <h3 className="attar-name">{item.name}</h3>
              <p className="attar-sub">{item.sub}</p>
              <span className="attar-price">{item.price}</span>

              <div className="attar-actions">
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

export default Attar;
