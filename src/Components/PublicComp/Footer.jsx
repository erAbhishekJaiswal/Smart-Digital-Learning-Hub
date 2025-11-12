// import React from "react";
// import "../../CSSFiles/component/public/Footer.css"; // optional CSS file for styling

// const Footer = () => {
//   return (
//     <footer className="public-footer">
//       {/* 🔶 Call-to-Action Section */}
//       <div className="public-footer-cta">
//         <div className="public-footer-cta-text">
//           <h3>Are You Ready To Grow Online With Us?</h3>
//           <p>
//             Kumarinfotech is here to grow your online business, connect with us...
//           </p>
//         </div>
//         <a href="tel:+917725064078" className="public-footer-cta-btn">
//           CALL US NOW
//         </a>
//       </div>

//       {/* 🔵 Main Footer Section */}
//       <div className="public-footer-main container">
//         <div className="public-footer-columns">
//           {/* Column 1 - About */}
//           <div className="public-footer-col">
//             <h3>KUMARINFOTECH IT SERVICE</h3>
//             <p>
//               Kumarinfotech is a trusted website design & IT services company in
//               Kalyan, Maharashtra. We provide web development, software & mobile
//               app development, billing & inventory solutions, and digital
//               marketing services for clients in India, USA, UK, Dubai, Canada,
//               and Africa.
//             </p>
//             <p>
//               <b>GST Number:</b> 27CRCPD1394R1ZB <br />
//               <b>TAN Number:</b> PNES04020J
//             </p>
//           </div>

//           {/* Column 2 - Contact */}
//           <div className="public-footer-col">
//             <h4>Contact Us</h4>
//             <p>
//               📞 <a href="tel:+917725064078">+91 7725064078</a> /{" "}
//               <a href="tel:+918451924078">+91 8451924078</a>
//             </p>
//             <p>
//               📧{" "}
//               <a href="mailto:info@kumarinfotech.com">
//                 info@kumarinfotech.com
//               </a>
//               <br />
//               📧{" "}
//               <a href="mailto:info.kumarinfotech@gmail.com">
//                 info.kumarinfotech@gmail.com
//               </a>
//               <br />
//               📧 <a href="mailto:hr@kumarinfotech.com">hr@kumarinfotech.com</a>
//             </p>
//             <p>
//               📍 Office No:106/107, Krishna complex, Near Siddivinayak Hospital,
//               Bhanu Sagar Talkies, Valipeer Road, Kalyan, India, 421301
//             </p>
//             <p>
//               <b>Our Office Hours</b>
//               <br />
//               Mon – Sun: 09:00 am – 08:30 pm
//             </p>
//           </div>

//           {/* Column 3 - Quick Links */}
//           <div className="public-footer-col">
//             <h4>Quick Links</h4>
//             <ul>
//               <li><a href="#">Website Development</a></li>
//               <li><a href="#">Software Development</a></li>
//               <li><a href="#">Digital Marketing</a></li>
//               <li><a href="#">Apps Development</a></li>
//               <li><a href="#">Web Hosting</a></li>
//               <li><a href="#">Blog</a></li>
//               <li><a href="#">Career</a></li>
//               <li><a href="#">Privacy Policy</a></li>
//               <li><a href="#">FAQ</a></li>
//             </ul>
//           </div>

//           {/* Column 4 - Social */}
//           <div className="public-footer-col">
//             <h4>Connect With Us</h4>
//             <div className="public-footer-social">
//               <a className="public-footer-social-icons" href="#"><i className="ti-facebook"></i></a>
//               <a className="public-footer-social-icons" href="#"><i className="ti-linkedin"></i></a>
//               <a className="public-footer-social-icons" href="#"><i className="ti-instagram"></i></a>
//               <a className="public-footer-social-icons" href="#"><i className="ti-twitter-alt"></i></a>
//               <a className="public-footer-social-icons" href="#"><i className="ti-youtube"></i></a>
//             </div>
//             <h5>Drop Us A Review</h5>
//             <a
//               href="https://g.page/r/CaTVvcqNsGqVEBM/review"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <img
//                 src="https://www.kumarinfotech.com/img/reviewImage.png"
//                 alt="Review Us On Google"
//                 className="review-img"
//               />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* 🔹 Bottom Footer */}
//       <div className="public-footer-bottom">
//         <p>
//           Copyright © 2025. Designed & Developed By Abhishek Jaiswal at{" "}
//           <span>Kumarinfotech</span>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;











