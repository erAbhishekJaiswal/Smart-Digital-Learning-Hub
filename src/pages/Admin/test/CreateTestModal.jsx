import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../utils/localstorage";
const CreateTestModal = ({ onClose }) => {
  const token = getToken();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    difficulty: "Beginner",
    duration: 30,
    totalQuestions: 10,
    passingScore: 70,
    techstackId: "",
    subcategory: "",
    bookId: ""
  });

  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null);
  const [fetching, setFetching] = useState(true);

  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  // ✅ Fetch Books and TechStacks
  const fetchBooksAndTechStack = async () => {
    setFetching(true);
    try {
      const [booksRes, techRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BASE_URL}/ebooks/`),
        axios.get(`${import.meta.env.VITE_BASE_URL}/techstack/`)
      ]);
      setBooks(booksRes.data || []);
      setTechStacks(techRes.data || []);
    } catch (error) {
      console.error("Error fetching books/tech stack:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBooksAndTechStack();
  }, []);

  // ✅ Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Handle tech stack selection
  const handleTechStackChange = (e) => {
    const selectedId = e.target.value;
    const selected = techStacks.find((t) => t._id === selectedId);
    setSelectedTech(selected || null);
    setFormData((prev) => ({
      ...prev,
      techstackId: selectedId,
      subcategory: ""
    }));
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/test/`, formData , {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      console.log("Created Test:", res.data);

      alert("✅ Test created successfully! You can now add questions.");
      onClose();
    } catch (error) {
      console.error("Error creating test:", error);
      alert("❌ Failed to create test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Loading data...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Test</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="test-create-form" onSubmit={handleSubmit}>
          <div className="form-grid">

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Test Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter test title"
                required
              />
            </div>

            {/* Book Select */}
            <div className="form-group">
              <label className="form-label">Select Book *</label>
              <select
                name="bookId"
                value={formData.bookId}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select Book</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title} — ({book.author})
                  </option>
                ))}
              </select>
            </div>

            {/* Tech Stack Select */}
            <div className="form-group">
              <label className="form-label">Tech Stack *</label>
              <select
                name="techstackId"
                value={formData.techstackId}
                onChange={handleTechStackChange}
                className="form-select"
                required
              >
                <option value="">Select Tech Stack</option>
                {techStacks.map((stack) => (
                  <option key={stack._id} value={stack._id}>
                    {stack.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Select (Dynamic) */}
            {selectedTech && (
              <div className="form-group">
                <label className="form-label">Subcategory *</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Subcategory</option>
                  {selectedTech.subcategories.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Difficulty */}
            <div className="form-group">
              <label className="form-label">Difficulty *</label>
              <div className="difficulty-options">
                {difficulties.map((diff) => (
                  <label key={diff} className="difficulty-option">
                    <input
                      type="radio"
                      name="difficulty"
                      value={diff}
                      checked={formData.difficulty === diff}
                      onChange={handleInputChange}
                    />
                    <span>{diff}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="form-group">
              <label className="form-label">Duration (minutes) *</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="form-input"
                min="5"
                max="180"
                required
              />
            </div>

            {/* Total Questions */}
            <div className="form-group">
              <label className="form-label">Total Questions *</label>
              <input
                type="number"
                name="totalQuestions"
                value={formData.totalQuestions}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                max="100"
                required
              />
            </div>

            {/* Passing Score */}
            <div className="form-group">
              <label className="form-label">Passing Score (%) *</label>
              <input
                type="number"
                name="passingScore"
                value={formData.passingScore}
                onChange={handleInputChange}
                className="form-input"
                min="0"
                max="100"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Test Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Describe what this test covers..."
              rows="3"
            />
          </div>

          {/* Instructions */}
          <div className="form-group">
            <label className="form-label">Test Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Add instructions for test takers..."
              rows="3"
            />
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="form-btn form-btn--secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="form-btn form-btn--primary"
              disabled={loading}
            >
              {loading ? "Creating Test..." : "Create Test"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestModal;
