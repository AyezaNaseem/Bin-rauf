import React, { useState } from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiCheckCircle, FiLock } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import Footer from './footer';
import './cart.css';

export const parsePrice = (priceStr) => {
  if (typeof priceStr === 'number') return priceStr;
  if (!priceStr) return 0;
  const numeric = priceStr.replace(/[^0-9]/g, '');
  return parseInt(numeric, 10) || 0;
};

export const formatPrice = (num) => {
  return `Rs. ${num.toLocaleString()} PKR`;
};

const Cart = ({ cartItems = [], onUpdateQuantity, onRemoveItem, onClearCart, onNavigate }) => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasOilSerum = cartItems.some(
    (item) =>
      item.category === 'oil-serum' ||
      (item.id && (item.id.toString().startsWith('serum') || item.id.toString().startsWith('oil'))) ||
      (item.name && (item.name.toLowerCase().includes('serum') || item.name.toLowerCase().includes('oil')))
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * (item.quantity || 1),
    0
  );

  // Delivery Charges: Free for Oil & Serum items, else Rs. 300 PKR
  const deliveryCharges = hasOilSerum ? 0 : (subtotal > 0 ? 300 : 0);

  // 10% Discount for shopping over Rs. 10,000
  const isDiscountEligible = subtotal >= 10000;
  const discountAmount = isDiscountEligible ? Math.round(subtotal * 0.10) : 0;

  const total = subtotal - discountAmount + deliveryCharges;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsSending(true);

    // Prepare Items List String for Email
    const itemsSummary = cartItems
      .map((item) => `${item.name} x${item.quantity || 1} - ${formatPrice(parsePrice(item.price) * (item.quantity || 1))}`)
      .join('\n');

    // EmailJS Template Dynamic Parameters
    const templateParams = {
      to_email: 'binraufofficials@gmail.com', // Official Target Email
      user_name: `${formData.firstName} ${formData.lastName}`,
      user_phone: formData.phone,
      user_email: formData.emailOrPhone,
      user_address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}`,
      user_city: formData.city,
      order_items: itemsSummary,
      delivery_charges: hasOilSerum ? 'FREE (Oil & Serum Offer)' : '300 PKR',
      discount_amount: isDiscountEligible ? formatPrice(discountAmount) : 'None',
      total_amount: formatPrice(total),
      payment_method: paymentMethod.toUpperCase() + (transactionId ? ` (TID: ${transactionId})` : '')
    };

    // Send Email via EmailJS
    emailjs.send(
      'service_1jidq0e',      // Yahan apni new Service ID lagayein
      'template_avrvgar',     // Yahan apni Template ID lagayein
      templateParams,
      'F2GRIU4Hdesj55YbI'       // Yahan apni Public Key lagayein
    )
    .then(() => {
      setIsSending(false);
      setIsSubmitted(true);
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      setIsSending(false);
      alert('Order place karne me masla aaya hai. Kripya dubara koshish karein.');
    });
  };

  if (isSubmitted) {
    return (
      <div className="cart-page">
        <div className="order-success-container">
          <FiCheckCircle className="success-icon" />
          <h2 className="success-title">Order Placed Successfully!</h2>
          <p className="success-desc">
            Thank you for shopping with <strong>Bin Rauf Luxury Fragrances</strong>. We have received your order and will contact you shortly to confirm delivery.
          </p>
          <div className="order-details-box">
            <p><strong>Customer Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Delivery Address:</strong> {formData.address}, {formData.city}</p>
            <p><strong>Subtotal:</strong> {formatPrice(subtotal)}</p>
            {isDiscountEligible && (
              <p style={{ color: '#2e7d32' }}><strong>10% Discount:</strong> -{formatPrice(discountAmount)}</p>
            )}
            <p><strong>Delivery Charges:</strong> {hasOilSerum ? 'FREE (Oil & Serum Offer)' : 'Rs. 300 PKR'}</p>
            <p><strong>Total Amount:</strong> {formatPrice(total)}</p>
            <p><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</p>
            {transactionId && <p><strong>Transaction ID:</strong> {transactionId}</p>}
          </div>
          <button
            type="button"
            className="btn-continue-shop"
            onClick={() => {
              onClearCart();
              if (onNavigate) onNavigate('shop');
            }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header Title */}
        <div className="cart-header-title">
          <span className="cart-tagline">BIN RAUF</span>
          <h2>CART & CHECKOUT</h2>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart-view">
            <FiShoppingBag className="empty-cart-icon" />
            <h3>Your Shopping Cart is Empty</h3>
            <p>Explore our exclusive collection of perfumes, attars, and oils.</p>
            <button
              type="button"
              className="btn-continue-shop"
              onClick={() => onNavigate && onNavigate('shop')}
            >
              EXPLORE PRODUCTS
            </button>
          </div>
        ) : (
          <div className="cart-checkout-grid">
            {/* LEFT COLUMN: Order Summary */}
            <div className="order-summary-column">
              <h3 className="section-subtitle">Order Summary</h3>

              <div className="cart-items-list">
                {cartItems.map((item) => {
                  const itemPrice = parsePrice(item.price);
                  const qty = item.quantity || 1;
                  return (
                    <div key={item.id || item.name} className="cart-item-card">
                      <div className="cart-item-img-wrapper" style={{ backgroundColor: item.bg || '#f4efe6' }}>
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                      </div>
                      <div className="cart-item-details">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <p className="cart-item-sub">{item.sub}</p>
                        <span className="cart-item-unit-price">{formatPrice(itemPrice)}</span>

                        <div className="quantity-controls">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id || item.name, -1)}
                          >
                            <FiMinus />
                          </button>
                          <span className="qty-val">{qty}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id || item.name, 1)}
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-right">
                        <span className="cart-item-total">{formatPrice(itemPrice * qty)}</span>
                        <button
                          type="button"
                          className="btn-remove-item"
                          onClick={() => onRemoveItem(item.id || item.name)}
                          title="Remove Item"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promos & Offer Banners */}
              <div className="cart-promos-container">
                {hasOilSerum && (
                  <div className="promo-badge free-delivery-promo">
                    🚚 <strong>Free Delivery Applied</strong> (Oil & Serum Offer)
                  </div>
                )}

                {isDiscountEligible ? (
                  <div className="promo-badge discount-promo">
                    🎉 <strong>10% Discount Applied!</strong> (Orders over Rs. 10,000)
                  </div>
                ) : (
                  <div className="promo-badge hint-promo">
                    💡 Spend <strong>{formatPrice(10000 - subtotal)}</strong> more to unlock <strong>10% OFF</strong>!
                  </div>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="pricing-breakdown">
                <div className="pricing-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {isDiscountEligible && (
                  <div className="pricing-row discount-row">
                    <span>10% Special Discount</span>
                    <span className="discount-text">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="pricing-row">
                  <span>Delivery Charges</span>
                  <span>
                    {hasOilSerum ? (
                      <span className="free-delivery-text">FREE</span>
                    ) : (
                      formatPrice(deliveryCharges)
                    )}
                  </span>
                </div>

                <div className="pricing-row total-row">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Checkout & Payment */}
            <div className="checkout-form-column">
              <form onSubmit={handleSubmitOrder} className="checkout-form">
                {/* Contact Section */}
                <div className="form-section">
                  <h3 className="section-subtitle">Contact</h3>
                  <div className="input-group">
                    <label>Email Address or Mobile Phone</label>
                    <input
                      type="text"
                      name="emailOrPhone"
                      value={formData.emailOrPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. customer@example.com or 03001234567"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Address Section */}
                <div className="form-section">
                  <h3 className="section-subtitle">Shipping Address</h3>
                  <div className="input-row">
                    <div className="input-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House/Street/Area"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-row">
                    <div className="input-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="03XXXXXXXXX"
                      required
                    />
                  </div>
                </div>

                {/* Payment Method Section */}
                <div className="form-section">
                  <h3 className="section-subtitle">Payment Method</h3>
                  <div className="payment-options">
                    <label className={`payment-option-card ${paymentMethod === 'cod' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <span className="payment-label">Cash on Delivery (COD)</span>
                    </label>

                    <label className={`payment-option-card ${paymentMethod === 'jazzcash' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="jazzcash"
                        checked={paymentMethod === 'jazzcash'}
                        onChange={() => setPaymentMethod('jazzcash')}
                      />
                      <span className="payment-label">JazzCash</span>
                    </label>

                    <label className={`payment-option-card ${paymentMethod === 'easypaisa' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="easypaisa"
                        checked={paymentMethod === 'easypaisa'}
                        onChange={() => setPaymentMethod('easypaisa')}
                      />
                      <span className="payment-label">EasyPaisa</span>
                    </label>

                    <label className={`payment-option-card ${paymentMethod === 'meezan' ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="meezan"
                        checked={paymentMethod === 'meezan'}
                        onChange={() => setPaymentMethod('meezan')}
                      />
                      <span className="payment-label">Meezan Bank</span>
                    </label>
                  </div>

                  {/* Online Payment Info Box */}
                  {paymentMethod !== 'cod' && (
                    <div className="payment-instructions-box">
                      {paymentMethod === 'jazzcash' && (
                        <div>
                          <p className="inst-title"><strong>JazzCash Payment Details:</strong></p>
                          <p>Account Number: <strong className="highlight-account">03099576807</strong></p>
                          <p>Account Title: <strong>Muhammad Talha</strong></p>
                        </div>
                      )}

                      {paymentMethod === 'easypaisa' && (
                        <div>
                          <p className="inst-title"><strong>EasyPaisa Payment Details:</strong></p>
                          <p>Account Number: <strong className="highlight-account">03099576807</strong></p>
                          <p>Account Title: <strong>Muhammad Talha</strong></p>
                        </div>
                      )}

                      {paymentMethod === 'meezan' && (
                        <div>
                          <p className="inst-title"><strong>Meezan Bank Payment Details:</strong></p>
                          <p>Account Number: <strong className="highlight-account">04300110292883</strong></p>
                          <p>Account Title: <strong>Muhammad Talha</strong></p>
                        </div>
                      )}

                      <div className="input-group" style={{ marginTop: '12px' }}>
                        <label>Enter Transaction ID (TID) / Reference Number</label>
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="e.g. 1234567890"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-complete-order" disabled={isSending}>
                  {isSending ? 'PROCESSING ORDER...' : `COMPLETE ORDER (${formatPrice(total)})`}
                </button>

                <p className="secure-checkout-tag">
                  <FiLock /> SECURE ENCRYPTED CHECKOUT
                </p>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;