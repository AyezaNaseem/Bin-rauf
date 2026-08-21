
import './shop.css';
import Footer from './footer';
import Perfumes from './perfumes';
import Attar from './attar';
import Cap from './cap';
import OilSerum from './oil&serum';
import BestSellers from './bestsellers';

const Shop = ({ category = 'all', onAddToCart, onViewItem }) => {
  return (
    <div className="shop-page">
      <div className="shop-container">
        {category === 'best-sellers' || category === 'bestsellers' || category === 'best' ? (
          <BestSellers onAddToCart={onAddToCart} onViewItem={onViewItem} />
        ) : category === 'perfumes' ? (
          <Perfumes onAddToCart={onAddToCart} onViewItem={onViewItem} />
        ) : category === 'ittar' || category === 'attar' ? (
          <Attar onAddToCart={onAddToCart} onViewItem={onViewItem} />
        ) : category === 'namaz-caps' || category === 'caps' ? (
          <Cap onAddToCart={onAddToCart} onViewItem={onViewItem} />
        ) : category === 'oil-serum' || category === 'oil&serum' || category === 'oil' || category === 'serum' ? (
          <OilSerum onAddToCart={onAddToCart} onViewItem={onViewItem} />
        ) : (
          <div className="shop-category-view">
            <BestSellers onAddToCart={onAddToCart} onViewItem={onViewItem} />
            <div style={{ marginTop: '60px' }}>
              <Perfumes onAddToCart={onAddToCart} onViewItem={onViewItem} />
            </div>
            <div style={{ marginTop: '60px' }}>
              <Attar onAddToCart={onAddToCart} onViewItem={onViewItem} />
            </div>
            <div style={{ marginTop: '60px' }}>
              <Cap onAddToCart={onAddToCart} onViewItem={onViewItem} />
            </div>
            <div style={{ marginTop: '60px' }}>
              <OilSerum onAddToCart={onAddToCart} onViewItem={onViewItem} />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
