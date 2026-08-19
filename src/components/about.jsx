import React from 'react';
import './about.css';
import Footer from './footer';
import aboutHeroImg from '../assets/about-img1.jpg';
import perfumerImg from '../assets/about-img2.jpg';
import distilleryImg from '../assets/about-img3.jpg';
import craftImg from '../assets/about-img4.jpg';

const About = () => {
  return (
    <div className="about-page">
      {/* 1. ABOUT HERO SECTION */}
      <section className="about-hero-section">
        <div className="about-hero-bg-wrapper">
          <img src={aboutHeroImg} alt="Purity in Heritage - Courtyard" className="about-hero-bg-img" />
          <div className="about-hero-overlay"></div>
        </div>

        <div className="about-hero-content">
          <h1 className="about-hero-title">
            Purity in <br /> Heritage
          </h1>
          <p className="about-hero-subtitle">
            The genesis of an empire built on devotion to the raw and the rare.
          </p>
        </div>
      </section>

      {/* 2. HERITAGE & LEGACY SECTION (CHAPTER I: THE RAUF LINEAGE) */}
      <section className="about-story-section">
        <div className="about-container">
          <div className="story-grid image-left">
            <div className="story-image-card">
              <div className="img-frame">
                <img src={perfumerImg} alt="The Rauf Lineage" className="story-img" />
              </div>
            </div>

            <div className="story-text-card">
              <span className="story-tagline">CHAPTER I</span>
              <h2 className="story-title">
                The Rauf <br /> Lineage
              </h2>
              <p className="story-desc">
                For over a century, the Rauf family has been the custodian of forgotten aromatics and ancient textiles. Our journey began not in a laboratory, but in the sun-drenched courtyards of our ancestors, where the meticulous art of blending and weaving was passed down as a sacred trust.
              </p>
              <p className="story-desc">
                We do not merely create; we preserve. Each creation is a testament to the hands that touch it, echoing a quiet luxury that speaks softly but resonates deeply through generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ARTISANAL PROCESS SECTION (CHAPTER II: THE ART OF EXTRACTION) */}
      <section className="about-process-section">
        <div className="about-container">
          <div className="story-grid reverse">
            <div className="story-image-card">
              <div className="img-frame">
                <img src={distilleryImg} alt="Traditional Extraction & Distillery" className="story-img" />
              </div>
            </div>

            <div className="story-text-card">
              <span className="story-tagline">CHAPTER II</span>
              <h2 className="story-title">
                The Art of <br /> Extraction
              </h2>
              <p className="story-desc">
                We reject mass production in favor of slow, small-batch artisanal distillation. From aging rare Oud resins in seasoned wooden barrels to hand-filtering wild flower essences, our process cannot be rushed.
              </p>
              <p className="story-desc">
                Time is our most valuable ingredient, allowing each accord to mature naturally into a deep, multi-layered masterpiece.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WEAVING SECTION (CHAPTER III: THE LOOM'S WHISPER) */}
      <section className="about-loom-section">
        <div className="about-container">
          <div className="story-grid text-left">
            <div className="story-text-card">
              <span className="story-tagline">CHAPTER III</span>
              <h2 className="story-title">
                The Loom's <br /> Whisper
              </h2>
              <p className="story-desc">
                Parallel to our olfactory pursuits lies our dedication to the loom. The fabrics bearing the BIN RAUF seal are handwoven by artisans whose skills defy modernization. Every thread is placed with intention, creating textiles that are as structural as they are ethereal.
              </p>
              <p className="story-desc">
                The rhythmic clack of the wooden loom is the heartbeat of our heritage, translating ancient patterns into modern, tactile masterpieces that redefine quiet luxury in the physical realm.
              </p>
            </div>

            <div className="story-image-card loom-card-wrapper">
              <div className="loom-img-frame">
                <img src={craftImg} alt="The Loom's Whisper" className="loom-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default About;
