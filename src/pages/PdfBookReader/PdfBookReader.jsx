// import React, { useState, useRef, useEffect } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/Page/TextLayer.css';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import './PdfBookReader.css';
// import { useParams } from 'react-router-dom';

// // Configure PDF.js worker
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const PdfBookReader = () => {
//   const { publicId } = useParams();
//   const [bookInfo, setBookInfo] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isTwoPageView, setIsTwoPageView] = useState(false);
//   const containerRef = useRef(null);

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

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToPreviousPage = () => {
//     setPageNumber(prev => Math.max(prev - (isTwoPageView ? 2 : 1), 1));
//   };

//   const goToNextPage = () => {
//     setPageNumber(prev => Math.min(prev + (isTwoPageView ? 2 : 1), numPages));
//   };

//   const zoomIn = () => {
//     setScale(prev => Math.min(prev + 0.2, 3.0));
//   };

//   const zoomOut = () => {
//     setScale(prev => Math.max(prev - 0.2, 0.5));
//   };

//   const toggleFullScreen = () => {
//     if (!document.fullscreenElement) {
//       containerRef.current.requestFullscreen().catch(err => {
//         console.log(`Error attempting to enable full-screen mode: ${err.message}`);
//       });
//       setIsFullScreen(true);
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//         setIsFullScreen(false);
//       }
//     }
//   };

//   const handlePageInput = (e) => {
//     const newPage = parseInt(e.target.value);
//     if (newPage >= 1 && newPage <= numPages) {
//       setPageNumber(newPage);
//     }
//   };

//   // Calculate pages to display based on view mode
//   const getDisplayPages = () => {
//     if (isTwoPageView && window.innerWidth > 768) {
//       // For two-page view, return current and next page
//       return [pageNumber, pageNumber + 1 <= numPages ? pageNumber + 1 : null];
//     }
//     return [pageNumber];
//   };

//   if (loading) {
//     return (
//       <div className="pdf-book-reader__loading">
//         <div className="pdf-book-reader__spinner"></div>
//         <p>Loading your book...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="pdf-book-reader__error">
//         <h3>Error Loading Book</h3>
//         <p>{error}</p>
//         <button 
//           className="pdf-book-reader__retry-btn"
//           onClick={() => window.location.reload()}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div 
//       ref={containerRef}
//       className={`pdf-book-reader ${isFullScreen ? 'pdf-book-reader--fullscreen' : ''}`}
//     >
//       {/* Header with book info and controls */}
//       <div className="pdf-book-reader__header">
//         <div className="pdf-book-reader__book-info">
//           <h2 className="pdf-book-reader__book-title">
//             {bookInfo?.title || 'PDF Book Reader'}
//           </h2>
//           <p className="pdf-book-reader__book-author">
//             {bookInfo?.author || 'Unknown Author'}
//           </p>
//         </div>
        
//         <div className="pdf-book-reader__controls">
//           <button
//             className="pdf-book-reader__control-btn"
//             onClick={zoomOut}
//             title="Zoom Out"
//           >
//             <span className="pdf-book-reader__icon">−</span>
//           </button>
          
//           <span className="pdf-book-reader__scale-display">
//             {Math.round(scale * 100)}%
//           </span>
          
//           <button
//             className="pdf-book-reader__control-btn"
//             onClick={zoomIn}
//             title="Zoom In"
//           >
//             <span className="pdf-book-reader__icon">+</span>
//           </button>
          
//           <button
//             className="pdf-book-reader__control-btn"
//             onClick={toggleFullScreen}
//             title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
//           >
//             <span className="pdf-book-reader__icon">
//               {isFullScreen ? '⤓' : '⤢'}
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Main PDF viewer */}
//       <div className="pdf-book-reader__viewer-container">
//         <div className="pdf-book-reader__navigation">
//           <button
//             className="pdf-book-reader__nav-btn"
//             onClick={goToPreviousPage}
//             disabled={pageNumber <= 1}
//           >
//             <span className="pdf-book-reader__nav-icon">‹</span>
//             Previous
//           </button>

//           <div className="pdf-book-reader__page-info">
//             <input
//               type="number"
//               value={pageNumber}
//               onChange={handlePageInput}
//               className="pdf-book-reader__page-input"
//               min="1"
//               max={numPages}
//             />
//             <span className="pdf-book-reader__page-count">
//               of {numPages || '--'}
//             </span>
//           </div>

//           <button
//             className="pdf-book-reader__nav-btn"
//             onClick={goToNextPage}
//             disabled={pageNumber >= numPages}
//           >
//             Next
//             <span className="pdf-book-reader__nav-icon">›</span>
//           </button>
//         </div>

//         <div className={`pdf-book-reader__document ${isTwoPageView ? 'pdf-book-reader__document--two-page' : ''}`}>
//           <Document
//             file={pdfFile}
//             onLoadSuccess={onDocumentLoadSuccess}
//             loading={
//               <div className="pdf-book-reader__page-loading">
//                 Loading page...
//               </div>
//             }
//           >
//             {getDisplayPages().map((pageNum, index) => (
//               pageNum && (
//                 <div 
//                   key={pageNum}
//                   className={`pdf-book-reader__page-container ${
//                     isTwoPageView ? 'pdf-book-reader__page-container--spread' : ''
//                   }`}
//                 >
//                   <Page
//                     pageNumber={pageNum}
//                     scale={scale}
//                     className="pdf-book-reader__page"
//                     renderTextLayer={true}
//                     renderAnnotationLayer={true}
//                   />
//                   {isTwoPageView && (
//                     <div className="pdf-book-reader__page-number">
//                       {pageNum}
//                     </div>
//                   )}
//                 </div>
//               )
//             ))}
//           </Document>
//         </div>
//       </div>

//       {/* Footer controls */}
//       <div className="pdf-book-reader__footer">
//         <div className="pdf-book-reader__view-controls">
//           <button
//             className={`pdf-book-reader__view-btn ${!isTwoPageView ? 'pdf-book-reader__view-btn--active' : ''}`}
//             onClick={() => setIsTwoPageView(false)}
//           >
//             Single Page
//           </button>
//           <button
//             className={`pdf-book-reader__view-btn ${isTwoPageView ? 'pdf-book-reader__view-btn--active' : ''}`}
//             onClick={() => setIsTwoPageView(true)}
//           >
//             Two Page
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PdfBookReader;











// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ZoomIn, 
//   ZoomOut, 
//   Maximize, 
//   Minimize, 
//   ChevronLeft, 
//   ChevronRight,
//   BookOpen,
//   Book,
//   Loader2
// } from 'lucide-react';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';
// import './PdfBookReader.css';
// import { useParams } from 'react-router-dom';

// // Configure PDF.js worker
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const PdfBookReader = () => {
//   const { publicId } = useParams();
//   const [bookInfo, setBookInfo] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isTwoPageView, setIsTwoPageView] = useState(false);
//   const [pageLoading, setPageLoading] = useState(false);
//   const [direction, setDirection] = useState(0); // -1: left, 0: none, 1: right
//   const containerRef = useRef(null);
//   const documentRef = useRef(null);

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

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const onPageLoadSuccess = () => {
//     setPageLoading(false);
//   };

//   const goToPreviousPage = useCallback(async () => {
//     if (pageNumber <= 1) return;
    
//     setDirection(-1);
//     setPageLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 100));
//     setPageNumber(prev => Math.max(prev - (isTwoPageView ? 2 : 1), 1));
//   }, [pageNumber, isTwoPageView]);

//   const goToNextPage = useCallback(async () => {
//     if (pageNumber >= numPages) return;
    
//     setDirection(1);
//     setPageLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 100));
//     setPageNumber(prev => Math.min(prev + (isTwoPageView ? 2 : 1), numPages));
//   }, [pageNumber, numPages, isTwoPageView]);

//   const zoomIn = () => {
//     setScale(prev => Math.min(prev + 0.2, 3.0));
//   };

//   const zoomOut = () => {
//     setScale(prev => Math.max(prev - 0.2, 0.5));
//   };

//   const toggleFullScreen = async () => {
//     if (!document.fullscreenElement) {
//       try {
//         await containerRef.current.requestFullscreen();
//         setIsFullScreen(true);
//       } catch (err) {
//         console.log(`Error attempting to enable full-screen mode: ${err.message}`);
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//         setIsFullScreen(false);
//       }
//     }
//   };

//   const handlePageInput = (e) => {
//     const newPage = parseInt(e.target.value);
//     if (newPage >= 1 && newPage <= numPages) {
//       setDirection(newPage > pageNumber ? 1 : -1);
//       setPageLoading(true);
//       setPageNumber(newPage);
//     }
//   };

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === 'ArrowLeft') {
//         goToPreviousPage();
//       } else if (e.key === 'ArrowRight') {
//         goToNextPage();
//       } else if (e.key === '+') {
//         zoomIn();
//       } else if (e.key === '-') {
//         zoomOut();
//       } else if (e.key === 'f') {
//         toggleFullScreen();
//       }
//     };

//     document.addEventListener('keydown', handleKeyPress);
//     return () => document.removeEventListener('keydown', handleKeyPress);
//   }, [goToPreviousPage, goToNextPage]);

//   // Calculate pages to display based on view mode
//   const getDisplayPages = () => {
//     if (isTwoPageView && window.innerWidth > 768) {
//       return [pageNumber, pageNumber + 1 <= numPages ? pageNumber + 1 : null];
//     }
//     return [pageNumber];
//   };

//   // Page flip animations
//   const pageVariants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 300 : -300,
//       opacity: 0,
//       scale: 0.9,
//       rotateY: direction > 0 ? -45 : 45,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//       rotateY: 0,
//     },
//     exit: (direction) => ({
//       x: direction > 0 ? -300 : 300,
//       opacity: 0,
//       scale: 0.9,
//       rotateY: direction > 0 ? 45 : -45,
//     })
//   };

//   const pageTransition = {
//     type: "spring",
//     stiffness: 300,
//     damping: 30,
//     duration: 0.3
//   };

//   if (loading) {
//     return (
//       <motion.div 
//         className="pdf-book-reader__loading"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         >
//           <Loader2 size={48} className="pdf-book-reader__spinner-icon" />
//         </motion.div>
//         <motion.p
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           Loading your book...
//         </motion.p>
//       </motion.div>
//     );
//   }

//   if (error) {
//     return (
//       <motion.div 
//         className="pdf-book-reader__error"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//       >
//         <h3>Error Loading Book</h3>
//         <p>{error}</p>
//         <motion.button 
//           className="pdf-book-reader__retry-btn"
//           onClick={() => window.location.reload()}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Retry
//         </motion.button>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div 
//       ref={containerRef}
//       className={`pdf-book-reader ${isFullScreen ? 'pdf-book-reader--fullscreen' : ''}`}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Header with book info and controls */}
//       <motion.div 
//         className="pdf-book-reader__header"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="pdf-book-reader__book-info">
//           <h2 className="pdf-book-reader__book-title">
//             {bookInfo?.title || 'PDF Book Reader'}
//           </h2>
//           <p className="pdf-book-reader__book-author">
//             {bookInfo?.author || 'Unknown Author'}
//           </p>
//         </div>
        
//         <div className="pdf-book-reader__controls">
//           <motion.button
//             className="pdf-book-reader__control-btn"
//             onClick={zoomOut}
//             title="Zoom Out"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <ZoomOut size={20} />
//           </motion.button>
          
//           <motion.span 
//             className="pdf-book-reader__scale-display"
//             key={scale}
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//           >
//             {Math.round(scale * 100)}%
//           </motion.span>
          
//           <motion.button
//             className="pdf-book-reader__control-btn"
//             onClick={zoomIn}
//             title="Zoom In"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <ZoomIn size={20} />
//           </motion.button>
          
//           <motion.button
//             className="pdf-book-reader__control-btn"
//             onClick={toggleFullScreen}
//             title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {isFullScreen ? <Minimize size={20} /> :  <Maximize size={20} />}
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Main PDF viewer */}
//       <div className="pdf-book-reader__viewer-container">
//         <motion.div 
//           className="pdf-book-reader__navigation"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <motion.button
//             className="pdf-book-reader__nav-btn"
//             onClick={goToPreviousPage}
//             disabled={pageNumber <= 1}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ChevronLeft size={20} />
//             Previous
//           </motion.button>

//           <div className="pdf-book-reader__page-info">
//             <input
//               type="number"
//               value={pageNumber}
//               onChange={handlePageInput}
//               className="pdf-book-reader__page-input"
//               min="1"
//               max={numPages}
//             />
//             <span className="pdf-book-reader__page-count">
//               of {numPages || '--'}
//             </span>
//           </div>

//           <motion.button
//             className="pdf-book-reader__nav-btn"
//             onClick={goToNextPage}
//             disabled={pageNumber >= numPages}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Next
//             <ChevronRight size={20} />
//           </motion.button>
//         </motion.div>

//         <div 
//           ref={documentRef}
//           className={`pdf-book-reader__document ${isTwoPageView ? 'pdf-book-reader__document--two-page' : ''}`}
//         >
//           <Document
//             file={pdfFile}
//             onLoadSuccess={onDocumentLoadSuccess}
//             loading={
//               <div className="pdf-book-reader__page-loading">
//                 <Loader2 size={24} className="animate-spin" />
//                 Loading document...
//               </div>
//             }
//           >
//             <AnimatePresence mode="wait" custom={direction}>
//               <motion.div
//                 key={pageNumber}
//                 custom={direction}
//                 variants={pageVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={pageTransition}
//                 className="pdf-book-reader__pages-container"
//               >
//                 {getDisplayPages().map((pageNum, index) => (
//                   pageNum && (
//                     <div 
//                       key={pageNum}
//                       className={`pdf-book-reader__page-container ${
//                         isTwoPageView ? 'pdf-book-reader__page-container--spread' : ''
//                       }`}
//                     >
//                       <Page
//                         pageNumber={pageNum}
//                         scale={scale}
//                         className="pdf-book-reader__page"
//                         renderTextLayer={true}
//                         renderAnnotationLayer={true}
//                         loading={
//                           <div className="pdf-book-reader__page-loading">
//                             <Loader2 size={24} className="animate-spin" />
//                             Loading page {pageNum}...
//                           </div>
//                         }
//                         onLoadSuccess={onPageLoadSuccess}
//                       />
//                       {isTwoPageView && (
//                         <div className="pdf-book-reader__page-number">
//                           {pageNum}
//                         </div>
//                       )}
//                     </div>
//                   )
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           </Document>
//         </div>
//       </div>

//       {/* Footer controls */}
//       <motion.div 
//         className="pdf-book-reader__footer"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//       >
//         <div className="pdf-book-reader__view-controls">
//           <motion.button
//             className={`pdf-book-reader__view-btn ${!isTwoPageView ? 'pdf-book-reader__view-btn--active' : ''}`}
//             onClick={() => {
//               setDirection(0);
//               setIsTwoPageView(false);
//             }}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Book size={16} />
//             Single Page
//           </motion.button>
//           <motion.button
//             className={`pdf-book-reader__view-btn ${isTwoPageView ? 'pdf-book-reader__view-btn--active' : ''}`}
//             onClick={() => {
//               setDirection(0);
//               setIsTwoPageView(true);
//             }}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <BookOpen size={16} />
//             Two Page
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Quick Navigation Dots */}
//       {numPages && numPages > 1 && (
//         <motion.div 
//           className="pdf-book-reader__page-dots"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           {Array.from({ length: Math.min(10, numPages) }, (_, i) => (
//             <motion.button
//               key={i}
//               className={`pdf-book-reader__page-dot ${pageNumber === i + 1 ? 'pdf-book-reader__page-dot--active' : ''}`}
//               onClick={() => {
//                 setDirection(i + 1 > pageNumber ? 1 : -1);
//                 setPageNumber(i + 1);
//               }}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//             />
//           ))}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default PdfBookReader;















import React, { useState, useRef, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import {
  ZoomIn,
  ZoomOut,
  Minimize,
  Maximize,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Book,
  Loader2,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./PdfBookReader.css";
import { useParams } from "react-router-dom";

// ✅ PDF.js Worker Configuration
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfBookReader = () => {
  const { publicId } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isTwoPageView, setIsTwoPageView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const flipBookRef = useRef(null);
  const containerRef = useRef(null);

  // ✅ Fetch book info & PDF URL
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const encodedPublicId = encodeURIComponent(publicId);
        const res = await fetch(
          `http://localhost:5000/api/v1/ebooks/file/${encodedPublicId}`
        );
        const data = await res.json();
        console.log(data);
        
        if (!res.ok) throw new Error(data?.message || "Failed to fetch book");

        setBookInfo(data.book);
        setPdfFile(data.url);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (publicId) fetchBook();
  }, [publicId]);

  // ✅ Handle document load
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // ✅ Navigation
  const goToPreviousPage = () => flipBookRef.current.pageFlip().flipPrev();
  const goToNextPage = () => flipBookRef.current.pageFlip().flipNext();

  // ✅ FlipBook event tracking
  const handleFlip = useCallback((e) => {
    setCurrentPage(e.data + 1);
  }, []);

  // ✅ Zoom controls
  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2.0));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));

  // ✅ Fullscreen toggle
  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // ✅ Page input navigation
  const handlePageInput = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= numPages) {
      flipBookRef.current.pageFlip().flip(val - 1);
    }
  };

  if (loading) {
    return (
      <div className="pdf-book-reader__loading">
        <Loader2 className="pdf-book-reader__spinner-icon" size={48} />
        <p>Loading your book...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pdf-book-reader__error">
        <h3>Error Loading Book</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`pdf-book-reader ${
        isFullScreen ? "pdf-book-reader--fullscreen" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <div className="pdf-book-reader__header">
        <div>
          <h2>{bookInfo?.title || "PDF Book Reader"}</h2>
          <p>{bookInfo?.author || "Unknown Author"}</p>
        </div>

        <div className="pdf-book-reader__controls">
          {/* <button onClick={zoomOut}>
            <ZoomOut />
          </button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn}>
            <ZoomIn />
          </button> */}
          <button className="pdf-fullscreen-button" onClick={toggleFullScreen}>
            {isFullScreen ? <Minimize /> : <Maximize />}
          </button>
        </div>
      </div>

      {/* MAIN VIEW */}
      <div className="pdf-book-reader__viewer-container">
        <div className="pdf-book-reader__navigation">
          {/* <button onClick={goToPreviousPage} disabled={currentPage <= 1}>
            <ChevronLeft /> Previous
          </button>
          <div>
            <input
              type="number"
              value={currentPage}
              onChange={handlePageInput}
              min="1"
              max={numPages || 1}
            />
            <span>of {numPages || "--"}</span>
          </div>
          <button onClick={goToNextPage} disabled={currentPage >= numPages}>
            Next <ChevronRight />
          </button> */}
        </div>

        {/* ✅ Direct FlipBook Rendering */}
        {pdfFile && (
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(err) => console.error("Load Error:", err)}
            loading={
              <div className="pdf-book-reader__loading">
                <Loader2 className="pdf-book-reader__spinner-icon" size={48} />
                <p>Loading pages...</p>
              </div>
            }
          >
            <div className="pdf-book-reader__flip-book-container">
          {numPages && (
  <HTMLFlipBook width={550} height={733}>
    {Array.from(new Array(numPages), (el, index) => (
      <div className="pdf-flip-page" key={index}>
        <Page
          pageNumber={index + 1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          width={550}
          height={733}
        />
      </div>
    ))}
  </HTMLFlipBook>
)}

            </div>
          </Document>
        )}
      </div>

      {/* FOOTER */}
      {/* <div className="pdf-book-reader__footer">
        <button
          className={!isTwoPageView ? "active" : ""}
          onClick={() => setIsTwoPageView(false)}
        >
          <Book /> Single Page
        </button>
        <button
          className={isTwoPageView ? "active" : ""}
          onClick={() => setIsTwoPageView(true)}
        >
          <BookOpen /> Two Page
        </button>
      </div> */}
    </motion.div>
  );
};

export default PdfBookReader;













// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import HTMLFlipBook from 'react-pageflip';
// import { toPng } from 'html-to-image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ZoomIn, 
//   ZoomOut, 
// //   Fullscreen, 
//   Minimize, 
//   Maximize,
//   ChevronLeft, 
//   ChevronRight,
//   BookOpen,
//   Book,
//   Loader2,
//   Settings,
//   Download
// } from 'lucide-react';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';
// import './PdfBookReader.css';
// import { useParams } from 'react-router-dom';

// // import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';
// // pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
// // Configure PDF.js worker
// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const PdfBookReader = () => {
//   const { publicId } = useParams();
//   const [bookInfo, setBookInfo] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [numPages, setNumPages] = useState(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [scale, setScale] = useState(1.0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isTwoPageView, setIsTwoPageView] = useState(true);
//   const [pageImages, setPageImages] = useState([]);
//   const [generatingImages, setGeneratingImages] = useState(false);
//   const flipBookRef = useRef(null);
//   const containerRef = useRef(null);
//   const pageRefs = useRef([]);

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

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   // Generate page images for the flip book
//   const generatePageImages = useCallback(async () => {
//     if (!numPages) return;
    
//     setGeneratingImages(true);
//     const images = [];
    
//     try {
//       for (let i = 1; i <= numPages; i++) {
//         // Create a temporary container for each page
//         const tempDiv = document.createElement('div');
//         tempDiv.style.width = '800px';
//         tempDiv.style.height = '1000px';
//         tempDiv.style.background = 'white';
//         tempDiv.style.padding = '20px';
//         document.body.appendChild(tempDiv);

//         // Render PDF page to image
//         const canvas = await new Promise((resolve) => {
//           const onPageRender = (page) => {
//             const viewport = page.getViewport({ scale: 0.8 });
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');
//             canvas.width = viewport.width;
//             canvas.height = viewport.height;

//             const renderContext = {
//               canvasContext: context,
//               viewport: viewport
//             };

//             page.render(renderContext).promise.then(() => {
//               resolve(canvas);
//             });
//           };

//           pdfjs.getDocument(pdfFile).promise.then(pdf => {
//             pdf.getPage(i).then(onPageRender);
//           });
//         });

//         const imageUrl = canvas.toDataURL('image/png');
//         images.push(imageUrl);
        
//         document.body.removeChild(tempDiv);
//       }
      
//       setPageImages(images);
//     } catch (error) {
//       console.error('Error generating page images:', error);
//     } finally {
//       setGeneratingImages(false);
//     }
//   }, [pdfFile, numPages]);

//   useEffect(() => {
//     if (pdfFile && numPages) {
//       generatePageImages();
//     }
//   }, [pdfFile, numPages, generatePageImages]);

//   const goToPreviousPage = () => {
//     if (flipBookRef.current) {
//       flipBookRef.current.pageFlip().flipPrev();
//     }
//   };

//   const goToNextPage = () => {
//     if (flipBookRef.current) {
//       flipBookRef.current.pageFlip().flipNext();
//     }
//   };

//   const handlePageChange = (e) => {
//     setCurrentPage(e.data);
//   };

//   const goToPage = (pageNum) => {
//     if (flipBookRef.current) {
//       const actualPage = Math.max(0, Math.min(pageNum - 1, numPages - 1));
//       flipBookRef.current.pageFlip().turnToPage(actualPage);
//     }
//   };

//   const zoomIn = () => {
//     setScale(prev => Math.min(prev + 0.2, 2.0));
//   };

//   const zoomOut = () => {
//     setScale(prev => Math.max(prev - 0.2, 0.5));
//   };

//   const toggleFullScreen = async () => {
//     if (!document.fullscreenElement) {
//       try {
//         await containerRef.current.requestFullscreen();
//         setIsFullScreen(true);
//       } catch (err) {
//         console.log(`Error attempting to enable full-screen mode: ${err.message}`);
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//         setIsFullScreen(false);
//       }
//     }
//   };

//   const handlePageInput = (e) => {
//     const newPage = parseInt(e.target.value);
//     if (newPage >= 1 && newPage <= numPages) {
//       goToPage(newPage);
//     }
//   };

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === 'ArrowLeft') {
//         goToPreviousPage();
//       } else if (e.key === 'ArrowRight') {
//         goToNextPage();
//       } else if (e.key === '+') {
//         zoomIn();
//       } else if (e.key === '-') {
//         zoomOut();
//       } else if (e.key === 'f') {
//         toggleFullScreen();
//       }
//     };

//     document.addEventListener('keydown', handleKeyPress);
//     return () => document.removeEventListener('keydown', handleKeyPress);
//   }, [goToPreviousPage, goToNextPage]);

//   const downloadPage = async () => {
//     if (flipBookRef.current) {
//       try {
//         const dataUrl = await toPng(flipBookRef.current);
//         const link = document.createElement('a');
//         link.download = `page-${currentPage + 1}.png`;
//         link.href = dataUrl;
//         link.click();
//       } catch (error) {
//         console.error('Error downloading page:', error);
//       }
//     }
//   };

//   // Page component for the flip book
//   const PageComponent = ({ number, imageUrl }) => (
//     <div className="pdf-book-reader__flip-page">
//       <div className="pdf-book-reader__flip-page-content">
//         <img 
//           src={imageUrl} 
//           alt={`Page ${number}`}
//           className="pdf-book-reader__flip-page-image"
//         />
//         <div className="pdf-book-reader__flip-page-number">
//           {number}
//         </div>
//       </div>
//     </div>
//   );

//   // Cover pages
//   const CoverPage = ({ children, isBack = false }) => (
//     <div className={`pdf-book-reader__flip-page pdf-book-reader__flip-page--cover ${isBack ? 'pdf-book-reader__flip-page--back' : ''}`}>
//       <div className="pdf-book-reader__flip-page-content">
//         <div className="pdf-book-reader__cover-content">
//           {children}
//         </div>
//       </div>
//     </div>
//   );

//   if (loading || generatingImages) {
//     return (
//       <motion.div 
//         className="pdf-book-reader__loading"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         >
//           <Loader2 size={48} className="pdf-book-reader__spinner-icon" />
//         </motion.div>
//         <motion.p
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           {generatingImages ? 'Preparing book pages...' : 'Loading your book...'}
//         </motion.p>
//         {generatingImages && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="pdf-book-reader__loading-subtext"
//           >
//             This may take a moment for larger books
//           </motion.p>
//         )}
//       </motion.div>
//     );
//   }

//   if (error) {
//     return (
//       <motion.div 
//         className="pdf-book-reader__error"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//       >
//         <h3>Error Loading Book</h3>
//         <p>{error}</p>
//         <motion.button 
//           className="pdf-book-reader__retry-btn"
//           onClick={() => window.location.reload()}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Retry
//         </motion.button>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div 
//       ref={containerRef}
//       className={`pdf-book-reader ${isFullScreen ? 'pdf-book-reader--fullscreen' : ''}`}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Header with book info and controls */}
//       <motion.div 
//         className="pdf-book-reader__header"
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="pdf-book-reader__book-info">
//           <h2 className="pdf-book-reader__book-title">
//             {bookInfo?.title || 'PDF Book Reader'}
//           </h2>
//           <p className="pdf-book-reader__book-author">
//             {bookInfo?.author || 'Unknown Author'}
//           </p>
//         </div>
        
//         <div className="pdf-book-reader__controls">
//           <motion.button
//             className="pdf-book-reader__control-btn"
//             onClick={zoomOut}
//             title="Zoom Out"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <ZoomOut size={20} />
//           </motion.button>
          
//           <motion.span 
//             className="pdf-book-reader__scale-display"
//             key={scale}
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//           >
//             {Math.round(scale * 100)}%
//           </motion.span>
          
//           <motion.button
//             className="pdf-book-reader__control-btn"
//             onClick={zoomIn}
//             title="Zoom In"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <ZoomIn size={20} />
//           </motion.button>

//           <motion.button
//             className="pdf-book-reader__control-btn"
//             onClick={downloadPage}
//             title="Download Current Page"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <Download size={20} />
//           </motion.button>
          
//           <motion.button
//             className="pdf-book-reader__control-btn"
//             onClick={toggleFullScreen}
//             title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Main PDF viewer with Flip Book */}
//       <div className="pdf-book-reader__viewer-container">
//         <motion.div 
//           className="pdf-book-reader__navigation"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <motion.button
//             className="pdf-book-reader__nav-btn"
//             onClick={goToPreviousPage}
//             disabled={currentPage <= 0}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <ChevronLeft size={20} />
//             Previous
//           </motion.button>

//           <div className="pdf-book-reader__page-info">
//             <input
//               type="number"
//               value={currentPage + 1}
//               onChange={handlePageInput}
//               className="pdf-book-reader__page-input"
//               min="1"
//               max={numPages}
//             />
//             <span className="pdf-book-reader__page-count">
//               of {numPages || '--'}
//             </span>
//           </div>

//           <motion.button
//             className="pdf-book-reader__nav-btn"
//             onClick={goToNextPage}
//             disabled={currentPage >= numPages - 1}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Next
//             <ChevronRight size={20} />
//           </motion.button>
//         </motion.div>

//         <div className="pdf-book-reader__flip-book-container">
//           {pageImages.length > 0 && (
//             <HTMLFlipBook
//               ref={flipBookRef}
//               width={550}
//               height={733}
//               size="stretch"
//               minWidth={315}
//               maxWidth={1000}
//               minHeight={400}
//               maxHeight={1533}
//               maxShadowOpacity={0.5}
//               showCover={true}
//               mobileScrollSupport={true}
//               onFlip={handlePageChange}
//               onChangeOrientation={flipBookRef.current?.pageFlip?.onChangeOrientation}
//               onChangeState={flipBookRef.current?.pageFlip?.onChangeState}
//               className="pdf-book-reader__flip-book"
//               style={{}}
//               startPage={0}
//               drawShadow={true}
//               flippingTime={1000}
//               usePortrait={true}
//               startZIndex={0}
//               autoSize={true}
//               clickEventForward={true}
//               useMouseEvents={true}
//               swipeDistance={30}
//               showPageCorners={true}
//               disableFlipByClick={false}
//             >
//               {/* Front Cover */}
//               <CoverPage>
//                 <div className="pdf-book-reader__cover-front">
//                   <h1>{bookInfo?.title || 'PDF Book'}</h1>
//                   <p>by {bookInfo?.author || 'Unknown Author'}</p>
//                   <div className="pdf-book-reader__cover-decoration"></div>
//                 </div>
//               </CoverPage>

//               {/* Book Pages */}
//               {pageImages.map((imageUrl, index) => (
//                 <PageComponent
//                   key={index}
//                   number={index + 1}
//                   imageUrl={imageUrl}
//                 />
//               ))}

//               {/* Back Cover */}
//               <CoverPage isBack={true}>
//                 <div className="pdf-book-reader__cover-back">
//                   <h3>The End</h3>
//                   <p>Thank you for reading</p>
//                   <div className="pdf-book-reader__cover-decoration"></div>
//                 </div>
//               </CoverPage>
//             </HTMLFlipBook>
//           )}
//         </div>
//       </div>

//       {/* Footer controls */}
//       <motion.div 
//         className="pdf-book-reader__footer"
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//       >
//         <div className="pdf-book-reader__view-controls">
//           <motion.button
//             className={`pdf-book-reader__view-btn ${!isTwoPageView ? 'pdf-book-reader__view-btn--active' : ''}`}
//             onClick={() => setIsTwoPageView(false)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Book size={16} />
//             Single Page
//           </motion.button>
//           <motion.button
//             className={`pdf-book-reader__view-btn ${isTwoPageView ? 'pdf-book-reader__view-btn--active' : ''}`}
//             onClick={() => setIsTwoPageView(true)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <BookOpen size={16} />
//             Two Page
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Quick Navigation Dots */}
//       {numPages && numPages > 1 && (
//         <motion.div 
//           className="pdf-book-reader__page-dots"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           {Array.from({ length: Math.min(10, numPages) }, (_, i) => (
//             <motion.button
//               key={i}
//               className={`pdf-book-reader__page-dot ${currentPage === i ? 'pdf-book-reader__page-dot--active' : ''}`}
//               onClick={() => goToPage(i + 1)}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {i + 1}
//             </motion.button>
//           ))}
//         </motion.div>
//       )}

//       {/* Reading Instructions */}
//       <motion.div 
//         className="pdf-book-reader__instructions"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//       >
//         <p>📖 Click and drag pages to turn them • Use arrow keys for navigation</p>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default PdfBookReader;
