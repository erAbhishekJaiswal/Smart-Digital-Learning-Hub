// Navbar.js
import React, { useState } from "react";
import "./Styles/Navbar.css";
import { IoHome } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { GiAchievement } from "react-icons/gi";
import { IoMdContacts } from "react-icons/io";
import { BiLogInCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import {isUserLoggedIn, getUserRole} from "../utils/localstorage"
import { MdDashboard } from "react-icons/md";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [hasNotifications, setHasNotifications] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  // const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  //   // Implement theme switching logic here
  //   document.body.classList.toggle("dark-theme");
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  const navigationLinks = [
    { name: "Home", path: "/", icon: <IoHome /> },
    { name: "TechStack", path: "/techstack", icon: <MdLibraryBooks /> },
    // { name: "Tests", path: "/tests", icon: <FaPencil /> },
    { name: "VerifyCertificate", path: "/verify-certificate", icon: <GiAchievement /> },
    { name: "About Us", path: "/about", icon: <IoMdContacts /> },
    // { name: "Sign Up", path: "/signup", icon: <BiLogInCircle /> },
  ];

  // const userMenuItems = [
  //   { name: "My Profile", path: "/profile", icon: "👤" },
  //   { name: "Dashboard", path: "/dashboard", icon: "📊" },
  //   { name: "Settings", path: "/settings", icon: "⚙️" },
  //   { name: "Logout", path: "/logout", icon: "🚪" },
  // ];

  return (
    <nav
      className={`learning-navbar ${
        isDarkMode ? "navbar-dark" : "navbar-light"
      }`}
    >
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo-section">
          <div className="logo-wrapper">
            <div className="logo-icon">🎓</div>
            <div className="logo-content">
              <h1 className="logo-title">Smart Digital Learning Hub</h1>
              <p className="logo-tagline">Learn Smarter, Achieve Faster</p>
            </div>
          </div>
        </div>


        {/* Search Bar */}
        <div className="search-bar-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search courses, subjects, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <span className="search-icon">🔍</span>
            </button>
          </form>
        </div>
        

        {/* Right Side Actions */}
        <div className="navbar-actions-section">

          {/* Navigation Links */}
          <div
            className={`navbar-links-section ${
              isMenuOpen ? "nav-links-active" : ""
            }`}
          >
            {/* <ul className="nav-links-list">
              {navigationLinks.map((link, index) => (
                <li key={link.name} className="nav-link-item">
                  <Link
                    to={link.path}
                    className="nav-link"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="nav-link-icon">{link.icon}</span>
                    <span className="nav-link-text">{link.name}</span>
                    <span className="nav-link-underline"></span>
                  </Link>
                </li>
              ))}
              <li>
                {isUserLoggedIn() && getUserRole() ? (
                 <li className="nav-link-item">
                  <Link
                    to={getUserRole() === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                    className="nav-link"
                  >
                    <span className="nav-link-icon"><MdDashboard /></span>
                    <span className="nav-link-underline"></span>
                  </Link>
                </li>
                ) : (
                  <>
                <li className="nav-link-item">
                  <Link
                    to="/signin"
                    className="nav-link"
                    // style={{ animationDelay: `${100 * 0.1}s` }}
                  >
                    <span className="nav-link-icon"><BiLogInCircle /></span>
                    <span className="nav-link-text">Sign In</span>
                    <span className="nav-link-underline"></span>
                  </Link>
                </li>
                </>
                )
              }
              </li>
            </ul> */}
            <ul className="nav-links-list">
  {navigationLinks.map((link, index) => (
    <li key={link.name} className="nav-link-item">
      <Link
        to={link.path}
        className="nav-link"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <span className="nav-link-icon">{link.icon}</span>
        <span className="nav-link-text">{link.name}</span>
        <span className="nav-link-underline"></span>
      </Link>
    </li>
  ))}

  {isUserLoggedIn() && getUserRole() ? (
    <li className="nav-link-item">
      <Link
        to={getUserRole() === "admin" ? "/admin/dashboard" : "/student/dashboard"}
        className="nav-link"
      >
        <span className="nav-link-icon"><MdDashboard /></span>
        <span className="nav-link-underline"></span>
      </Link>
    </li>
  ) : (
    <li className="nav-link-item">
      <Link to="/signin" className="nav-link">
        <span className="nav-link-icon"><BiLogInCircle /></span>
        <span className="nav-link-text">Sign In</span>
        <span className="nav-link-underline"></span>
      </Link>
    </li>
  )}
</ul>

          </div>

          {/* Notification Bell */}
          {/* <div className="notification-container">
            <button className="notification-button">
              <span className="notification-icon">🔔</span>
              {hasNotifications && <span className="notification-badge">3</span>}
              <div className="notification-pulse"></div>
            </button>
          </div> */}

          {/* Theme Toggle */}
          {/* <div className="theme-toggle-container">
            <button
              onClick={toggleTheme}
              className={`theme-toggle-button ${
                isDarkMode ? "theme-dark" : "theme-light"
              }`}
              aria-label="Toggle theme"
            >
              <span className="theme-toggle-track">
                <span className="theme-toggle-thumb">
                  {isDarkMode ? "🌙" : "☀️"}
                </span>
              </span>
            </button>
          </div> */}

          {/* User Menu */}
          {/* <div className="user-menu-container">
            <button 
              onClick={toggleDropdown}
              className="user-menu-button"
            >
              <div className="user-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"
                  alt="User profile"
                  className="avatar-image"
                />
                <div className="avatar-status"></div>
              </div>
              <span className="user-arrow">▼</span>
            </button> */}

          {/* Dropdown Menu */}
          {/* {isDropdownOpen && (
              <div className="user-dropdown-menu">
                <div className="dropdown-header">
                  <div className="dropdown-user-info">
                    <div className="dropdown-avatar">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&auto=format"
                        alt="User profile"
                      />
                    </div>
                    <div className="dropdown-user-details">
                      <span className="user-name">John Doe</span>
                      <span className="user-email">john@example.com</span>
                    </div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <ul className="dropdown-items-list">
                  {userMenuItems.map((item, index) => (
                    <li key={item.name} className="dropdown-item">
                      <a 
                        href={item.path} 
                        className="dropdown-link"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <span className="dropdown-icon">{item.icon}</span>
                        <span className="dropdown-text">{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`menu-icon-line ${isMenuOpen ? "line-1-active" : ""}`}
            ></span>
            <span
              className={`menu-icon-line ${isMenuOpen ? "line-2-active" : ""}`}
            ></span>
            <span
              className={`menu-icon-line ${isMenuOpen ? "line-3-active" : ""}`}
            ></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
