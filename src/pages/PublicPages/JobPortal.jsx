// import React, { useState, useEffect } from "react";
// import "./JobPortal.css";
// import "../../CSSFiles/PublicPages/ELibraryBooks.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import ApplyPopup from "../../Components/PublicComp/ApplyPopup";
// import JobDetails from "../../Components/PublicComp/JobDetails";

// const JobPortal = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [location, setLocation] = useState("");
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [ads, setAds] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showApplyPopup, setShowApplyPopup] = useState(false);

//   //   const [selectedJob, setSelectedJob] = useState(null);
//   const [showJobDetails, setShowJobDetails] = useState(false);
//   // const [showApplyPopup, setShowApplyPopup] = useState(false);
//   // Mock job data
//   const jobListings = [
//     {
//       id: 1,
//       title: "Senior Frontend Developer",
//       company: "TechCorp Inc.",
//       location: "San Francisco, CA",
//       salary: "$120,000 - $150,000",
//       type: "Full-time",
//       posted: "2 days ago",
//       description:
//         "We're looking for an experienced frontend developer to join our growing team. Must have React experience.",
//       logo: "💼",
//       featured: true,
//     },
//     {
//       id: 2,
//       title: "UX/UI Designer",
//       company: "Creative Studios",
//       location: "Remote",
//       salary: "$90,000 - $110,000",
//       type: "Full-time",
//       posted: "1 week ago",
//       description:
//         "Join our design team to create beautiful and functional user interfaces for web and mobile applications.",
//       logo: "🎨",
//       featured: false,
//     },
//     {
//       id: 3,
//       title: "Backend Engineer",
//       company: "DataSystems LLC",
//       location: "New York, NY",
//       salary: "$130,000 - $160,000",
//       type: "Full-time",
//       posted: "3 days ago",
//       description:
//         "Looking for a backend engineer with Node.js and Python experience to build scalable APIs.",
//       logo: "⚙️",
//       featured: true,
//     },
//     {
//       id: 4,
//       title: "Product Manager",
//       company: "InnovateTech",
//       location: "Austin, TX",
//       salary: "$110,000 - $140,000",
//       type: "Full-time",
//       posted: "Just now",
//       description:
//         "Lead product development and work with cross-functional teams to deliver amazing products.",
//       logo: "📊",
//       featured: false,
//     },
//   ];

//   const fatchAds = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/v1/ads/landingpage"
//       );
//       console.log(response.data);
//       setAds(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fatchAds();
//   }, []);

//   const filteredJobs = jobListings.filter((job) => {
//     const matchesSearch =
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.company.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesLocation =
//       location === "" ||
//       job.location.toLowerCase().includes(location.toLowerCase());

//     if (activeFilter === "featured") {
//       return matchesSearch && matchesLocation && job.featured;
//     }
//     if (activeFilter === "remote") {
//       return (
//         matchesSearch &&
//         matchesLocation &&
//         job.location.toLowerCase().includes("remote")
//       );
//     }

//     return matchesSearch && matchesLocation;
//   });

//   return (
//     <div className="career-portal">
//       {showApplyPopup && (
//         <ApplyPopup
//           job={selectedJob}
//           isOpen={showApplyPopup}
//           onClose={() => {
//             setShowApplyPopup(false);
//             setSelectedJob(null);
//           }}
//           onSubmit={(formData) => {
//             console.log("Application submitted:", formData);
//             // Handle form submission here (API call, etc.)
//             alert(
//               `Application submitted successfully for ${selectedJob.title} at ${selectedJob.company}!`
//             );
//           }}
//         />
//       )}

//       {/* {showJobDetails && selectedJob && (
//         <JobDetails
//           job={selectedJob}
//           onBack={() => {
//             setShowJobDetails(false);
//             setSelectedJob(null);
//           }}
//           onApply={(job) => {
//             setSelectedJob(job);
//             setShowApplyPopup(true);
//           }}
//         />
//       )} */}

