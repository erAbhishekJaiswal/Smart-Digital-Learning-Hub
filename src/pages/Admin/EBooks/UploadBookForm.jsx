// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../../CSSFiles/Admin/UploadBookForm.css';

// const UploadBookForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     techStack: '',
//     techStacksubcategory: '',
//     level: '',
//     description: '',
//     language: 'English',
//     tags: ''
//   });

//   const [files, setFiles] = useState({
//     pdf: null,
//     cover: null
//   });

//   const [preview, setPreview] = useState({
//     cover: null
//   });

//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   useEffect(() => {
//     const fatchtechstacks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/v1/techstack/');
//         console.log('Fetched tech stacks:', response.data);
//         setFormData(prev => ({
//           ...prev,
//           techStacks: response.data.techStacks || []
//         }));
//       } catch (error) {
//         console.error('Error fetching tech stacks:', error);
//       }
//     };
//     fatchtechstacks();

//   }, []);

//   // Handle file uploads
//   const handleFileChange = (e) => {
//     const { name, files: fileList } = e.target;

//     if (fileList && fileList[0]) {
//       const file = fileList[0];

//       if (name === 'pdf' && file.type !== 'application/pdf') {
//         setMessage({ type: 'error', text: 'Please upload a valid PDF file' });
//         return;
//       }

//       if (name === 'cover') {
//         const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//         if (!imageTypes.includes(file.type)) {
//           setMessage({ type: 'error', text: 'Please upload a valid image (JPEG, PNG, WebP)' });
//           return;
//         }

//         // Create preview for cover image
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setPreview({ cover: e.target.result });
//         };
//         reader.readAsDataURL(file);
//       }

//       setFiles(prev => ({
//         ...prev,
//         [name]: file
//       }));

//       setMessage({ type: '', text: '' });
//     }
//   };

