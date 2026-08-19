import React, { useState } from 'react';
import './contactus.css';
import Footer from './footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-grid">
          {/* LEFT COLUMN: FORM */}
          <div className="contact-form-col">
            <h4 className="contact-title">
              Connect With Heritage
            </h4>
            <p className="contact-subtitle">
              We invite you to experience the craftsmanship and elegance of BIN RAUF. For inquiries, bespoke commissions, or to schedule a private viewing, please leave your details below.
            </p>

            {submitted ? (
              <div className="contact-success-msg">
                <h3>Thank You for Connecting</h3>
                <p>Your inquiry has been received. Our concierge team will reach out to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">FULL NAME</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">SUBJECT</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Inquiry subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">MESSAGE</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="How can we assist you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact-submit-btn">
                  SUBMIT INQUIRY
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: SHOWROOM & MAP CARD */}
          <div className="contact-info-col">
            <div className="info-card">
              <div className="info-watermark">BIN RAUF</div>

              <div className="info-block">
                <h3>BIN RAUF ISLAMIC STORE</h3>
                
                <div className="info-item">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div>
                    <p>Jhang road Sheikh colony ABC road</p>
                    <p>Faisalabad, Pakistan</p>
                  </div>
                </div>

                <div className="info-item">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <p><a href="tel:03119963224">+92 3119963224</a></p>
                </div>
              </div>

              {/* MAP PREVIEW CONTAINER */}
              <div className="map-container">
                <iframe
                  title="Bin Rauf Location"
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d13619.427049376227!2d73.04727194550833!3d31.41807229994075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sJhung%20Road%20near%20Sheikh%20Colony%20graveyard%20%20ABC%20road%2C%20Faisalabad!5e0!3m2!1sen!2s!4v1787049803504!5m2!1sen!2s"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: '4px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;