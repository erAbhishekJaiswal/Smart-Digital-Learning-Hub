import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FaChevronLeft, FaChevronRight, FaExpand, FaBookOpen, FaFile } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { PiPaperPlaneRightBold } from "react-icons/pi";
// import "../../../CSSFiles/EbookViewerPage.css";
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

