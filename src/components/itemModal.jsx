import React, { useState, useEffect } from 'react';
import { FiX, FiPlus, FiMinus, FiStar, FiShoppingBag, FiArrowRight, FiCheck, FiGift, FiEye } from 'react-icons/fi';
import './itemModal.css';
import giftboxImg from '../assets/giftbox1.jpeg';
import capSizeChartImg from '../assets/cap-size-chart.jpg';

const DEFAULT_DESCRIPTION = "Exquisitely crafted using fine ingredients for a long-lasting, luxurious fragrance experience. Handcrafted with devotion by Bin Rauf Luxury Fragrances.";

const CAP_SIZES = [
  '52 / 20',
  '53 / 20.5',
  '54 / 21',
  '55 / 21.5',
  '56 / 22',
  '57 / 22.5',
  '58 / 23',
  '59 / 23.5'
];

// Exact 6ML Prices Mapping for all 22 Attars
const ATTAR_6ML_PRICES = {
  'attar-1': 1900,  // Hacivet
  'attar-2': 1050,  // Office For Men
  'attar-3': 1050,  // Janan Sports
  'attar-4': 950,   // Baccarat 540
  'attar-5': 1900,  // Oud Ul Arab
  'attar-6': 900,   // Legend
  'attar-7': 1050,  // Romantic Coffee
  'attar-8': 950,   // White Oud
  'attar-9': 1400,  // Stronger Amber
  'attar-10': 1050, // Blue Oud
  'attar-11': 1050, // Mushk Mataf
  'attar-12': 700,  // Husn E Yousaf
  'attar-13': 700,  // Blue Sea
  'attar-14': 700,  // Dirham
  'attar-15': 700,  // Sabaya
  'attar-16': 700,  // Dunhill
  'attar-17': 850,  // Desire Dunhill
  'attar-18': 1400, // Silk Musk
  'attar-19': 950,  // Ameer Ul Oud
  'attar-20': 950,  // Gucci Flora
  'attar-21': 950,  // White Musk
  'attar-22': 1250  // Super Sultan
};

const RulerIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0l12.6 12.6z"></path>
    <line x1="14.5" y1="12.5" x2="16.5" y2="10.5"></line>
    <line x1="11.5" y1="9.5" x2="13.5" y2="7.5"></line>
    <line x1="8.5" y1="6.5" x2="10.5" y2="4.5"></line>
  </svg>
);

const parsePriceNum = (str) => {
  if (typeof str === 'number') return str;
  if (!str) return 0;
  return parseInt(str.toString().replace(/[^0-9]/g, ''), 10) || 0;
};

const isAttarProduct = (item) => {
  if (!item) return false;
  if (item.category === 'attar' || item.category === 'ittar') return true;
  if (typeof item.id === 'string' && item.id.startsWith('attar-')) return true;
  if (item.id === 'best-2' || item.id === 'best-3') return true;
  return false;
};

const isCapProduct = (item) => {
  if (!item) return false;
  if (item.category === 'namaz-caps' || item.category === 'caps' || item.category === 'cap') return true;
  if (typeof item.id === 'string' && (item.id.startsWith('cap-') || item.id.startsWith('namaz-cap-') || item.id.startsWith('cap'))) return true;
  if (item.name && (item.name.toLowerCase().includes('cap') || item.name.toLowerCase().includes('namaz'))) return true;
  return false;
};

const getAttarPrice = (item, size, includeGiftBox) => {
  let basePrice = parsePriceNum(item.price);
  if (size === '6ML') {
    if (item.id && ATTAR_6ML_PRICES[item.id]) {
      basePrice = ATTAR_6ML_PRICES[item.id];
    } else {
      const nameLower = (item.name || '').toLowerCase();
      if (nameLower.includes('hacivet')) basePrice = 1900;
      else if (nameLower.includes('office')) basePrice = 1050;
      else if (nameLower.includes('janan')) basePrice = 1050;
      else if (nameLower.includes('baccarat') || nameLower.includes('bacarat')) basePrice = 950;
      else if (nameLower.includes('arab')) basePrice = 1900;
      else if (nameLower.includes('legend')) basePrice = 900;
      else if (nameLower.includes('coffee') || nameLower.includes('romantic')) basePrice = 1050;
      else if (nameLower.includes('white oud')) basePrice = 950;
      else if (nameLower.includes('stronger')) basePrice = 1400;
      else if (nameLower.includes('blue oud')) basePrice = 1050;
      else if (nameLower.includes('mataf') || nameLower.includes('mushk')) basePrice = 1050;
      else if (nameLower.includes('yousaf') || nameLower.includes('husn')) basePrice = 700;
      else if (nameLower.includes('blue sea')) basePrice = 700;
      else if (nameLower.includes('dirham') || nameLower.includes('dirhum')) basePrice = 700;
      else if (nameLower.includes('sabaya')) basePrice = 700;
      else if (nameLower.includes('desire')) basePrice = 850;
      else if (nameLower.includes('dunhill')) basePrice = 700;
      else if (nameLower.includes('silk')) basePrice = 1400;
      else if (nameLower.includes('ameer')) basePrice = 950;
      else if (nameLower.includes('flora') || nameLower.includes('gucci')) basePrice = 950;
      else if (nameLower.includes('white musk')) basePrice = 950;
      else if (nameLower.includes('sultan')) basePrice = 1250;
    }
  }
  const giftBoxPrice = includeGiftBox ? 250 : 0;
  return basePrice + giftBoxPrice;
};

