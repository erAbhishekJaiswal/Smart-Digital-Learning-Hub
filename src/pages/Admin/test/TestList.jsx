// TestList.js
import React, { useState, useEffect } from "react";
import "./TestManagement.css";
import CreateTestModal from "../test/CreateTestModal";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getToken } from "../../../utils/localstorage";
const TestList = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    difficulty: "Beginner",
    totalQuestions: "",
    passingScore: "",
    questions: [],
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/test/`,{
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log(data);
      setTests(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch tests");
      console.error("Error fetching tests:", error);
      setLoading(false);
    }
  };

  const handleDeleteTest = async (testId) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      setTests((prev) => prev.filter((test) => test._id !== testId));
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/test/${testId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      toast.success("Test deleted successfully!");
      console.log(data);
    } catch (error) {
      toast.error("Failed to delete test");
      console.error("Error deleting test:", error);
    }
  };

  const handleAddTest = (test) => {
    navigate(`/admin/test/addquestion/${test}`);
  };

  // ✅ Open Edit Modal
  const handleEdit = (test) => {
    setEditingTest(test);
    setFormData({
      title: test.title || "",
      description: test.description || "",
      duration: test.duration || "",
      difficulty: test.difficulty || "Beginner",
      totalQuestions: test.totalQuestions || "",
      passingScore: test.passingScore || "",
      questions: test.questions || [],
    });
    setIsEditModalOpen(true);
  };

  // ✅ Close Edit Modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingTest(null);
    setFormData({
      title: "",
      description: "",
      duration: "",
      difficulty: "Beginner",
      totalQuestions: "",
      passingScore: "",
    });
  };

  // ✅ Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update a question field
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Update an option inside a question
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Add option to a question
  const addOption = (qIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options.push("");
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Delete option
  const deleteOption = (qIndex, optIndex) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter(
      (_, i) => i !== optIndex
    );
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Add new question
  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: "",
          options: ["", ""], // at least 2 options
          explanation: "",
          marks: 1,
        },
      ],
    });
  };

  // Delete a question
  const deleteQuestion = (index) => {
    const updated = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updated });
  };

  // ✅ Submit Edit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/test/${editingTest._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update test");
      }

      const updatedTest = await response.json();

      // Update the tests list with the updated test
      setTests(
        tests.map((test) => (test._id === editingTest._id ? updatedTest : test))
      );

      handleCloseModal();
      toast.success("Test updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update test.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="test-management">
      <div className="test-management__header">
        <div className="test-management__title-section">
          <h1 className="test-management__title">Test Management</h1>
          <p className="test-management__subtitle">
            Create and manage tests, add questions, and track performance
          </p>
        </div>

        <button
          className="test-management__create-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <span className="test-management__create-icon">+</span>
          Create New Test
        </button>
      </div>

      {/* Tests Table */}
      <div className="tests-table-container">
        {loading ? (
          <div className="tests-loading">
            <div className="tests-loading__spinner"></div>
            <p>Loading tests...</p>
          </div>
        ) : (
          <table className="tests-table">
            <thead>
              <tr>
                <th>Test Title</th>
                <th>Book Name</th>
                <th>Category</th>
                <th>Techstack</th>
                <th>Difficulty</th>
                <th>Questions</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  {/* Test Title + Created Date */}
                  <td>
                    <div className="test-title">
                      <h4 className="test-title__text">{test.title}</h4>
                      <p className="test-title__meta">
                        Created {new Date(test.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </td>

                  {/* Book Name */}
                  <td>
                    <span className="book-title">
                      {test.bookId?.title || "N/A"}
                    </span>
                  </td>

                  {/* Category (find subcategory name) */}
                  <td>
                    <span className="test-category">
                      {test.techstackId?.subcategories?.find(
                        (sub) => sub._id === test.subcategory
                      )?.name || "N/A"}
                    </span>
                  </td>

                  {/* Techstack Name */}
                  <td>
                    <span className="duration-text">
                      {test.techstackId?.name || "N/A"}
                    </span>
                  </td>

                  {/* Difficulty */}
                  <td>
                    <span
                      className={`difficulty-badge difficulty-badge--${
                        test.difficulty?.toLowerCase() || "beginner"
                      }`}
                    >
                      {test.difficulty || "Beginner"}
                    </span>
                  </td>

                  {/* Total Questions */}
                  <td>
                    <span className="questions-count">
                      {test.totalQuestions || 0}
                    </span>
                  </td>

                  {/* Duration */}
                  <td>
                    <span className="duration-text">
                      {test.duration || 0} min
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="test-actions">
                      <button
                        className="test-action test-action--edit"
                        title="Edit Test"
                        onClick={() => handleEdit(test)}
                      >
                        ✏️
                      </button>
                      <button
                        className="test-action test-action--questions"
                        title="Add Questions"
                        onClick={() => handleAddTest(test._id)}
                      >
                        <IoMdAdd />
                      </button>

                      <button
                        className="test-action test-action--delete"
                        onClick={() => handleDeleteTest(test._id)}
                        title="Delete Test"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && tests.length === 0 && (
          <div className="tests-empty">
            <div className="tests-empty__icon">📝</div>
            <h3 className="tests-empty__title">No Tests Created</h3>
            <p className="tests-empty__description">
              Get started by creating your first test for students to attempt.
            </p>
            <button
              className="tests-empty__action"
              onClick={() => setShowCreateModal(true)}
            >
              Create Your First Test
            </button>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateTestModal onClose={() => setShowCreateModal(false)} />
      )}

      {/* ✅ Edit Test Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Edit Test</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="test-create-form">
              <div className="test-form-group">
                <label className="form-label" htmlFor="title">
                  Test Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter test title"
                  required
                />
              </div>

              <div className="test-form-group">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea form-textarea--large"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter test description"
                  rows="3"
                />
              </div>

              <div className="form-grid">
                <div className="test-form-group">
                  <label className="form-label" htmlFor="duration">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    className="form-input"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 60"
                    min="1"
                    required
                  />
                </div>

                <div className="test-form-group">
                  <label className="form-label" htmlFor="totalQuestions">
                    Total Questions *
                  </label>
                  <input
                    type="number"
                    id="totalQuestions"
                    name="totalQuestions"
                    className="form-input"
                    value={formData.totalQuestions}
                    onChange={handleInputChange}
                    placeholder="e.g., 30"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="test-form-group">
                  <label className="form-label" htmlFor="passingScore">
                    Passing Score (%)
                  </label>
                  <input
                    type="number"
                    id="passingScore"
                    name="passingScore"
                    className="form-input"
                    value={formData.passingScore}
                    onChange={handleInputChange}
                    placeholder="e.g., 60"
                    min="0"
                    max="100"
                  />
                </div>

                <div className="test-form-group">
                  <label className="form-label">Difficulty Level *</label>
                  <div className="difficulty-options">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <div key={level} className="difficulty-option">
                        <input
                          type="radio"
                          id={`difficulty-${level}`}
                          name="difficulty"
                          value={level}
                          checked={formData.difficulty === level}
                          onChange={handleInputChange}
                          className="difficulty-option__input"
                        />
                        <label
                          htmlFor={`difficulty-${level}`}
                          className={`difficulty-option__label difficulty-option__label--${level.toLowerCase()}`}
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="questions-section">
                  <h3>Edit Questions</h3>

                  {formData.questions.map((q, qIndex) => (
                    <div className="question-box" key={qIndex}>
                      {/* Question Text */}
                      <div className="test-form-group">
                        <label>Question {qIndex + 1}</label>
                        <input
                          type="text"
                          className="form-input"
                          value={q.question}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "question",
                              e.target.value
                            )
                          }
                          placeholder="Enter question"
                        />
                      </div>

                      {/* Options */}
                      <div className="options-section">
                        <label>Options:</label>

                        {q.options.map((opt, optIndex) => (
                          <div key={optIndex} className="option-row">
                            <input
                              type="text"
                              className="form-input"
                              value={opt}
                              onChange={(e) =>
                                handleOptionChange(
                                  qIndex,
                                  optIndex,
                                  e.target.value
                                )
                              }
                              placeholder={`Option ${optIndex + 1}`}
                            />
                            {q.options.length > 2 && (
                              <button
                                type="button"
                                className="btn-delete-option"
                                onClick={() => deleteOption(qIndex, optIndex)}
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn-add-option"
                          onClick={() => addOption(qIndex)}
                        >
                          + Add Option
                        </button>
                      </div>

                      {/* Explanation */}
                      <div className="test-form-group">
                        <label>Explanation</label>
                        <textarea
                          className="form-textarea"
                          value={q.explanation}
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "explanation",
                              e.target.value
                            )
                          }
                          placeholder="Explanation for the answer"
                        />
                      </div>

                      {/* Marks */}
                      <div className="test-form-group">
                        <label>Marks</label>
                        <input
                          type="number"
                          className="form-input"
                          value={q.marks}
                          min="1"
                          onChange={(e) =>
                            handleQuestionChange(
                              qIndex,
                              "marks",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <button
                        type="button"
                        className="btn-delete-question"
                        onClick={() => deleteQuestion(qIndex)}
                      >
                        Delete Question
                      </button>

                      <hr />
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn-add-question"
                    onClick={addQuestion}
                  >
                    + Add New Question
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="form-btn form-btn--secondary"
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="form-btn form-btn--primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <div className="form-btn__spinner"></div>
                      Updating...
                    </>
                  ) : (
                    "Update Test"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestList;
