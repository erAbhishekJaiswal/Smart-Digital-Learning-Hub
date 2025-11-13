// TestList.js
import React, { useState, useEffect } from "react";
import "./TestManagement.css";
import CreateTestModal from "../test/CreateTestModal";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const TestList = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    setLoading(true);
    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 1000));

    // const mockTests = [
    //   {
    //     _id: '1',
    //     title: 'JavaScript Fundamentals',
    //     subcategory: 'Programming',
    //     difficulty: 'Beginner',
    //     totalQuestions: 20,
    //     duration: 30,
    //     passingScore: 70,
    //     isActive: true,
    //     createdBy: 'Admin User',
    //     createdAt: '2024-01-15T10:30:00.000Z',
    //     attempts: 150,
    //     averageScore: 75
    //   },
    //   {
    //     _id: '2',
    //     title: 'React Advanced Concepts',
    //     subcategory: 'Web Development',
    //     difficulty: 'Advanced',
    //     totalQuestions: 25,
    //     duration: 45,
    //     passingScore: 80,
    //     isActive: true,
    //     createdBy: 'Admin User',
    //     createdAt: '2024-01-10T14:20:00.000Z',
    //     attempts: 89,
    //     averageScore: 68
    //   }
    // ];

    try {
      const response = await fetch("https://learning-backend-rust.vercel.app/api/test/");
      const data = await response.json();
      console.log(data);

      setTests(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tests:", error);
      setLoading(false);
    }
  };

  // const handleToggleStatus = async (testId) => {
  //   // Toggle test active status
  //   setTests(prev => prev.map(test =>
  //     test._id === testId
  //       ? { ...test, isActive: !test.isActive }
  //       : test
  //   ));
  // };

  const handleDeleteTest = async (testId) => {
    if (window.confirm("Are you sure you want to delete this test?")) {
      setTests((prev) => prev.filter((test) => test._id !== testId));
    }
    try {
      const response = await fetch(`https://learning-backend-rust.vercel.app/api/test/${testId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const handleEditTest = (test) => {
    // Handle edit test logic
    navigate(`/admin/test/addquestion/${test}`);
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
          // <div className="tests-table">
          //   <div className="tests-table__header">
          //     <div className="tests-table__col tests-table__col--title">Test Title</div>
          //     <div className="tests-table__col tests-table__col--book">Book Name</div>
          //     <div className="tests-table__col tests-table__col--category">Category</div>
          //     <div className="tests-table__col tests-table__col--duration">Techstack</div>
          //     <div className="tests-table__col tests-table__col--difficulty">Difficulty</div>
          //     <div className="tests-table__col tests-table__col--questions">Questions</div>

          //     {/* <div className="tests-table__col tests-table__col--attempts">Attempts</div>
          //     <div className="tests-table__col tests-table__col--status">Status</div> */}
          //     <div className="tests-table__col tests-table__col--actions">Actions</div>
          //   </div>

          //   <div className="tests-table__body">
          //     {tests.map(test => (
          //       <div key={test._id} className="tests-table__row">
          //         <div className="tests-table__col tests-table__col--title">
          //           <div className="test-title">
          //             <h4 className="test-title__text">{test.title}</h4>
          //             <p className="test-title__meta">
          //               Created {new Date(test.createdAt).toLocaleDateString()}
          //             </p>
          //           </div>
          //         </div>

          //         <div className="tests-table__col tests-table__col--book">
          //           <span className="book-title">{test.bookId.title}</span>
          //         </div>

          //         <div className="tests-table__col tests-table__col--category">
          //           <span className="test-category">{test.techstackId.subcategories.map(sub => sub._id === test.subcategory ? sub.name : '')}</span>
          //         </div>

          //         <div className="tests-table__col tests-table__col--duration">
          //           <span className="duration-text">{test.techstackId.name}</span>
          //         </div>

          //         {/* <div className="tests-table__col tests-table__col--attempts">
          //           <div className="attempts-info">
          //             <span className="attempts-count">{test.attempts}</span>
          //             <span className="attempts-score">Avg: {test.averageScore}%</span>
          //           </div>
          //         </div> */}

          //         <div className="tests-table__col tests-table__col--difficulty">
          //           <span className={`difficulty-badge difficulty-badge--${test.difficulty.toLowerCase()}`}>
          //             {test.difficulty}
          //           </span>
          //         </div>

          //         <div className="tests-table__col tests-table__col--questions">
          //           <span className="questions-count">{test.totalQuestions}</span>
          //         </div>

          //         {/* <div className="tests-table__col tests-table__col--duration">
          //           <span className="duration-text">{test.duration} min</span>
          //         </div>

          //         <div className="tests-table__col tests-table__col--attempts">
          //           <div className="attempts-info">
          //             <span className="attempts-count">{test.attempts}</span>
          //             <span className="attempts-score">Avg: {test.averageScore}%</span>
          //           </div>
          //         </div>

          //         <div className="tests-table__col tests-table__col--status">
          //           <label className="toggle-switch">
          //             <input
          //               type="checkbox"
          //               checked={test.isActive}
          //               onChange={() => handleToggleStatus(test._id)}
          //               className="toggle-switch__input"
          //             />
          //             <span className="toggle-switch__slider"></span>
          //           </label>
          //         </div> */}

          //         <div className="tests-table__col tests-table__col--actions">
          //           <div className="test-actions">
          //             {/* <button className="test-action test-action--edit" title="Edit Test">
          //               ✏️
          //             </button> */}
          //             <button className="test-action test-action--questions" title="Add Questions" onClick={() => handleEditTest(test._id)}>
          //               <IoMdAdd />
          //             </button>

          //             <button
          //               className="test-action test-action--delete"
          //               onClick={() => handleDeleteTest(test._id)}
          //               title="Delete Test"
          //             >
          //               🗑️
          //             </button>
          //           </div>
          //         </div>
          //       </div>
          //     ))}
          //   </div>
          // </div>

          <table className="tests-table">
            <thead>
              <tr>
                <th>Test Title</th>
                <th>Book Name</th>
                <th>Category</th>
                <th>Techstack</th>
                <th>Difficulty</th>
                <th>Questions</th>
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
                      className={`difficulty-badge difficulty-badge--${test.difficulty.toLowerCase()}`}
                    >
                      {test.difficulty}
                    </span>
                  </td>

                  {/* Total Questions */}
                  <td>
                    <span className="questions-count">
                      {test.totalQuestions}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="test-actions">
                      <button
                        className="test-action test-action--questions"
                        title="Add Questions"
                        onClick={() => handleEditTest(test._id)}
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
    </div>
  );
};

export default TestList;