const ItemModal = ({ item, onClose, onAddToCart, onCheckout }) => {
  const [quantity, setQuantity] = useState(1);
  const [includeGiftBox, setIncludeGiftBox] = useState(false);
  const [showGiftBoxLightbox, setShowGiftBoxLightbox] = useState(false);
  const [selectedAttarSize, setSelectedAttarSize] = useState('12ML');
  const [selectedCapSize, setSelectedCapSize] = useState('53 / 20.5');
  const [showSizeChartLightbox, setShowSizeChartLightbox] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Key for localStorage reviews
  const storageKey = `binrauf_reviews_${item?.id || item?.name}`;

  const isAttar = isAttarProduct(item);
  const isCap = isCapProduct(item);

  useEffect(() => {
    if (!item) return;
    setQuantity(1);
    setIncludeGiftBox(false);
    setShowGiftBoxLightbox(false);
    setShowSizeChartLightbox(false);
    setSelectedAttarSize('12ML');
    setSelectedCapSize('53 / 20.5');
    setFeedbackSubmitted(false);

    // Load real customer reviews from localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const realReviews = parsed.filter(r => r.name !== "Hamza Ahmed" && r.name !== "Usman Khan");
        setReviews(realReviews);
      } catch (e) {
        setReviews([]);
      }
    } else {
      setReviews([]);
    }
  }, [item, storageKey]);

  if (!item) return null;

  const currentUnitPrice = isAttar 
    ? getAttarPrice(item, selectedAttarSize, includeGiftBox)
    : parsePriceNum(item.price);
    
  const formattedUnitPrice = `Rs. ${currentUnitPrice.toLocaleString()} PKR`;

  const handleQtyChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const prepareSubmitItem = () => {
    let newItem = { ...item };
    if (isAttar) {
      const finalPriceNum = getAttarPrice(item, selectedAttarSize, includeGiftBox);
      const cleanSizeId = selectedAttarSize.toLowerCase();
      newItem = {
        ...newItem,
        id: `${newItem.id || newItem.name}-${cleanSizeId}${includeGiftBox ? '-giftbox' : ''}`,
        name: `${newItem.name} (${selectedAttarSize}${includeGiftBox ? ' + Gift Box' : ''})`,
        sub: `Size: ${selectedAttarSize}${includeGiftBox ? ' • Includes Luxury Gift Box' : ''}`,
        price: `Rs. ${finalPriceNum.toLocaleString()} PKR`,
        selectedSize: selectedAttarSize,
        includeGiftBox: includeGiftBox
      };
    }
    if (isCap) {
      const cleanSizeId = selectedCapSize.replace(/[^a-zA-Z0-9]/g, '');
      newItem = {
        ...newItem,
        id: `${newItem.id || newItem.name}-size-${cleanSizeId}`,
        name: newItem.name,
        selectedSize: selectedCapSize,
        sub: `Size: ${selectedCapSize} (CM / INCH)`
      };
    }
    return newItem;
  };

  const handleAddToCartClick = () => {
    const finalItem = prepareSubmitItem();
    if (onAddToCart) {
      onAddToCart(finalItem, quantity);
    }
  };

  const handleCheckoutClick = () => {
    const finalItem = prepareSubmitItem();
    if (onCheckout) {
      onCheckout(finalItem, quantity);
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev = {
      id: Date.now(),
      name: newName.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: "Just now"
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setNewName('');
    setNewComment('');
    setNewRating(5);
    setFeedbackSubmitted(true);

    setTimeout(() => {
      setFeedbackSubmitted(false);
    }, 4000);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="item-modal-overlay" onClick={onClose}>
      <div className="item-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className="item-modal-close-btn" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        <div className="item-modal-body">
          {/* Left Column: Image Frame */}
          <div className="item-modal-image-col">
            <div className="item-modal-img-frame" style={{ backgroundColor: item.bg || '#f4efe6' }}>
              <img src={item.image} alt={item.name} className="item-modal-img" />
            </div>
          </div>

          {/* Right Column: Content & Actions */}
          <div className="item-modal-info-col">
            <span className="item-modal-tagline">BIN RAUF LUXURY</span>
            <h2 className="item-modal-title">{item.name}</h2>
            {item.sub && <p className="item-modal-subtitle">{item.sub}</p>}

            {/* Description (Right below item name & subtitle) */}
            <div className="item-modal-description-box">
              <p>{item.description || DEFAULT_DESCRIPTION}</p>
            </div>

            {/* ATTAR PACKAGING SIZE SELECTION - ONLY DISPLAYED FOR ATTARS */}
            {isAttar && (
              <div className="item-modal-attar-size-wrapper">
                <label className="attar-size-header-label">
                  PACKAGING SIZE: <strong>{selectedAttarSize}</strong>
                </label>
                <div className="attar-size-options">
                  <button
                    type="button"
                    className={`attar-size-option-btn ${selectedAttarSize === '6ML' ? 'active' : ''}`}
                    onClick={() => setSelectedAttarSize('6ML')}
                  >
                    <span className="attar-size-title">6 ML</span>
                    <span className="attar-size-price">Rs. {getAttarPrice(item, '6ML', false).toLocaleString()}</span>
                  </button>

                  <button
                    type="button"
                    className={`attar-size-option-btn ${selectedAttarSize === '12ML' ? 'active' : ''}`}
                    onClick={() => setSelectedAttarSize('12ML')}
                  >
                    <span className="attar-size-title">12 ML</span>
                    <span className="attar-size-price">Rs. {getAttarPrice(item, '12ML', false).toLocaleString()}</span>
                  </button>
                </div>
              </div>
            )}

            {/* CAP SIZE SELECTION - ONLY DISPLAYED FOR NAMAZ CAPS */}
            {isCap && (
              <div className="item-modal-cap-size-wrapper">
                <div className="cap-size-header">
                  <span className="cap-size-title">
                    CM / INCHES: <strong>{selectedCapSize}</strong>
                  </span>
                  <button
                    type="button"
                    className="btn-view-size-chart"
                    onClick={() => setShowSizeChartLightbox(true)}
                  >
                    <RulerIcon /> View Size Chart
                  </button>
                </div>

                <div className="cap-size-grid">
                  {CAP_SIZES.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`cap-size-btn ${selectedCapSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedCapSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Gift Box Option Selection - ONLY DISPLAYED FOR ATTAR PRODUCTS */}
            {isAttar && (
              <div className="item-modal-giftbox-wrapper">
                <div className="giftbox-option-card">
                  <label className="giftbox-checkbox-area">
                    <input
                      type="checkbox"
                      checked={includeGiftBox}
                      onChange={(e) => setIncludeGiftBox(e.target.checked)}
                    />
                    <span className="giftbox-custom-check"></span>
                  </label>

                  <div
                    className="giftbox-thumb-box"
                    onClick={() => setShowGiftBoxLightbox(true)}
                    title="Click to view full Gift Box photo"
                  >
                    <img src={giftboxImg} alt="Bin Rauf Attar Gift Box" className="giftbox-thumb-img" />
                    <span className="giftbox-thumb-hover-icon">
                      <FiEye />
                    </span>
                  </div>

                  <div className="giftbox-option-info">
                    <label
                      className="giftbox-title-label"
                      onClick={() => setIncludeGiftBox((prev) => !prev)}
                    >
                      <FiGift className="gift-icon" /> Include Luxury Attar Gift Box (+ Rs. 250 PKR)
                    </label>
                    <span className="giftbox-option-sub">
                      Presented in Bin Rauf signature handcrafted white marble gift set box.
                    </span>
                    <button
                      type="button"
                      className="btn-view-giftbox-photo"
                      onClick={() => setShowGiftBoxLightbox(true)}
                    >
                      <FiEye /> View Gift Box Photo
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Selector & Price Block */}
            <div className="item-modal-qty-price-row">
              <div className="item-modal-quantity-wrapper">
                <label className="qty-label">Quantity:</label>
                <div className="modal-qty-control">
                  <button
                    type="button"
                    className="modal-qty-btn"
                    onClick={() => handleQtyChange(-1)}
                  >
                    <FiMinus />
                  </button>
                  <span className="modal-qty-value">{quantity}</span>
                  <button
                    type="button"
                    className="modal-qty-btn"
                    onClick={() => handleQtyChange(1)}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <div className="item-modal-price-box">
                <span className="item-modal-price">{formattedUnitPrice}</span>
                {reviews.length > 0 && (
                  <div className="item-modal-rating-badge">
                    <FiStar className="star-filled" />
                    <span>{avgRating} ({reviews.length})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="item-modal-actions">
              <button
                type="button"
                className="btn-modal-add-cart"
                onClick={handleAddToCartClick}
              >
                <FiShoppingBag /> ADD TO CART
              </button>

              <button
                type="button"
                className="btn-modal-checkout"
                onClick={handleCheckoutClick}
              >
                CHECK OUT <FiArrowRight />
              </button>
            </div>

            {/* Customer Feedback Section */}
            <div className="item-modal-feedback-section">
              <h4 className="feedback-section-title">Customer Feedback & Reviews</h4>

              {/* Reviews List */}
              {reviews.length > 0 && (
                <div className="reviews-list">
                  {reviews.slice(0, 3).map((rev) => (
                    <div key={rev.id} className="review-card">
                      <div className="review-header">
                        <strong className="review-author">{rev.name}</strong>
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <div className="review-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            className={star <= rev.rating ? 'star-filled' : 'star-empty'}
                          />
                        ))}
                      </div>
                      <p className="review-comment">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Write Feedback Form */}
              <form onSubmit={handleAddReview} className="feedback-form">
                <span className="feedback-form-title">Leave Your Feedback</span>

                {feedbackSubmitted && (
                  <div className="feedback-success-msg">
                    <FiCheck /> Thank you! Your feedback has been posted.
                  </div>
                )}

                <div className="form-rating-row">
                  <label>Your Rating:</label>
                  <div className="rating-select-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="star-btn"
                        onClick={() => setNewRating(star)}
                      >
                        <FiStar className={star <= newRating ? 'star-filled' : 'star-empty'} />
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="feedback-input"
                  required
                />

                <textarea
                  rows="3"
                  placeholder="Write your feedback..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="feedback-textarea"
                  required
                ></textarea>

                <button type="submit" className="btn-submit-review">
                  SUBMIT REVIEW
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Box Lightbox Overlay */}
      {showGiftBoxLightbox && (
        <div className="giftbox-lightbox-overlay" onClick={() => setShowGiftBoxLightbox(false)}>
          <div className="giftbox-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="giftbox-lightbox-close-btn"
              onClick={() => setShowGiftBoxLightbox(false)}
            >
              <FiX />
            </button>
            <div className="giftbox-lightbox-img-wrapper">
              <img src={giftboxImg} alt="Bin Rauf Attar Gift Box" className="giftbox-full-photo" />
            </div>
            <div className="giftbox-lightbox-footer">
              <h4 className="giftbox-lightbox-title">Bin Rauf Signature Attar Gift Box</h4>
              <span className="giftbox-lightbox-price">+ Rs. 250 PKR</span>
              <p style={{ fontSize: '0.8rem', color: '#666', margin: '4px 0 0 0' }}>
                Handcrafted white marble presentation box with golden embossing. Perfect for luxury gifting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Size Chart Lightbox Overlay */}
      {showSizeChartLightbox && (
        <div className="giftbox-lightbox-overlay" onClick={() => setShowSizeChartLightbox(false)}>
          <div className="giftbox-lightbox-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <button
              type="button"
              className="giftbox-lightbox-close-btn"
              onClick={() => setShowSizeChartLightbox(false)}
              aria-label="Close Size Chart"
            >
              <FiX />
            </button>
            <div className="giftbox-lightbox-img-wrapper" style={{ maxHeight: '460px', background: '#faf7f2' }}>
              <img src={capSizeChartImg} alt="Bin Rauf Namaz Cap Size Chart" className="giftbox-full-photo" style={{ objectFit: 'contain' }} />
            </div>
            <div className="giftbox-lightbox-footer" style={{ textAlign: 'center' }}>
              <h4 className="giftbox-lightbox-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', margin: '0 0 2px 0' }}>BIN RAUF NAMAZ CAP SIZE CHART</h4>
              <span className="giftbox-lightbox-price" style={{ fontSize: '0.78rem', color: '#666', fontWeight: '400' }}>
                Take a soft measuring tape above your eyebrows & ears. Note measurement in CM or INCHES.
              </span>
              <button
                type="button"
                className="btn-close-size-chart-footer"
                onClick={() => setShowSizeChartLightbox(false)}
              >
                CLOSE SIZE CHART
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemModal;
