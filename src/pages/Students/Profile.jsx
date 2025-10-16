import React, { useEffect, useState } from 'react';
import '../../CSSFiles/Students/Profile.css';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "student",
    phone: "+1 (555) 123-4567",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    location: "San Francisco, CA",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "CSS"],
    readbooks: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
    appliedJobs: ["507f1f77bcf86cd799439013"],
    internApplications: ["507f1f77bcf86cd799439014"],
    certificates: ["507f1f77bcf86cd799439015"],
    totalTests: 15,
    totalBooksRead: 8,
    resumeLink: "https://example.com/resume.pdf",
    createdAt: "2024-01-15",
    curruntStatus: "active"
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/users/profile`, );
      const data = response.data;
      console.log(response);
      
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleEditClick = () => {
    setIsEditing(true);
    // Perform any necessary actions to enable editing
  };

  // get user data
  const handleSaveClick = () => {
    setIsEditing(false);
    // Perform any necessary actions to save the changes
  };

  // Mock data for demonstration
  const stats = [
    { label: 'Books Read', value: user.totalBooksRead, color: '#4f46e5' },
    { label: 'Tests Taken', value: user.totalTests, color: '#059669' },
    { label: 'Jobs Applied', value: user.appliedJobs.length, color: '#dc2626' },
    { label: 'Certificates', value: user.certificates.length, color: '#7c3aed' }
  ];

  const recentActivities = [
    { type: 'book', action: 'finished reading', title: 'React Advanced Patterns', time: '2 hours ago' },
    { type: 'test', action: 'completed', title: 'JavaScript Fundamentals', time: '1 day ago' },
    { type: 'job', action: 'applied to', title: 'Frontend Developer at TechCorp', time: '3 days ago' },
    { type: 'certificate', action: 'earned', title: 'MongoDB Certification', time: '1 week ago' }
  ];

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="header-background"></div>
        <div className="profile-info">
          <div className="avatar-section">
            <img 
              src={user.profileImage} 
              alt={user.name}
              className="profile-avatar"
            />
            <div className="status-indicator">
              <span className={`status-dot ${user.curruntStatus}`}></span>
              {user.curruntStatus}
            </div>
          </div>
          <div className="user-details">
            <h1 className="user-name">{user.name}</h1>
            <p className="user-role">{user.role}</p>
            <p className="user-location">📍 {user.location}</p>
            <div className="user-meta">
              <span className="meta-item">📧 {user.email}</span>
              <span className="meta-item">📱 {user.phone}</span>
              <span className="meta-item">📅 Joined {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="action-buttons">
            <button 
              className="btn-primary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button className="btn-secondary">
              Download Resume
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        {['overview', 'skills', 'achievements', 'activity'].map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div 
                    className="stat-icon"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <div 
                      className="stat-dot"
                      style={{ backgroundColor: stat.color }}
                    ></div>
                  </div>
                  <div className="stat-info">
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="content-grid">
              <div className="skills-preview">
                <h3>Skills</h3>
                <div className="skills-list">
                  {user.skills.slice(0, 5).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                  {user.skills.length > 5 && (
                    <span className="skill-tag more">+{user.skills.length - 5} more</span>
                  )}
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        {activity.type === 'book' && '📚'}
                        {activity.type === 'test' && '📝'}
                        {activity.type === 'job' && '💼'}
                        {activity.type === 'certificate' && '🏆'}
                      </div>
                      <div className="activity-details">
                        <p className="activity-text">
                          <strong>{activity.action}</strong> {activity.title}
                        </p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="tab-content">
            <div className="skills-section">
              <h2>Technical Skills</h2>
              <div className="skills-grid">
                {user.skills.map((skill, index) => (
                  <div key={index} className="skill-card">
                    <div className="skill-header">
                      <h4>{skill}</h4>
                      <div className="skill-level">Advanced</div>
                    </div>
                    <div className="skill-progress">
                      <div 
                        className="skill-progress-bar"
                        style={{ width: `${Math.random() * 50 + 50}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="tab-content">
            <div className="achievements-grid">
              <div className="achievement-card">
                <div className="achievement-icon">📚</div>
                <h4>Book Worm</h4>
                <p>Read {user.totalBooksRead} books</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon">📝</div>
                <h4>Test Master</h4>
                <p>Completed {user.totalTests} tests</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon">💼</div>
                <h4>Job Hunter</h4>
                <p>Applied to {user.appliedJobs.length} jobs</p>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon">🏆</div>
                <h4>Certified Pro</h4>
                <p>Earned {user.certificates.length} certificates</p>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="tab-content">
            <div className="activity-timeline">
              {recentActivities.map((activity, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="activity-icon-large">
                      {activity.type === 'book' && '📚'}
                      {activity.type === 'test' && '📝'}
                      {activity.type === 'job' && '💼'}
                      {activity.type === 'certificate' && '🏆'}
                    </div>
                    <div className="timeline-details">
                      <h4>{activity.title}</h4>
                      <p>You {activity.action} this item</p>
                      <span className="timeline-time">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;