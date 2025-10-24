// import React, { useState, useEffect } from "react";
// import "../../../CSSFiles/EbookViewerPage.css";
// import { FaChevronLeft } from "react-icons/fa";
// import { FaChevronRight } from "react-icons/fa";
// import { RiRobot2Fill } from "react-icons/ri";
// import { PiPaperPlaneRightBold } from "react-icons/pi";
// const EbookViewerPage = () => {
//   const totalPages = 245;
//   const [page, setPage] = useState(1);
//   const [chatMessages, setChatMessages] = useState([]);

//   useEffect(() => {
//     const savedPage = localStorage.getItem("ebookLastPage");
//     if (savedPage) setPage(parseInt(savedPage, 10));
//   }, []);

//   const handlePrev = () => setPage(p => Math.max(p - 1, 1));
//   const handleNext = () => setPage(p => Math.min(p + 1, totalPages));

//   // Save page progress when page changes
//   useEffect(() => {
//     localStorage.setItem("ebookLastPage", page);
//   }, [page]);

//   const handleSendMessage = (msg) => {
//     if (!msg.trim()) return;
//     setChatMessages(prev => [...prev, { from: "user", text: msg }]);
//     // Simulate AI reply
//     setTimeout(() => {
//       setChatMessages(prev => [
//         ...prev,
//         { from: "bot", text: `That's a great question about page ${page}! Let me explain...` },
//       ]);
//     }, 800);
//   };

//   return (
//     <div className="ebook-viewer-page">
//       <div className="pdf-viewer">
//         <div className="viewer-toolbar">
//           <button onClick={handlePrev}><i className="fas fa-chevron-left"><FaChevronLeft /></i></button>
//           <span>Page {page} / {totalPages}</span>
//           <button onClick={handleNext}><i className="fas fa-chevron-right"><FaChevronRight /></i></button>
//         </div>

//         <div className="pdf-placeholder">
//           <i className="fas fa-file-pdf"></i>
//           <h3>eBook Viewer (Page {page})</h3>
//           <p>This is where your actual PDF viewer (e.g., react-pdf) will render.</p>
//         </div>
//       </div>

//       <div className="chat-sidebar">
//         <h3><i className="fas fa-robot"><RiRobot2Fill /></i> Study Assistant</h3>
//         <div className="chat-window">
//           {chatMessages.map((msg, i) => (
//             <div key={i} className={`chat-message ${msg.from}`}>
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <ChatInput onSend={handleSendMessage} />
//       </div>
//     </div>
//   );
// };

// const ChatInput = ({ onSend }) => {
//   const [message, setMessage] = useState("");
//   return (
//     <div className="chat-input">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Ask about this eBook..."
//       />
//       <button onClick={() => { onSend(message); setMessage(""); }}>
//         <i className="fas fa-paper-plane"><PiPaperPlaneRightBold /></i>
//       </button>
//     </div>
//   );
// };

// export default EbookViewerPage;







// for local public folder public/ebooks/sample.pdf access 

// import React, { useState, useEffect, useRef } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
// import { RiRobot2Fill } from "react-icons/ri";
// import { PiPaperPlaneRightBold } from "react-icons/pi";
// import "../../../CSSFiles/EbookViewerPage.css";
// import pdffile from '../../../assets/User_Manual.pdf'

