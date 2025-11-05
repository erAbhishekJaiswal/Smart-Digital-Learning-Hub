// import React, { useRef, useState, useEffect } from "react";
// import HTMLFlipBook from "react-pageflip";
// import { Document, Page, pdfjs } from "react-pdf";
// import "../CssFiles/component/FlipBook.css";
// import { useParams } from "react-router-dom";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const FlipBook = () => {
//   const { publicId } = useParams();
//   const bookRef = useRef();
//   const [scale, setScale] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [bookInfo, setBookInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [pdfLoading, setPdfLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Fetch course/book data dynamically
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const encodedPublicId = encodeURIComponent(publicId);
//         const response = await fetch(`http://localhost:5000/api/v1/ebooks/file/${encodedPublicId}`);
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch book: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log("Fetched Data", data);
        
//         if (!data || !data.url) {
//           throw new Error("No PDF URL received");
//         }

//         setBookInfo(data);
//         setPdfFile(data.url);
//       } catch (err) {
//         console.error("Error fetching course/book:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (publicId) {
//       fetchBook();
//     }
//   }, [publicId]);

//   // ✅ Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setTotalPages(numPages);
//     setPdfLoading(false);
//   };

//   const onDocumentLoadError = (error) => {
//     console.error("Error loading PDF:", error);
//     setError("Failed to load PDF document");
//     setPdfLoading(false);
//   };

//   const nextPage = () => {
//     if (bookRef.current?.pageFlip()) {
//       bookRef.current.pageFlip().flipNext();
//       setCurrentPage((prev) => Math.min(prev + 2, totalPages - 1));
//     }
//   };

//   const prevPage = () => {
//     if (bookRef.current?.pageFlip()) {
//       bookRef.current.pageFlip().flipPrev();
//       setCurrentPage((prev) => Math.max(prev - 2, 0));
//     }
//   };

//   const goToPage = (pageNum) => {
//     if (bookRef.current?.pageFlip()) {
//       bookRef.current.pageFlip().flip(pageNum);
//       setCurrentPage(pageNum);
//     }
//   };

//   const zoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5));
//   const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
//   const resetZoom = () => setScale(1);

//   const toggleFullscreen = async () => {
//     try {
//       if (!document.fullscreenElement) {
//         const elem = document.querySelector(".flipbook-wrapper-box");
//         await elem.requestFullscreen();
//         setIsFullscreen(true);
//         setScale(1.3);
//       } else {
//         await document.exitFullscreen();
//         setIsFullscreen(false);
//         setScale(1);
//       }
//     } catch (err) {
//       console.error("Fullscreen error:", err);
//     }
//   };

//   const handlePageFlip = (e) => {
//     setCurrentPage(e.data);
//   };

//   // Calculate progress percentage
//   const progressPercentage = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

//   if (loading) {
//     return (
//       <div className="flipbook-loading-container">
//         <div className="flipbook-loading-spinner"></div>
//         <p className="flipbook-loading-text">Loading your book...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flipbook-error-container">
//         <div className="flipbook-error-icon">❌</div>
//         <h2 className="flipbook-error-title">Oops! Something went wrong</h2>
//         <p className="flipbook-error-message">{error}</p>
//         <button 
//           className="flipbook-retry-button"
//           onClick={() => window.location.reload()}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={`flipbook-wrapper-box ${isFullscreen ? "fullscreen-active" : ""}`}>
//       {/* ✅ Enhanced Header with book info */}
//       {bookInfo && (
//         <div className="book-header-animated">
//           <div className="book-header-content">
//             {bookInfo.thumbnail && (
//               <div className="book-thumbnail-container">
//                 <img
//                   src={bookInfo.thumbnail}
//                   alt={bookInfo.title}
//                   className="book-thumbnail"
//                 />
//                 <div className="book-thumbnail-glow"></div>
//               </div>
//             )}
//             <div className="book-meta-info">
//               <h2 className="book-title">{bookInfo.title}</h2>
//               <div className="book-details-grid">
//                 {bookInfo.category && (
//                   <div className="book-detail-item">
//                     <span className="detail-label">Category:</span>
//                     <span className="detail-value">{bookInfo.category}</span>
//                   </div>
//                 )}
//                 {bookInfo.level && (
//                   <div className="book-detail-item">
//                     <span className="detail-label">Level:</span>
//                     <span className={`detail-value level-${bookInfo.level.toLowerCase()}`}>
//                       {bookInfo.level}
//                     </span>
//                   </div>
//                 )}
//                 {bookInfo.techStack?.name && (
//                   <div className="book-detail-item">
//                     <span className="detail-label">Tech Stack:</span>
//                     <span className="detail-value tech-stack">{bookInfo.techStack.name}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ Enhanced Progress Bar */}
//       <div className="progress-container-enhanced">
//         <div className="progress-bar-background">
//           <div
//             className="progress-bar-fill"
//             style={{ width: `${progressPercentage}%` }}
//           ></div>
//         </div>
//         <div className="progress-info">
//           <span className="progress-text">
//             Page <span className="current-page-number">{currentPage + 1}</span> of{" "}
//             <span className="total-pages-number">{totalPages}</span>
//           </span>
//           <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
//         </div>
//       </div>

