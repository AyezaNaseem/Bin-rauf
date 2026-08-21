import React, { useState, useEffect } from 'react';
import { FiX, FiPlus, FiMinus, FiStar, FiShoppingBag, FiArrowRight, FiCheck, FiGift, FiEye } from 'react-icons/fi';
import './itemModal.css';
import giftboxImg from '../assets/giftbox1.jpeg';

const DEFAULT_DESCRIPTION = "Exquisitely crafted using fine ingredients for a long-lasting, luxurious fragrance experience. Handcrafted with devotion by Bin Rauf Luxury Fragrances.";

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

const ItemModal = ({ item, onClose, onAddToCart, onCheckout }) => {
  const [quantity, setQuantity] = useState(1);
  const [includeGiftBox, setIncludeGiftBox] = useState(false);
  const [showGiftBoxLightbox, setShowGiftBoxLightbox] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Key for localStorage reviews
  const storageKey = `binrauf_reviews_${item?.id || item?.name}`;

  const isAttar = isAttarProduct(item);

  useEffect(() => {
    if (!item) return;
    setQuantity(1);
    setIncludeGiftBox(false);
    setShowGiftBoxLightbox(false);
    setFeedbackSubmitted(false);

    // Load real customer reviews from localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Filter out old default sample reviews if present
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

  const baseUnitPrice = parsePriceNum(item.price);
  const giftBoxPrice = 250;
  const currentUnitPrice = baseUnitPrice + (isAttar && includeGiftBox ? giftBoxPrice : 0);
  const formattedUnitPrice = `Rs. ${currentUnitPrice.toLocaleString()} PKR`;

  const handleQtyChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const prepareSubmitItem = () => {
    if (!isAttar || !includeGiftBox) return item;
    return {
      ...item,
      id: `${item.id || item.name}-giftbox`,
      name: `${item.name} (+ Gift Box)`,
      sub: `${item.sub ? item.sub + ' • ' : ''}Includes Signature Gift Box`,
      price: formattedUnitPrice,
      includeGiftBox: true
    };
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

                  {/* Small Giftbox Image Preview Thumbnail */}
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

                <div className="form-input-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-input-group">
                  <textarea
                    placeholder="Write your feedback about this item..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={2}
                    required
                  />
                </div>

                <button type="submit" className="btn-submit-feedback">
                  SUBMIT REVIEW
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* FULL-SIZE GIFT BOX PHOTO LIGHTBOX MODAL */}
      {showGiftBoxLightbox && (
        <div
          className="giftbox-lightbox-overlay"
          onClick={(e) => {
            e.stopPropagation();
            setShowGiftBoxLightbox(false);
          }}
        >
          <div className="giftbox-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="giftbox-lightbox-close-btn"
              onClick={() => setShowGiftBoxLightbox(false)}
              aria-label="Close Lightbox"
            >
              <FiX />
            </button>
            <div className="giftbox-lightbox-img-wrapper">
              <img src={giftboxImg} alt="Bin Rauf Signature Luxury Attar Gift Box" className="giftbox-full-photo" />
            </div>
            <div className="giftbox-lightbox-footer">
              <span className="giftbox-lightbox-title">Bin Rauf Luxury White Marble Gift Box Set</span>
              <span className="giftbox-lightbox-price">Add to Attar order (+ Rs. 250 PKR)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemModal;
