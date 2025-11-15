// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import HTMLFlipBook from "react-pageflip";
// import { motion } from "framer-motion";
// import {
//   ZoomIn,
//   ZoomOut,
//   Minimize,
//   Maximize,
//   ChevronLeft,
//   ChevronRight,
//   BookOpen,
//   Book,
//   Loader2,
// } from "lucide-react";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// import "./PdfBookReader.css";
// import { useParams } from "react-router-dom";
// const BasseUrl = import.meta.env.VITE_BASE_URL
// // ✅ PDF.js Worker Configuration
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// const PdfBookReader = () => {
//   const { publicId } = useParams();
//   const [bookInfo, setBookInfo] = useState(null);
//   const [pdfFile, setPdfFile] = useState(null);
//   const [numPages, setNumPages] = useState(0);
//   const [scale, setScale] = useState(1.0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isTwoPageView, setIsTwoPageView] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const flipBookRef = useRef(null);
//   const containerRef = useRef(null);

//   // ✅ Fetch book info & PDF URL
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const encodedPublicId = encodeURIComponent(publicId);
//         const res = await fetch(
//           `${BasseUrl}/ebooks/file/${encodedPublicId}`
//         );
//         const data = await res.json();
//         console.log(data);
        
//         if (!res.ok) throw new Error(data?.message || "Failed to fetch book");

//         setBookInfo(data.book);
//         setPdfFile(data.url);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (publicId) fetchBook();
//   }, [publicId]);

//   // ✅ Handle document load
//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   // ✅ Navigation
//   const goToPreviousPage = () => flipBookRef.current.pageFlip().flipPrev();
//   const goToNextPage = () => flipBookRef.current.pageFlip().flipNext();

//   // ✅ FlipBook event tracking
//   const handleFlip = useCallback((e) => {
//     setCurrentPage(e.data + 1);
//   }, []);

//   // ✅ Zoom controls
//   const zoomIn = () => setScale((s) => Math.min(s + 0.2, 2.0));
//   const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));

//   // ✅ Fullscreen toggle
//   const toggleFullScreen = async () => {
//     if (!document.fullscreenElement) {
//       await containerRef.current?.requestFullscreen();
//       setIsFullScreen(true);
//     } else {
//       await document.exitFullscreen();
//       setIsFullScreen(false);
//     }
//   };

//   // ✅ Page input navigation
//   const handlePageInput = (e) => {
//     const val = parseInt(e.target.value);
//     if (!isNaN(val) && val >= 1 && val <= numPages) {
//       flipBookRef.current.pageFlip().flip(val - 1);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="pdf-book-reader__loading">
//         <Loader2 className="pdf-book-reader__spinner-icon" size={48} />
//         <p>Loading your book...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="pdf-book-reader__error">
//         <h3>Error Loading Book</h3>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       ref={containerRef}
//       className={`pdf-book-reader ${
//         isFullScreen ? "pdf-book-reader--fullscreen" : ""
//       }`}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* HEADER */}
//       <div className="pdf-book-reader__header">
//         <div>
//           <h2>{bookInfo?.title || "PDF Book Reader"}</h2>
//           <p>{bookInfo?.author || "Unknown Author"}</p>
//         </div>

//         <div className="pdf-book-reader__controls">
//           {/* <button onClick={zoomOut}>
//             <ZoomOut />
//           </button>
//           <span>{Math.round(scale * 100)}%</span>
//           <button onClick={zoomIn}>
//             <ZoomIn />
//           </button> */}
//           <button className="pdf-fullscreen-button" onClick={toggleFullScreen}>
//             {isFullScreen ? <Minimize /> : <Maximize />}
//           </button>
//         </div>
//       </div>