//       {/* ✅ Enhanced FlipBook Viewer */}
//       <div
//         className="flipbook-container-enhanced"
//         style={{
//           transform: `scale(${scale})`,
//           transformOrigin: "center center",
//         }}
//       >
//         {pdfFile ? (
//           <Document
//             file={pdfFile}
//             onLoadSuccess={onDocumentLoadSuccess}
//             onLoadError={onDocumentLoadError}
//             loading={
//               <div className="pdf-loading-placeholder">
//                 <div className="pdf-loading-spinner"></div>
//                 <p>Preparing your reading experience...</p>
//               </div>
//             }
//           >
//             {pdfLoading ? (
//               <div className="pdf-loading-placeholder">
//                 <div className="pdf-loading-spinner"></div>
//                 <p>Loading pages...</p>
//               </div>
//             ) : totalPages > 0 ? (
//               <HTMLFlipBook
//                 width={isMobile ? 350 : 450}
//                 height={isMobile ? 500 : 600}
//                 size="stretch"
//                 minWidth={280}
//                 maxWidth={1200}
//                 minHeight={400}
//                 maxHeight={1600}
//                 showCover={true}
//                 mobileScrollSupport={true}
//                 flippingTime={600}
//                 usePortrait={isMobile}
//                 maxShadowOpacity={0.6}
//                 swipeDistance={15}
//                 className="custom-flipbook-enhanced"
//                 ref={bookRef}
//                 onFlip={handlePageFlip}
//                 startPage={0}
//               >
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <div key={`page_${index}`} className="pdf-page-wrapper">
//                     <div className="pdf-page-content">
//                       <Page 
//                         pageNumber={index + 1} 
//                         width={isMobile ? 330 : 430}
//                         loading={
//                           <div className="page-loading">
//                             <div className="page-loading-spinner"></div>
//                           </div>
//                         }
//                       />
//                       <div className="page-footer">
//                         <span className="page-number">{index + 1}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </HTMLFlipBook>
//             ) : (
//               <div className="no-pages-message">
//                 <p>No pages found in the document.</p>
//               </div>
//             )}
//           </Document>
//         ) : (
//           <div className="no-pdf-message">
//             <div className="no-pdf-icon">📚</div>
//             <p>PDF file not available</p>
//           </div>
//         )}
//       </div>

//       {/* ✅ Enhanced Controls */}
//       <div className="flipbook-controls-enhanced">
//         <button 
//           onClick={prevPage} 
//           className="control-btn-enhanced nav-btn-prev"
//           disabled={currentPage === 0}
//         >
//           <span className="btn-icon">←</span>
//           <span className="btn-text">Previous</span>
//         </button>

//         <div className="center-controls-group">
//           <div className="zoom-controls-enhanced">
//             <button 
//               onClick={zoomOut} 
//               className="control-btn-enhanced zoom-btn"
//               disabled={scale <= 0.5}
//               title="Zoom Out"
//             >
//               <span className="btn-icon">−</span>
//             </button>
//             <button 
//               onClick={resetZoom} 
//               className="control-btn-enhanced reset-btn"
//               title="Reset Zoom"
//             >
//               <span className="btn-icon">⭕</span>
//             </button>
//             <button 
//               onClick={zoomIn} 
//               className="control-btn-enhanced zoom-btn"
//               disabled={scale >= 2.5}
//               title="Zoom In"
//             >
//               <span className="btn-icon">+</span>
//             </button>
//           </div>

//           <div className="page-navigation-dots">
//             {totalPages > 0 && Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
//               const pageNum = i;
//               return (
//                 <button
//                   key={`dot_${i}`}
//                   className={`page-dot ${currentPage === pageNum ? 'active' : ''}`}
//                   onClick={() => goToPage(pageNum)}
//                   title={`Go to page ${pageNum + 1}`}
//                 />
//               );
//             })}
//             {totalPages > 10 && (
//               <span className="more-pages-indicator">...</span>
//             )}
//           </div>
//         </div>

//         <button 
//           onClick={nextPage} 
//           className="control-btn-enhanced nav-btn-next"
//           disabled={currentPage >= totalPages - 1}
//         >
//           <span className="btn-text">Next</span>
//           <span className="btn-icon">→</span>
//         </button>

