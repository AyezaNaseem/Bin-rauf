import React, { useState } from 'react';
import './cap.css';

import cap1 from '../assets/cap1.jpeg';
import cap2 from '../assets/cap2.jpeg';
import cap3 from '../assets/cap3.jpeg';
import cap4 from '../assets/cap4.jpeg';

import royal1 from '../assets/royal1.jpeg';
import royal2 from '../assets/royal2.jpeg';

import classic1 from '../assets/classic1.jpeg';
import classic2 from '../assets/classic2.jpeg';
import classic3 from '../assets/classic3.jpeg';
import classic4 from '../assets/classic4.jpeg';

import midnight1 from '../assets/midnight1.jpeg';
import midnight2 from '../assets/midnight2.jpeg';
import midnight3 from '../assets/midnight3.jpeg';

import sultan1 from '../assets/sultan1.jpeg';
import sultan2 from '../assets/sultan2.jpeg';

const Cap = ({ onAddToCart, onViewItem }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const capProducts = [
    {
      id: 'cap-1',
      name: 'The Royal Bronze Edition',
      sub: 'Handcrafted Velvet Namaz Cap',
      price: 'Rs. 1,050 PKR',
      bg: '#f4efe6',
      variants: [
        { id: 'default', name: 'Original Bronze', image: cap1 },
        { id: 'royal-1', name: 'Royal Variant 1', image: royal1 },
        { id: 'royal-2', name: 'Royal Variant 2', image: royal2 }
      ]
    },
    {
      id: 'cap-2',
      name: 'Noir Classic Cap',
      sub: 'Premium Black Embroidered Cap',
      price: 'Rs. 1,050 PKR',
      bg: '#ede8e1',
      variants: [
        { id: 'default', name: 'Classic Black', image: cap2 },
        { id: 'classic-1', name: 'Classic Variant 1', image: classic1 },
        { id: 'classic-2', name: 'Classic Variant 2', image: classic2 },
        { id: 'classic-3', name: 'Classic Variant 3', image: classic3 },
        { id: 'classic-4', name: 'Classic Variant 4', image: classic4 }
      ]
    },
    {
      id: 'cap-3',
      name: 'Royal Midnight Cap',
      sub: 'Traditional Deep Navy Cap',
      price: 'Rs. 1,000 PKR',
      bg: '#f0ebe6',
      variants: [
        { id: 'default', name: 'Deep Navy', image: cap3 },
        { id: 'midnight-1', name: 'Midnight Variant 1', image: midnight1 },
        { id: 'midnight-2', name: 'Midnight Variant 2', image: midnight2 },
        { id: 'midnight-3', name: 'Midnight Variant 3', image: midnight3 }
      ]
    },
    {
      id: 'cap-4',
      name: 'Sultan Ivory Cap',
      sub: 'Bespoke Handcrafted Namaz Cap',
      price: 'Rs. 1,100 PKR',
      bg: '#f5eee8',
      variants: [
        { id: 'default', name: 'Ivory White', image: cap4 },
        { id: 'sultan-1', name: 'Sultan Variant 1', image: sultan1 },
        { id: 'sultan-2', name: 'Sultan Variant 2', image: sultan2 }
      ]
    }
  ];

  const getActiveVariant = (product) => {
    return selectedVariants[product.id] || product.variants[0];
  };

  const handleSelectVariant = (productId, variant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variant
    }));
  };

  const handleViewItem = (product) => {
    const activeVar = getActiveVariant(product);
    const itemToCart = {
      id: `${product.id}-${activeVar.id}`,
      name: `${product.name} (${activeVar.name})`,
      sub: product.sub,
      price: product.price,
      image: activeVar.image,
      bg: product.bg
    };
    if (onViewItem) {
      onViewItem(itemToCart);
    } else if (onAddToCart) {
      onAddToCart(itemToCart);
    }
  };

  return (
    <div className="cap-section">
      <div className="cap-header text-center">
        <span className="cap-tagline">ISLAMIC ESSENTIALS</span>
        <h2 className="cap-title">NAMAZ CAPS</h2>
      </div>

      <div className="cap-grid">
        {capProducts.map((product) => {
          const activeVariant = getActiveVariant(product);

          return (
            <div key={product.id} className="cap-card">
              <div
                className="cap-img-frame"
                style={{ backgroundColor: product.bg }}
              >
                <img
                  src={activeVariant.image}
                  alt={product.name}
                  className="cap-img"
                />
              </div>

              <div className="cap-info">
                <h3 className="cap-name">{product.name}</h3>
                <p className="cap-sub">{product.sub}</p>

                {/* COLOR VARIANT SELECTION SWATCHES */}
                <div className="color-variants-wrapper">
                  <span className="variant-label">Available Colors:</span>
                  <div className="color-swatches-grid">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        className={`swatch-btn ${activeVariant.id === variant.id ? 'active' : ''}`}
                        onClick={() => handleSelectVariant(product.id, variant)}
                        title={variant.name}
                      >
                        <img src={variant.image} alt={variant.name} />
                      </button>
                    ))}
                  </div>
                </div>

                <span className="cap-price" style={{ marginTop: '10px' }}>
                  {product.price}
                </span>

                <div className="cap-actions">
                  <button
                    type="button"
                    className="btn-add-cart"
                    onClick={() => handleViewItem(product)}
                  >
                    VIEW ITEM
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cap;