//       {/* MAIN VIEW */}
//       <div className="pdf-book-reader__viewer-container">
//         <div className="pdf-book-reader__navigation">
//           {/* <button onClick={goToPreviousPage} disabled={currentPage <= 1}>
//             <ChevronLeft /> Previous
//           </button>
//           <div>
//             <input
//               type="number"
//               value={currentPage}
//               onChange={handlePageInput}
//               min="1"
//               max={numPages || 1}
//             />
//             <span>of {numPages || "--"}</span>
//           </div>
//           <button onClick={goToNextPage} disabled={currentPage >= numPages}>
//             Next <ChevronRight />
//           </button> */}
//         </div>

//         {/* ✅ Direct FlipBook Rendering */}
//         {pdfFile && (
//           <Document
//             file={pdfFile}
//             onLoadSuccess={onDocumentLoadSuccess}
//             onLoadError={(err) => console.error("Load Error:", err)}
//             loading={
//               <div className="pdf-book-reader__loading">
//                 <Loader2 className="pdf-book-reader__spinner-icon" size={48} />
//                 <p>Loading pages...</p>
//               </div>
//             }
//           >
//             <div className="pdf-book-reader__flip-book-container">
//           {numPages && (
//   <HTMLFlipBook width={550} height={733}>
//     {Array.from(new Array(numPages), (el, index) => (
//       <div className="pdf-flip-page" key={index}>
//         <Page
//           pageNumber={index + 1}
//           renderAnnotationLayer={false}
//           renderTextLayer={false}
//           width={550}
//           height={733}
//         />
//       </div>
//     ))}
//   </HTMLFlipBook>
// )}

//             </div>
//           </Document>
//         )}
//       </div>

//       {/* FOOTER */}
//       {/* <div className="pdf-book-reader__footer">
//         <button
//           className={!isTwoPageView ? "active" : ""}
//           onClick={() => setIsTwoPageView(false)}
//         >
//           <Book /> Single Page
//         </button>
//         <button
//           className={isTwoPageView ? "active" : ""}
//           onClick={() => setIsTwoPageView(true)}
//         >
//           <BookOpen /> Two Page
//         </button>
//       </div> */}
//     </motion.div>
//   );
// };

// export default PdfBookReader;














import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { motion, AnimatePresence } from "framer-motion";
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
  RotateCcw,
} from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./PdfBookReader.css";
import { useParams } from "react-router-dom";

const BasseUrl = import.meta.env.VITE_BASE_URL;

// ✅ PDF.js Worker Configuration with fallback
const setupPDFWorker = () => {
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  } catch (error) {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  }
};
setupPDFWorker();

