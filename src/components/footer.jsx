import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="binrauf-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2 className="footer-logo">BIN RAUF</h2>
          <p className="footer-motto">
            Crafting the quiet luxury of bespoke fragrances and timeless heritage.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4>COLLECTIONS</h4>
            <ul>
              <li><a href="#oud">Oud Collection</a></li>
              <li><a href="#attar">Attar Oils</a></li>
              <li><a href="#bespoke">Bespoke Editions</a></li>
              <li><a href="#home">Home Fragrances</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>HERITAGE</h4>
            <ul>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#journal">The Journal</a></li>
              <li><a href="#craft">Artisanal Craft</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>CLIENT CARE</h4>
            <ul>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#shipping">Shipping & Delivery</a></li>
              <li><a href="#boutiques">Boutique Locator</a></li>
              <li><a href="#faq">FAQs</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BIN RAUF LUXURY FRAGRANCES. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;