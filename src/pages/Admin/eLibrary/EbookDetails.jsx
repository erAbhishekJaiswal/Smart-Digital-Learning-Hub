// import React, { useState } from "react";
// import "../../../CSSFiles/EbookDetails.css";

// const EbookDetails = () => {

// const tests = [
//   { title: "JavaScript Fundamentals", info: "15 Questions • 30 min", status: "Completed" },
//   { title: "Functions & Closures", info: "20 Questions • 45 min", status: "Completed" },
//   { title: "Async Programming", info: "18 Questions • 40 min", status: "Pending" },
//   { title: "Final Assessment", info: "25 Questions • 60 min", status: "Pending" },
// ];
//   const [activeTab, setActiveTab] = useState("eBook Content");

//   const tabs = ["eBook Content", "Course Materials", "Student Notes", "Discussion Forum"];
//    const [page, setPage] = useState(42);

//   const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
//   const handleNext = () => setPage(prev => Math.min(prev + 1, 245));

//   return (
//     <>
//        <header>
//     <div className="container header-content">
//       <div className="logo">
//         <i className="fas fa-graduation-cap"></i>
//         <span>EduLearn</span>
//       </div>
//       <div className="user-actions">
//         <button className="btn btn-outline">
//           <i className="fas fa-bookmark"></i> Bookmark
//         </button>
//         <button className="btn btn-primary">
//           <i className="fas fa-user-graduate"></i> My Courses
//         </button>
//       </div>
//     </div>
//   </header>
//       <div className="container main-content">
//         <div className="ebook-section">
//           {/* <EbookViewer /> */}
//             <div className="ebook-viewer">
//       <div className="ebook-header">
//         <div>
//           <h1 className="ebook-title">Advanced JavaScript Programming</h1>
//           <div className="ebook-meta">
//             <span><i className="fas fa-clock"></i> Last accessed: 2 hours ago</span>
//             <span><i className="fas fa-book"></i> 245 pages</span>
//             <span><i className="fas fa-chart-line"></i> Intermediate Level</span>
//           </div>
//         </div>
//         <button className="btn btn-primary">
//           <i className="fas fa-play-circle"></i> Continue Reading
//         </button>
//       </div>

//       <div className="viewer-toolbar">
//         <div className="viewer-controls">
//           <button onClick={handlePrev} title="Previous Page">
//             <i className="fas fa-chevron-left"></i>
//           </button>
//           <span>Page {page} of 245</span>
//           <button onClick={handleNext} title="Next Page">
//             <i className="fas fa-chevron-right"></i>
//           </button>
//         </div>

//         <div className="viewer-controls">
//           <button title="Zoom Out"><i className="fas fa-search-minus"></i></button>
//           <span>100%</span>
//           <button title="Zoom In"><i className="fas fa-search-plus"></i></button>
//           <button title="Fullscreen"><i className="fas fa-expand"></i></button>
//           <button title="Bookmark"><i className="fas fa-bookmark"></i></button>
//         </div>
//       </div>

//       <div className="viewer-content">
//         <div className="pdf-placeholder">
//           <i className="fas fa-file-pdf"></i>
//           <h3>Interactive eBook Viewer</h3>
//           <p>
//             This is a simulation of an interactive eBook viewer. In a real app, this would
//             display the actual eBook content.
//           </p>
//           <p>Features: navigation, zoom, search, and bookmarks.</p>
//           <button className="btn btn-primary" style={{ marginTop: 20 }}>
//             <i className="fas fa-play"></i> Start Reading
//           </button>
//         </div>
//       </div>
//     </div>
//         </div>

//         <div className="sidebar">
//             <div className="card">
//     <div className="card-header">
//       <i className="fas fa-info-circle"></i> Course Summary
//     </div>
//     <div className="card-body course-summary">
//       <div className="summary-item">
//         <div className="summary-label">Course Progress</div>
//         <div className="summary-value">65% Completed</div>
//         <div className="progress-bar">
//           <div className="progress"></div>
//         </div>
//       </div>
//       <div className="summary-item">
//         <div className="summary-label">Time Spent</div>
//         <div className="summary-value">12 hours 35 minutes</div>
//       </div>
//       <div className="summary-item">
//         <div className="summary-label">Last Activity</div>
//         <div className="summary-value">Chapter 5: Advanced Functions</div>
//       </div>
//       <div className="summary-item">
//         <div className="summary-label">Assessment Score</div>
//         <div className="summary-value">87% Average</div>
//       </div>
//     </div>
//   </div>


