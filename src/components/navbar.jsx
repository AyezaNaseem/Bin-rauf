import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiShoppingBag, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import './navbar.css';
import logoImg from '../assets/logo.png';

const Navbar = ({ activePage = 'home', cartCount = 0, onNavigate, onOpenSearch }) => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileShopExpanded, setIsMobileShopExpanded] = useState(false);

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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleCategoryClick = (category) => {
    setIsShopDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('shop', category);
    }
  };

  const handleNavPage = (page) => {
    setIsShopDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <>
      <nav className="binrauf-navbar">
        {/* Mobile Hamburger Button (Left on Mobile) */}
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <FiMenu />
        </button>

        {/* Desktop Left Menu Links */}
        <ul className="nav-links">
          <li>
            <a
              href="#home"
              className={activePage === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleNavPage('home');
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
                  handleNavPage('shop');
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
                handleNavPage('about');
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
                handleNavPage('contact');
              }}
            >
              CONTACT
            </a>
          </li>
        </ul>

        {/* Center Brand Logo */}
        <div className="nav-logo">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavPage('home');
            }}
          >
            <img src={logoImg} alt="Bin Rauf Logo" className="brand-logo-img" />
            <span>BIN RAUF</span>
          </a>
        </div>

        {/* Right Icons (Search & Cart) */}
        <div className="nav-icons">
          <button
            className="icon-btn"
            aria-label="Search"
            onClick={() => {
              setIsShopDropdownOpen(false);
              setIsMobileMenuOpen(false);
              if (onOpenSearch) onOpenSearch();
            }}
          >
            <FiSearch />
          </button>
          <button
            className="icon-btn cart-icon-btn"
            aria-label="Cart"
            onClick={() => {
              setIsShopDropdownOpen(false);
              setIsMobileMenuOpen(false);
              if (onNavigate) onNavigate('cart');
            }}
          >
            <FiShoppingBag />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-container" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="drawer-logo-wrapper">
                <img src={logoImg} alt="Bin Rauf Logo" className="drawer-logo-img" />
                <span>BIN RAUF</span>
              </div>
              <button
                type="button"
                className="mobile-drawer-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <FiX />
              </button>
            </div>

            <ul className="mobile-drawer-links">
              <li>
                <button
                  type="button"
                  className={`drawer-link-btn ${activePage === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavPage('home')}
                >
                  HOME
                </button>
              </li>

              {/* SHOP WITH ACCORDION */}
              <li className="mobile-shop-accordion">
                <div className="mobile-shop-row">
                  <button
                    type="button"
                    className={`drawer-link-btn ${activePage === 'shop' ? 'active' : ''}`}
                    onClick={() => handleNavPage('shop')}
                  >
                    SHOP
                  </button>
                  <button
                    type="button"
                    className={`accordion-toggle-btn ${isMobileShopExpanded ? 'open' : ''}`}
                    onClick={() => setIsMobileShopExpanded((prev) => !prev)}
                    aria-label="Expand Categories"
                  >
                    <FiChevronDown />
                  </button>
                </div>

                {isMobileShopExpanded && (
                  <ul className="mobile-subcategories-list">
                    <li>
                      <button type="button" onClick={() => handleCategoryClick('perfumes')}>
                        Perfumes
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => handleCategoryClick('ittar')}>
                        Attars
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => handleCategoryClick('namaz-caps')}>
                        Namaz Caps
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={() => handleCategoryClick('oil-serum')}>
                        Oil & Serum
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button
                  type="button"
                  className={`drawer-link-btn ${activePage === 'about' ? 'active' : ''}`}
                  onClick={() => handleNavPage('about')}
                >
                  ABOUT
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className={`drawer-link-btn ${activePage === 'contact' ? 'active' : ''}`}
                  onClick={() => handleNavPage('contact')}
                >
                  CONTACT
                </button>
              </li>
            </ul>

            <div className="mobile-drawer-footer">
              <span>LUXURY ISLAMIC ESSENTIALS & FRAGRANCES</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;