const PdfBookReader = () => {
  const { publicId } = useParams();
  const [bookInfo, setBookInfo] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isTwoPageView, setIsTwoPageView] = useState(false); // Default to single page for mobile
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDimensions, setPageDimensions] = useState({ width: 550, height: 733 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const flipBookRef = useRef(null);
  const containerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  // ✅ Memoized PDF options to prevent unnecessary reloads
  const pdfOptions = useMemo(() => ({
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
  }), []);

  // ✅ Responsive page dimensions calculation
  const calculatePageDimensions = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const mobile = width < 768;
    const tablet = width >= 768 && width < 1024;
    
    setIsMobile(mobile);
    setIsTablet(tablet);

    if (mobile) {
      // Mobile: smaller dimensions with safe margins
      return {
        width: Math.min(width - 40, 400),
        height: Math.min(height * 0.6, 600)
      };
    } else if (tablet) {
      // Tablet: medium dimensions
      return {
        width: Math.min(width - 80, 500),
        height: Math.min(height * 0.7, 700)
      };
    } else {
      // Desktop: larger dimensions
      return {
        width: Math.min(width - 120, 600),
        height: Math.min(height * 0.75, 800)
      };
    }
  }, []);

  // ✅ Handle window resize with debouncing
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        setPageDimensions(calculatePageDimensions());
        
        // Auto-switch to single page view on mobile
        if (window.innerWidth < 768 && isTwoPageView) {
          setIsTwoPageView(false);
        }
      }, 150);
    };

    // Initial calculation
    setPageDimensions(calculatePageDimensions());
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [calculatePageDimensions, isTwoPageView]);

  // ✅ Fetch book info & PDF URL
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const encodedPublicId = encodeURIComponent(publicId);
        const res = await fetch(`${BasseUrl}/ebooks/file/${encodedPublicId}`);
        const data = await res.json();
        
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
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  // ✅ Navigation handlers
  const goToPreviousPage = useCallback(() => {
    if (flipBookRef.current?.pageFlip()) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  }, []);

  const goToNextPage = useCallback(() => {
    if (flipBookRef.current?.pageFlip()) {
      flipBookRef.current.pageFlip().flipNext();
    }
  }, []);

  // ✅ FlipBook event tracking
  const handleFlip = useCallback((e) => {
    setCurrentPage(e.data + 1);
  }, []);

  // ✅ Zoom controls
  const zoomIn = useCallback(() => {
    setScale(s => Math.min(s + 0.2, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(s => Math.max(s - 0.2, 0.3));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1.0);
  }, []);

  // ✅ Fullscreen toggle
  const toggleFullScreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setIsFullScreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullScreen(false);
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  }, []);

  // ✅ Page input navigation
  const handlePageInput = useCallback((e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= numPages && flipBookRef.current?.pageFlip()) {
      flipBookRef.current.pageFlip().flip(val - 1);
    }
  }, [numPages]);

  // ✅ View mode toggle with mobile consideration
  const toggleViewMode = useCallback(() => {
    if (isMobile) {
      // On mobile, always use single page view
      setIsTwoPageView(false);
      return;
    }
    setIsTwoPageView(prev => !prev);
  }, [isMobile]);

  // ✅ Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') goToPreviousPage();
      if (e.key === 'ArrowRight') goToNextPage();
      if (e.key === 'Escape' && isFullScreen) toggleFullScreen();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPreviousPage, goToNextPage, isFullScreen, toggleFullScreen]);

  // ✅ Render page with proper dimensions
  const renderPage = useCallback((pageNumber) => (
    <div key={pageNumber} className="pdf-flip-page">
      <Page
        pageNumber={pageNumber}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        width={pageDimensions.width}
        height={pageDimensions.height}
        loading={
          <div className="pdf-page-loading">
            <Loader2 size={24} className="spinner" />
            <span>Loading page {pageNumber}...</span>
          </div>
        }
        className="pdf-page-content"
      />
      <div className="pdf-page-footer">
        <span className="page-number">{pageNumber}</span>
      </div>
    </div>
  ), [pageDimensions]);

  // ✅ Generate pages array
  const pages = useMemo(() => {
    if (!numPages) return [];
    return Array.from({ length: numPages }, (_, i) => i + 1);
  }, [numPages]);

  if (loading) {
    return (
      <div className="pdf-book-reader__loading">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={48} className="spinner-icon" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading your book...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="pdf-book-reader__error"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h3>Error Loading Book</h3>
        <p>{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`pdf-book-reader ${isFullScreen ? 'pdf-book-reader--fullscreen' : ''} ${
        isMobile ? 'pdf-book-reader--mobile' : isTablet ? 'pdf-book-reader--tablet' : 'pdf-book-reader--desktop'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <motion.header 
        className="pdf-book-reader__header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="pdf-book-reader__book-info">
          <h2>{bookInfo?.title || "PDF Book Reader"}</h2>
          <p>{bookInfo?.author || "Unknown Author"}</p>
        </div>

        {/* <div className="pdf-book-reader__controls">
          {!isMobile && (
            <>
              <button 
                onClick={zoomOut} 
                disabled={scale <= 0.3}
                className="control-btn"
                title="Zoom Out"
              >
                <ZoomOut size={20} />
              </button>
              
              <div className="scale-display">
                {Math.round(scale * 100)}%
              </div>
              
              <button 
                onClick={zoomIn} 
                disabled={scale >= 3.0}
                className="control-btn"
                title="Zoom In"
              >
                <ZoomIn size={20} />
              </button>
              
              <button 
                onClick={resetZoom}
                className="control-btn"
                title="Reset Zoom"
              >
                <RotateCcw size={20} />
              </button>
            </>
          )}
          
          <button 
            onClick={toggleFullScreen} 
            className="control-btn fullscreen-btn"
            title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div> */}
      </motion.header>

      {/* MAIN VIEWER */}
      <main className="pdf-book-reader__viewer-container">
        {/* NAVIGATION */}
        <nav className="pdf-book-reader__navigation">
          <button 
            onClick={goToPreviousPage} 
            disabled={currentPage <= 1}
            className="nav-btn prev-btn"
          >
            <ChevronLeft size={20} />
            {!isMobile && "Previous"}
          </button>

          <div className="page-info">
            <input
              type="number"
              value={currentPage}
              onChange={handlePageInput}
              min="1"
              max={numPages || 1}
              className="page-input"
              aria-label="Current page"
            />
            <span className="page-count">of {numPages || "--"}</span>
          </div>

          <button 
            onClick={goToNextPage} 
            disabled={currentPage >= numPages}
            className="nav-btn next-btn"
          >
            {!isMobile && "Next"}
            <ChevronRight size={20} />
          </button>
        </nav>

        {/* FLIPBOOK VIEWER */}
        <AnimatePresence mode="wait">
          {pdfFile && (
            <motion.div
              key={`flipbook-${pageDimensions.width}-${pageDimensions.height}`}
              className="pdf-book-reader__flip-book-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(err) => console.error("PDF Load Error:", err)}
                options={pdfOptions}
                loading={
                  <div className="pdf-loading-placeholder">
                    <Loader2 size={32} className="spinner" />
                    <p>Preparing your reading experience...</p>
                  </div>
                }
              >
                {pages.length > 0 && (
                  <HTMLFlipBook
                    width={pageDimensions.width}
                    height={pageDimensions.height}
                    minWidth={300}
                    maxWidth={1200}
                    minHeight={400}
                    maxHeight={1600}
                    size="stretch"
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    usePortrait={!isTwoPageView}
                    flippingTime={600}
                    className="custom-flipbook"
                    ref={flipBookRef}
                    onFlip={handleFlip}
                    startPage={currentPage - 1}
                  >
                    {pages.map(renderPage)}
                  </HTMLFlipBook>
                )}
              </Document>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QUICK PAGE NAVIGATION */}
        {pages.length > 0 && !isMobile && (
          <div className="quick-navigation">
            <div className="page-dots">
              {pages.slice(0, 10).map((page) => (
                <button
                  key={page}
                  className={`page-dot ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageInput({ target: { value: page.toString() } })}
                  title={`Go to page ${page}`}
                >
                  {page}
                </button>
              ))}
              {pages.length > 10 && <span className="more-pages">...</span>}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER CONTROLS */}
      {/* <footer className="pdf-book-reader__footer">
        <div className="view-controls">
          <button
            className={`view-btn ${!isTwoPageView ? 'active' : ''}`}
            onClick={() => setIsTwoPageView(false)}
            disabled={isMobile}
            title={isMobile ? "Single page only on mobile" : "Single Page View"}
          >
            <Book size={18} />
            {!isMobile && "Single Page"}
          </button>
          <button
            className={`view-btn ${isTwoPageView ? 'active' : ''}`}
            onClick={() => setIsTwoPageView(true)}
            disabled={isMobile}
            title={isMobile ? "Two-page view not available on mobile" : "Two Page View"}
          >
            <BookOpen size={18} />
            {!isMobile && "Two Pages"}
          </button>
        </div>
      </footer> */}

      {/* MOBILE INSTRUCTIONS */}
      {isMobile && (
        <div className="mobile-instructions">
          <p>👆 Swipe or tap to turn pages</p>
        </div>
      )}
    </motion.div>
  );
};

export default PdfBookReader;