//   // Handle tag input
//   const handleTagsChange = (e) => {
//     const value = e.target.value;
//     setFormData(prev => ({
//       ...prev,
//       tags: value
//     }));
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!files.pdf) {
//       setMessage({ type: 'error', text: 'Please select a PDF file to upload' });
//       return;
//     }

//     setLoading(true);
//     setProgress(0);

//     try {
//       const submitData = new FormData();

//       // Append form data
//       Object.keys(formData).forEach(key => {
//         if (key === 'tags' && formData[key]) {
//           // Convert tags string to array
//           const tagsArray = formData[key].split(',').map(tag => tag.trim()).filter(tag => tag);
//           tagsArray.forEach(tag => submitData.append('tags', tag));
//         } else if (formData[key]) {
//           submitData.append(key, formData[key]);
//         }
//       });

//       // Append files
//       submitData.append('pdf', files.pdf);
//       if (files.cover) {
//         submitData.append('cover', files.cover);
//       }

//       const response = await axios.post('http://localhost:5000/api/v1/ebooks/uploadpdf', submitData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setProgress(percentCompleted);
//         },
//       });

//       if (response.data.success) {
//         setMessage({ type: 'success', text: 'Book uploaded successfully!' });
//         // Reset form
//         setFormData({
//           title: '',
//           author: '',
//           techStack: '',
//           techStacksubcategory: '',
//           level: '',
//           description: '',
//           language: 'English',
//           tags: ''
//         });
//         setFiles({ pdf: null, cover: null });
//         setPreview({ cover: null });
//         setProgress(0);
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       setMessage({
//         type: 'error',
//         text: error.response?.data?.message || 'Failed to upload book. Please try again.'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Clear message
//   const clearMessage = () => {
//     setMessage({ type: '', text: '' });
//   };

//   return (
//     <div className="book-upload-container-wrapper">
//       <div className="book-upload-glass-container">
//         <div className="book-upload-header-section">
//           <div className="book-upload-header-icon">📚</div>
//           <h1 className="book-upload-main-title">Upload New Book</h1>
//           <p className="book-upload-subtitle">Share your knowledge with the community</p>
//         </div>

//         <form onSubmit={handleSubmit} className="book-upload-form-container">
//           {/* Progress Bar */}
//           {loading && (
//             <div className="book-upload-progress-section">
//               <div className="book-upload-progress-bar">
//                 <div
//                   className="book-upload-progress-fill"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//               <span className="book-upload-progress-text">{progress}%</span>
//             </div>
//           )}

//           {/* Message Alert */}
//           {message.text && (
//             <div className={`book-upload-message-alert ${message.type}`}>
//               <span>{message.text}</span>
//               <button
//                 type="button"
//                 className="book-upload-alert-close"
//                 onClick={clearMessage}
//               >
//                 ×
//               </button>
//             </div>
//           )}

//           <div className="book-upload-form-grid">
//             {/* Left Column - Basic Info */}
//             <div className="book-upload-form-column">
//               <div className="book-upload-input-group">
//                 <label className="book-upload-input-label">
//                   Book Title *
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   className="book-upload-text-input"
//                   placeholder="Enter book title"
//                   required
//                 />
//               </div>

//               <div className="book-upload-input-group">
//                 <label className="book-upload-input-label">
//                   Author *
//                 </label>
//                 <input
//                   type="text"
//                   name="author"
//                   value={formData.author}
//                   onChange={handleInputChange}
//                   className="book-upload-text-input"
//                   placeholder="Enter author name"
//                   required
//                 />
//               </div>

//               <div className="book-upload-input-group">
//                 <label className="book-upload-input-label">
//                   Technology Stack
//                 </label>
//                 <select
//                   name="techStack"
//                   value={formData.techStack}
//                   onChange={handleInputChange}
//                   className="book-upload-select-input"
//                 >
//                   <option value="">Select Technology</option>
//                     {formData?.techStack && formData.techStack.map((tech) => (
//                       <option key={tech._id} value={tech._id}>{tech.name}</option>
//                     ))}
//                 </select>
//               </div>

//               <div className="book-upload-input-group">
//                 <label className="book-upload-input-label">
//                   Subcategory
//                 </label>
//                 <select
//                   name="techStacksubcategory"
//                   value={formData.techStacksubcategory}
//                   onChange={handleInputChange}
//                   className="book-upload-select-input"
//                 >
//                   <option value="">Select Subcategory</option>
//                   {formData.techStack && formData.techStack
//                     .find(tech => tech._id === formData.techStack)?.subcategories.map((subcat) => (
//                       <option key={subcat} value={subcat}>{subcat}</option>
//                     ))}
//                 </select>

//                 {/* <input
//                   type="text"
//                   name="techStacksubcategory"
//                   value={formData.techStacksubcategory}
//                   onChange={handleInputChange}
//                   className="book-upload-text-input"
//                   placeholder="e.g., React, Node.js, Python"
//                 /> */}
//               </div>
//             </div>

//             {/* Right Column - Additional Info */}
//             <div className="book-upload-form-column">
//               <div className="book-upload-input-group">
//                 <label className="book-upload-input-label">
//                   Difficulty Level
//                 </label>
//                 <select
//                   name="level"
//                   value={formData.level}
//                   onChange={handleInputChange}
//                   className="book-upload-select-input"
//                 >
//                   <option value="">Select Level</option>
//                   <option value="beginner">Beginner</option>
//                   <option value="intermediate">Intermediate</option>
//                   <option value="advanced">Advanced</option>
//                 </select>
//               </div>

//               <div className="book-upload-input-group">
//                 <label className="book-upload-input-label">
//                   Language
//                 </label>
//                 <select
//                   name="language"
//                   value={formData.language}
//                   onChange={handleInputChange}
//                   className="book-upload-select-input"
//                 >
//                   <option value="English">English</option>
//                   <option value="Spanish">Spanish</option>
//                   <option value="French">French</option>
//                   <option value="German">German</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div className="book-upload-input-group">
//                 <label className="book-upload-input-label">
//                   Tags
//                 </label>
//                 <input
//                   type="text"
//                   name="tags"
//                   value={formData.tags}
//                   onChange={handleTagsChange}
//                   className="book-upload-text-input"
//                   placeholder="Separate tags with commas (e.g., javascript, react, web)"
//                 />
//                 <div className="book-upload-tags-hint">
//                   Add relevant tags to help others discover your book
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="book-upload-input-group">
//             <label className="book-upload-input-label">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="book-upload-textarea-input"
//               placeholder="Describe the book content, target audience, and key topics..."
//               rows="4"
//               maxLength="2000"
//             />
//             <div className="book-upload-char-count">
//               {formData.description.length}/2000 characters
//             </div>
//           </div>

// {/* File Uploads */}
// <div className="book-upload-files-section">
//   <div className="book-upload-file-grid">
//     {/* PDF Upload */}
//     <div className="book-upload-file-card">
//       <div className="book-upload-file-icon">📄</div>
//       <h3 className="book-upload-file-title">PDF File *</h3>
//       <p className="book-upload-file-description">
//         Upload the main PDF file of your book
//       </p>

//       {/* Fixed PDF Upload */}
//       <div className="book-upload-file-input-container">
//         <input
//           type="file"
//           name="pdf"
//           onChange={handleFileChange}
//           accept=".pdf"
//           className="book-upload-file-input-hidden"
//           id="pdf-upload"
//           required
//         />
//         <label htmlFor="pdf-upload" className="book-upload-file-button">
//           {files.pdf ? 'Change PDF' : 'Choose PDF'}
//         </label>
//       </div>

//       {files.pdf && (
//         <div className="book-upload-file-info">
//           <span className="book-upload-file-name">{files.pdf.name}</span>
//           <span className="book-upload-file-size">
//             {(files.pdf.size / (1024 * 1024)).toFixed(2)} MB
//           </span>
//         </div>
//       )}
//     </div>

//     {/* Cover Upload */}
//     <div className="book-upload-file-card">
//       <div className="book-upload-file-icon">🖼️</div>
//       <h3 className="book-upload-file-title">Cover Image</h3>
//       <p className="book-upload-file-description">
//         Optional: Upload a cover image for your book
//       </p>

//       {/* Fixed Cover Upload */}
//       <div className="book-upload-file-input-container">
//         <input
//           type="file"
//           name="cover"
//           onChange={handleFileChange}
//           accept="image/*"
//           className="book-upload-file-input-hidden"
//           id="cover-upload"
//         />
//         <label htmlFor="cover-upload" className="book-upload-file-button">
//           {files.cover ? 'Change Image' : 'Choose Image'}
//         </label>
//       </div>

//       {/* Cover Preview */}
//       {preview.cover && (
//         <div className="book-upload-cover-preview">
//           <img
//             src={preview.cover}
//             alt="Cover preview"
//             className="book-upload-preview-image"
//           />
//         </div>
//       )}

//       {files.cover && !preview.cover && (
//         <div className="book-upload-file-info">
//           <span className="book-upload-file-name">{files.cover.name}</span>
//         </div>
//       )}
//     </div>
//   </div>
// </div>

//           {/* Submit Button */}
//           <div className="book-upload-submit-section">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`book-upload-submit-button ${loading ? 'loading' : ''}`}
//             >
//               {loading ? (
//                 <>
//                   <div className="book-upload-spinner"></div>
//                   Uploading...
//                 </>
//               ) : (
//                 <>
//                   <span className="book-upload-submit-icon">🚀</span>
//                   Upload Book
//                 </>
//               )}
//             </button>

//             <div className="book-upload-requirements">
//               <h4>Upload Requirements:</h4>
//               <ul>
//                 <li>• PDF file is required (max 100MB)</li>
//                 <li>• Cover image should be JPEG, PNG, or WebP (max 10MB)</li>
//                 <li>• Title and author fields are mandatory</li>
//                 <li>• Ensure you have rights to share the content</li>
//               </ul>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UploadBookForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../CSSFiles/Admin/UploadBookForm.css";

const UploadBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    techStack: "",
    techStacksubcategory: "",
    level: "",
    description: "",
    language: "English",
    tags: "",
  });

  const [techStacks, setTechStacks] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [files, setFiles] = useState({ pdf: null, cover: null });
  const [preview, setPreview] = useState({ cover: null });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ✅ Fetch tech stacks on mount
  useEffect(() => {
    const fetchTechStacks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/techstack/"
        );
        const stacks = response.data || [];
        setTechStacks(stacks);
        console.log("Fetched tech stacks:", stacks);
      } catch (error) {
        console.error("Error fetching tech stacks:", error);
      }
    };
    fetchTechStacks();
  }, []);

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update subcategories when tech stack changes
    if (name === "techStack") {
      const selectedStack = techStacks.find((stack) => stack._id === value);
      setSubcategories(selectedStack ? selectedStack.subcategories : []);
      setFormData((prev) => ({
        ...prev,
        techStack: value,
        techStacksubcategory: "", // reset subcategory when tech stack changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ Handle file uploads
  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      if (name === "pdf" && file.type !== "application/pdf") {
        setMessage({ type: "error", text: "Please upload a valid PDF file" });
        return;
      }
      if (name === "cover") {
        const imageTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        if (!imageTypes.includes(file.type)) {
          setMessage({
            type: "error",
            text: "Please upload a valid image (JPEG, PNG, WebP)",
          });
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => setPreview({ cover: e.target.result });
        reader.readAsDataURL(file);
      }
      setFiles((prev) => ({ ...prev, [name]: file }));
      setMessage({ type: "", text: "" });
    }
  };

  // ✅ Handle tags input
  const handleTagsChange = (e) => {
    setFormData((prev) => ({ ...prev, tags: e.target.value }));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.pdf) {
      setMessage({ type: "error", text: "Please select a PDF file to upload" });
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "tags" && formData[key]) {
          formData[key]
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
            .forEach((tag) => submitData.append("tags", tag));
        } else if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });
      submitData.append("pdf", files.pdf);
      if (files.cover) submitData.append("cover", files.cover);

      const response = await axios.post(
        "http://localhost:5000/api/v1/ebooks/uploadpdf",
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      if (response.data.success) {
        setMessage({ type: "success", text: "Book uploaded successfully!" });
        setFormData({
          title: "",
          author: "",
          techStack: "",
          techStacksubcategory: "",
          level: "",
          description: "",
          language: "English",
          tags: "",
        });
        setFiles({ pdf: null, cover: null });
        setPreview({ cover: null });
        setProgress(0);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to upload book. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearMessage = () => setMessage({ type: "", text: "" });

  return (
    <div className="book-upload-container-wrapper">
      <div className="book-upload-glass-container">
        <div className="book-upload-header-section">
          <div className="book-upload-header-icon">📚</div>
          <h1 className="book-upload-main-title">Upload New Book</h1>
          <p className="book-upload-subtitle">
            Share your knowledge with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="book-upload-form-container">
          {loading && (
            <div className="book-upload-progress-section">
              <div className="book-upload-progress-bar">
                <div
                  className="book-upload-progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="book-upload-progress-text">{progress}%</span>
            </div>
          )}

          {message.text && (
            <div className={`book-upload-message-alert ${message.type}`}>
              <span>{message.text}</span>
              <button
                type="button"
                className="book-upload-alert-close"
                onClick={clearMessage}
              >
                ×
              </button>
            </div>
          )}

          <div className="book-upload-form-grid">
            {/* Left Column */}
            <div className="book-upload-form-column">
              <div className="book-upload-input-group">
                <label>Book Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter book title"
                  className="book-upload-text-input"
                />
              </div>

              <div className="book-upload-input-group">
                <label>Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter author name"
                  className="book-upload-text-input"
                />
              </div>

              {/* ✅ Tech Stack Dropdown */}
              <div className="book-upload-input-group">
                <label>Technology Stack</label>
                <select
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleInputChange}
                  className="book-upload-select-input"
                >
                  <option value="">Select Technology</option>
                  {techStacks.map((tech) => (
                    <option key={tech._id} value={tech._id}>
                      {tech.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Subcategory Dropdown */}
              <div className="book-upload-input-group">
                <label>Subcategory</label>
                <select
                  name="techStacksubcategory"
                  value={formData.techStacksubcategory}
                  onChange={handleInputChange}
                  className="book-upload-select-input"
                  disabled={!subcategories.length}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="book-upload-form-column">
              <div className="book-upload-input-group">
                <label>Difficulty Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="book-upload-select-input"
                >
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="book-upload-input-group">
                <label>Language</label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="book-upload-select-input"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="book-upload-input-group">
                <label>Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleTagsChange}
                  placeholder="Separate tags with commas"
                  className="book-upload-text-input"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="book-upload-input-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="book-upload-textarea-input"
              placeholder="Describe the book..."
              rows="4"
              maxLength="2000"
            />
            <div className="book-upload-char-count">
              {formData.description.length}/2000
            </div>
          </div>

          {/* File Uploads */}
          {/* (Keep your existing PDF and cover upload section unchanged) */}

          {/* File Uploads */}
          <div className="book-upload-files-section">
            <div className="book-upload-file-grid">
              {/* PDF Upload */}
              <div className="book-upload-file-card">
                <div className="book-upload-file-icon">📄</div>
                <h3 className="book-upload-file-title">PDF File *</h3>
                <p className="book-upload-file-description">
                  Upload the main PDF file of your book
                </p>
                {/* Fixed PDF Upload */}
                <div className="book-upload-file-input-container">
                  <input
                    type="file"
                    name="pdf"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="book-upload-file-input-hidden"
                    id="pdf-upload"
                    required
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="book-upload-file-button"
                  >
                    {files.pdf ? "Change PDF" : "Choose PDF"}
                  </label>
                </div>

                {files.pdf && (
                  <div className="book-upload-file-info">
                    <span className="book-upload-file-name">
                      {files.pdf.name}
                    </span>
                    <span className="book-upload-file-size">
                      {(files.pdf.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                )}
              </div>

              {/* Cover Upload */}
              <div className="book-upload-file-card">
                <div className="book-upload-file-icon">🖼️</div>
                <h3 className="book-upload-file-title">Cover Image</h3>
                <p className="book-upload-file-description">
                  Optional: Upload a cover image for your book
                </p>

                {/* Fixed Cover Upload */}
                <div className="book-upload-file-input-container">
                  <input
                    type="file"
                    name="cover"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="book-upload-file-input-hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="book-upload-file-button"
                  >
                    {files.cover ? "Change Image" : "Choose Image"}
                  </label>
                </div>

                {/* Cover Preview */}
                {preview.cover && (
                  <div className="book-upload-cover-preview">
                    <img
                      src={preview.cover}
                      alt="Cover preview"
                      className="book-upload-preview-image"
                    />
                  </div>
                )}

                {files.cover && !preview.cover && (
                  <div className="book-upload-file-info">
                    <span className="book-upload-file-name">
                      {files.cover.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="book-upload-submit-section">
            <button
              type="submit"
              disabled={loading}
              className="book-upload-submit-button"
            >
              {loading ? "Uploading..." : "🚀 Upload Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBookForm;