//         <button 
//           onClick={toggleFullscreen} 
//           className="control-btn-enhanced fullscreen-btn-enhanced"
//           title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
//         >
//           <span className="btn-icon">{isFullscreen ? "⤓" : "⤢"}</span>
//           <span className="btn-text">{isFullscreen ? "Exit" : "Fullscreen"}</span>
//         </button>
//       </div>

//       {/* ✅ Quick Navigation Panel */}
//       {totalPages > 5 && (
//         <div className="quick-navigation-panel">
//           <div className="navigation-scroll-container">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={`nav_${i}`}
//                 className={`page-thumbnail ${currentPage === i ? 'active' : ''}`}
//                 onClick={() => goToPage(i)}
//                 title={`Go to page ${i + 1}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlipBook;










// import React, { useRef, useState, useEffect } from "react";
// import HTMLFlipBook from "react-pageflip";
// import { Document, Page, pdfjs } from "react-pdf";
// import "../CssFiles/component/FlipBook.css";
// import { useParams } from "react-router-dom";

// // Configure PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


// const FlipBook = () => {
//   const { publicId } = useParams();
//   const bookRef = useRef();
//   const [scale, setScale] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [bookInfo, setBookInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [pdfLoading, setPdfLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pageDimensions, setPageDimensions] = useState({ width: 450, height: 600 });

  // // ✅ Fetch course/book data dynamically
  // useEffect(() => {
  //   const fetchBook = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
        
  //       const encodedPublicId = encodeURIComponent(publicId);
  //       const response = await fetch(`http://localhost:5000/api/v1/ebooks/file/${encodedPublicId}`);
        
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch book: ${response.status}`);
  //       }
        
  //       const data = await response.json();
  //       console.log("Fetched Data", data);
        
  //       if (!data || !data.url) {
  //         throw new Error("No PDF URL received");
  //       }

  //       setBookInfo(data);
  //       setPdfFile(data.url);
  //     } catch (err) {
  //       console.error("Error fetching course/book:", err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (publicId) {
  //     fetchBook();
  //   }
  // }, [publicId]);

//   // ✅ Handle responsive behavior and page dimensions
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
      
//       // Adjust page dimensions based on screen size
//       if (mobile) {
//         setPageDimensions({ width: 320, height: 450 });
//       } else {
//         setPageDimensions({ width: 450, height: 600 });
//       }
//     };
    
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setTotalPages(numPages);
//     setPdfLoading(false);
//   };

//   const onDocumentLoadError = (error) => {
//     console.error("Error loading PDF:", error);
//     setError("Failed to load PDF document");
//     setPdfLoading(false);
//   };

//   const onPageLoadSuccess = (page) => {
//     console.log(`Page ${page.pageNumber} loaded successfully`);
//   };

//   const nextPage = () => {
//     if (bookRef.current?.pageFlip()) {
//       bookRef.current.pageFlip().flipNext();
//       setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
//     }
//   };

//   const prevPage = () => {
//     if (bookRef.current?.pageFlip()) {
//       bookRef.current.pageFlip().flipPrev();
//       setCurrentPage((prev) => Math.max(prev - 1, 0));
//     }
//   };

//   const goToPage = (pageNum) => {
//     if (bookRef.current?.pageFlip()) {
//       bookRef.current.pageFlip().flip(pageNum);
//       setCurrentPage(pageNum);
//     }
//   };

//   const zoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5));
//   const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
//   const resetZoom = () => setScale(1);

//   const toggleFullscreen = async () => {
//     try {
//       if (!document.fullscreenElement) {
//         const elem = document.querySelector(".flipbook-wrapper-box");
//         await elem.requestFullscreen();
//         setIsFullscreen(true);
//         setScale(1.3);
//       } else {
//         await document.exitFullscreen();
//         setIsFullscreen(false);
//         setScale(1);
//       }
//     } catch (err) {
//       console.error("Fullscreen error:", err);
//     }
//   };

//   const handlePageFlip = (e) => {
//     setCurrentPage(e.data);
//   };

//   const pdfOptions = React.useMemo(() => ({
//   cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
//   cMapPacked: true,
//   standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
// }), []);


//   // Calculate progress percentage
//   const progressPercentage = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

//   if (loading) {
//     return (
//       <div className="flipbook-loading-container">
//         <div className="flipbook-loading-spinner"></div>
//         <p className="flipbook-loading-text">Loading your book...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flipbook-error-container">
//         <div className="flipbook-error-icon">❌</div>
//         <h2 className="flipbook-error-title">Oops! Something went wrong</h2>
//         <p className="flipbook-error-message">{error}</p>
//         <button 
//           className="flipbook-retry-button"
//           onClick={() => window.location.reload()}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={`flipbook-wrapper-box ${isFullscreen ? "fullscreen-active" : ""}`}>
//       {/* ✅ Enhanced Header with book info */}
//       {bookInfo && (
//         <div className="book-header-animated">
//           <div className="book-header-content">
//             {bookInfo.thumbnail && (
//               <div className="book-thumbnail-container">
//                 <img
//                   src={bookInfo.thumbnail}
//                   alt={bookInfo.title}
//                   className="book-thumbnail"
//                 />
//                 <div className="book-thumbnail-glow"></div>
//               </div>
//             )}
//             <div className="book-meta-info">
//               <h2 className="book-title">{bookInfo.title}</h2>
//               <div className="book-details-grid">
//                 {bookInfo.category && (
//                   <div className="book-detail-item">
//                     <span className="detail-label">Category:</span>
//                     <span className="detail-value">{bookInfo.category}</span>
//                   </div>
//                 )}
//                 {bookInfo.level && (
//                   <div className="book-detail-item">
//                     <span className="detail-label">Level:</span>
//                     <span className={`detail-value level-${bookInfo.level.toLowerCase()}`}>
//                       {bookInfo.level}
//                     </span>
//                   </div>
//                 )}
//                 {bookInfo.techStack?.name && (
//                   <div className="book-detail-item">
//                     <span className="detail-label">Tech Stack:</span>
//                     <span className="detail-value tech-stack">{bookInfo.techStack.name}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ Enhanced Progress Bar */}
//       <div className="progress-container-enhanced">
//         <div className="progress-bar-background">
//           <div
//             className="progress-bar-fill"
//             style={{ width: `${progressPercentage}%` }}
//           ></div>
//         </div>
//         <div className="progress-info">
//           <span className="progress-text">
//             Page <span className="current-page-number">{currentPage + 1}</span> of{" "}
//             <span className="total-pages-number">{totalPages}</span>
//           </span>
//           <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
//         </div>
//       </div>

//       {/* ✅ Enhanced FlipBook Viewer with Improved PDF Rendering */}
//       <div
//         className="flipbook-container-enhanced"
//         style={{
//           transform: `scale(${scale})`,
//           transformOrigin: "center center",
//         }}
//       >
//         {pdfFile ? (
//           <Document
//             file={pdfFile}
//             onLoadSuccess={onDocumentLoadSuccess}
//             onLoadError={onDocumentLoadError}
//             loading={
//               <div className="pdf-loading-placeholder">
//                 <div className="pdf-loading-spinner"></div>
//                 <p>Preparing your reading experience...</p>
//               </div>
//             }
//             options={pdfOptions}
//           >
//             {pdfLoading ? (
//               <div className="pdf-loading-placeholder">
//                 <div className="pdf-loading-spinner"></div>
//                 <p>Loading pages...</p>
//               </div>
//             ) : totalPages > 0 ? (
//               <HTMLFlipBook
//                 width={pageDimensions.width}
//                 height={pageDimensions.height}
//                 size="stretch"
//                 minWidth={280}
//                 maxWidth={1000}
//                 minHeight={400}
//                 maxHeight={1200}
//                 showCover={true}
//                 mobileScrollSupport={true}
//                 flippingTime={600}
//                 usePortrait={isMobile}
//                 maxShadowOpacity={0.6}
//                 swipeDistance={15}
//                 className="custom-flipbook-enhanced"
//                 ref={bookRef}
//                 onFlip={handlePageFlip}
//                 startPage={0}
//               >
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <div key={`page_${index}`} className="pdf-page-wrapper">
//                     <div className="pdf-page-content">
//                       <Page 
//                         pageNumber={index + 1} 
//                         width={pageDimensions.width - 20} // Slightly smaller to fit in container
//                         height={pageDimensions.height - 40} // Account for footer
//                         onLoadSuccess={onPageLoadSuccess}
//                         loading={
//                           <div className="page-loading">
//                             <div className="page-loading-spinner"></div>
//                             <span>Loading page {index + 1}...</span>
//                           </div>
//                         }
//                         renderTextLayer={true}
//                         renderAnnotationLayer={true}
//                         className="pdf-page-render"
//                       />
//                       <div className="page-footer">
//                         <span className="page-number">{index + 1}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </HTMLFlipBook>
//             ) : (
//               <div className="no-pages-message">
//                 <p>No pages found in the document.</p>
//               </div>
//             )}
//           </Document>
//         ) : (
//           <div className="no-pdf-message">
//             <div className="no-pdf-icon">📚</div>
//             <p>PDF file not available</p>
//           </div>
//         )}
//       </div>

//       {/* ✅ Enhanced Controls */}
//       <div className="flipbook-controls-enhanced">
//         <button 
//           onClick={prevPage} 
//           className="control-btn-enhanced nav-btn-prev"
//           disabled={currentPage === 0}
//         >
//           <span className="btn-icon">←</span>
//           <span className="btn-text">Previous</span>
//         </button>

//         <div className="center-controls-group">
//           <div className="zoom-controls-enhanced">
//             <button 
//               onClick={zoomOut} 
//               className="control-btn-enhanced zoom-btn"
//               disabled={scale <= 0.5}
//               title="Zoom Out"
//             >
//               <span className="btn-icon">−</span>
//             </button>
//             <button 
//               onClick={resetZoom} 
//               className="control-btn-enhanced reset-btn"
//               title="Reset Zoom"
//             >
//               <span className="btn-icon">⭕</span>
//             </button>
//             <button 
//               onClick={zoomIn} 
//               className="control-btn-enhanced zoom-btn"
//               disabled={scale >= 2.5}
//               title="Zoom In"
//             >
//               <span className="btn-icon">+</span>
//             </button>
//           </div>

//           <div className="page-navigation-dots">
//             {totalPages > 0 && Array.from({ length: Math.min(8, totalPages) }, (_, i) => {
//               const pageNum = Math.floor((i / 8) * totalPages);
//               return (
//                 <button
//                   key={`dot_${i}`}
//                   className={`page-dot ${currentPage === pageNum ? 'active' : ''}`}
//                   onClick={() => goToPage(pageNum)}
//                   title={`Go to page ${pageNum + 1}`}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         <button 
//           onClick={nextPage} 
//           className="control-btn-enhanced nav-btn-next"
//           disabled={currentPage >= totalPages - 1}
//         >
//           <span className="btn-text">Next</span>
//           <span className="btn-icon">→</span>
//         </button>

//         <button 
//           onClick={toggleFullscreen} 
//           className="control-btn-enhanced fullscreen-btn-enhanced"
//           title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
//         >
//           <span className="btn-icon">{isFullscreen ? "⤓" : "⤢"}</span>
//           <span className="btn-text">{isFullscreen ? "Exit" : "Fullscreen"}</span>
//         </button>
//       </div>

//       {/* ✅ Quick Navigation Panel */}
//       {totalPages > 5 && (
//         <div className="quick-navigation-panel">
//           <div className="navigation-scroll-container">
//             {Array.from({ length: Math.min(20, totalPages) }, (_, i) => (
//               <button
//                 key={`nav_${i}`}
//                 className={`page-thumbnail ${currentPage === i ? 'active' : ''}`}
//                 onClick={() => goToPage(i)}
//                 title={`Go to page ${i + 1}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             {totalPages > 20 && (
//               <span className="more-pages-indicator">+{totalPages - 20} more</span>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlipBook;































// import React, { useRef, useState, useEffect } from "react";
// import HTMLFlipBook from "react-pageflip";
// import { Document, Page, pdfjs } from "react-pdf";
// import "../CssFiles/component/FlipBook.css";
// import { useParams } from "react-router-dom";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const FlipBook = () => {
//   const { publicId } = useParams(); // Expecting route like /book/:id
//   const bookRef = useRef();
//   const [scale, setScale] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [bookInfo, setBookInfo] = useState(null);

//   // ✅ Fetch course/book data dynamically
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         // encodeURIComponent
//         const PublicId = encodeURIComponent(publicId);
//         // const response = await fetch(`http://localhost:5000/api/v1/ebooks/${id}`);
//         const response = await fetch(`http://localhost:5000/api/v1/ebooks/file/${PublicId}`);
//         const data = await response.json();
//         console.log("Fatch Data", data);
        
//         if (!data) throw new Error("No data received");

//         setBookInfo(data.url);
//         setPdfFile(data.url);
//       } catch (err) {
//         console.error("Error fetching course/book:", err);
//       }
//     };

//     fetchBook();
//   }, [publicId]);

//   // ✅ Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setTotalPages(numPages);
//   };

//   const nextPage = () => {
//     bookRef.current?.pageFlip().flipNext();
//     setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
//   };

//   const prevPage = () => {
//     bookRef.current?.pageFlip().flipPrev();
//     setCurrentPage((p) => Math.max(p - 1, 0));
//   };

//   const zoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5));
//   const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
//   const resetZoom = () => setScale(1);

//   const toggleFullscreen = () => {
//     const elem = document.querySelector(".flipbook-wrapper-box");
//     if (!document.fullscreenElement) {
//       elem.requestFullscreen().catch((err) => console.log(err));
//       setIsFullscreen(true);
//       setScale(1.3);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//       setScale(1);
//     }
//   };

//   const handlePageFlip = (e) => setCurrentPage(e.data);

//   return (
//     <div className={`flipbook-wrapper-box ${isFullscreen ? "fullscreen-active" : ""}`}>
//       {/* ✅ Header with course/book info */}
//       {bookInfo && (
//         <div className="book-header">
//           {bookInfo.thumbnail && (
//             <img
//               src={bookInfo.thumbnail}
//               alt={bookInfo.title}
//               className="book-thumbnail"
//               style={{ width: "150px", borderRadius: "10px" }}
//             />
//           )}
//           <div className="book-meta">
//             <h2>{bookInfo.title}</h2>
//             <p>
//               <strong>Category:</strong> {bookInfo.category} <br />
//               <strong>Level:</strong> {bookInfo.level} <br />
//               <strong>Tech Stack:</strong> {bookInfo.techStack?.name}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ✅ Progress Bar */}
//       <div className="progress-container">
//         <div
//           className="progress-bar"
//           style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
//         ></div>
//         <span className="progress-text">
//           Page {currentPage + 1} of {totalPages || "?"}
//         </span>
//       </div>

//       {/* ✅ FlipBook Viewer */}
//       {/* <div
//         className="flipbook-container"
//         style={{
//           transform: `scale(${scale})`,
//           transformOrigin: "center center",
//         }}
//       >
//         {pdfFile ? (
//           <HTMLFlipBook
//             width={450}
//             height={600}
//             size="stretch"
//             minWidth={300}
//             maxWidth={1000}
//             minHeight={400}
//             maxHeight={1500}
//             showCover={true}
//             mobileScrollSupport={true}
//             flippingTime={800}
//             usePortrait={isMobile}
//             maxShadowOpacity={0.5}
//             swipeDistance={20}
//             className="custom-flipbook"
//             ref={bookRef}
//             onFlip={handlePageFlip}
//           >
//             <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
//               {Array.from(new Array(totalPages), (el, index) => (
//                 <div key={index} className="page pdf-page">
//                   <Page pageNumber={index + 1} width={450} />
//                 </div>
//               ))}
//             </Document>
//           </HTMLFlipBook>
//         ) : (
//           <p>Loading PDF...</p>
//         )}
//       </div> */}

//       <div
//   className="flipbook-container"
//   style={{
//     transform: `scale(${scale})`,
//     transformOrigin: "center center",
//   }}
// >
//   {pdfFile ? (
//     <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
//       {totalPages > 0 ? (
//         <HTMLFlipBook
//           width={450}
//           height={600}
//           size="stretch"
//           minWidth={300}
//           maxWidth={1000}
//           minHeight={400}
//           maxHeight={1500}
//           showCover={true}
//           mobileScrollSupport={true}
//           flippingTime={800}
//           usePortrait={isMobile}
//           maxShadowOpacity={0.5}
//           swipeDistance={20}
//           className="custom-flipbook"
//           ref={bookRef}
//           onFlip={handlePageFlip}
//         >
//           {Array.from(new Array(totalPages), (el, index) => (
//             <div key={index} className="page pdf-page">
//               <Page pageNumber={index + 1} width={450} />
//             </div>
//           ))}
//         </HTMLFlipBook>
//       ) : (
//         <p>Loading pages...</p>
//       )}
//     </Document>
//   ) : (
//     <p>Loading PDF...</p>
//   )}
// </div>


//       {/* ✅ Controls */}
//       <div className="flipbook-controls">
//         <button onClick={prevPage} className="control-btn nav-btn">
//           ← Prev
//         </button>
//         <div className="zoom-controls">
//           <button onClick={zoomOut}>−</button>
//           <button onClick={resetZoom}>⭕</button>
//           <button onClick={zoomIn}>+</button>
//         </div>
//         <button onClick={nextPage} className="control-btn nav-btn">
//           Next →
//         </button>
//         <button onClick={toggleFullscreen} className="control-btn fullscreen-btn">
//           {isFullscreen ? "Exit" : "Fullscreen"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FlipBook;









// import React, { useRef, useState, useEffect, useMemo } from "react";
// import HTMLFlipBook from "react-pageflip";
// import { Document, Page, pdfjs } from "react-pdf";
// import "../CssFiles/component/FlipBook.css";
// import { useParams } from "react-router-dom";

// // ✅ FIXED: Use LOCAL WORKER (not remote, avoids CORS)
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

// const FlipBook = () => {
//   const { publicId } = useParams();
//   const bookRef = useRef();

//   const [scale, setScale] = useState(1);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [bookInfo, setBookInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [pdfLoading, setPdfLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pageDimensions, setPageDimensions] = useState({
//     width: 450,
//     height: 600,
//   });

//   // ✅ Stable PDF options (no unnecessary re-renders)
//   const pdfOptions = useMemo(
//     () => ({
//       cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
//       cMapPacked: true,
//       standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
//     }),
//     []
//   );

//   // ✅ Fetch book metadata from backend
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `http://localhost:5000/api/v1/ebooks/file/${encodeURIComponent(
//             publicId
//           )}`
//         );
//         if (!response.ok)
//           throw new Error(`Failed to fetch book: ${response.status}`);
//         const data = await response.json();

//         if (!data || !data.url) throw new Error("No PDF URL received");
//         setBookInfo(data);
//         setPdfFile(data.secure_url || data.url);
//       } catch (err) {
//         console.error("Error fetching book:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (publicId) fetchBook();
//   }, [publicId]);

//   // ✅ Responsive adjustments
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       setPageDimensions(
//         mobile ? { width: 320, height: 450 } : { width: 450, height: 600 }
//       );
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // ✅ PDF load handlers
//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setTotalPages(numPages);
//     setPdfLoading(false);
//   };

//   const onDocumentLoadError = (error) => {
//     console.error("Error loading PDF:", error);
//     setError("Failed to load PDF document.");
//     setPdfLoading(false);
//   };

//   const onPageLoadSuccess = (page) => {
//     console.log(`Page ${page.pageNumber} loaded`);
//   };

//   // ✅ Navigation
//   const nextPage = () => {
//     bookRef.current?.pageFlip().flipNext();
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
//   };

//   const prevPage = () => {
//     bookRef.current?.pageFlip().flipPrev();
//     setCurrentPage((prev) => Math.max(prev - 1, 0));
//   };

//   const goToPage = (pageNum) => {
//     bookRef.current?.pageFlip().flip(pageNum);
//     setCurrentPage(pageNum);
//   };

//   // ✅ Zoom controls
//   const zoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5));
//   const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
//   const resetZoom = () => setScale(1);

//   // ✅ Fullscreen toggle
//   const toggleFullscreen = async () => {
//     const elem = document.querySelector(".flipbook-wrapper-box");
//     try {
//       if (!document.fullscreenElement) {
//         await elem.requestFullscreen();
//         setIsFullscreen(true);
//         setScale(1.2);
//       } else {
//         await document.exitFullscreen();
//         setIsFullscreen(false);
//         setScale(1);
//       }
//     } catch (err) {
//       console.error("Fullscreen error:", err);
//     }
//   };

//   // ✅ Flip event
//   const handlePageFlip = (e) => setCurrentPage(e.data);

//   const progressPercentage =
//     totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0;

//   // ✅ Loading State
//   if (loading) {
//     return (
//       <div className="flipbook-loading-container">
//         <div className="flipbook-loading-spinner"></div>
//         <p>Loading your book...</p>
//       </div>
//     );
//   }

//   // ✅ Error State
//   if (error) {
//     return (
//       <div className="flipbook-error-container">
//         <div className="flipbook-error-icon">❌</div>
//         <h2>Something went wrong</h2>
//         <p>{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="flipbook-retry-button"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   // ✅ Main Render
//   return (
//     <div
//       className={`flipbook-wrapper-box ${
//         isFullscreen ? "fullscreen-active" : ""
//       }`}
//     >
//       {/* Header */}
//       {bookInfo && (
//         <div className="book-header-animated">
//           <div className="book-header-content">
//             {bookInfo.thumbnail && (
//               <img
//                 src={bookInfo.thumbnail}
//                 alt={bookInfo.title}
//                 className="book-thumbnail"
//               />
//             )}
//             <div className="book-meta-info">
//               <h2 className="book-title">{bookInfo.title}</h2>
//               {bookInfo.category && <p>Category: {bookInfo.category}</p>}
//               {bookInfo.techStack?.name && (
//                 <p>Tech Stack: {bookInfo.techStack.name}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Progress Bar */}
//       <div className="progress-container-enhanced">
//         <div className="progress-bar-background">
//           <div
//             className="progress-bar-fill"
//             style={{ width: `${progressPercentage}%` }}
//           ></div>
//         </div>
//         <div className="progress-info">
//           <span>
//             Page {currentPage + 1} / {totalPages}
//           </span>
//           <span>{Math.round(progressPercentage)}%</span>
//         </div>
//       </div>

//       {/* FlipBook */}
//       <div
//         className="flipbook-container-enhanced"
//         style={{
//           transform: `scale(${scale})`,
//           transformOrigin: "center center",
//         }}
//       >
//         {pdfFile ? (
//           <Document
//             file={pdfFile}
//             onLoadSuccess={onDocumentLoadSuccess}
//             onLoadError={onDocumentLoadError}
//             loading={<div className="pdf-loading-placeholder">Preparing PDF...</div>}
//             options={pdfOptions}
//           >
//             {!pdfLoading && totalPages > 0 ? (
//               <HTMLFlipBook
//                 width={pageDimensions.width}
//                 height={pageDimensions.height}
//                 size="stretch"
//                 minWidth={280}
//                 maxWidth={1000}
//                 minHeight={400}
//                 maxHeight={1200}
//                 showCover
//                 mobileScrollSupport
//                 flippingTime={600}
//                 usePortrait={isMobile}
//                 maxShadowOpacity={0.6}
//                 swipeDistance={15}
//                 className="custom-flipbook-enhanced"
//                 ref={bookRef}
//                 onFlip={handlePageFlip}
//                 startPage={0}
//               >
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <div key={`page_${i}`} className="pdf-page-wrapper">
//                     <Page
//                       pageNumber={i + 1}
//                       width={pageDimensions.width - 20}
//                       renderTextLayer={false}
//                       renderAnnotationLayer={false}
//                       onLoadSuccess={onPageLoadSuccess}
//                       loading={
//                         <div className="page-loading">Loading page...</div>
//                       }
//                     />
//                     <div className="page-footer">
//                       <span className="page-number">{i + 1}</span>
//                     </div>
//                   </div>
//                 ))}
//               </HTMLFlipBook>
//             ) : (
//               <div className="pdf-loading-placeholder">Loading pages...</div>
//             )}
//           </Document>
//         ) : (
//           <div className="no-pdf-message">
//             <p>PDF not available</p>
//           </div>
//         )}
//       </div>

//       {/* Controls */}
//       <div className="flipbook-controls-enhanced">
//         <button onClick={prevPage} disabled={currentPage === 0}>
//           ← Prev
//         </button>
//         <div className="zoom-controls-enhanced">
//           <button onClick={zoomOut} disabled={scale <= 0.5}>
//             −
//           </button>
//           <button onClick={resetZoom}>⭕</button>
//           <button onClick={zoomIn} disabled={scale >= 2.5}>
//             ＋
//           </button>
//         </div>
//         <button onClick={nextPage} disabled={currentPage >= totalPages - 1}>
//           Next →
//         </button>
//         <button onClick={toggleFullscreen}>
//           {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FlipBook;















import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "./Styles/FlipBook.css";
import { useParams } from "react-router-dom";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const FlipBook = () => {
  const { publicId } = useParams();
  const [pdfFile, setPdfFile] = useState(null);
  const bookRef = useRef();
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageSize, setPageSize] = useState({ width: 450, height: 600 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fatch the pdf file
  useEffect(() => {
    // fetch(pdfUrl)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const file = new File([blob], "book.pdf", { type: "application/pdf" });
    //     setPdfFile(file);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //     setLoading(false);
    //   });

    const fetchBook = async () => {
      try {
        const encodedPublicId = encodeURIComponent(publicId);
        console.log(encodedPublicId);
        
        const response = await fetch(`http://localhost:5000/api/v1/ebooks/file/${encodedPublicId}`);
        // const blob = await response.blob();
        // const file = new File([blob], "book.pdf", { type: "application/pdf" });
        setPdfFile(response.url);
        console.log(response);
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBook();
  }, [publicId]);

  // Responsive resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768)
        setPageSize({ width: 320, height: 480 });
      else setPageSize({ width: 450, height: 600 });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // PDF load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  const nextPage = () => bookRef.current.pageFlip().flipNext();
  const prevPage = () => bookRef.current.pageFlip().flipPrev();

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.6));
  const resetZoom = () => setScale(1);

  const toggleFullscreen = async () => {
    const elem = document.querySelector(".flipbook-container");
    if (!document.fullscreenElement) {
      await elem.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (error) {
    return (
      <div className="flipbook-error">
        <p>❌ {error}</p>
      </div>
    );
  }

  return (
    <div className={`flipbook-container ${isFullscreen ? "fullscreen" : ""}`}>
      {loading && (
        <div className="flipbook-loading">
          <div className="spinner"></div>
          <p>Loading PDF...</p>
        </div>
      )}

      <div
        className="flipbook-wrapper"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(err) => setError("Failed to load PDF")}
        >
          {numPages && (
            <HTMLFlipBook
              width={pageSize.width}
              height={pageSize.height}
              showCover={true}
              mobileScrollSupport={true}
              flippingTime={600}
              ref={bookRef}
              onFlip={onFlip}
              className="pdf-flipbook"
            >
              {Array.from(new Array(numPages), (_, index) => (
                <div className="page" key={`page_${index}`}>
                  <Page
                    pageNumber={index + 1}
                    width={pageSize.width - 20}
                    height={pageSize.height - 20}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={<div className="page-spinner"></div>}
                  />
                  <div className="page-footer">{index + 1}</div>
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      {/* Controls */}
      <div className="flipbook-controls">
        <button onClick={prevPage} disabled={currentPage === 0}>
          ← Prev
        </button>

        <div className="zoom-controls">
          <button onClick={zoomOut}>−</button>
          <button onClick={resetZoom}>Reset</button>
          <button onClick={zoomIn}>+</button>
        </div>

        <button onClick={nextPage} disabled={currentPage >= numPages - 1}>
          Next →
        </button>

        <button onClick={toggleFullscreen}>
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>

      {/* Page Progress */}
      {numPages && (
        <div className="page-progress">
          Page {currentPage + 1} / {numPages}
        </div>
      )}
    </div>
  );
};

export default FlipBook;