//       {/* Hero Search Section */}
//       <section className="search-hero">
//         <div className="hero-container">
//           <div className="hero-content">
//             <h2 className="hero-title">Find Your Dream Job</h2>
//             <p className="hero-subtitle">
//               Discover thousands of job opportunities from top companies
//             </p>
//           </div>
//           <div className="search-container">
//             <div className="search-input-group">
//               <div className="input-wrapper">
//                 <span className="input-icon">🔍</span>
//                 <input
//                   type="text"
//                   placeholder="Job title, keywords, or company"
//                   className="search-input"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               {/* <div className="input-wrapper">
//                 <span className="input-icon">📍</span>
//                 <input
//                   type="text"
//                   placeholder="City, state, or remote"
//                   className="search-input"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </div> */}
//               <button className="search-button">Find Jobs</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Quick Filters */}
//       <section className="quick-filters">
//         <div className="filters-container">
//           <button
//             className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
//             onClick={() => setActiveFilter("all")}
//           >
//             All Jobs
//           </button>
//           <button
//             className={`filter-btn ${
//               activeFilter === "featured" ? "active" : ""
//             }`}
//             onClick={() => setActiveFilter("featured")}
//           >
//             Featured
//           </button>
//           <button
//             className={`filter-btn ${
//               activeFilter === "remote" ? "active" : ""
//             }`}
//             onClick={() => setActiveFilter("remote")}
//           >
//             Remote
//           </button>
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="portal-main">
//         <div className="job-portal-main-container">
//           <div className="job-portal-main-container-box">
//             {/* Job Listings */}
//             <section className="job-listings">
//               <div className="listings-header">
//                 <h3 className="listings-title">
//                   {filteredJobs.length} Jobs Found
//                 </h3>
//                 <div className="sort-options">
//                   <select className="sort-select">
//                     <option>Most Relevant</option>
//                     <option>Most Recent</option>
//                     <option>Highest Salary</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="jobs-grid">
//                 <div
//                 //   className={`job-card ${job.featured ? "featured" : ""}`}
//                   onClick={() => {
//                     setSelectedJob("job");
//                     setShowJobDetails(true);
//                   }}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {filteredJobs.map((job) => (
//                     <div
//                       key={job.id}
//                       className={`job-card ${job.featured ? "featured" : ""}`}
//                     >
//                       {job.featured && (
//                         <div className="featured-badge">Featured</div>
//                       )}
//                       <div className="job-header">
//                         <div className="company-logo">{job.logo}</div>
//                         <div className="job-info">
//                           <h4 className="job-title">{job.title}</h4>
//                           <p className="company-name">{job.company}</p>
//                         </div>
//                       </div>
//                       <div className="job-details">
//                         <span className="detail-tag location">
//                           {job.location}
//                         </span>
//                         <span className="detail-tag salary">{job.salary}</span>
//                         <span className="detail-tag type">{job.type}</span>
//                       </div>
//                       <p className="job-description">{job.description}</p>
//                       <div className="job-footer">
//                         <span className="post-time">{job.posted}</span>
//                         <button
//                           className="apply-btn"
//                           onClick={() => {
//                             setSelectedJob(job);
//                             setShowApplyPopup(true);
//                           }}
//                         >
//                           Apply Now
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>

//             {/* Sidebar */}
//             <aside className="portal-sidebar">
//               {/* componnet where show the company and job details after clicking on job card */}
//               {selectedJob && <JobDetails job={selectedJob} />}

//               {/* Sidebar Widgets */}
//               <div className="sidebar-widget">
//                 <h4 className="widget-title">Create Job Alert</h4>
//                 <p className="widget-text">
//                   Get notified when new jobs match your search
//                 </p>
//                 <button className="alert-btn">Create Alert</button>
//               </div>

//               <div className="sidebar-widget">
//                 <h4 className="widget-title">Top Companies</h4>
//                 <div className="companies-list">
//                   <div className="company-item">
//                     <span className="company-logo-small">🚀</span>
//                     <span>TechCorp Inc.</span>
//                   </div>
//                   <div className="company-item">
//                     <span className="company-logo-small">🎨</span>
//                     <span>Creative Studios</span>
//                   </div>
//                   <div className="company-item">
//                     <span className="company-logo-small">⚙️</span>
//                     <span>DataSystems LLC</span>
//                   </div>
//                 </div>
//               </div>
//             </aside>
//           </div>
//           <div className="elibrary__ads-container">
//             {ads.map((ad) => (
//               <AdCard key={ad._id} ad={ad} />
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// const AdCard = ({ ad }) => (
//   <div className="elibrary__ad-card">
//     <div className="elibrary__ad-image">
//       <img src={ad.image} alt={ad.title} />
//     </div>
//     <div className="elibrary__ad-content">
//       <h4>{ad.title}</h4>
//       <p>{ad.description}</p>
//       <button
//         className="elibrary__ad-cta-btn"
//         onClick={() => window.open(ad.link)}
//       >
//         view more
//       </button>
//     </div>
//   </div>
// );

// export default JobPortal;
















