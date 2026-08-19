import React from 'react';
import './shop.css';
import Footer from './footer';
import Perfumes from './perfumes';
import Attar from './attar';
import Giftboxes from './giftboxes';
import Cap from './cap';
import OilSerum from './oil&serum';

const Shop = ({ category = 'all', onAddToCart }) => {
  return (
    <div className="shop-page">
      <div className="shop-container">
        {category === 'perfumes' ? (
          <Perfumes onAddToCart={onAddToCart} />
        ) : category === 'ittar' || category === 'attar' ? (
          <Attar onAddToCart={onAddToCart} />
        ) : category === 'giftboxes' || category === 'attar-giftboxes' ? (
          <Giftboxes onAddToCart={onAddToCart} />
        ) : category === 'namaz-caps' || category === 'caps' ? (
          <Cap onAddToCart={onAddToCart} />
        ) : category === 'oil-serum' || category === 'oil&serum' || category === 'oil' || category === 'serum' ? (
          <OilSerum onAddToCart={onAddToCart} />
        ) : (
          <div className="shop-category-view">
            <Perfumes onAddToCart={onAddToCart} />
            <div style={{ marginTop: '60px' }}>
              <Attar onAddToCart={onAddToCart} />
            </div>
            <div style={{ marginTop: '60px' }}>
              <Giftboxes onAddToCart={onAddToCart} />
            </div>
            <div style={{ marginTop: '60px' }}>
              <Cap onAddToCart={onAddToCart} />
            </div>
            <div style={{ marginTop: '60px' }}>
              <OilSerum onAddToCart={onAddToCart} />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
