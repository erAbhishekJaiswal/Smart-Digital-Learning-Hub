import React, { useState } from 'react';
import '../../CSSFiles/Admin/AdminProfile.css';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "admin",
    phone: "+1 (555) 987-6543",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    location: "New York, NY",
    skills: ["System Administration", "Database Management", "Security", "User Management", "Analytics"],
    readbooks: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
    appliedJobs: [],
    internApplications: [],
    certificates: ["507f1f77bcf86cd799439015", "507f1f77bcf86cd799439016"],
    totalTests: 0,
    totalBooksRead: 12,
    resumeLink: "https://example.com/admin-resume.pdf",
    createdAt: "2023-06-10",
    curruntStatus: "active"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [systemStats] = useState({
    totalUsers: 1247,
    activeUsers: 893,
    totalCourses: 56,
    pendingApprovals: 23,
    systemHealth: 98.5,
    storageUsed: 65.2
  });

  const [recentActivities] = useState([
    { type: 'user', action: 'approved', title: 'User registration - John Smith', time: '10 minutes ago', priority: 'high' },
    { type: 'system', action: 'performed', title: 'System backup completed', time: '2 hours ago', priority: 'medium' },
    { type: 'course', action: 'added', title: 'New course "Advanced React"', time: '5 hours ago', priority: 'medium' },
    { type: 'security', action: 'updated', title: 'Security policies updated', time: '1 day ago', priority: 'high' },
    { type: 'user', action: 'suspended', title: 'User account suspended for violation', time: '2 days ago', priority: 'high' }
  ]);

  const adminStats = [
    { label: 'Total Users', value: systemStats.totalUsers, color: '#2563eb', icon: '👥' },
    { label: 'Active Users', value: systemStats.activeUsers, color: '#059669', icon: '✅' },
    { label: 'System Health', value: `${systemStats.systemHealth}%`, color: '#7c3aed', icon: '🖥️' },
    { label: 'Pending Approvals', value: systemStats.pendingApprovals, color: '#dc2626', icon: '⏳' },
    { label: 'Total Courses', value: systemStats.totalCourses, color: '#d97706', icon: '📚' },
    { label: 'Storage Used', value: `${systemStats.storageUsed}%`, color: '#0891b2', icon: '💾' }
  ];

  const quickActions = [
    { title: 'User Management', icon: '👥', description: 'Manage user accounts and permissions', color: '#2563eb' },
    { title: 'System Settings', icon: '⚙️', description: 'Configure system preferences', color: '#059669' },
    { title: 'Reports & Analytics', icon: '📊', description: 'View system reports and analytics', color: '#7c3aed' },
    { title: 'Backup & Restore', icon: '💾', description: 'Manage system backups', color: '#d97706' }
  ];

  return (
    <div className="admin-profile-container">
      {/* Header Section */}
      <div className="admin-profile-header">
        <div className="admin-profile-header-bg"></div>
        <div className="admin-profile-info">
          <div className="admin-profile-avatar-section">
            <img 
              src={admin.profileImage} 
              alt={admin.name}
              className="admin-profile-avatar"
            />
            <div className="admin-profile-badge">
              <span className="admin-profile-badge-icon">👑</span>
              Administrator
            </div>
          </div>
          <div className="admin-profile-details">
            <h1 className="admin-profile-name">{admin.name}</h1>
            <p className="admin-profile-title">System Administrator</p>
            <p className="admin-profile-department">IT Department</p>
            <div className="admin-profile-meta">
              <span className="admin-profile-meta-item">📧 {admin.email}</span>
              <span className="admin-profile-meta-item">📱 {admin.phone}</span>
              <span className="admin-profile-meta-item">📍 {admin.location}</span>
              <span className="admin-profile-meta-item">📅 Admin since {new Date(admin.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="admin-profile-actions">
            <button 
              className="admin-profile-btn primary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button className="admin-profile-btn secondary">
              System Dashboard
            </button>
            <button className="admin-profile-btn danger">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-profile-tabs">
        {['dashboard', 'users', 'system', 'reports', 'settings'].map(tab => (
          <button
            key={tab}
            className={`admin-profile-tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="admin-profile-content">
        {activeTab === 'dashboard' && (
          <div className="admin-profile-tab-content">
            <div className="admin-profile-stats-section">
              <h2>System Overview</h2>
              <div className="admin-profile-stats-grid">
                {adminStats.map((stat, index) => (
                  <div key={index} className="admin-profile-stat-card">
                    <div 
                      className="admin-profile-stat-header"
                      style={{ borderLeftColor: stat.color }}
                    >
                      <div className="admin-profile-stat-icon-wrapper">
                        <span className="admin-profile-stat-icon">{stat.icon}</span>
                      </div>
                      <div className="admin-profile-stat-info">
                        <h3 className="admin-profile-stat-value">{stat.value}</h3>
                        <p className="admin-profile-stat-label">{stat.label}</p>
                      </div>
                    </div>
                    <div className="admin-profile-stat-trend">
                      <span className="admin-profile-trend-up">↑ 2.3%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="admin-profile-actions-section">
              <h2>Quick Actions</h2>
              <div className="admin-profile-quick-actions-grid">
                {quickActions.map((action, index) => (
                  <div key={index} className="admin-profile-action-card">
                    <div 
                      className="admin-profile-action-icon"
                      style={{ backgroundColor: `${action.color}20` }}
                    >
                      <span style={{ color: action.color, fontSize: '1.5rem' }}>
                        {action.icon}
                      </span>
                    </div>
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                    <button className="admin-profile-action-button">Access</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="admin-profile-activities-section">
              <h2>Recent Activities</h2>
              <div className="admin-profile-activities-list">
                {recentActivities.map((activity, index) => (
                  <div key={index} className={`admin-profile-activity-item priority-${activity.priority}`}>
                    <div className="admin-profile-activity-icon">
                      {activity.type === 'user' && '👤'}
                      {activity.type === 'system' && '🖥️'}
                      {activity.type === 'course' && '📚'}
                      {activity.type === 'security' && '🔒'}
                    </div>
                    <div className="admin-profile-activity-content">
                      <div className="admin-profile-activity-header">
                        <h4>{activity.title}</h4>
                        <span className={`admin-profile-priority-badge ${activity.priority}`}>
                          {activity.priority}
                        </span>
                      </div>
                      <p>You {activity.action} this item</p>
                      <span className="admin-profile-activity-time">{activity.time}</span>
                    </div>
                    <button className="admin-profile-activity-action">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs remain same logic-wise, update classNames similarly */}
        {/* Users, System, Reports, Settings */}
      </div>
    </div>
  );
};

export default AdminProfile;
