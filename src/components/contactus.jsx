import React, { useState, useRef } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './contactus.css';
import Footer from './footer';

const ContactUs = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // EMAILJS CONFIGURATION
    emailjs.sendForm(
      'service_7npdkx4', 
      'template_2i3oxd1', 
      formRef.current, 
      'F2GRIU4Hdesj55YbI'
    )
    .then((result) => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ fullName: '', email: '', subject: '', message: '' });
      }, 4000);
    }, (err) => {
      setLoading(false);
      setError('Message Failed');
      console.error(err);
    });
  };

  const whatsappUrl = "https://wa.me/923119963224?text=Assalam%20o%20Alaikum%2C%20I%20have%20an%20inquiry%20regarding%20Bin%20Rauf%20products.";

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* 1. TOP HEADER BLOCK (TITLE & DESCRIPTION & WHATSAPP QUICK BUTTON) */}
        <div className="contact-header-block">
          <h1 className="contact-title">
            Connect With Heritage
          </h1>
          <p className="contact-subtitle">
            We invite you to experience the craftsmanship and elegance of BIN RAUF. For instant assistance, bespoke inquiries, or direct orders, click below to chat with us directly on WhatsApp.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-header-btn"
          >
            <FaWhatsapp className="header-wa-icon" /> CHAT ON WHATSAPP (+92 311 9963224)
          </a>
        </div>

        <div className="contact-grid">
          {/* 2. SHOWROOM & MAP CARD (MIDDLE ON MOBILE) */}
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

                {/* DIRECT WHATSAPP ITEM */}
                <div className="info-item whatsapp-info-item">
                  <FaWhatsapp className="info-icon whatsapp-green-icon" />
                  <p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-link-highlight"
                    >
                      Direct WhatsApp Chat (+92 311 9963224)
                    </a>
                  </p>
                </div>
              </div>

              {/* DIRECT WHATSAPP ACTION BUTTON */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-card-whatsapp"
              >
                <FaWhatsapp className="card-wa-icon" /> INSTANT WHATSAPP CHAT
              </a>

              {/* MAP PREVIEW CONTAINER */}
              <div className="map-container">
                <iframe
                  title="Bin Rauf Location"
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d13619.427049376227!2d73.04727194550833!3d31.41807229994075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sJhung%20Road%20near%20Sheikh%20Colony%20graveyard%20%20ABC%20road%2C%20Faisalabad!5e0!3m2!1sen!2s!4v1787049803504!5m2!1sen!2s"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '4px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>
          </div>

          {/* 3. FORM COLUMN (BOTTOM ON MOBILE) */}
          <div className="contact-form-col">
            {submitted ? (
              <div className="contact-success-msg">
                <h3>Thank You for Connecting</h3>
                <p>Your inquiry has been received. Our concierge team will reach out to you shortly.</p>
              </div>
            ) : (
              <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                
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

                <button type="submit" className="contact-submit-btn" disabled={loading}>
                  {loading ? 'SENDING...' : 'SUBMIT INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;