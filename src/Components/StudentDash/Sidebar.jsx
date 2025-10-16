// components/Sidebar.js
import React from 'react';
import '../../CSSFiles/Admin/AdminDashboard.css';
import { MdDashboard, MdPeople, MdLibraryBooks, MdPayment, MdInsights, MdSettings, MdSupportAgent } from 'react-icons/md';

const Sidebar = ({ isOpen, onClose, darkMode }) => {
  const menuItems = [
    { icon: <MdDashboard />, label: 'Dashboard', active: true },
    { icon: <MdPeople />, label: 'Users' },
    { icon: <MdLibraryBooks />, label: 'Courses' },
    { icon: <MdPayment />, label: 'Revenue' },
    { icon: <MdInsights />, label: 'Analytics' },
    { icon: <MdSettings />, label: 'Settings' },
    { icon: <MdSupportAgent />, label: 'Support' }
  ];

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--active' : ''}`}
        onClick={onClose}
      ></div>
      
      <aside className={`admin-sidebar ${isOpen ? 'admin-sidebar--open' : ''} ${darkMode ? 'admin-sidebar--dark' : ''}`}>
        <div className="admin-sidebar__header">
          <h2 className="admin-sidebar__logo">EduAdmin</h2>
          <button className="admin-sidebar__close" onClick={onClose}>×</button>
        </div>
        
        <nav className="admin-sidebar__nav">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`admin-sidebar__nav-item ${item.active ? 'admin-sidebar__nav-item--active' : ''}`}
            >
              <span className="admin-sidebar__nav-icon">{item.icon}</span>
              <span className="admin-sidebar__nav-label">{item.label}</span>
            </a>
          ))}
        </nav>
        
        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__user-avatar">👨‍💼</div>
            <div className="admin-sidebar__user-info">
              <div className="admin-sidebar__user-name">John Doe</div>
              <div className="admin-sidebar__user-role">Administrator</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;