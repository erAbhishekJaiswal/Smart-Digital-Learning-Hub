// // AdminApplications.js
// import React, { useState, useEffect } from 'react';
// import './ApplicationList.css';

// const ApplicationList = () => {
//   const [applications, setApplications] = useState([]);
//   const [filteredApplications, setFilteredApplications] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     status: 'all',
//     jobTitle: 'all',
//     dateRange: 'all'
//   });
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Mock data - replace with your API call
//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         // Replace with your actual API call
//         const mockApplications = [
//           {
//             "_id": "69119233b36a8dabf9c14d13",
//             "job": {
//               "_id": "690c8257db76c81256f98b52",
//               "title": "Senior Frontend Developer",
//               "company": "690c7e8866ea4352a6cfaa8a",
//               "location": "San Francisco, CA"
//             },
//             "fullName": "John Doe",
//             "email": "john.doe@gmail.com",
//             "phone": "1123456543",
//             "resumeUrl": "https://res.cloudinary.com/dm9g4lkx8/raw/upload/v1762759220/resumes/1762759217238-OD435757532071829100_compressed.pdf",
//             "coverLetter": "I am excited to apply for the Senior Frontend Developer position. With 5+ years of experience in React and modern JavaScript, I believe I would be a great fit for your team.",
//             "portfolio": "www.johndoeportfolio.com",
//             "linkedin": "www.linkedin.com/in/johndoe",
//             "salaryExpectation": "120000",
//             "noticePeriod": "1 month",
//             "source": "linkedin",
//             "status": "Submitted",
//             "createdAt": "2025-11-10T07:20:19.366Z",
//             "updatedAt": "2025-11-10T07:20:19.366Z",
//             "__v": 0
//           },
//           {
//             "_id": "690db0fae12b416860d63deb",
//             "job": {
//               "_id": "690c8257db76c81256f98b52",
//               "title": "Senior Frontend Developer",
//               "company": "690c7e8866ea4352a6cfaa8a",
//               "location": "San Francisco, CA"
//             },
//             "fullName": "Sarah Wilson",
//             "email": "sarah.wilson@gmail.com",
//             "phone": "1234567891",
//             "resumeUrl": "https://res.cloudinary.com/dm9g4lkx8/image/upload/v1762504954/resumes/mydzfq97hihbgckanopo.pdf",
//             "coverLetter": "As an experienced UX/UI designer with a strong background in frontend development, I'm thrilled about the opportunity to join your innovative team.",
//             "portfolio": "sarahwilson.design",
//             "linkedin": "www.linkedin.com/in/sarahwilson",
//             "salaryExpectation": "110000",
//             "noticePeriod": "2 weeks",
//             "source": "company_website",
//             "status": "Under Review",
//             "createdAt": "2025-11-07T08:42:34.800Z",
//             "updatedAt": "2025-11-07T08:42:34.800Z",
//             "__v": 0
//           },
//           {
//             "_id": "690da185eb1411365f4effe0",
//             "job": {
//               "_id": "690c8257db76c81256f98b52",
//               "title": "Senior Frontend Developer",
//               "company": "690c7e8866ea4352a6cfaa8a",
//               "location": "San Francisco, CA"
//             },
//             "fullName": "Michael Chen",
//             "email": "michael.chen@gmail.com",
//             "phone": "1234567890",
//             "resumeUrl": "/uploads/resumes/1762500997249-invoice of laptop.pdf",
//             "coverLetter": "With 7 years of experience in frontend architecture and team leadership, I'm excited about the possibility of contributing to your company's success.",
//             "portfolio": "michaelchen.dev",
//             "linkedin": "www.linkedin.com/in/michaelchen",
//             "salaryExpectation": "130000",
//             "noticePeriod": "1 month",
//             "source": "referral",
//             "status": "Interview",
//             "createdAt": "2025-11-07T07:36:37.329Z",
//             "updatedAt": "2025-11-07T07:36:37.329Z",
//             "__v": 0
//           },
//           {
//             "_id": "690da185eb1411365f4effe1",
//             "job": {
//               "_id": "690c8257db76c81256f98b53",
//               "title": "Backend Engineer",
//               "company": "690c7e8866ea4352a6cfaa8b",
//               "location": "Remote"
//             },
//             "fullName": "Emily Rodriguez",
//             "email": "emily.rodriguez@gmail.com",
//             "phone": "1234567892",
//             "resumeUrl": "/uploads/resumes/1762500997249-emily-resume.pdf",
//             "coverLetter": "As a backend specialist with expertise in Node.js and cloud infrastructure, I'm excited about the challenges this position offers.",
//             "portfolio": "emilyrodriguez.tech",
//             "linkedin": "www.linkedin.com/in/emilyrodriguez",
//             "salaryExpectation": "115000",
//             "noticePeriod": "3 weeks",
//             "source": "job_board",
//             "status": "Rejected",
//             "createdAt": "2025-11-05T07:36:37.329Z",
//             "updatedAt": "2025-11-05T07:36:37.329Z",
//             "__v": 0
//           },
//           {
//             "_id": "690da185eb1411365f4effe2",
//             "job": {
//               "_id": "690c8257db76c81256f98b54",
//               "title": "UX Designer",
//               "company": "690c7e8866ea4352a6cfaa8c",
//               "location": "New York, NY"
//             },
//             "fullName": "David Kim",
//             "email": "david.kim@gmail.com",
//             "phone": "1234567893",
//             "resumeUrl": "/uploads/resumes/1762500997249-david-resume.pdf",
//             "coverLetter": "Passionate about creating intuitive user experiences and with a strong portfolio of successful projects.",
//             "portfolio": "davidkim.design",
//             "linkedin": "www.linkedin.com/in/davidkim",
//             "salaryExpectation": "95000",
//             "noticePeriod": "2 weeks",
//             "source": "linkedin",
//             "status": "Offer",
//             "createdAt": "2025-11-03T07:36:37.329Z",
//             "updatedAt": "2025-11-03T07:36:37.329Z",
//             "__v": 0
//           }
//         ];
//         setApplications(mockApplications);
//         setFilteredApplications(mockApplications);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching applications:', error);
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   // Extract unique job titles for filter
//   const jobTitles = [...new Set(applications.map(app => app.job.title))];

