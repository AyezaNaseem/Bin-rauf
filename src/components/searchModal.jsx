import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { ALL_PRODUCTS } from '../data/products';
import './searchModal.css';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'perfumes', label: 'Perfumes' },
  { id: 'attar', label: 'Attars' },
  { id: 'caps', label: 'Namaz Caps' },
  { id: 'oil-serum', label: 'Oil & Serum' }
];

const SearchModal = ({ onClose, onViewItem }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    // Category match
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    // Search query match
    const q = query.trim().toLowerCase();
    if (!q) return matchesCategory;

    const nameMatch = product.name.toLowerCase().includes(q);
    const subMatch = product.sub ? product.sub.toLowerCase().includes(q) : false;
    const categoryMatch = product.categoryLabel
      ? product.categoryLabel.toLowerCase().includes(q)
      : false;

    return matchesCategory && (nameMatch || subMatch || categoryMatch);
  });

  const handleSelectProduct = (product) => {
    onClose();
    if (onViewItem) {
      onViewItem(product);
    }
  };

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header Search Input */}
        <div className="search-modal-header">
          <div className="search-input-box">
            <FiSearch className="search-input-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search perfumes, attars, caps, oils, or bestsellers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input-field"
            />
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery('')}
                aria-label="Clear Search"
              >
                <FiX />
              </button>
            )}
          </div>

          <button
            type="button"
            className="search-modal-close-btn"
            onClick={onClose}
            aria-label="Close Search"
          >
            <FiX />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="search-category-chips">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`chip-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results Body */}
        <div className="search-modal-results-body">
          <div className="results-header-info">
            <span className="results-count-text">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </span>
            {query && (
              <span className="search-for-query">
                matching "<strong>{query}</strong>"
              </span>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-search-results">
              <FiSearch className="no-results-icon" />
              <h3>No products found</h3>
              <p>Try searching for "Oud", "Hacivet", "Amber", "Cap", or "Serum".</p>
              <div className="quick-suggest-buttons">
                <button type="button" onClick={() => setQuery('Oud')}>Search Oud</button>
                <button type="button" onClick={() => setQuery('Musk')}>Search Musk</button>
                <button type="button" onClick={() => setQuery('Cap')}>Search Caps</button>
                <button type="button" onClick={() => setQuery('Serum')}>Search Serums</button>
              </div>
            </div>
          ) : (
            <div className="search-results-grid">
              {filteredProducts.map((item) => (
                <div key={item.id} className="search-result-card">
                  <div
                    className="search-result-img-frame"
                    style={{ backgroundColor: item.bg || '#f4efe6' }}
                  >
                    {item.categoryLabel && (
                      <span className="search-category-badge">{item.categoryLabel}</span>
                    )}
                    <img src={item.image} alt={item.name} className="search-result-img" />
                  </div>

                  <div className="search-result-info">
                    <h4 className="search-result-name">{item.name}</h4>
                    <p className="search-result-sub">{item.sub}</p>
                    <span className="search-result-price">{item.price}</span>

                    <button
                      type="button"
                      className="btn-search-view-item"
                      onClick={() => handleSelectProduct(item)}
                    >
                      VIEW ITEM
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
