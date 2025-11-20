import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../CSSFiles/Admin/AddEditCourse.css";
import { toast } from "react-hot-toast";

const CreateUpdate = ({ course, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    level: "Beginner",
    thumbnail: "",
    contentLinks: [],
    liveCodeEnabled: true,
    test: "",
    techStack: "",
    techStackSubcategory: "",
    eBooks: [],
  });

  const [techStacks, setTechStacks] = useState([]);
  const [tests, setTests] = useState([]);
  const [books, setBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingEbooks, setUploadingEbooks] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [ebookFiles, setEbookFiles] = useState([]);

  // Fetch initial data
  useEffect(() => {
    fetchTechStacks();
    fetchTests();
    fetchBooks();

    if (course) {
      setFormData({
        title: course.title || "",
        category: course.category || "",
        description: course.description || "",
        level: course.level || "Beginner",
        thumbnail: course.thumbnail || "",
        contentLinks: course.contentLinks || [],
        liveCodeEnabled: course.liveCodeEnabled !== undefined ? course.liveCodeEnabled : true,
        test: course.test || "",
        techStack: course.techStack || "",
        techStackSubcategory: course.techStackSubcategory || "",
        eBooks: course.eBooks || [],
      });
    }
  }, [course]);

  const getCloudinarySignature = async (folder = "course_thumbnails") => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/cloudinary/signature?folder=${folder}`);
      console.log(res);
      return res.data;
      
    } catch (error) {
      console.error("Error getting Cloudinary signature:", error);
      throw error;
    }
  };

  // Upload images to Cloudinary
  const uploadImagesToCloudinary = async (imageFiles, signatureData) => {
    const { timestamp, signature, cloudName, apiKey } = signatureData;
    const uploadedImages = [];

    for (const image of imageFiles) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "course_thumbnails");

      try {
        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        uploadedImages.push({
          public_id: uploadRes.data.public_id,
          url: uploadRes.data.secure_url,
        });
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
      }
    }

    return uploadedImages;
  };

  const uploadEbooksToCloudinary = async (files, signatureData) => {
    const { timestamp, signature, cloudName, apiKey } = signatureData;
    const uploadedFiles = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "ebooks");

      try {
        // Use "auto" endpoint for automatic file type detection
        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          formData
        );

        uploadedFiles.push({
          public_id: uploadRes.data.public_id,
          url: uploadRes.data.secure_url,
          original_filename: uploadRes.data.original_filename,
        });
      } catch (error) {
        console.error("Error uploading ebook to Cloudinary:", error);
        throw error;
      }
    }

    return uploadedFiles;
  };

  const fetchTechStacks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/techstack/`);
      setTechStacks(response.data);
    } catch (error) {
      console.error("Error fetching tech stacks:", error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/tests`);
      setTests(response.data | []);
    } catch (error) {
      console.error("Error fetching tests:", error);
      setTests([]);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/books`);
      setBooks(response.data | []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTechStackChange = (e) => {
    const techStackId = e.target.value;
    const selectedTechStack = techStacks.find(ts => ts._id === techStackId);
    
    setFormData((prev) => ({
      ...prev,
      techStack: techStackId,
      techStackSubcategory: "",
      category: selectedTechStack?.name || "", // Auto-set category from tech stack name
    }));

    // Filter available books based on selected tech stack
    if (techStackId) {
      const filteredBooks = books.filter((book) => book.techStack === techStackId);
      setAvailableBooks(filteredBooks);
    } else {
      setAvailableBooks(books);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setThumbnailFile(file);
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, thumbnail: previewUrl }));
  };

  const handleEbookFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setEbookFiles(prev => [...prev, ...files]);
    
    // Create preview of file names
    const newFileNames = files.map(file => file.name);
    setFormData((prev) => ({
      ...prev,
      contentLinks: [...prev.contentLinks, ...newFileNames],
    }));
  };

  const handleAddExistingBook = (e) => {
    const bookId = e.target.value;
    if (!bookId) return;

    const book = books.find((b) => b._id === bookId);
    if (book && !formData.eBooks.includes(bookId)) {
      setFormData((prev) => ({
        ...prev,
        eBooks: [...prev.eBooks, bookId],
        contentLinks: [...prev.contentLinks, book.fileUrl],
      }));
    }
    
    // Reset select
    e.target.value = "";
  };

  const removeEbook = (index) => {
    setFormData((prev) => ({
      ...prev,
      contentLinks: prev.contentLinks.filter((_, i) => i !== index),
      eBooks: prev.eBooks.filter((_, i) => i !== index),
    }));
    
    // Also remove from ebookFiles if it's a newly uploaded file
    if (index >= formData.contentLinks.length - ebookFiles.length) {
      const fileIndex = index - (formData.contentLinks.length - ebookFiles.length);
      setEbookFiles(prev => prev.filter((_, i) => i !== fileIndex));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let thumbnailUrl = formData.thumbnail;
      let ebookUrls = [...formData.contentLinks];

      // === 1️⃣ Upload new thumbnail to Cloudinary ===
      if (thumbnailFile) {
        setUploadingThumbnail(true);
        const signatureData = await getCloudinarySignature("course_thumbnails");
        const uploaded = await uploadImagesToCloudinary([thumbnailFile], signatureData);
        thumbnailUrl = uploaded[0]?.url;
        setUploadingThumbnail(false);
      }

      // === 2️⃣ Upload new eBooks to Cloudinary ===
      if (ebookFiles.length > 0) {
        setUploadingEbooks(true);
        const signatureData = await getCloudinarySignature("ebooks");
        const uploadedEbooks = await uploadEbooksToCloudinary(ebookFiles, signatureData);
        
        // Replace file names with actual Cloudinary URLs
        ebookUrls = [
          ...formData.contentLinks.filter(link => 
            !ebookFiles.some(file => file.name === link)
          ),
          ...uploadedEbooks.map(ebook => ebook.url)
        ];
        setUploadingEbooks(false);
      }

      // === 3️⃣ Build final payload ===
      const payload = {
        ...formData,
        thumbnail: thumbnailUrl,
        contentLinks: ebookUrls,
        category: formData.techStackSubcategory || formData.category,
      };

      // Remove empty references
      if (!payload.test) delete payload.test;

      // Remove temporary fields
      delete payload.thumbnailFile;
      delete payload.ebookFiles;

      // === 4️⃣ Send to backend ===
      if (course) {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/courses/${course._id}`, payload);
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/courses`, payload);
      }

      onSave && onSave();

      toast.success("Course saved successfully!");
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Error saving course: " + (error.response?.data?.message || error.message));
      setUploadingThumbnail(false);
      setUploadingEbooks(false);
    }
  };

  const selectedTechStack = techStacks.find((ts) => ts._id === formData.techStack);

  return (
    <div className="course-form-container">
      <h2>{course ? "Edit Course" : "Add New Course"}</h2>

      <form onSubmit={handleSubmit} className="course-form">
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>

          <div className="form-group">
            <label htmlFor="title">Course Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="level">Difficulty Level</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="liveCodeEnabled">Live Code Editor</label>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="liveCodeEnabled"
                  name="liveCodeEnabled"
                  checked={formData.liveCodeEnabled}
                  onChange={handleInputChange}
                />
                <label htmlFor="liveCodeEnabled" className="checkbox-label">
                  Enable live coding exercises
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Category & Tech Stack */}
        <div className="form-section">
          <h3>Category & Technology</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="techStack">Tech Stack *</label>
              <select
                id="techStack"
                name="techStack"
                value={formData.techStack}
                onChange={handleTechStackChange}
                required
              >
                <option value="">Select Tech Stack</option>
                {techStacks.map((techStack) => (
                  <option key={techStack._id} value={techStack._id}>
                    {techStack.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="techStackSubcategory">Subcategory *</label>
              <select
                id="techStackSubcategory"
                name="techStackSubcategory"
                value={formData.techStackSubcategory}
                onChange={handleInputChange}
                required
                disabled={!formData.techStack}
              >
                <option value="">Select Subcategory</option>
                {selectedTechStack?.subcategories?.map((subcat) => (
                  <option key={subcat._id} value={subcat.name}>
                    {subcat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Course Category *</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g., Web Development, Data Science"
              required
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="form-section">
          <h3>Course Thumbnail</h3>

          <div className="form-group">
            <label>Upload Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              disabled={uploadingThumbnail}
            />
            {uploadingThumbnail && <p>Uploading thumbnail...</p>}
            {formData.thumbnail && (
              <div className="thumbnail-preview">
                <img src={formData.thumbnail} alt="Thumbnail preview" />
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, thumbnail: "" }));
                    setThumbnailFile(null);
                  }}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* eBook Management */}
        <div className="form-section">
          <h3>Course Materials</h3>

          {/* Upload New eBooks */}
          <div className="form-group">
            <label>Upload New eBooks</label>
            <input
              type="file"
              accept=".pdf,.epub,.mobi,.doc,.docx"
              multiple
              onChange={handleEbookFileChange}
              disabled={uploadingEbooks}
            />
            {uploadingEbooks && <p>Uploading eBooks...</p>}
          </div>

          {/* Add Existing eBooks */}
          <div className="form-group">
            <label>Add Existing eBooks</label>
            <select
              onChange={handleAddExistingBook}
              disabled={!formData.techStack || availableBooks.length === 0}
            >
              <option value="">Select from library</option>
              {availableBooks.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title} - {book.level}
                </option>
              ))}
            </select>
            {!formData.techStack && (
              <p className="form-hint">Please select a tech stack first</p>
            )}
            {formData.techStack && availableBooks.length === 0 && (
              <p className="form-hint">No books available for this tech stack</p>
            )}
          </div>

          {/* eBooks List */}
          {formData.contentLinks.length > 0 && (
            <div className="ebooks-list">
              <h4>Attached eBooks:</h4>
              {formData.contentLinks.map((link, index) => (
                <div key={index} className="ebook-item">
                  <span>{link.split("/").pop()}</span>
                  <button
                    type="button"
                    onClick={() => removeEbook(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Test Assignment */}
        <div className="form-section">
          <h3>Assign Test</h3>

          <div className="form-group">
            <label htmlFor="test">Select Test</label>
            <select
              id="test"
              name="test"
              value={formData.test}
              onChange={handleInputChange}
            >
              <option value="">No test assigned</option>
              {tests.map((test) => (
                <option key={test._id} value={test._id}>
                  {test.title} - {test.difficulty}
                </option>
              ))}
            </select>
            {tests.length === 0 && (
              <p className="form-hint">No tests available</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn" disabled={uploadingThumbnail || uploadingEbooks}>
            Cancel
          </button>
          <button 
            type="submit" 
            className="save-btn" 
            disabled={uploadingThumbnail || uploadingEbooks}
          >
            {uploadingThumbnail || uploadingEbooks ? "Uploading..." : (course ? "Update Course" : "Create Course")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUpdate;