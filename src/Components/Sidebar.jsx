// Sidebar.js
import React, { useState } from 'react';
import './Styles/Sidebar.css';

const Sidebar = ({ userRole = 'student', isOpen = true, onToggle }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const userInfo = {
    name: 'Alex Johnson',
    role: userRole === 'admin' ? 'Administrator' : 'Student',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format'
  };

  const mainMenuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', path: '/dashboard', badge: null },
    { id: 'my-courses', name: 'My Courses', icon: '📚', path: '/courses', badge: 3 },
    { id: 'tests', name: 'Tests & Quizzes', icon: '✏️', path: '/tests', badge: 2 },
    { id: 'certificates', name: 'Certificates', icon: '🏆', path: '/certificates', badge: 1 },
    { id: 'payments', name: 'Payments', icon: '💳', path: '/payments', badge: null },
    { id: 'messages', name: 'Messages', icon: '💬', path: '/messages', badge: 5 }
  ];

  const adminMenuItems = [
    { id: 'manage-users', name: 'Manage Users', icon: '👥', path: '/admin/users', badge: null },
    { id: 'manage-courses', name: 'Manage Courses', icon: '🎯', path: '/admin/courses', badge: 12 },
    { id: 'reports', name: 'Reports & Analytics', icon: '📈', path: '/admin/reports', badge: null },
    { id: 'settings', name: 'System Settings', icon: '⚙️', path: '/admin/settings', badge: null }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    // In a real app, you would navigate to the route here
    console.log(`Navigating to: ${itemId}`);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (onToggle) onToggle(!isCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic here
  };

  return (
    <div className={`learning-sidebar ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} ${!isOpen ? 'sidebar-hidden' : ''}`}>
      
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">🎓</div>
          {!isCollapsed && (
            <div className="logo-text">
              <span className="logo-main">LearnHub</span>
              <span className="logo-sub">Academy</span>
            </div>
          )}
        </div>
        
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className={`toggle-icon ${isCollapsed ? 'toggle-collapsed' : ''}`}>
            ←
          </span>
        </button>
      </div>

            {/* Navigation Menu */}
      <nav className="sidebar-navigation">
        <div className="nav-section">
          <h4 className="section-label">MAIN MENU</h4>
          <ul className="nav-menu">
            {mainMenuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${activeItem === item.id ? 'nav-active' : ''} ${hoveredItem === item.id ? 'nav-hovered' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  
                  {!isCollapsed && (
                    <>
                      <span className="nav-text">{item.name}</span>
                      {item.badge && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="nav-tooltip">
                      {item.name}
                      {item.badge && <span className="tooltip-badge">{item.badge}</span>}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Admin Controls - Conditionally Rendered */}
        {userRole === 'admin' && (
          <div className="nav-section admin-section">
            <h4 className="section-label">ADMIN PANEL</h4>
            <ul className="nav-menu">
              {adminMenuItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${activeItem === item.id ? 'nav-active' : ''} ${hoveredItem === item.id ? 'nav-hovered' : ''}`}
                    onClick={() => handleItemClick(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    
                    {!isCollapsed && (
                      <>
                        <span className="nav-text">{item.name}</span>
                        {item.badge && (
                          <span className="nav-badge">{item.badge}</span>
                        )}
                      </>
                    )}

                    {isCollapsed && (
                      <div className="nav-tooltip">
                        {item.name}
                        {item.badge && <span className="tooltip-badge">{item.badge}</span>}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* User Info Section */}
      <div className="sidebar-user-info">
        <div className="user-avatar-container">
          <img 
            src={userInfo.avatar} 
            alt={userInfo.name}
            className="user-avatar"
          />
          <div className="user-status-indicator"></div>
        </div>
        
        {!isCollapsed && (
          <div className="user-details">
            <h3 className="user-name">{userInfo.name}</h3>
            <p className="user-role">{userInfo.role}</p>
            <p className="user-email">{userInfo.email}</p>
          </div>
        )}
      </div>

      {/* Logout Section */}
      <div className="sidebar-footer">
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          <span className="logout-icon">🚪</span>
          {!isCollapsed && <span className="logout-text">Logout</span>}
          
          {isCollapsed && (
            <div className="nav-tooltip">Logout</div>
          )}
        </button>
        
        {/* {!isCollapsed && (
          <div className="sidebar-version">
            <span className="version-text">v2.1.0</span>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Sidebar;