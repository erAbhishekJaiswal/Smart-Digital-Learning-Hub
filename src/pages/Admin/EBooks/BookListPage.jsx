import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookListPage.css";
import { useNavigate } from "react-router-dom";
import { getUserRole, isUserLoggedIn } from "../../../utils/localstorage";
const BasseUrl = import.meta.env.VITE_BASE_URL
const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("Error deleting book.");
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
        // <div className="book-list-grid">
        //   {books.map((book) => (
        //     <div key={book._id} className="book-list-card">
        //       <img
        //         src={book.coverImage || "https://via.placeholder.com/150"}
        //         alt={book.title}
        //         className="book-list-img"
        //       />
        //       <div className="book-list-info">
        //         <h3>{book.title}</h3>
        //         <p className="book-list-author">{book.author}</p>
        //         <p className="book-list-level">Level: {book.level || "N/A"}</p>
        //         <p className="book-list-language">Language: {book.language}</p>
        //         <p className="book-list-rating">
        //           ⭐ {book.averageRating?.toFixed(1) || "0.0"} / 5
        //         </p>
        //       </div>
        //       <div className="book-list-actions">
        //         <button className="btn-edit">Edit</button>
        //         <button
        //           className="btn-delete"
        //           onClick={() => handleDelete(book._id)}
        //         >
        //           Delete
        //         </button>
        //       </div>
        //     </div>
        //   ))}
        // </div>
        <div className="book-list-table-container-box">
        <table className="book-list-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Level</th>
              <th>Language</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <img
                    src={book.coverImage || "https://via.placeholder.com/100"}
                    alt={book.title}
                    className="book-list-img"
                    style={{
                      width: "60px",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.level || "N/A"}</td>
                <td>{book.language}</td>
                <td>⭐ {book.averageRating?.toFixed(1) || "0.0"} / 5</td>
                <td>
                  {/* <button className="btn-edit">Edit</button> */}
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(book._id)}
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
    </div>
  );
};

export default BookListPage;