//   // Filter and search applications
//   useEffect(() => {
//     let results = applications;

//     // Search filter
//     if (searchTerm) {
//       results = results.filter(app =>
//         app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.job.location.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Status filter
//     if (filters.status !== 'all') {
//       results = results.filter(app => app.status === filters.status);
//     }

//     // Job title filter
//     if (filters.jobTitle !== 'all') {
//       results = results.filter(app => app.job.title === filters.jobTitle);
//     }

//     // Date range filter
//     if (filters.dateRange !== 'all') {
//       const now = new Date();
//       const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
//       const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

//       results = results.filter(app => {
//         const appDate = new Date(app.createdAt);
//         switch (filters.dateRange) {
//           case '7days':
//             return appDate >= sevenDaysAgo;
//           case '30days':
//             return appDate >= thirtyDaysAgo;
//           default:
//             return true;
//         }
//       });
//     }

//     setFilteredApplications(results);
//   }, [applications, searchTerm, filters]);

//   const handleFilterChange = (filterType, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterType]: value
//     }));
//   };

//   const handleStatusUpdate = async (applicationId, newStatus) => {
//     try {
//       // Replace with your actual API call
//       const updatedApplications = applications.map(app =>
//         app._id === applicationId ? { ...app, status: newStatus } : app
//       );
//       setApplications(updatedApplications);
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       'Submitted': '#3b82f6',
//       'Under Review': '#f59e0b',
//       'Interview': '#8b5cf6',
//       'Offer': '#10b981',
//       'Rejected': '#ef4444',
//       'Hired': '#059669'
//     };
//     return colors[status] || '#6b7280';
//   };

//   const getSourceIcon = (source) => {
//     const icons = {
//       'linkedin': '💼',
//       'company_website': '🌐',
//       'referral': '👥',
//       'job_board': '📋',
//       'other': '📧'
//     };
//     return icons[source] || '📧';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const calculateStats = () => {
//     const total = applications.length;
//     const submitted = applications.filter(app => app.status === 'Submitted').length;
//     const underReview = applications.filter(app => app.status === 'Under Review').length;
//     const interview = applications.filter(app => app.status === 'Interview').length;
//     const offer = applications.filter(app => app.status === 'Offer').length;

//     return { total, submitted, underReview, interview, offer };
//   };

//   const stats = calculateStats();

//   if (loading) {
//     return (
//       <div className="admin-applications-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading applications...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-applications-container">
//       {/* Header */}
//       <div className="applications-header">
//         <div className="header-content">
//           <h1 className="applications-title">Job Applications</h1>
//           <p className="applications-subtitle">
//             Manage and review all job applications in one place
//           </p>
//         </div>
//         <div className="header-stats">
//           <div className="stat-card total">
//             <span className="stat-number">{stats.total}</span>
//             <span className="stat-label">Total</span>
//           </div>
//           <div className="stat-card submitted">
//             <span className="stat-number">{stats.submitted}</span>
//             <span className="stat-label">Submitted</span>
//           </div>
//           <div className="stat-card review">
//             <span className="stat-number">{stats.underReview}</span>
//             <span className="stat-label">Under Review</span>
//           </div>
//           <div className="stat-card interview">
//             <span className="stat-number">{stats.interview}</span>
//             <span className="stat-label">Interview</span>
//           </div>
//         </div>
//       </div>

