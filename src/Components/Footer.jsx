// Footer.js
import React, { useState } from 'react';
import './Styles/Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const quickLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Courses', path: '/courses', icon: '📚' },
    { name: 'Tests', path: '/tests', icon: '✏️' },
    { name: 'Certifications', path: '/certifications', icon: '🏆' },
    { name: 'About Us', path: '/about', icon: '👥' },
    { name: 'Contact Us', path: '/contact', icon: '📞' }
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: '📘', color: '#1877F2' },
    { name: 'LinkedIn', url: '#', icon: '💼', color: '#0A66C2' },
    { name: 'Twitter', url: '#', icon: '🐦', color: '#1DA1F2' },
    { name: 'YouTube', url: '#', icon: '📺', color: '#FF0000' },
    { name: 'Instagram', url: '#', icon: '📷', color: '#E4405F' }
  ];

  const contactInfo = [
    { type: 'email', value: 'support@learnhub.com', icon: '✉️', label: 'Email' },
    { type: 'phone', value: '+1 (555) 123-4567', icon: '📞', label: 'Phone' },
    { type: 'address', value: '123 Education Street, Learning City, LC 12345', icon: '📍', label: 'Address' }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed with email:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="learning-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          
          {/* About Section */}
          <div className="footer-section about-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">🎓</div>
              <div className="footer-logo-text">
                <h3 className="footer-logo-title">Smart Digital Learning Hub</h3>
                <p className="footer-logo-tagline">Learn Smarter, Achieve Faster</p>
              </div>
            </div>
            
            <p className="footer-about-description">
              Empowering learners worldwide with cutting-edge digital education. 
              Our platform provides interactive courses, personalized learning paths, 
              and industry-recognized certifications to help you succeed in your career.
            </p>
            
            {/* Newsletter Subscription */}
            {/* <div className="newsletter-section">
              <h4 className="newsletter-title">Stay Updated</h4>
              <p className="newsletter-subtitle">Get the latest course updates and learning tips</p>
              
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="newsletter-input"
                      required
                    />
                    <button type="submit" className="subscribe-button">
                      <span className="button-text">Subscribe</span>
                      <span className="button-icon">🚀</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="subscription-success">
                  <span className="success-icon">✅</span>
                  <span className="success-message">Thank you for subscribing!</span>
                </div>
              )}
            </div> */}
          </div>

          {/* Quick Links Section */}
          <div className="footer-section links-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={link.name} className="footer-link-item">
                  <a 
                    href={link.path} 
                    className="footer-link"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                    <span className="link-underline"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="footer-section contact-section">
            <h4 className="section-title">Contact Info</h4>
            <div className="footer-contact-info">
              {contactInfo.map((contact, index) => (
                <div 
                  key={contact.type} 
                  className="contact-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="contact-icon">{contact.icon}</div>
                  <div className="contact-details">
                    <span className="contact-label">{contact.label}</span>
                    <span className="contact-value">{contact.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            {/* <div className="business-hours">
              <h5 className="hours-title">Support Hours</h5>
              <div className="hours-list">
                <div className="hour-item">
                  <span className="day">Mon - Fri</span>
                  <span className="time">9:00 AM - 6:00 PM</span>
                </div>
                <div className="hour-item">
                  <span className="day">Saturday</span>
                  <span className="time">10:00 AM - 4:00 PM</span>
                </div>
                <div className="hour-item">
                  <span className="day">Sunday</span>
                  <span className="time">Closed</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Social Media Section */}
          <div className="footer-section social-section">
            <h4 className="section-title">Follow Us</h4>
            <p className="social-description">
              Join our community and stay connected with the latest updates
            </p>
            
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="social-link"
                  style={{ 
                    '--social-color': social.color,
                    animationDelay: `${index * 0.1}s`
                  }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-tooltip">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Download App */}
            {/* <div className="app-download">
              <h5 className="app-title">Get Our App</h5>
              <div className="app-buttons">
                <a href="#" className="app-button app-store">
                  <span className="app-icon">📱</span>
                  <span className="app-text">
                    <span className="app-subtitle">Download on the</span>
                    <span className="app-name">App Store</span>
                  </span>
                </a>
                <a href="#" className="app-button google-play">
                  <span className="app-icon">🤖</span>
                  <span className="app-text">
                    <span className="app-subtitle">Get it on</span>
                    <span className="app-name">Google Play</span>
                  </span>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="copyright-section">
              <p className="copyright-text">
                © {currentYear} Build by Kumarinfotech. All rights reserved.
              </p>
              <div className="legal-links">
                <a href="/privacy" className="legal-link">Privacy Policy</a>
                <a href="/terms" className="legal-link">Terms of Service</a>
                <a href="/cookies" className="legal-link">Cookie Policy</a>
              </div>
            </div>
            
            <div className="footer-badges">
              <div className="badge security-badge">
                <span className="badge-icon">🔒</span>
                <span className="badge-text">SSL Secured</span>
              </div>
              <div className="badge quality-badge">
                <span className="badge-icon">⭐</span>
                <span className="badge-text">Quality Education</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <span className="arrow-icon">↑</span>
      </button>
    </footer>
  );
};

export default Footer;