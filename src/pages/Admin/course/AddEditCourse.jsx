import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../CSSFiles/Admin/AddEditCourse.css";

const AddEditCourse = ({ course, onSave, onCancel }) => {
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
        liveCodeEnabled:
          course.liveCodeEnabled !== undefined ? course.liveCodeEnabled : true,
        test: course.test || "",
        techStack: course.techStack || "",
        techStackSubcategory: course.techStackSubcategory || "",
        eBooks: course.eBooks || [],
      });
    }
  }, [course]);

  const getCloudinarySignature = async (folder = "course_thumbnails") => {
    const res = await axios.get(`/api/cloudinary/signature?folder=${folder}`);
    return res.data;
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

      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      uploadedImages.push({
        public_id: uploadRes.data.public_id,
        url: uploadRes.data.secure_url,
      });
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

      // Use "raw" endpoint for non-image files
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        formData
      );

      uploadedFiles.push({
        public_id: uploadRes.data.public_id,
        url: uploadRes.data.secure_url,
      });
    }

    return uploadedFiles;
  };








  const fetchTechStacks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/techstack/"
      );
      setTechStacks(response.data);
    } catch (error) {
      console.error("Error fetching tech stacks:", error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get("/api/tests");
      setTests([]);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/api/books");
      setBooks([]);
    } catch (error) {
      console.error("Error fetching books:", error);
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
    setFormData((prev) => ({
      ...prev,
      techStack: techStackId,
      techStackSubcategory: "",
    }));

    // Filter available books based on selected tech stack
    if (techStackId) {
      const filteredBooks = books.filter(
        (book) => book.techStack === techStackId
      );
      setAvailableBooks(filteredBooks);
    } else {
      setAvailableBooks(books);
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingThumbnail(true);
    const formData = new FormData();
    formData.append("thumbnail", file);

    try {
      const response = await axios.post("/api/upload/thumbnail", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, thumbnail: response.data.url }));
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      alert("Error uploading thumbnail");
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleEbookUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploadingEbooks(true);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("ebook", file);

      try {
        const response = await axios.post("/api/upload/ebook", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedUrls.push(response.data.url);
      } catch (error) {
        console.error("Error uploading ebook:", error);
      }
    }

    setFormData((prev) => ({
      ...prev,
      contentLinks: [...prev.contentLinks, ...uploadedUrls],
    }));
    setUploadingEbooks(false);
  };

  const handleAddExistingBook = (bookId) => {
    const book = books.find((b) => b._id === bookId);
    if (book && !formData.eBooks.includes(bookId)) {
      setFormData((prev) => ({
        ...prev,
        eBooks: [...prev.eBooks, bookId],
        contentLinks: [...prev.contentLinks, book.fileUrl],
      }));
    }
  };

  const removeEbook = (index) => {
    setFormData((prev) => ({
      ...prev,
      contentLinks: prev.contentLinks.filter((_, i) => i !== index),
      eBooks: prev.eBooks.filter((_, i) => i !== index),
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const payload = {
  //       ...formData,
  //       // Ensure we have proper category data
  //       category: formData.techStackSubcategory || formData.category,
  //     };

  //     if (course) {
  //       await axios.put(`/api/courses/${course._id}`, payload);
  //     } else {
  //       await axios.post("/api/courses", payload);
  //     }

  //     onSave && onSave();
  //   } catch (error) {
  //     console.error("Error saving course:", error);
  //     alert("Error saving course");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let thumbnailUrl = formData.thumbnail; // existing thumbnail if editing
    let eBookUrls = formData.eBooks || [];

    // === 1️⃣ Upload new thumbnail (if selected) ===
    if (formData.thumbnailFile) {
      const signatureData = await getCloudinarySignature("course_thumbnails");
      const uploaded = await uploadImagesToCloudinary([formData.thumbnailFile], signatureData);
      thumbnailUrl = uploaded[0]?.url;
    }

    // === 2️⃣ Upload new eBooks (if selected) ===
    if (formData.ebookFiles && formData.ebookFiles.length > 0) {
      const signatureData = await getCloudinarySignature("ebooks");
      const uploadedEbooks = await uploadEbooksToCloudinary(formData.ebookFiles, signatureData);
      eBookUrls = uploadedEbooks.map((file) => file.url);
    }

    // === 3️⃣ Build final payload ===
    const payload = {
      ...formData,
      thumbnail: thumbnailUrl,
      eBooks: eBookUrls,
      category: formData.techStackSubcategory || formData.category,
    };

    // === 4️⃣ Send to backend ===
    if (course) {
      await axios.put(`/api/courses/${course._id}`, payload);
    } else {
      await axios.post('/api/courses', payload);
    }

    onSave && onSave();
  } catch (error) {
    console.error("Error saving course:", error);
    alert("Error saving course");
  }
};


  const selectedTechStack = techStacks.find(
    (ts) => ts._id === formData.techStack
  );

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
                    {/* {subname} */} Subname
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
              onChange={handleThumbnailUpload}
              disabled={uploadingThumbnail}
            />
            {uploadingThumbnail && <p>Uploading...</p>}
            {formData.thumbnail && (
              <div className="thumbnail-preview">
                <img src={formData.thumbnail} alt="Thumbnail preview" />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, thumbnail: "" }))
                  }
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
              accept=".pdf,.epub,.mobi"
              multiple
              onChange={handleEbookUpload}
              disabled={uploadingEbooks}
            />
            {uploadingEbooks && <p>Uploading eBooks...</p>}
          </div>

          {/* Add Existing eBooks */}
          <div className="form-group">
            <label>Add Existing eBooks</label>
            <select
              onChange={(e) => handleAddExistingBook(e.target.value)}
              disabled={!formData.techStack}
            >
              <option value="">Select from library</option>
              {availableBooks.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title} - {book.level}
                </option>
              ))}
            </select>
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
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="save-btn">
            {course ? "Update Course" : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditCourse;