// // Set worker source for react-pdf
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const EbookViewerPage = () => {
//   const pdfRef = useRef();
//   const totalPages = 245;
//   const [page, setPage] = useState(1);
//   const [numPages, setNumPages] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);

//   // Load last saved page from localStorage
//   useEffect(() => {
//     const savedPage = localStorage.getItem("ebookLastPage");
//     if (savedPage) setPage(parseInt(savedPage, 10));
//   }, []);

//   const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
//   const handleNext = () => setPage((p) => Math.min(p + 1, numPages || totalPages));

//   // Save page progress
//   useEffect(() => {
//     localStorage.setItem("ebookLastPage", page);
//   }, [page]);

//   const handleSendMessage = (msg) => {
//     if (!msg.trim()) return;
//     setChatMessages((prev) => [...prev, { from: "user", text: msg }]);
//     setTimeout(() => {
//       setChatMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `Good question about page ${page}! Let me explain...` },
//       ]);
//     }, 800);
//   };

//   const handleDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   // Fullscreen toggle
//   const handleFullScreen = () => {
//     const elem = pdfRef.current;
//     if (!document.fullscreenElement) {
//       elem.requestFullscreen().catch((err) => console.log(err));
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   return (
//     <div className="ebook-viewer-page">
//       <div className="pdf-viewer" ref={pdfRef}>
//         <div className="viewer-toolbar">
//           <button onClick={handlePrev} disabled={page === 1}>
//             <FaChevronLeft />
//           </button>
//           <span>
//             Page {page} / {numPages || totalPages}
//           </span>
//           <button onClick={handleNext} disabled={page === (numPages || totalPages)}>
//             <FaChevronRight />
//           </button>
//           <button onClick={handleFullScreen} title="Fullscreen">
//             <FaExpand />
//           </button>
//         </div>

//         <div className="pdf-container">
//           <Document
//             file={pdffile} // path to your PDF file (public folder)
//             onLoadSuccess={handleDocumentLoadSuccess}
//             options={{
//               cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
//               cMapPacked: true,
//               disableStream: true,
//               disableAutoFetch: true,
//             }}
//           >
//             <Page
//               pageNumber={page}
//               renderAnnotationLayer={false}
//               renderTextLayer={false}
//             />
//           </Document>
//         </div>
//       </div>

//       <div className="chat-sidebar">
//         <h3>
//           <RiRobot2Fill /> Study Assistant
//         </h3>
//         <div className="chat-window">
//           {chatMessages.map((msg, i) => (
//             <div key={i} className={`chat-message ${msg.from}`}>
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <ChatInput onSend={handleSendMessage} />
//       </div>
//     </div>
//   );
// };

// const ChatInput = ({ onSend }) => {
//   const [message, setMessage] = useState("");
//   return (
//     <div className="chat-input">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Ask about this eBook..."
//       />
//       <button
//         onClick={() => {
//           onSend(message);
//           setMessage("");
//         }}
//       >
//         <PiPaperPlaneRightBold />
//       </button>
//     </div>
//   );
// };

// export default EbookViewerPage;










import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FaChevronLeft, FaChevronRight, FaExpand, FaBookOpen, FaFile } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { PiPaperPlaneRightBold } from "react-icons/pi";
import "../../../CSSFiles/EbookViewerPage.css";
import pdffile from "../../../assets/User_Manual.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const EbookViewerPage = () => {
  const pdfRef = useRef(null);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [viewMode, setViewMode] = useState("single"); // "single" | "double"
  const [chatMessages, setChatMessages] = useState([]);

  // Load saved page from localStorage
  useEffect(() => {
    const savedPage = localStorage.getItem("ebookLastPage");
    if (savedPage) setPage(parseInt(savedPage, 10));
  }, []);

  // Save page progress
  useEffect(() => {
    localStorage.setItem("ebookLastPage", page);
  }, [page]);

  const handlePrev = () => {
    if (viewMode === "double") setPage((p) => Math.max(p - 2, 1));
    else setPage((p) => Math.max(p - 1, 1));
  };

  const handleNext = () => {
    if (viewMode === "double") setPage((p) => Math.min(p + 2, numPages));
    else setPage((p) => Math.min(p + 1, numPages));
  };

  const handleDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const handleSendMessage = (msg) => {
    if (!msg.trim()) return;
    setChatMessages((prev) => [...prev, { from: "user", text: msg }]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { from: "bot", text: `Interesting question about page ${page}. Let me explain...` },
      ]);
    }, 700);
  };

  // Fullscreen toggle
  const handleFullScreen = () => {
    const elem = pdfRef.current;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="ebook-viewer-page">
      <div className="pdf-viewer" ref={pdfRef}>
        {/* ===== Toolbar ===== */}
        <div className="viewer-toolbar">
          <div className="toolbar-left">
            <button onClick={handlePrev} disabled={page <= 1}>
              <FaChevronLeft />
            </button>
            <span>
              Page {page}
              {viewMode === "double" && page + 1 <= numPages ? ` - ${page + 1}` : ""} /{" "}
              {numPages || "?"}
            </span>
            <button onClick={handleNext} disabled={page >= numPages}>
              <FaChevronRight />
            </button>
          </div>

          <div className="toolbar-right">
            <button
              className={viewMode === "single" ? "active" : ""}
              onClick={() => setViewMode("single")}
              title="Single Page View"
            >
              <FaFile />
            </button>
            <button
              className={viewMode === "double" ? "active" : ""}
              onClick={() => setViewMode("double")}
              title="Two Page View"
            >
              <FaBookOpen />
            </button>
            <button onClick={handleFullScreen} title="Fullscreen">
              <FaExpand />
            </button>
          </div>
        </div>

        {/* ===== PDF Viewer ===== */}
        {/* <div className={`pdf-container ${viewMode}`}>
          <Document
            file={pdffile}
            onLoadSuccess={handleDocumentLoadSuccess}
            options={{
              cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
              cMapPacked: true,
            }}
          >
            {viewMode === "single" && (
              <Page
                pageNumber={page}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                className="pdf-page"
              />
            )}

            {viewMode === "double" && (
              <div className="two-page-view">
                <Page
                  pageNumber={page}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="pdf-page"
                />
                {page + 1 <= numPages && (
                  <Page
                    pageNumber={page + 1}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    className="pdf-page"
                  />
                )}
              </div>
            )}
          </Document>
        </div> */}

        <div className={`pdf-container ${viewMode}`}>
  <Document
    file={pdffile}
    onLoadSuccess={handleDocumentLoadSuccess}
    options={{
      cMapUrl: `//unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
    }}
  >
    {viewMode === "single" && (
      <Page
        pageNumber={page}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        className="pdf-page"
      />
    )}
    {viewMode === "double" && (
      <div className="two-page-view">
        <Page
          pageNumber={page}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          className="pdf-page"
        />
        {page + 1 <= numPages && (
          <Page
            pageNumber={page + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className="pdf-page"
          />
        )}
      </div>
    )}
  </Document>
</div>

      </div>

      {/* ===== Chat Sidebar ===== */}
      <div className="chat-sidebar">
        <h3>
          <RiRobot2Fill /> Study Assistant
        </h3>
        <div className="chat-window">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.from}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
};

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about this eBook..."
      />
      <button
        onClick={() => {
          onSend(message);
          setMessage("");
        }}
      >
        <PiPaperPlaneRightBold />
      </button>
    </div>
  );
};

export default EbookViewerPage;









// import React, { useState, useEffect, useRef } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";
// import { RiRobot2Fill } from "react-icons/ri";
// import { PiPaperPlaneRightBold } from "react-icons/pi";
// import "../../../CSSFiles/EbookViewerPage.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// const EbookViewerPage = () => {
//   const pdfRef = useRef(null);
//   const [page, setPage] = useState(1);
//   const [numPages, setNumPages] = useState(null);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [pdfUrl, setPdfUrl] = useState(null); // ✅ dynamic PDF link from database
//   const [loading, setLoading] = useState(true);

//   // Fetch PDF URL from backend (simulate database)
//   useEffect(() => {
//     const fetchPdf = async () => {
//       try {
//         // example: fetch from your backend endpoint
//         // const res = await fetch("https://your-backend.com/api/ebooks/123");
//         // const data = await res.json();
//         // setPdfUrl(data.pdfUrl); // store dynamic PDF URL
//         setPdfUrl("file:///C:/Users/aj478/Downloads/68f9507e41faa-web-2-0-the-latest-internet-wave-learn-the-latest-technology-to-leverage-your-business-.pdf");
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch PDF:", err);
//         setLoading(false);
//       }
//     };

//     fetchPdf();

//     // restore saved page
//     const savedPage = localStorage.getItem("ebookLastPage");
//     if (savedPage) setPage(parseInt(savedPage, 10));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("ebookLastPage", page);
//   }, [page]);

//   const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
//   const handleNext = () => setPage((p) => Math.min(p + 1, numPages || 1));
//   const handleFullScreen = () => {
//     const elem = pdfRef.current;
//     if (!document.fullscreenElement) elem.requestFullscreen();
//     else document.exitFullscreen();
//   };

//   const handleDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

//   const handleSendMessage = (msg) => {
//     if (!msg.trim()) return;
//     setChatMessages((prev) => [...prev, { from: "user", text: msg }]);
//     setTimeout(() => {
//       setChatMessages((prev) => [
//         ...prev,
//         { from: "bot", text: `Good question about page ${page}! Let me explain...` },
//       ]);
//     }, 800);
//   };

//   if (loading) return <div className="loading">Loading eBook...</div>;
//   if (!pdfUrl) return <div className="error">No eBook found.</div>;

//   return (
//     <div className="ebook-viewer-page">
//       <div className="pdf-viewer" ref={pdfRef}>
//         <div className="viewer-toolbar">
//           <button onClick={handlePrev} disabled={page === 1}>
//             <FaChevronLeft />
//           </button>
//           <span>
//             Page {page} / {numPages || "?"}
//           </span>
//           <button onClick={handleNext} disabled={page === numPages}>
//             <FaChevronRight />
//           </button>
//           <button onClick={handleFullScreen}>
//             <FaExpand />
//           </button>
//         </div>

//         <div className="pdf-container">
//           <Document
//             file={{ url: pdfUrl }}  // ✅ dynamic file link here
//             onLoadSuccess={handleDocumentLoadSuccess}
//             options={{
//               disableStream: true,
//               disableAutoFetch: true,
//             }}
//           >
//             <Page
//               pageNumber={page}
//               renderAnnotationLayer={false}
//               renderTextLayer={false}
//             />
//           </Document>
//         </div>
//       </div>

//       <div className="chat-sidebar">
//         <h3>
//           <RiRobot2Fill /> Study Assistant
//         </h3>
//         <div className="chat-window">
//           {chatMessages.map((msg, i) => (
//             <div key={i} className={`chat-message ${msg.from}`}>
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <ChatInput onSend={handleSendMessage} />
//       </div>
//     </div>
//   );
// };

// const ChatInput = ({ onSend }) => {
//   const [message, setMessage] = useState("");
//   return (
//     <div className="chat-input">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Ask about this eBook..."
//       />
//       <button
//         onClick={() => {
//           onSend(message);
//           setMessage("");
//         }}
//       >
//         <PiPaperPlaneRightBold />
//       </button>
//     </div>
//   );
// };

// export default EbookViewerPage;
