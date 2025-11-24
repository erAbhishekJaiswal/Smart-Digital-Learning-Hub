// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./BookListPage.css";
// import { useNavigate } from "react-router-dom";
// import { getUserRole, isUserLoggedIn } from "../../../utils/localstorage";
// const BasseUrl = import.meta.env.VITE_BASE_URL
// const BookListPage = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [level, setLevel] = useState("");
//   const [language, setLanguage] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch Books
//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BasseUrl}/ebooks/admin`, {
//         params: { search, level, language, page },
//       });
//       setBooks(res.data.books);
//       setTotalPages(res.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       setMessage("Failed to load books.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, [search, level, language, page]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this book?")) return;
//     try {
//       await axios.delete(`${BasseUrl}/ebooks/${id}`);
//       fetchBooks();
//     } catch (err) {
//       console.error("Delete failed:", err);
//       setMessage("Error deleting book.");
//     }
//   };

//   return (
//     <div className="book-list-container">
//       <div className="created-new-book-button">
//         <h2 className="book-list-title">📚 Manage Books</h2>
//         {isUserLoggedIn() && getUserRole() === "admin" && (
//           <button
//             className="book-list-btn"
//             onClick={() => navigate("/admin/create/books")}
//           >
//             + Add New Book
//           </button>
//         )}
//       </div>

//       {/* Filters */}
//       <div className="book-list-filters">
//         <input
//           type="text"
//           placeholder="Search by title, author or tag..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select value={level} onChange={(e) => setLevel(e.target.value)}>
//           <option value="">All Levels</option>
//           <option value="Beginner">Beginner</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Advanced">Advanced</option>
//         </select>

//         <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//           <option value="">All Languages</option>
//           <option value="English">English</option>
//           <option value="Hindi">Hindi</option>
//           <option value="Spanish">Spanish</option>
//           <option value="French">French</option>
//         </select>
//       </div>

//       {/* Book List */}
//       {loading ? (
//         <p className="book-list-loading">Loading books...</p>
//       ) : books.length === 0 ? (
//         <p className="book-list-empty">No books found.</p>
//       ) : (
//         // <div className="book-list-grid">
//         //   {books.map((book) => (
//         //     <div key={book._id} className="book-list-card">
//         //       <img
//         //         src={book.coverImage || "https://via.placeholder.com/150"}
//         //         alt={book.title}
//         //         className="book-list-img"
//         //       />
//         //       <div className="book-list-info">
//         //         <h3>{book.title}</h3>
//         //         <p className="book-list-author">{book.author}</p>
//         //         <p className="book-list-level">Level: {book.level || "N/A"}</p>
//         //         <p className="book-list-language">Language: {book.language}</p>
//         //         <p className="book-list-rating">
//         //           ⭐ {book.averageRating?.toFixed(1) || "0.0"} / 5
//         //         </p>
//         //       </div>
//         //       <div className="book-list-actions">
//         //         <button className="btn-edit">Edit</button>
//         //         <button
//         //           className="btn-delete"
//         //           onClick={() => handleDelete(book._id)}
//         //         >
//         //           Delete
//         //         </button>
//         //       </div>
//         //     </div>
//         //   ))}
//         // </div>
//         <div className="book-list-table-container-box">
//         <table className="book-list-table">
//           <thead>
//             <tr>
//               <th>Cover</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Level</th>
//               <th>Language</th>
//               <th>Rating</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book._id}>
//                 <td>
//                   <img
//                     src={book.coverImage || "https://via.placeholder.com/100"}
//                     alt={book.title}
//                     className="book-list-img"
//                     style={{
//                       width: "60px",
//                       height: "auto",
//                       borderRadius: "4px",
//                     }}
//                   />
//                 </td>
//                 <td>{book.title}</td>
//                 <td>{book.author}</td>
//                 <td>{book.level || "N/A"}</td>
//                 <td>{book.language}</td>
//                 <td>⭐ {book.averageRating?.toFixed(1) || "0.0"} / 5</td>
//                 <td>
//                   {/* <button className="btn-edit">Edit</button> */}
//                   <button
//                     className="btn-delete"
//                     onClick={() => handleDelete(book._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       )}

//       {/* Pagination */}
//       <div className="book-list-pagination">
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           ◀ Prev
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next ▶
//         </button>
//       </div>

