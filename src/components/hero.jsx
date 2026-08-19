import React from 'react';
import './hero.css';
import Footer from './footer';
import heroImage from '../assets/hero-page.jpeg';
import historyImage from '../assets/history.png';
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.jpg';

const Hero = () => {
  const products = [
    {
      id: 1,
      title: 'PURE INGREDIENTS',
      quote: '"Hand-selected rarest botanicals and pure Cambodian oud, distilled to perfection."',
      image: img1,
      bg: '#e2d7c5'
    },
    {
      id: 2,
      title: 'SIGNATURE ATTARS',
      quote: '"Concentrated oil elixirs crafted to linger gracefully in memory, long after the scent fades."',
      image: img2,
      bg: '#cfc5b6',
      featured: true
    },
    {
      id: 3,
      title: 'HERITAGE ELEGANCE',
      quote: '"Timeless Islamic essentials designed with devotion, honor, and artisanal mastery."',
      image: img3,
      bg: '#dad0c0'
    }
  ];

  return (
    <div className="homepage-wrapper">
      {/* 1. HERO MAIN SECTION */}
      <section className="hero-section">
        <div className="hero-image-wrapper">
          <img src={heroImage} alt="Bin Rauf Perfume" className="hero-bg-img" />
        </div>

        <div className="hero-content-card">
          <span className="hero-tagline">PURITY IN EVERY DROP</span>
          <h1 className="hero-title">
            Essence of <br /> Heritage
          </h1>
          <p className="hero-description">
            Discover the quiet luxury of bespoke fragrances, crafted with
            time-honored traditions and the world's most exquisite raw materials.
          </p>
          <button className="hero-btn">SHOP COLLECTION</button>
        </div>
      </section>

      {/* 2. CURATED SELECTION (THE COLLECTION) */}
      <section className="collection-section">
        <div className="section-header text-center">
          <h2 className="section-title">OUR PRODUCTS</h2>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div
                className="product-img-frame"
                style={{ backgroundColor: product.bg }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img"
                />
              </div>
              <h3 className="card-title">{product.title}</h3>
              <p className="card-quote">{product.quote}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HERITAGE STORY SECTION (THE PROCESS) */}
      <section className="heritage-story-section">
        <div className="heritage-story-container">
          <div className="heritage-story-image-box">
            <div className="heritage-story-img-wrapper">
              <img
                src={historyImage}
                alt="Bin Rauf Heritage Perfume Laboratory"
                className="heritage-story-img"
              />
            </div>
          </div>

          <div className="heritage-story-content">
            <span className="heritage-tagline">THE PROCESS</span>
            <h2 className="heritage-title">Heritage Story</h2>
            <p className="heritage-description">
              Every bottle of Bin Rauf is a testament to generations of olfactory mastery.
              We source only the rarest botanicals, employing extraction methods that honor
              the integrity of nature. It is a slow, deliberate art form, resulting in
              compositions that linger in the memory long after the scent has faded.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Hero;