//       {/* Search and Filters */}
//       <div className="applications-controls">
//         <div className="search-section">
//           <div className="search-input-wrapper">
//             <span className="search-icon">🔍</span>
//             <input
//               type="text"
//               placeholder="Search by name, email, job title, or location..."
//               className="search-input"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="filters-section">
//           <div className="filter-group">
//             <label className="filter-label">Status</label>
//             <select
//               className="filter-select"
//               value={filters.status}
//               onChange={(e) => handleFilterChange('status', e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="Submitted">Submitted</option>
//               <option value="Under Review">Under Review</option>
//               <option value="Interview">Interview</option>
//               <option value="Offer">Offer</option>
//               <option value="Rejected">Rejected</option>
//               <option value="Hired">Hired</option>
//             </select>
//           </div>

//           <div className="filter-group">
//             <label className="filter-label">Job Title</label>
//             <select
//               className="filter-select"
//               value={filters.jobTitle}
//               onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
//             >
//               <option value="all">All Jobs</option>
//               {jobTitles.map(title => (
//                 <option key={title} value={title}>{title}</option>
//               ))}
//             </select>
//           </div>

//           <div className="filter-group">
//             <label className="filter-label">Date</label>
//             <select
//               className="filter-select"
//               value={filters.dateRange}
//               onChange={(e) => handleFilterChange('dateRange', e.target.value)}
//             >
//               <option value="all">All Time</option>
//               <option value="7days">Last 7 Days</option>
//               <option value="30days">Last 30 Days</option>
//             </select>
//           </div>

//           <button 
//             className="reset-filters-btn"
//             onClick={() => {
//               setFilters({ status: 'all', jobTitle: 'all', dateRange: 'all' });
//               setSearchTerm('');
//             }}
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>

//       {/* Applications Table */}
//       <div className="applications-table-container">
//         <div className="table-header">
//           <span className="results-count">
//             {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} found
//           </span>
//         </div>

//         <div className="applications-grid">
//           {filteredApplications.length === 0 ? (
//             <div className="no-applications">
//               <div className="no-applications-icon">📋</div>
//               <h3>No applications found</h3>
//               <p>Try adjusting your search or filters</p>
//             </div>
//           ) : (
//             filteredApplications.map(application => (
//               <div key={application._id} className="application-card">
//                 <div className="application-header">
//                   <div className="candidate-info">
//                     <div className="candidate-avatar">
//                       {application.fullName.split(' ').map(n => n[0]).join('')}
//                     </div>
//                     <div className="candidate-details">
//                       <h3 className="candidate-name">{application.fullName}</h3>
//                       <p className="candidate-email">{application.email}</p>
//                     </div>
//                   </div>
//                   <div className="application-meta">
//                     <span className="application-date">
//                       {formatDate(application.createdAt)}
//                     </span>
//                     <span className="application-source">
//                       {getSourceIcon(application.source)} {application.source}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="job-info">
//                   <h4 className="job-title">{application.job.title}</h4>
//                   <p className="job-location">{application.job.location}</p>
//                 </div>

//                 <div className="application-details">
//                   <div className="detail-item">
//                     <span className="detail-label">Phone:</span>
//                     <span className="detail-value">{application.phone}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Salary Expectation:</span>
//                     <span className="detail-value">${parseInt(application.salaryExpectation).toLocaleString()}</span>
//                   </div>
//                   <div className="detail-item">
//                     <span className="detail-label">Notice Period:</span>
//                     <span className="detail-value">{application.noticePeriod}</span>
//                   </div>
//                 </div>

//                 <div className="application-footer">
//                   <div className="status-section">
//                     <select
//                       className={`status-select status-${application.status.toLowerCase().replace(' ', '-')}`}
//                       value={application.status}
//                       onChange={(e) => handleStatusUpdate(application._id, e.target.value)}
//                       style={{ borderColor: getStatusColor(application.status) }}
//                     >
//                       <option value="Submitted">Submitted</option>
//                       <option value="Under Review">Under Review</option>
//                       <option value="Interview">Interview</option>
//                       <option value="Offer">Offer</option>
//                       <option value="Rejected">Rejected</option>
//                       <option value="Hired">Hired</option>
//                     </select>
//                   </div>
//                   <div className="action-buttons">
//                     <button 
//                       className="view-details-btn"
//                       onClick={() => {
//                         setSelectedApplication(application);
//                         setShowDetailsModal(true);
//                       }}
//                     >
//                       View Details
//                     </button>
//                     <a 
//                       href={application.resumeUrl} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="resume-btn"
//                     >
//                       View Resume
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Application Details Modal */}
//       {showDetailsModal && selectedApplication && (
//         <ApplicationDetailsModal
//           application={selectedApplication}
//           onClose={() => setShowDetailsModal(false)}
//           onStatusUpdate={handleStatusUpdate}
//           getStatusColor={getStatusColor}
//         />
//       )}
//     </div>
//   );
// };

// // Application Details Modal Component
// const ApplicationDetailsModal = ({ application, onClose, onStatusUpdate, getStatusColor }) => {
//   const [currentStatus, setCurrentStatus] = useState(application.status);