import React from 'react';
import '../../CSSFiles/component/public/Footer.css'; // Import the custom CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter, faYoutube, faPinterestP } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="footer-container-box">
      {/* 1. Top CTA Bar */}
      <div className="footer-cta-bar">
        <div className="footer-cta-content-container">
        <div className="cta-content">
          <div className="cta-text">
            <div className='cta-content_h2'>Do You Need Help?</div>
            <p className='cta-content_p'>
              Kumarinfotech is here to assist you. Feel free to call us.
              <br />
              Happy to help you...
            </p>
          </div>
          <button className="cta-button">CALL US NOW</button>
        </div>
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="footer-main">
        <div className="footer-columns-container">
          {/* Column 1: Kumarinfotech About */}
          <div className="footer-col col-1">
            <a className="footer-logo-text" href="https://kumarinfotech.com/">KUMARINFOTECH</a>
            <p>
              Kumarinfotech is a leading IT training institute in Kalyan, offering professional courses in Full Stack Development, .NET, Python, and Digital Marketing. Known for practical, job-oriented training, we help students build real-world skills and secure placements. Recognized among the best IT training institutes near Donbhivli, Ulhasnagar, Ambernath, Badlapur, Titwala, and Bhiwandi, Kumarinfotech also provides website designing and development training to help learners grow in the digital world.
            </p>
          </div>

          {/* Column 2: Contact Us */}
          <div className="footer-col col-2">
            <h3>Contact Us</h3>
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} />
              <p>+91 7725094078 / +91 8451924078</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>info@kumarinfotech.net<br />info.kumarinfotech@gmail.com<br />hr@kumarinfotech.net</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <p>Office No 106/107, Krishna complex, Near Sridavi Hospital, Bhanu Sagar Tables, Vaipeer Road, Kalyan, India, 421301</p>
            </div>
            <h4 className="office-hours-title">Our Office Hours</h4>
            <div className="contact-item">
              <FontAwesomeIcon icon={faClock} />
              <p>Mon - Sun: 09:00 AM - 06:30 PM</p>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="footer-col col-3">
            <h3>Quick Links</h3>
            <ul className="quick-links-list">
              <li><a href="#">Corporate IT Training</a></li>
              <li><a href="#">gallery</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refer A Friend</a></li>
              <li><a href="#">Enquiry Form</a></li>
              <li><a href="#">Grab Deals - terms & conditions</a></li>
            </ul>
            <ul className="quick-links-list second-list">
              <li><a href="#">Internship</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Submit Your Details</a></li>
              <li><a href="#">Grab Deals</a></li>
            </ul>
          </div>

          {/* Column 4: Connect With Us */}
          <div className="footer-col col-4">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faYoutube} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faPinterestP} /></a>
            </div>

            <h4 className="drop-review-title">Drop Us A Review</h4>
            <a href="#" className="google-review-link">
              <div className="google-review-btn">
                <span className="google-icon">G</span>
                <div className="google-text">
                  Click here to leave us<br />
                  a review on **Google!**
                </div>
              </div>
            </a>
            
            <div className="qr-code-section">
              {/* This is a placeholder for the QR code image */}
              <div className="qr-code-placeholder"></div>
            </div>
            <p className="views-count">views <span className="view-number">89458</span></p>
          </div>
        </div>
      </div>

      {/* 3. Copyright Bar */}
      <div className="footer-copyright">
        <p>Copyright 2025. Designed & Developed By **Kumarinfotech**</p>
      </div>
    </div>
  );
};

export default Footer;