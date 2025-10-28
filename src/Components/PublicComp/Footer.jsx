import React from "react";
import "../../CSSFiles/component/public/Footer.css"; // optional CSS file for styling

const Footer = () => {
  return (
    <footer className="public-footer">
      {/* 🔶 Call-to-Action Section */}
      <div className="public-footer-cta">
        <div className="public-footer-cta-text">
          <h3>Are You Ready To Grow Online With Us?</h3>
          <p>
            Kumarinfotech is here to grow your online business, connect with us...
          </p>
        </div>
        <a href="tel:+917725064078" className="public-footer-cta-btn">
          CALL US NOW
        </a>
      </div>

      {/* 🔵 Main Footer Section */}
      <div className="public-footer-main container">
        <div className="public-footer-columns">
          {/* Column 1 - About */}
          <div className="public-footer-col">
            <h3>KUMARINFOTECH IT SERVICE</h3>
            <p>
              Kumarinfotech is a trusted website design & IT services company in
              Kalyan, Maharashtra. We provide web development, software & mobile
              app development, billing & inventory solutions, and digital
              marketing services for clients in India, USA, UK, Dubai, Canada,
              and Africa.
            </p>
            <p>
              <b>GST Number:</b> 27CRCPD1394R1ZB <br />
              <b>TAN Number:</b> PNES04020J
            </p>
          </div>

          {/* Column 2 - Contact */}
          <div className="public-footer-col">
            <h4>Contact Us</h4>
            <p>
              📞 <a href="tel:+917725064078">+91 7725064078</a> /{" "}
              <a href="tel:+918451924078">+91 8451924078</a>
            </p>
            <p>
              📧{" "}
              <a href="mailto:info@kumarinfotech.com">
                info@kumarinfotech.com
              </a>
              <br />
              📧{" "}
              <a href="mailto:info.kumarinfotech@gmail.com">
                info.kumarinfotech@gmail.com
              </a>
              <br />
              📧 <a href="mailto:hr@kumarinfotech.com">hr@kumarinfotech.com</a>
            </p>
            <p>
              📍 Office No:106/107, Krishna complex, Near Siddivinayak Hospital,
              Bhanu Sagar Talkies, Valipeer Road, Kalyan, India, 421301
            </p>
            <p>
              <b>Our Office Hours</b>
              <br />
              Mon – Sun: 09:00 am – 08:30 pm
            </p>
          </div>

          {/* Column 3 - Quick Links */}
          <div className="public-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Website Development</a></li>
              <li><a href="#">Software Development</a></li>
              <li><a href="#">Digital Marketing</a></li>
              <li><a href="#">Apps Development</a></li>
              <li><a href="#">Web Hosting</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4 - Social */}
          <div className="public-footer-col">
            <h4>Connect With Us</h4>
            <div className="public-footer-social">
              <a className="public-footer-social-icons" href="#"><i className="ti-facebook"></i></a>
              <a className="public-footer-social-icons" href="#"><i className="ti-linkedin"></i></a>
              <a className="public-footer-social-icons" href="#"><i className="ti-instagram"></i></a>
              <a className="public-footer-social-icons" href="#"><i className="ti-twitter-alt"></i></a>
              <a className="public-footer-social-icons" href="#"><i className="ti-youtube"></i></a>
            </div>
            <h5>Drop Us A Review</h5>
            <a
              href="https://g.page/r/CaTVvcqNsGqVEBM/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://www.kumarinfotech.com/img/reviewImage.png"
                alt="Review Us On Google"
                className="review-img"
              />
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Bottom Footer */}
      <div className="public-footer-bottom">
        <p>
          Copyright © 2025. Designed & Developed By Abhishek Jaiswal at{" "}
          <span>Kumarinfotech</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