//   const handleStatusChange = (newStatus) => {
//     setCurrentStatus(newStatus);
//     onStatusUpdate(application._id, newStatus);
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div className="application-modal-overlay" onClick={handleOverlayClick}>
//       <div className="application-modal-container">
//         <div className="modal-header">
//           <h2>Application Details</h2>
//           <button className="modal-close-btn" onClick={onClose}>×</button>
//         </div>

//         <div className="modal-content">
//           <div className="modal-section">
//             <h3>Candidate Information</h3>
//             <div className="info-grid">
//               <div className="info-item">
//                 <label>Full Name:</label>
//                 <span>{application.fullName}</span>
//               </div>
//               <div className="info-item">
//                 <label>Email:</label>
//                 <span>{application.email}</span>
//               </div>
//               <div className="info-item">
//                 <label>Phone:</label>
//                 <span>{application.phone}</span>
//               </div>
//               <div className="info-item">
//                 <label>Applied On:</label>
//                 <span>{new Date(application.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>
//           </div>

//           <div className="modal-section">
//             <h3>Job Information</h3>
//             <div className="info-grid">
//               <div className="info-item">
//                 <label>Position:</label>
//                 <span>{application.job.title}</span>
//               </div>
//               <div className="info-item">
//                 <label>Location:</label>
//                 <span>{application.job.location}</span>
//               </div>
//               <div className="info-item">
//                 <label>Salary Expectation:</label>
//                 <span>${parseInt(application.salaryExpectation).toLocaleString()}</span>
//               </div>
//               <div className="info-item">
//                 <label>Notice Period:</label>
//                 <span>{application.noticePeriod}</span>
//               </div>
//             </div>
//           </div>

//           <div className="modal-section">
//             <h3>Application Details</h3>
//             <div className="info-grid">
//               <div className="info-item">
//                 <label>Source:</label>
//                 <span>{application.source}</span>
//               </div>
//               <div className="info-item">
//                 <label>Portfolio:</label>
//                 <span>
//                   <a href={application.portfolio} target="_blank" rel="noopener noreferrer">
//                     {application.portfolio}
//                   </a>
//                 </span>
//               </div>
//               <div className="info-item">
//                 <label>LinkedIn:</label>
//                 <span>
//                   <a href={application.linkedin} target="_blank" rel="noopener noreferrer">
//                     {application.linkedin}
//                   </a>
//                 </span>
//               </div>
//               <div className="info-item">
//                 <label>Status:</label>
//                 <select
//                   className="status-select-modal"
//                   value={currentStatus}
//                   onChange={(e) => handleStatusChange(e.target.value)}
//                   style={{ borderColor: getStatusColor(currentStatus) }}
//                 >
//                   <option value="Submitted">Submitted</option>
//                   <option value="Under Review">Under Review</option>
//                   <option value="Interview">Interview</option>
//                   <option value="Offer">Offer</option>
//                   <option value="Rejected">Rejected</option>
//                   <option value="Hired">Hired</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="modal-section">
//             <h3>Cover Letter</h3>
//             <div className="cover-letter-content">
//               <p>{application.coverLetter}</p>
//             </div>
//           </div>

//           <div className="modal-section">
//             <h3>Documents</h3>
//             <div className="document-actions">
//               <a 
//                 href={application.resumeUrl} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="document-btn primary"
//               >
//                 📄 View Resume
//               </a>
//               <button className="document-btn secondary">
//                 📧 Send Email
//               </button>
//               <button className="document-btn secondary">
//                 📝 Add Note
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplicationList;