//       {message && <p className="book-list-message">{message}</p>}
//     </div>
//   );
// };

// export default BookListPage;









import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookListPage.css";
import { useNavigate } from "react-router-dom";
import { getUserRole, isUserLoggedIn } from "../../../utils/localstorage";
const BasseUrl = import.meta.env.VITE_BASE_URL
import {toast} from "react-hot-toast";

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    level: "",
    language: "",
    tags: "",
    // price: "",
    // isFree: false
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BasseUrl}/ebooks/admin`, {
        params: { search, level, language, page },
      });
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages);
      // console.log(res.data);
      
    } catch (error) {
      console.error("Error fetching books:", error);
      setMessage("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, level, language, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${BasseUrl}/ebooks/${id}`);
      fetchBooks();
      toast.success("Book deleted successfully");
    } catch (err) {
      toast.error("Failed to delete book");
      console.error("Delete failed:", err);
      setMessage("Error deleting book.");
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || "",
      author: book.author || "",
      description: book.description || "",
      level: book.level || "",
      language: book.language || "",
      tags: Array.isArray(book.tags) ? book.tags.join(", ") : book.tags || ""
    });
    setIsEditModalOpen(true);
  };

  // ✅ Close Edit Modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingBook(null);
    setFormData({
      title: "",
      author: "",
      description: "",
      level: "",
      language: "",
      tags: ""
    });
  };

  // ✅ Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // ✅ Submit Edit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        price: formData.isFree ? 0 : (formData.price ? parseFloat(formData.price) : 0),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await axios.put(
        `${BasseUrl}/ebooks/${editingBook._id}`,
        submitData
      );

      // Update the books list with the updated book
      setBooks(books.map(book => 
        book._id === editingBook._id ? response.data.book : book
      ));
      
      handleCloseModal();
      toast.success("Book updated successfully");
      fetchBooks();
      setMessage("Book updated successfully!");
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      toast.error("Failed to update book");
      console.error("Update failed:", err);
      setMessage("Failed to update book.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="book-list-container">
      <div className="created-new-book-button">
        <h2 className="book-list-title">📚 Manage Books</h2>
        {isUserLoggedIn() && getUserRole() === "admin" && (
          <button
            className="book-list-btn"
            onClick={() => navigate("/admin/create/books")}
          >
            + Add New Book
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="book-list-filters">
        <input
          type="text"
          placeholder="Search by title, author or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>

      {/* Book List */}
      {loading ? (
        <p className="book-list-loading">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="book-list-empty">No books found.</p>
      ) : (
        <div className="book-list-table-container-box">
          <table className="book-list-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Level</th>
                <th>Language</th>
                {/* <th>Rating</th>
                <th>Price</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books?.map((book) => (
                <tr key={book?._id}>
                  <td>
                    <img
                      src={book?.coverImage || "https://via.placeholder.com/100"}
                      alt={book?.title}
                      loading="lazy"
                      className="book-list-img"
                      style={{
                        width: "60px",
                        height: "auto",
                        borderRadius: "4px",
                      }}
                    />
                  </td>
                  <td>{book?.title}</td>
                  <td>{book?.author}</td>
                  <td>{book?.level || "N/A"}</td>
                  <td>{book?.language}</td>
                  {/* <td>⭐ {book.averageRating?.toFixed(1) || "0.0"} / 5</td>
                  <td>{book.isFree ? "Free" : `₹${book.price}`}</td> */}
                  <td>
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(book?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="book-list-pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀ Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next ▶
        </button>
      </div>

      {message && <p className="book-list-message">{message}</p>}

      {/* ✅ Edit Modal */}
      {isEditModalOpen && (
        <div className="book-modal-overlay">
          <div className="book-modal">
            <div className="book-modal-header">
              <h2>📖 Edit Book</h2>
              <button 
                className="book-modal-close" 
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="book-modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
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
                  <label htmlFor="author">Author:</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="level">Level:</label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="language">Language:</label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>

              {/* <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (₹):</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    disabled={formData.isFree}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isFree"
                      checked={formData.isFree}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Free Book
                  </label>
                </div>
              </div> */}

              <div className="form-group">
                <label htmlFor="tags">Tags (comma separated):</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="programming, web development, javascript"
                />
              </div>

              <div className="book-modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-save"
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookListPage;