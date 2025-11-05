// JobDetails.js
import React, { useState } from 'react';
import './JobDetails.css';

const JobDetails = ({ job, onBack, onApply }) => {
  const [activeTab, setActiveTab] = useState('description');

  if (!job) return null;

  // Mock company details
  const companyDetails = {
    size: "501-1000 employees",
    founded: "2015",
    industry: "Software Development",
    website: "https://techcorp.com",
    headquarters: "San Francisco, California",
    description: "TechCorp is a leading technology company specializing in innovative software solutions. We're committed to building products that make a difference in people's lives.",
    mission: "To empower businesses through cutting-edge technology and exceptional user experiences.",
    culture: ["Innovation-driven", "Remote-first", "Continuous learning", "Work-life balance"],
    benefits: ["Health insurance", "Flexible PTO", "Remote work options", "Professional development", "Stock options"]
  };

  // Mock similar jobs
  const similarJobs = [
    {
      id: 101,
      title: "Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$100,000 - $130,000",
      type: "Full-time",
      posted: "1 day ago"
    },
    {
      id: 102,
      title: "React Developer",
      company: "WebSolutions",
      location: "New York, NY",
      salary: "$110,000 - $140,000",
      type: "Full-time",
      posted: "3 days ago"
    },
    {
      id: 103,
      title: "UI Developer",
      company: "DesignTech",
      location: "Austin, TX",
      salary: "$95,000 - $120,000",
      type: "Full-time",
      posted: "1 week ago"
    }
  ];

  return (
    <div className="job-details-container">
      {/* Back Button */}
      {/* <div className="details-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Jobs
        </button>
      </div> */}

      <div className="details-content">
        {/* Main Content */}
        <div className="details-main">
          {/* Job Header */}
          <div className="job-header-section">
            <div className="company-brand">
              <div className="company-logo-large">
                {job.logo}
              </div>
              <div className="job-title-section">
                <h1 className="job-detail-title">{job.title}</h1>
                <p className="company-name-large">{job.company}</p>
                <div className="job-meta-tags">
                  <span className="meta-tag location">{job.location}</span>
                  <span className="meta-tag salary">{job.salary}</span>
                  <span className="meta-tag type">{job.type}</span>
                  {job.featured && <span className="meta-tag featured">Featured</span>}
                </div>
              </div>
            </div>
            <div className="job-portal-action-buttons">
              <button className="apply-now-btn" onClick={() => onApply(job)}>
                Apply Now
              </button>
              <button className="save-job-btn">
                ♡ Save
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          {/* <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Applicants</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Days Left</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Easy</span>
              <span className="stat-label">Apply</span>
            </div>
          </div> */}

          {/* Navigation Tabs */}
          <div className="details-tabs">
            <button 
              className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Job Description
            </button>
            <button 
              className={`tab-button ${activeTab === 'company' ? 'active' : ''}`}
              onClick={() => setActiveTab('company')}
            >
              Company
            </button>
            <button 
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <div className="section">
                  <h3 className="section-title">Job Description</h3>
                  <p className="job-full-description">
                    We are looking for a passionate {job.title} to join our dynamic team. 
                    In this role, you'll be responsible for developing and maintaining 
                    high-quality software solutions that drive our business forward.
                  </p>
                </div>

                <div className="section">
                  <h3 className="section-title">Responsibilities</h3>
                  <ul className="responsibilities-list">
                    <li>Develop and maintain web applications using modern frameworks</li>
                    <li>Collaborate with cross-functional teams to define and design new features</li>
                    <li>Write clean, maintainable, and efficient code</li>
                    <li>Participate in code reviews and provide constructive feedback</li>
                    <li>Troubleshoot, debug, and upgrade existing systems</li>
                    <li>Stay up-to-date with emerging technologies and industry trends</li>
                  </ul>
                </div>

                <div className="section">
                  <h3 className="section-title">Requirements</h3>
                  <ul className="requirements-list">
                    <li>3+ years of experience in software development</li>
                    <li>Proficiency in JavaScript/TypeScript and React</li>
                    <li>Experience with modern development tools and practices</li>
                    <li>Strong problem-solving skills and attention to detail</li>
                    <li>Excellent communication and teamwork abilities</li>
                    <li>Bachelor's degree in Computer Science or related field</li>
                  </ul>
                </div>

                <div className="section">
                  <h3 className="section-title">What We Offer</h3>
                  <div className="benefits-grid">
                    <div className="benefit-item">
                      <span className="benefit-icon">💼</span>
                      <span>Competitive salary & equity</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">🏠</span>
                      <span>Remote work flexibility</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">📚</span>
                      <span>Learning & development budget</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">🏥</span>
                      <span>Comprehensive health benefits</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">🎯</span>
                      <span>Career growth opportunities</span>
                    </div>
                    <div className="benefit-item">
                      <span className="benefit-icon">👥</span>
                      <span>Great team culture</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'company' && (
              <div className="tab-panel">
                <div className="section">
                  <h3 className="section-title">About {job.company}</h3>
                  <p className="company-description">{companyDetails.description}</p>
                  <p className="company-mission">{companyDetails.mission}</p>
                </div>

                <div className="company-stats">
                  <div className="stat-card">
                    <span className="stat-value">{companyDetails.size}</span>
                    <span className="stat-label">Company Size</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{companyDetails.founded}</span>
                    <span className="stat-label">Founded</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{companyDetails.industry}</span>
                    <span className="stat-label">Industry</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{companyDetails.headquarters}</span>
                    <span className="stat-label">Headquarters</span>
                  </div>
                </div>

                <div className="section">
                  <h3 className="section-title">Company Culture</h3>
                  <div className="culture-tags">
                    {companyDetails.culture.map((item, index) => (
                      <span key={index} className="culture-tag">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="section">
                  <h3 className="section-title">Benefits & Perks</h3>
                  <div className="benefits-list">
                    {companyDetails.benefits.map((benefit, index) => (
                      <div key={index} className="benefit-list-item">
                        <span className="check-icon">✓</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-summary">
                  <div className="overall-rating">
                    <div className="rating-score">4.2</div>
                    <div className="rating-stars">★★★★☆</div>
                    <div className="rating-count">Based on 24 reviews</div>
                  </div>
                  <div className="rating-breakdown">
                    <div className="rating-item">
                      <span>Work/Life Balance</span>
                      <div className="rating-bar">
                        <div className="rating-fill" style={{width: '80%'}}></div>
                      </div>
                      <span>4.0</span>
                    </div>
                    <div className="rating-item">
                      <span>Culture & Values</span>
                      <div className="rating-bar">
                        <div className="rating-fill" style={{width: '85%'}}></div>
                      </div>
                      <span>4.3</span>
                    </div>
                    <div className="rating-item">
                      <span>Career Opportunities</span>
                      <div className="rating-bar">
                        <div className="rating-fill" style={{width: '75%'}}></div>
                      </div>
                      <span>3.8</span>
                    </div>
                  </div>
                </div>

                <div className="reviews-list">
                  <div className="review-card">
                    <div className="review-header">
                      <div className="reviewer">Anonymous Employee</div>
                      <div className="review-date">2 weeks ago</div>
                    </div>
                    <div className="review-rating">★★★★☆</div>
                    <div className="review-title">Great place to grow</div>
                    <p className="review-content">
                      Excellent learning opportunities and supportive management. 
                      The work-life balance is respected, and the team is very collaborative.
                    </p>
                  </div>

                  <div className="review-card">
                    <div className="review-header">
                      <div className="reviewer">Current Employee</div>
                      <div className="review-date">1 month ago</div>
                    </div>
                    <div className="review-rating">★★★★★</div>
                    <div className="review-title">Amazing culture</div>
                    <p className="review-content">
                      The company truly values its employees. Great benefits, 
                      flexible work arrangements, and meaningful work.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="details-sidebar">
          {/* Company Card */}
          {/* <div className="sidebar-card">
            <h4 className="sidebar-title">About the Company</h4>
            <div className="company-sidebar">
              <div className="sidebar-logo">{job.logo}</div>
              <div className="sidebar-company-info">
                <h5>{job.company}</h5>
                <p>{companyDetails.industry}</p>
                <p>{companyDetails.size}</p>
              </div>
            </div>
            <button className="view-company-btn">
              View Company Profile
            </button>
          </div> */}

          {/* Job Stats */}
          {/* <div className="sidebar-card">
            <h4 className="sidebar-title">Job Insights</h4>
            <div className="job-insights">
              <div className="insight-item">
                <span className="insight-label">Posted</span>
                <span className="insight-value">{job.posted}</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Applicants</span>
                <span className="insight-value">24</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Easy Apply</span>
                <span className="insight-value success">Yes</span>
              </div>
              <div className="insight-item">
                <span className="insight-label">Remote Work</span>
                <span className="insight-value success">Available</span>
              </div>
            </div>
          </div> */}

          {/* Similar Jobs */}
          {/* <div className="sidebar-card">
            <h4 className="sidebar-title">Similar Jobs</h4>
            <div className="similar-jobs">
              {similarJobs.map(similarJob => (
                <div key={similarJob.id} className="similar-job-item">
                  <div className="similar-job-info">
                    <h6 className="similar-job-title">{similarJob.title}</h6>
                    <p className="similar-job-company">{similarJob.company}</p>
                    <div className="similar-job-meta">
                      <span>{similarJob.location}</span>
                      <span>•</span>
                      <span>{similarJob.salary}</span>
                    </div>
                  </div>
                  <span className="similar-job-time">{similarJob.posted}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;