// AdminApplicationsTable.js
import React, { useState, useEffect } from 'react';
import './ApplicationList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    jobTitle: 'all',
    dateRange: 'all'
  });
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  // Mock data - replace with your API call
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Replace with your actual API call
        // const mockApplications = [
        //   {
        //     "_id": "69119233b36a8dabf9c14d13",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b52",
        //       "title": "Senior Frontend Developer",
        //       "company": "TechCorp Inc.",
        //       "location": "San Francisco, CA"
        //     },
        //     "fullName": "John Doe",
        //     "email": "john.doe@gmail.com",
        //     "phone": "1123456543",
        //     "resumeUrl": "https://res.cloudinary.com/dm9g4lkx8/raw/upload/v1762759220/resumes/1762759217238-OD435757532071829100_compressed.pdf",
        //     "coverLetter": "I am excited to apply for the Senior Frontend Developer position. With 5+ years of experience in React and modern JavaScript, I believe I would be a great fit for your team.",
        //     "portfolio": "www.johndoeportfolio.com",
        //     "linkedin": "www.linkedin.com/in/johndoe",
        //     "salaryExpectation": "120000",
        //     "noticePeriod": "1 month",
        //     "source": "linkedin",
        //     "status": "Submitted",
        //     "createdAt": "2025-11-10T07:20:19.366Z",
        //     "updatedAt": "2025-11-10T07:20:19.366Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690db0fae12b416860d63deb",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b52",
        //       "title": "Senior Frontend Developer",
        //       "company": "TechCorp Inc.",
        //       "location": "San Francisco, CA"
        //     },
        //     "fullName": "Sarah Wilson",
        //     "email": "sarah.wilson@gmail.com",
        //     "phone": "1234567891",
        //     "resumeUrl": "https://res.cloudinary.com/dm9g4lkx8/image/upload/v1762504954/resumes/mydzfq97hihbgckanopo.pdf",
        //     "coverLetter": "As an experienced UX/UI designer with a strong background in frontend development, I'm thrilled about the opportunity to join your innovative team.",
        //     "portfolio": "sarahwilson.design",
        //     "linkedin": "www.linkedin.com/in/sarahwilson",
        //     "salaryExpectation": "110000",
        //     "noticePeriod": "2 weeks",
        //     "source": "company_website",
        //     "status": "Under Review",
        //     "createdAt": "2025-11-09T08:42:34.800Z",
        //     "updatedAt": "2025-11-09T08:42:34.800Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690da185eb1411365f4effe0",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b52",
        //       "title": "Senior Frontend Developer",
        //       "company": "TechCorp Inc.",
        //       "location": "San Francisco, CA"
        //     },
        //     "fullName": "Michael Chen",
        //     "email": "michael.chen@gmail.com",
        //     "phone": "1234567890",
        //     "resumeUrl": "/uploads/resumes/1762500997249-invoice of laptop.pdf",
        //     "coverLetter": "With 7 years of experience in frontend architecture and team leadership, I'm excited about the possibility of contributing to your company's success.",
        //     "portfolio": "michaelchen.dev",
        //     "linkedin": "www.linkedin.com/in/michaelchen",
        //     "salaryExpectation": "130000",
        //     "noticePeriod": "1 month",
        //     "source": "referral",
        //     "status": "Interview",
        //     "createdAt": "2025-11-08T07:36:37.329Z",
        //     "updatedAt": "2025-11-08T07:36:37.329Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690da185eb1411365f4effe1",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b53",
        //       "title": "Backend Engineer",
        //       "company": "DataSystems LLC",
        //       "location": "Remote"
        //     },
        //     "fullName": "Emily Rodriguez",
        //     "email": "emily.rodriguez@gmail.com",
        //     "phone": "1234567892",
        //     "resumeUrl": "/uploads/resumes/1762500997249-emily-resume.pdf",
        //     "coverLetter": "As a backend specialist with expertise in Node.js and cloud infrastructure, I'm excited about the challenges this position offers.",
        //     "portfolio": "emilyrodriguez.tech",
        //     "linkedin": "www.linkedin.com/in/emilyrodriguez",
        //     "salaryExpectation": "115000",
        //     "noticePeriod": "3 weeks",
        //     "source": "job_board",
        //     "status": "Rejected",
        //     "createdAt": "2025-11-07T07:36:37.329Z",
        //     "updatedAt": "2025-11-07T07:36:37.329Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690da185eb1411365f4effe2",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b54",
        //       "title": "UX Designer",
        //       "company": "Creative Studios",
        //       "location": "New York, NY"
        //     },
        //     "fullName": "David Kim",
        //     "email": "david.kim@gmail.com",
        //     "phone": "1234567893",
        //     "resumeUrl": "/uploads/resumes/1762500997249-david-resume.pdf",
        //     "coverLetter": "Passionate about creating intuitive user experiences and with a strong portfolio of successful projects.",
        //     "portfolio": "davidkim.design",
        //     "linkedin": "www.linkedin.com/in/davidkim",
        //     "salaryExpectation": "95000",
        //     "noticePeriod": "2 weeks",
        //     "source": "linkedin",
        //     "status": "Offer",
        //     "createdAt": "2025-11-06T07:36:37.329Z",
        //     "updatedAt": "2025-11-06T07:36:37.329Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690da185eb1411365f4effe3",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b52",
        //       "title": "Senior Frontend Developer",
        //       "company": "TechCorp Inc.",
        //       "location": "San Francisco, CA"
        //     },
        //     "fullName": "Lisa Thompson",
        //     "email": "lisa.thompson@gmail.com",
        //     "phone": "1234567894",
        //     "resumeUrl": "/uploads/resumes/1762500997249-lisa-resume.pdf",
        //     "coverLetter": "Experienced React developer with a passion for creating beautiful and functional user interfaces.",
        //     "portfolio": "lisathompson.dev",
        //     "linkedin": "www.linkedin.com/in/lisathompson",
        //     "salaryExpectation": "125000",
        //     "noticePeriod": "1 month",
        //     "source": "referral",
        //     "status": "Hired",
        //     "createdAt": "2025-11-05T07:36:37.329Z",
        //     "updatedAt": "2025-11-05T07:36:37.329Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690da185eb1411365f4effe4",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b53",
        //       "title": "Backend Engineer",
        //       "company": "DataSystems LLC",
        //       "location": "Remote"
        //     },
        //     "fullName": "Alex Martinez",
        //     "email": "alex.martinez@gmail.com",
        //     "phone": "1234567895",
        //     "resumeUrl": "/uploads/resumes/1762500997249-alex-resume.pdf",
        //     "coverLetter": "Backend developer specializing in scalable systems and microservices architecture.",
        //     "portfolio": "alexmartinez.tech",
        //     "linkedin": "www.linkedin.com/in/alexmartinez",
        //     "salaryExpectation": "118000",
        //     "noticePeriod": "2 weeks",
        //     "source": "company_website",
        //     "status": "Under Review",
        //     "createdAt": "2025-11-04T07:36:37.329Z",
        //     "updatedAt": "2025-11-04T07:36:37.329Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690da185eb1411365f4effe5",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b54",
        //       "title": "UX Designer",
        //       "company": "Creative Studios",
        //       "location": "New York, NY"
        //     },
        //     "fullName": "Rachel Green",
        //     "email": "rachel.green@gmail.com",
        //     "phone": "1234567896",
        //     "resumeUrl": "/uploads/resumes/1762500997249-rachel-resume.pdf",
        //     "coverLetter": "UI/UX designer with a focus on user-centered design and interactive prototypes.",
        //     "portfolio": "rachelgreen.design",
        //     "linkedin": "www.linkedin.com/in/rachelgreen",
        //     "salaryExpectation": "98000",
        //     "noticePeriod": "3 weeks",
        //     "source": "job_board",
        //     "status": "Interview",
        //     "createdAt": "2025-11-03T07:36:37.329Z",
        //     "updatedAt": "2025-11-03T07:36:37.329Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690da185eb1411365f4effe6",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b52",
        //       "title": "Senior Frontend Developer",
        //       "company": "TechCorp Inc.",
        //       "location": "San Francisco, CA"
        //     },
        //     "fullName": "James Wilson",
        //     "email": "james.wilson@gmail.com",
        //     "phone": "1234567897",
        //     "resumeUrl": "/uploads/resumes/1762500997249-james-resume.pdf",
        //     "coverLetter": "Full-stack developer with extensive experience in React and Node.js ecosystems.",
        //     "portfolio": "jameswilson.dev",
        //     "linkedin": "www.linkedin.com/in/jameswilson",
        //     "salaryExpectation": "135000",
        //     "noticePeriod": "1 month",
        //     "source": "linkedin",
        //     "status": "Submitted",
        //     "createdAt": "2025-11-02T07:36:37.329Z",
        //     "updatedAt": "2025-11-02T07:36:37.329Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690da185eb1411365f4effe7",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b53",
        //       "title": "Backend Engineer",
        //       "company": "DataSystems LLC",
        //       "location": "Remote"
        //     },
        //     "fullName": "Maria Garcia",
        //     "email": "maria.garcia@gmail.com",
        //     "phone": "1234567898",
        //     "resumeUrl": "/uploads/resumes/1762500997249-maria-resume.pdf",
        //     "coverLetter": "Backend engineer with expertise in database design and API development.",
        //     "portfolio": "mariagarcia.tech",
        //     "linkedin": "www.linkedin.com/in/mariagarcia",
        //     "salaryExpectation": "122000",
        //     "noticePeriod": "2 weeks",
        //     "source": "referral",
        //     "status": "Offer",
        //     "createdAt": "2025-11-01T07:36:37.329Z",
        //     "updatedAt": "2025-11-01T07:36:37.329Z",
        //     "__v": 0
        //   },
        //   {
        //     "_id": "690da185eb1411365f4effe8",
        //     "job": {
        //       "_id": "690c8257db76c81256f98b54",
        //       "title": "UX Designer",
        //       "company": "Creative Studios",
        //       "location": "New York, NY"
        //     },
        //     "fullName": "Daniel Brown",
        //     "email": "daniel.brown@gmail.com",
        //     "phone": "1234567899",
        //     "resumeUrl": "/uploads/resumes/1762500997249-daniel-resume.pdf",
        //     "coverLetter": "Product designer with a passion for creating seamless user experiences across platforms.",
        //     "portfolio": "danielbrown.design",
        //     "linkedin": "www.linkedin.com/in/danielbrown",
        //     "salaryExpectation": "105000",
        //     "noticePeriod": "1 month",
        //     "source": "company_website",
        //     "status": "Under Review",
        //     "createdAt": "2025-10-31T07:36:37.329Z",
        //     "updatedAt": "2025-10-31T07:36:37.329Z",
        //     "__v": 0
        //   }
        // ];
        const res = await axios.get('http://localhost:5000/api/v1/applications/');
        setApplications(res.data);
        setFilteredApplications(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Extract unique job titles for filter
  const jobTitles = [...new Set(applications.map(app => app.job.title))];

  // Filter and search applications
  useEffect(() => {
    let results = applications;

    // Search filter
    if (searchTerm) {
      results = results.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      results = results.filter(app => app.status === filters.status);
    }

    // Job title filter
    if (filters.jobTitle !== 'all') {
      results = results.filter(app => app.job.title === filters.jobTitle);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

      results = results.filter(app => {
        const appDate = new Date(app.createdAt);
        switch (filters.dateRange) {
          case '7days':
            return appDate >= sevenDaysAgo;
          case '30days':
            return appDate >= thirtyDaysAgo;
          default:
            return true;
        }
      });
    }

    setFilteredApplications(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [applications, searchTerm, filters]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortConfig.key === 'createdAt') {
      return sortConfig.direction === 'asc' 
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    
    if (sortConfig.key === 'salaryExpectation') {
      return sortConfig.direction === 'asc'
        ? parseInt(a.salaryExpectation) - parseInt(b.salaryExpectation)
        : parseInt(b.salaryExpectation) - parseInt(a.salaryExpectation);
    }

    if (sortConfig.key === 'fullName') {
      return sortConfig.direction === 'asc'
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName);
    }

    return 0;
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentApplications = sortedApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedApplications.length / itemsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      // Replace with your actual API call
      const updatedApplications = applications.map(app =>
        app._id === applicationId ? { ...app, status: newStatus } : app
      );
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      // Replace with your actual API call
      const updatedApplications = applications.filter(app => app._id !== id);
      const response = await axios.delete(`http://localhost:5000/api/v1/applications/${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete application');
      }
      toast.success('Application deleted successfully');
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Submitted': '#3b82f6',
      'Under Review': '#f59e0b',
      'Interview': '#8b5cf6',
      'Offer': '#10b981',
      'Rejected': '#ef4444',
      'Hired': '#059669'
    };
    return colors[status] || '#6b7280';
  };

  const getSourceIcon = (source) => {
    const icons = {
      'linkedin': '💼',
      'company_website': '🌐',
      'referral': '👥',
      'job_board': '📋',
      'other': '📧'
    };
    return icons[source] || '📧';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateStats = () => {
    const total = applications.length;
    const submitted = applications.filter(app => app.status === 'Submitted').length;
    const underReview = applications.filter(app => app.status === 'Under Review').length;
    const interview = applications.filter(app => app.status === 'Interview').length;
    const offer = applications.filter(app => app.status === 'Offer').length;
    const hired = applications.filter(app => app.status === 'Hired').length;
    const rejected = applications.filter(app => app.status === 'Rejected').length;

    return { total, submitted, underReview, interview, offer, hired, rejected };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="admin-applications-loading">
        <div className="loading-spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="admin-applications-container">
      {/* Header */}
      <div className="applications-header">
        <div className="header-content">
          <h1 className="applications-title">Job Applications</h1>
          <p className="applications-subtitle">
            Manage and review all job applications in one place
          </p>
        </div>
        {/* <div className="header-stats">
          <div className="stat-card total">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card submitted">
            <span className="stat-number">{stats.submitted}</span>
            <span className="stat-label">Submitted</span>
          </div>
          <div className="stat-card review">
            <span className="stat-number">{stats.underReview}</span>
            <span className="stat-label">Review</span>
          </div>
          <div className="stat-card interview">
            <span className="stat-number">{stats.interview}</span>
            <span className="stat-label">Interview</span>
          </div>
          <div className="stat-card offer">
            <span className="stat-number">{stats.offer}</span>
            <span className="stat-label">Offer</span>
          </div>
        </div> */}
      </div>

      {/* Search and Filters */}
      <div className="applications-controls">
        <div className="controls-top">
          <div className="search-section">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by name, email, job title, or location..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="items-per-page">
            <label>Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="page-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              className="filter-select"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Job Title</label>
            <select
              className="filter-select"
              value={filters.jobTitle}
              onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
            >
              <option value="all">All Jobs</option>
              {jobTitles.map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Date</label>
            <select
              className="filter-select"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>

          <button 
            className="reset-filters-btn"
            onClick={() => {
              setFilters({ status: 'all', jobTitle: 'all', dateRange: 'all' });
              setSearchTerm('');
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="applications-table-container">
        <div className="table-wrapper">
          <table className="applications-table">
            <thead>
              <tr>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('fullName')}
                >
                  <div className="header-content">
                    Candidate
                    <span className="sort-indicator">
                      {sortConfig.key === 'fullName' && (
                        sortConfig.direction === 'asc' ? '↑' : '↓'
                      )}
                    </span>
                  </div>
                </th>
                <th>Position</th>
                <th>Location</th>
                <th>Contact</th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('salaryExpectation')}
                >
                  <div className="header-content">
                    Salary
                    <span className="sort-indicator">
                      {sortConfig.key === 'salaryExpectation' && (
                        sortConfig.direction === 'asc' ? '↑' : '↓'
                      )}
                    </span>
                  </div>
                </th>
                <th>Source</th>
                <th>Status</th>
                <th 
                  className="sortable-header"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="header-content">
                    Applied
                    <span className="sort-indicator">
                      {sortConfig.key === 'createdAt' && (
                        sortConfig.direction === 'asc' ? '↑' : '↓'
                      )}
                    </span>
                  </div>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentApplications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    <div className="no-applications">
                      <div className="no-applications-icon">📋</div>
                      <h3>No applications found</h3>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentApplications.map(application => (
                  <tr key={application._id} className="application-row">
                    <td>
                      <div className="candidate-cell">
                        <div className="candidate-avatar">
                          {application.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="candidate-info">
                          <div className="candidate-name">{application?.fullName}</div>
                          <div className="candidate-email">{application?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="application-job-title">{application?.job.title}</div>
                      <div className="application-company-name">{application?.job.company}</div>
                    </td>
                    <td>
                      <div className="application-location">{application?.job.location}</div>
                    </td>
                    <td>
                      <div className="application-contact-info">
                        <div className="phone">{application?.phone}</div>
                        <div className="notice-period">{application?.noticePeriod}</div>
                      </div>
                    </td>
                    <td>
                      <div className="salary">
                        ${parseInt(application?.salaryExpectation).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="source">
                        <span className="source-icon">
                          {getSourceIcon(application?.source)}
                        </span>
                        {application?.source}
                      </div>
                    </td>
                    <td>
                      <select
                        className={`status-select status-${application?.status.toLowerCase().replace(' ', '-')}`}
                        value={application.status}
                        onChange={(e) => handleStatusUpdate(application?._id, e.target.value)}
                        style={{ borderColor: getStatusColor(application?.status) }}
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </td>
                    <td>
                      <div className="application-date">
                        {formatDate(application?.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="view-details-btn"
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowDetailsModal(true);
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(application._id)}
                          className="delete-resume-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredApplications.length > 0 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredApplications.length)} of {filteredApplications.length} entries
            </div>
            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setShowDetailsModal(false)}
          onStatusUpdate={handleStatusUpdate}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
};

// Application Details Modal Component (same as before)
const ApplicationDetailsModal = ({ application, onClose, onStatusUpdate, getStatusColor }) => {
  const [currentStatus, setCurrentStatus] = useState(application.status);
  const navigate = useNavigate();
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onStatusUpdate(application._id, newStatus);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

 const handleViewResumePdf = async() => {
    const resumeUrl = application.publicId;
    const publicid = encodeURIComponent(resumeUrl);
    const res = await axios.get(`http://localhost:5000/api/v1/applications/pdf/${publicid}`);
    // console.log(res);
    navigate(`/admin/resume/${publicid}`, { state: { resume: res.data.signedUrl } });
  }



  return (
    <div className="application-modal-overlay" onClick={handleOverlayClick}>
      <div className="application-modal-container">
        <div className="modal-header">
          <h2>Application Details</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="application-modal-content">
          <div className="modal-section">
            <h3>Candidate Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name:</label>
                <span>{application.fullName}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{application.email}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{application.phone}</span>
              </div>
              <div className="info-item">
                <label>Applied On:</label>
                <span>{new Date(application.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3>Job Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Position:</label>
                <span>{application.job.title}</span>
              </div>
              <div className="info-item">
                <label>Company:</label>
                <span>{application.job.company}</span>
              </div>
              <div className="info-item">
                <label>Location:</label>
                <span>{application.job.location}</span>
              </div>
              <div className="info-item">
                <label>Salary Expectation:</label>
                <span>${parseInt(application.salaryExpectation).toLocaleString()}</span>
              </div>
              <div className="info-item">
                <label>Notice Period:</label>
                <span>{application.noticePeriod}</span>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3>Application Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Source:</label>
                <span>{application.source}</span>
              </div>
              <div className="info-item">
                <label>Portfolio:</label>
                <span>
                  <a href={application.portfolio} target="_blank" rel="noopener noreferrer">
                    {application.portfolio}
                  </a>
                </span>
              </div>
              <div className="info-item">
                <label>LinkedIn:</label>
                <span>
                  <a href={application.linkedin} target="_blank" rel="noopener noreferrer">
                    {application.linkedin}
                  </a>
                </span>
              </div>
              <div className="info-item">
                <label>Status:</label>
                <select
                  className="status-select-modal"
                  value={currentStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  style={{ borderColor: getStatusColor(currentStatus) }}
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Hired">Hired</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h3>Cover Letter</h3>
            <div className="cover-letter-content">
              <p>{application.coverLetter}</p>
            </div>
          </div>

          <div className="modal-section">
            <h3>Documents</h3>
            <div className="document-actions">
              <button 
                onClick={handleViewResumePdf}
                className="document-btn primary"
              >
                📄 View Resume
              </button>
              <button className="document-btn secondary" onClick={() => window.open(`mailto:${application.email}`)}>
                📧 Send Email
              </button>
              {/* <button className="document-btn secondary">
                📝 Add Note
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;