import React from "react";
import "../../CSSFiles/shared/ComingSoon.css";
import { FaArrowLeft } from "react-icons/fa";
const ComingSoon = () => {
  return (
    <div className="cs-wrapper">
     
      <div className="cs-content-box">
        <h1 className="cs-title">Coming Soon</h1>
        <p className="cs-subtitle">
          We are crafting something amazing. Stay tuned!
        </p>

         <div className="comming-soon-back-to-home">
              <a href="https://elearning.kumarinfotech.net/" className="comming-soon-back-to-home-btn"> <FaArrowLeft /> Back to Home</a>
              </div>


        <p className="cs-footer-text">© 2025 KumarInfoTech — All Rights Reserved</p>
      </div>
    </div>
  );
};

export default ComingSoon;