import React, { useState, useEffect } from "react";
import "./JobPortal.css";
import "../../CSSFiles/PublicPages/ELibraryBooks.css";
import axios from "axios";
import ApplyPopup from "../../Components/PublicComp/ApplyPopup";
import JobDetails from "../../Components/PublicComp/JobDetails";

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [ads, setAds] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [showJobDetails, setShowJobDetails] = useState(false);

  // ✅ Fetch Ads from backend
  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/ads/landingpage");
      setAds(response.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // ✅ Mock job data
  const jobListings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      type: "Full-time",
      posted: "2 days ago",
      description:
        "We're looking for an experienced frontend developer to join our growing team. Must have React experience.",
      logo: "💼",
      featured: true,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Studios",
      location: "Remote",
      salary: "$90,000 - $110,000",
      type: "Full-time",
      posted: "1 week ago",
      description:
        "Join our design team to create beautiful and functional user interfaces for web and mobile applications.",
      logo: "🎨",
      featured: false,
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataSystems LLC",
      location: "New York, NY",
      salary: "$130,000 - $160,000",
      type: "Full-time",
      posted: "3 days ago",
      description:
        "Looking for a backend engineer with Node.js and Python experience to build scalable APIs.",
      logo: "⚙️",
      featured: true,
    },
    {
      id: 4,
      title: "Product Manager",
      company: "InnovateTech",
      location: "Austin, TX",
      salary: "$110,000 - $140,000",
      type: "Full-time",
      posted: "Just now",
      description:
        "Lead product development and work with cross-functional teams to deliver amazing products.",
      logo: "📊",
      featured: false,
    },
  ];

  // ✅ Filter logic
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      location === "" || job.location.toLowerCase().includes(location.toLowerCase());

    if (activeFilter === "featured") {
      return matchesSearch && matchesLocation && job.featured;
    }
    if (activeFilter === "remote") {
      return (
        matchesSearch &&
        matchesLocation &&
        job.location.toLowerCase().includes("remote")
      );
    }
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="career-portal">
      {/* ✅ Apply Popup */}
      {showApplyPopup && selectedJob && (
        <ApplyPopup
          job={selectedJob}
          isOpen={showApplyPopup}
          onClose={() => {
            setShowApplyPopup(false);
            setSelectedJob(null);
          }}
          onSubmit={(formData) => {
            console.log("Application submitted:", formData);
            alert(`Application submitted successfully for ${selectedJob.title} at ${selectedJob.company}!`);
          }}
        />
      )}

      {/* ✅ Job Details Popup */}
      {/* {showJobDetails && selectedJob && (
        <JobDetails
          job={selectedJob}
          onBack={() => {
            setShowJobDetails(false);
            setSelectedJob(null);
          }}
          onApply={(job) => {
            setSelectedJob(job);
            setShowApplyPopup(true);
          }}
        />
      )} */}

      {/* ✅ Hero Section */}
      <section className="search-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h2 className="hero-title">Find Your Dream Job</h2>
            <p className="hero-subtitle">
              Discover thousands of job opportunities from top companies
            </p>
          </div>

          <div className="search-container">
            <div className="search-input-group">
              <div className="input-wrapper">
                <span className="input-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="search-button">Find Jobs</button>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Filter Buttons */}
      <section className="quick-filters">
        <div className="filters-container">
          {["all", "featured", "remote"].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all" ? "All Jobs" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* ✅ Main Content */}
      <main className="portal-main">
        <div className="job-portal-main-container">
          <div className="job-portal-main-container-box">
            {/* ✅ Job Listings */}
            <section className="job-listings">
              <div className="listings-header">
                <h3 className="listings-title">{filteredJobs.length} Jobs Found</h3>
                <div className="sort-options">
                  <select className="sort-select">
                    <option>Most Relevant</option>
                    <option>Most Recent</option>
                    <option>Highest Salary</option>
                  </select>
                </div>
              </div>

              <div className="jobs-grid">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`job-card ${job.featured ? "featured" : ""}`}
                    onClick={() => {
                      setSelectedJob(job);
                      setShowJobDetails(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {job.featured && <div className="featured-badge">Featured</div>}
                    <div className="job-header">
                      <div className="company-logo">{job.logo}</div>
                      <div className="job-info">
                        <h4 className="job-title">{job.title}</h4>
                        <p className="company-name">{job.company}</p>
                      </div>
                    </div>

                    <div className="job-details">
                      <span className="detail-tag location">{job.location}</span>
                      <span className="detail-tag salary">{job.salary}</span>
                      <span className="detail-tag type">{job.type}</span>
                    </div>

                    <p className="job-description">{job.description}</p>

                    <div className="job-footer">
                      <span className="post-time">{job.posted}</span>
                      <button
                        className="apply-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(job);
                          setShowApplyPopup(true);
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ✅ Sidebar */}
            <aside className="portal-sidebar">
              {selectedJob && 
              <JobDetails job={selectedJob} onApply={() => setShowApplyPopup(!showApplyPopup)} />
              }
             {!selectedJob && <div className="sidebar-widget">
                <h4 className="widget-title">Create Job Alert</h4>
                <p className="widget-text">Get notified when new jobs match your search</p>
                <button className="alert-btn">Create Alert</button>
              </div>}

              <div className="sidebar-widget">
                <h4 className="widget-title">Top Companies</h4>
                <div className="companies-list">
                  {["🚀 TechCorp Inc.", "🎨 Creative Studios", "⚙️ DataSystems LLC"].map((company, i) => (
                    <div className="company-item" key={i}>
                      <span className="company-logo-small">{company.split(" ")[0]}</span>
                      <span>{company.split(" ").slice(1).join(" ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* ✅ Ads Section */}
          <div className="elibrary__ads-container">
            {ads.map((ad) => (
              <AdCard key={ad._id} ad={ad} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const AdCard = ({ ad }) => (
  <div className="elibrary__ad-card">
    <div className="elibrary__ad-image">
      <img src={ad.image} alt={ad.title} />
    </div>
    <div className="elibrary__ad-content">
      <h4>{ad.title}</h4>
      <p>{ad.description}</p>
      <button
        className="elibrary__ad-cta-btn"
        onClick={() => window.open(ad.link, "_blank")}
      >
        View More
      </button>
    </div>
  </div>
);

export default JobPortal;