//   <div className="card">
//     <div className="card-header">
//       <i className="fas fa-tasks"></i> Related Tests
//     </div>
//     <div className="card-body">
//       {tests.map((test, i) => (
//         <div className="test-item" key={i}>
//           <div className="test-info">
//             <h4>{test.title}</h4>
//             <p>{test.info}</p>
//           </div>
//           <div
//             className={`test-status ${
//               test.status === "Completed" ? "status-completed" : "status-pending"
//             }`}
//           >
//             {test.status}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>

//    <div className="nav-tabs">
//     {tabs.map(tab => (
//       <div
//         key={tab}
//         className={`tab ${activeTab === tab ? "active" : ""}`}
//         onClick={() => setActiveTab(tab)}
//       >
//         {tab}
//       </div>
//     ))}
//   </div>

//           {/* <CourseSummary />
//           <RelatedTests />
//           <QuickActions /> */}
//         </div>
//       </div>

//       {/* <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} /> */}
//       {/* <Footer /> */}
//     </>
//   );
// };

// export default EbookDetails;










import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../CSSFiles/EbookDetails.css";

const EbookDetails = () => {
  const navigate = useNavigate();

  const tests = [
    { title: "JavaScript Fundamentals", info: "15 Questions • 30 min", status: "Completed" },
    { title: "Functions & Closures", info: "20 Questions • 45 min", status: "Completed" },
    { title: "Async Programming", info: "18 Questions • 40 min", status: "Pending" },
    { title: "Final Assessment", info: "25 Questions • 60 min", status: "Pending" },
  ];

  const [activeTab, setActiveTab] = useState("eBook Content");
  const [lastReadPage, setLastReadPage] = useState(1);

  // Load saved page progress from localStorage (simulate student tracking)
  useEffect(() => {
    const savedPage = localStorage.getItem("ebookLastPage");
    if (savedPage) setLastReadPage(parseInt(savedPage, 10));
  }, []);

  const handleContinueReading = () => {
    navigate("/ebook-viewer"); // Navigate to the new PDF + Chat page
  };

  return (
    <>
      <header>
        <div className="container header-content">
          <div className="logo">
            <i className="fas fa-graduation-cap"></i>
            <span>EduLearn</span>
          </div>
          <div className="user-actions">
            <button className="btn btn-outline">
              <i className="fas fa-bookmark"></i> Bookmark
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-user-graduate"></i> My Courses
            </button>
          </div>
        </div>
      </header>

      <div className="container main-content">
        <div className="ebook-section">
          <div className="ebook-header">
            <div>
              <h1 className="ebook-title">Advanced JavaScript Programming</h1>
              <div className="ebook-meta">
                <span><i className="fas fa-clock"></i> Last accessed: 2 hours ago</span>
                <span><i className="fas fa-book"></i> 245 pages</span>
                <span><i className="fas fa-chart-line"></i> Intermediate Level</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleContinueReading}>
              <i className="fas fa-play-circle"></i>{" "}
              {lastReadPage > 1 ? `Continue from Page ${lastReadPage}` : "Start Reading"}
            </button>
          </div>

          <div className="ebook-description">
            <p>
              This course covers advanced JavaScript concepts such as closures, async programming,
              and performance optimization. Once you start reading, your progress will be saved.
            </p>
          </div>
        </div>

        <div className="sidebar">
          {/* Course Summary */}
          <div className="card">
            <div className="card-header">
              <i className="fas fa-info-circle"></i> Course Summary
            </div>
            <div className="card-body course-summary">
              <div className="summary-item">
                <div className="summary-label">Course Progress</div>
                <div className="summary-value">65% Completed</div>
                <div className="progress-bar">
                  <div className="progress"></div>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Time Spent</div>
                <div className="summary-value">12 hours 35 minutes</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Last Activity</div>
                <div className="summary-value">Chapter 5: Advanced Functions</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Assessment Score</div>
                <div className="summary-value">87% Average</div>
              </div>
            </div>
          </div>

          {/* Related Tests */}
          <div className="card">
            <div className="card-header">
              <i className="fas fa-tasks"></i> Related Tests
            </div>
            <div className="card-body">
              {tests.map((test, i) => (
                <div className="test-item" key={i}>
                  <div className="test-info">
                    <h4>{test.title}</h4>
                    <p>{test.info}</p>
                  </div>
                  <div
                    className={`test-status ${
                      test.status === "Completed" ? "status-completed" : "status-pending"
                    }`}
                  >
                    {test.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="nav-tabs">
            {["eBook Content", "Course Materials", "Student Notes", "Discussion Forum"].map(tab => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EbookDetails;
