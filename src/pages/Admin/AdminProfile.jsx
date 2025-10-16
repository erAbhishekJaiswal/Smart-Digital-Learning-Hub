// import React, { useState, useEffect } from 'react';
// import '../../CSSFiles/Admin/AdminProfile.css';

// const AdminProfile = () => {
//   const [admin, setAdmin] = useState({
//     name: "Sarah Johnson",
//     email: "sarah.johnson@company.com",
//     role: "admin",
//     phone: "+1 (555) 987-6543",
//     profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
//     location: "New York, NY",
//     skills: ["System Administration", "Database Management", "Security", "User Management", "Analytics"],
//     readbooks: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
//     appliedJobs: [],
//     internApplications: [],
//     certificates: ["507f1f77bcf86cd799439015", "507f1f77bcf86cd799439016"],
//     totalTests: 0,
//     totalBooksRead: 12,
//     resumeLink: "https://example.com/admin-resume.pdf",
//     createdAt: "2023-06-10",
//     curruntStatus: "active"
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [systemStats, setSystemStats] = useState({
//     totalUsers: 1247,
//     activeUsers: 893,
//     totalCourses: 56,
//     pendingApprovals: 23,
//     systemHealth: 98.5,
//     storageUsed: 65.2
//   });

//   const [recentActivities, setRecentActivities] = useState([
//     { type: 'user', action: 'approved', title: 'User registration - John Smith', time: '10 minutes ago', priority: 'high' },
//     { type: 'system', action: 'performed', title: 'System backup completed', time: '2 hours ago', priority: 'medium' },
//     { type: 'course', action: 'added', title: 'New course "Advanced React"', time: '5 hours ago', priority: 'medium' },
//     { type: 'security', action: 'updated', title: 'Security policies updated', time: '1 day ago', priority: 'high' },
//     { type: 'user', action: 'suspended', title: 'User account suspended for violation', time: '2 days ago', priority: 'high' }
//   ]);

//   const adminStats = [
//     { label: 'Total Users', value: systemStats.totalUsers, color: '#2563eb', icon: '👥' },
//     { label: 'Active Users', value: systemStats.activeUsers, color: '#059669', icon: '✅' },
//     { label: 'System Health', value: `${systemStats.systemHealth}%`, color: '#7c3aed', icon: '🖥️' },
//     { label: 'Pending Approvals', value: systemStats.pendingApprovals, color: '#dc2626', icon: '⏳' },
//     { label: 'Total Courses', value: systemStats.totalCourses, color: '#d97706', icon: '📚' },
//     { label: 'Storage Used', value: `${systemStats.storageUsed}%`, color: '#0891b2', icon: '💾' }
//   ];

//   const quickActions = [
//     { title: 'User Management', icon: '👥', description: 'Manage user accounts and permissions', color: '#2563eb' },
//     { title: 'System Settings', icon: '⚙️', description: 'Configure system preferences', color: '#059669' },
//     { title: 'Reports & Analytics', icon: '📊', description: 'View system reports and analytics', color: '#7c3aed' },
//     { title: 'Backup & Restore', icon: '💾', description: 'Manage system backups', color: '#d97706' }
//   ];

//   return (
//     <div className="admin-profile-container">
//       {/* Header Section */}
//       <div className="admin-header">
//         <div className="header-background"></div>
//         <div className="admin-profile-info">
//           <div className="admin-avatar-section">
//             <img 
//               src={admin.profileImage} 
//               alt={admin.name}
//               className="admin-avatar"
//             />
//             <div className="admin-badge">
//               <span className="badge-icon">👑</span>
//               Administrator
//             </div>
//           </div>
//           <div className="admin-details">
//             <h1 className="admin-name">{admin.name}</h1>
//             <p className="admin-title">System Administrator</p>
//             <p className="admin-department">IT Department</p>
//             <div className="admin-meta">
//               <span className="admin-meta-item">📧 {admin.email}</span>
//               <span className="admin-meta-item">📱 {admin.phone}</span>
//               <span className="admin-meta-item">📍 {admin.location}</span>
//               <span className="admin-meta-item">📅 Admin since {new Date(admin.createdAt).toLocaleDateString()}</span>
//             </div>
//           </div>
//           <div className="admin-actions">
//             <button 
//               className="admin-btn primary"
//               onClick={() => setIsEditing(!isEditing)}
//             >
//               {isEditing ? 'Save Changes' : 'Edit Profile'}
//             </button>
//             <button className="admin-btn secondary">
//               System Dashboard
//             </button>
//             <button className="admin-btn danger">
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="admin-tabs">
//         {['dashboard', 'users', 'system', 'reports', 'settings'].map(tab => (
//           <button
//             key={tab}
//             className={`admin-tab-button ${activeTab === tab ? 'active' : ''}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="admin-content">
//         {/* Dashboard Tab */}
//         {activeTab === 'dashboard' && (
//           <div className="tab-content">
//             {/* Quick Stats */}
//             <div className="stats-section">
//               <h2>System Overview</h2>
//               <div className="admin-stats-grid">
//                 {adminStats.map((stat, index) => (
//                   <div key={index} className="admin-stat-card">
//                     <div 
//                       className="stat-header"
//                       style={{ borderLeftColor: stat.color }}
//                     >
//                       <div className="stat-icon-wrapper">
//                         <span className="stat-icon">{stat.icon}</span>
//                       </div>
//                       <div className="stat-info">
//                         <h3 className="stat-value">{stat.value}</h3>
//                         <p className="stat-label">{stat.label}</p>
//                       </div>
//                     </div>
//                     <div className="stat-trend">
//                       <span className="trend-up">↑ 2.3%</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="actions-section">
//               <h2>Quick Actions</h2>
//               <div className="quick-actions-grid">
//                 {quickActions.map((action, index) => (
//                   <div key={index} className="action-card">
//                     <div 
//                       className="action-icon"
//                       style={{ backgroundColor: `${action.color}20` }}
//                     >
//                       <span style={{ color: action.color, fontSize: '1.5rem' }}>
//                         {action.icon}
//                       </span>
//                     </div>
//                     <h4>{action.title}</h4>
//                     <p>{action.description}</p>
//                     <button className="action-button">Access</button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Activities */}
//             <div className="activities-section">
//               <h2>Recent Activities</h2>
//               <div className="activities-list">
//                 {recentActivities.map((activity, index) => (
//                   <div key={index} className={`activity-item priority-${activity.priority}`}>
//                     <div className="activity-icon">
//                       {activity.type === 'user' && '👤'}
//                       {activity.type === 'system' && '🖥️'}
//                       {activity.type === 'course' && '📚'}
//                       {activity.type === 'security' && '🔒'}
//                     </div>
//                     <div className="activity-content">
//                       <div className="activity-header">
//                         <h4>{activity.title}</h4>
//                         <span className={`priority-badge ${activity.priority}`}>
//                           {activity.priority}
//                         </span>
//                       </div>
//                       <p>You {activity.action} this item</p>
//                       <span className="activity-time">{activity.time}</span>
//                     </div>
//                     <button className="activity-action">View</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Users Tab */}
//         {activeTab === 'users' && (
//           <div className="tab-content">
//             <div className="users-management">
//               <h2>User Management</h2>
//               <div className="users-stats">
//                 <div className="user-stat">
//                   <span className="stat-number">1,247</span>
//                   <span className="stat-label">Total Users</span>
//                 </div>
//                 <div className="user-stat">
//                   <span className="stat-number">893</span>
//                   <span className="stat-label">Active Users</span>
//                 </div>
//                 <div className="user-stat">
//                   <span className="stat-number">23</span>
//                   <span className="stat-label">Pending Approval</span>
//                 </div>
//                 <div className="user-stat">
//                   <span className="stat-number">15</span>
//                   <span className="stat-label">Suspended</span>
//                 </div>
//               </div>
//               {/* User management table would go here */}
//             </div>
//           </div>
//         )}

//         {/* System Tab */}
//         {activeTab === 'system' && (
//           <div className="tab-content">
//             <div className="system-management">
//               <h2>System Configuration</h2>
//               <div className="system-cards">
//                 <div className="system-card">
//                   <h3>Server Status</h3>
//                   <div className="server-status online">
//                     <span className="status-dot"></span>
//                     All Systems Operational
//                   </div>
//                 </div>
//                 <div className="system-card">
//                   <h3>Database</h3>
//                   <div className="db-status">
//                     <span className="status-text">Connected</span>
//                     <span className="status-details">Last backup: 2 hours ago</span>
//                   </div>
//                 </div>
//                 <div className="system-card">
//                   <h3>Security</h3>
//                   <div className="security-status">
//                     <span className="status-text">Protected</span>
//                     <span className="status-details">No threats detected</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reports Tab */}
//         {activeTab === 'reports' && (
//           <div className="tab-content">
//             <div className="reports-section">
//               <h2>Reports & Analytics</h2>
//               <div className="reports-grid">
//                 <div className="report-card">
//                   <h4>User Growth</h4>
//                   <div className="report-placeholder">
//                     📈 Chart would be displayed here
//                   </div>
//                 </div>
//                 <div className="report-card">
//                   <h4>System Performance</h4>
//                   <div className="report-placeholder">
//                     📊 Metrics would be displayed here
//                   </div>
//                 </div>
//                 <div className="report-card">
//                   <h4>Course Engagement</h4>
//                   <div className="report-placeholder">
//                     📚 Analytics would be displayed here
//                   </div>
//                 </div>
//                 <div className="report-card">
//                   <h4>Security Logs</h4>
//                   <div className="report-placeholder">
//                     🔍 Logs would be displayed here
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Settings Tab */}
//         {activeTab === 'settings' && (
//           <div className="tab-content">
//             <div className="settings-section">
//               <h2>Admin Settings</h2>
//               <div className="settings-cards">
//                 <div className="setting-card">
//                   <h4>Profile Settings</h4>
//                   <p>Update your personal information and preferences</p>
//                   <button className="setting-button">Configure</button>
//                 </div>
//                 <div className="setting-card">
//                   <h4>System Preferences</h4>
//                   <p>Configure system-wide settings and preferences</p>
//                   <button className="setting-button">Configure</button>
//                 </div>
//                 <div className="setting-card">
//                   <h4>Security Settings</h4>
//                   <p>Manage security policies and access controls</p>
//                   <button className="setting-button">Configure</button>
//                 </div>
//                 <div className="setting-card">
//                   <h4>Notification Settings</h4>
//                   <p>Configure email and system notifications</p>
//                   <button className="setting-button">Configure</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;




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
