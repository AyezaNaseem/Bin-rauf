import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiHeart, FiShoppingBag, FiChevronDown } from 'react-icons/fi';
import './navbar.css';
import logoImg from '../assets/logo.png'; // Ensure the path matches your assets folder

const Navbar = ({ activePage = 'home', cartCount = 0, onNavigate }) => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShopDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setIsShopDropdownOpen(false);
    if (onNavigate) {
      onNavigate('shop', category);
    }
  };

  return (
    <nav className="binrauf-navbar">
      {/* Left Menu Links */}
      <ul className="nav-links">
        <li>
          <a
            href="#home"
            className={activePage === 'home' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setIsShopDropdownOpen(false);
              if (onNavigate) onNavigate('home');
            }}
          >
            HOME
          </a>
        </li>

        {/* SHOP LINK WITH DROPDOWN BUTTON */}
        <li className="nav-item-dropdown" ref={dropdownRef}>
          <div className="shop-link-wrapper">
            <a
              href="#shop"
              className={activePage === 'shop' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('shop');
              }}
            >
              SHOP
            </a>
            <button
              type="button"
              className={`dropdown-toggle-btn ${isShopDropdownOpen ? 'open' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsShopDropdownOpen((prev) => !prev);
              }}
              aria-label="Toggle Shop Categories"
            >
              <FiChevronDown />
            </button>
          </div>

          {/* DROPDOWN MENU OPTIONS */}
          {isShopDropdownOpen && (
            <ul className="shop-dropdown-menu">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('perfumes')}
                >
                  Perfumes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('ittar')}
                >
                  Attar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('giftboxes')}
                >
                  Attar Giftboxes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('namaz-caps')}
                >
                  Namaz Caps
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('oil-serum')}
                >
                  Oil & Serum
                </button>
              </li>
            </ul>
          )}
        </li>

        <li>
          <a
            href="#about"
            className={activePage === 'about' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setIsShopDropdownOpen(false);
              if (onNavigate) onNavigate('about');
            }}
          >
            ABOUT
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={activePage === 'contact' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setIsShopDropdownOpen(false);
              if (onNavigate) onNavigate('contact');
            }}
          >
            CONTACT
          </a>
        </li>
      </ul>

      {/* Center Brand Logo with Calligraphy Symbol */}
      <div className="nav-logo">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setIsShopDropdownOpen(false);
            if (onNavigate) onNavigate('home');
          }}
        >
          <img src={logoImg} alt="Bin Rauf Logo" className="brand-logo-img" />
          <span>BIN RAUF</span>
        </a>
      </div>

      {/* Right Icons */}
      <div className="nav-icons">
        <button className="icon-btn" aria-label="Search">
          <FiSearch />
        </button>
        <button
          className="icon-btn cart-icon-btn"
          aria-label="Cart"
          onClick={() => {
            setIsShopDropdownOpen(false);
            if (onNavigate) onNavigate('cart');
          }}
        >
          <FiShoppingBag />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;