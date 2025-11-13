import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminTechStackList.css";
import "../../../CSSFiles/PublicPages/TechStackPage.css";
import { getToken, getUserRole } from "../../../utils/localstorage";
const BasseUrl = import.meta.env.VITE_BASE_URL
const AdminTechStackList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = getToken();
  const role = getUserRole();

  // ✅ Fetch Tech Stack Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BasseUrl}/techstack/`);
        setCategories(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Delete Handler for Admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tech stack?")) return;
    try {
      await axios.delete(`${BasseUrl}/techstack/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete tech stack.");
    }
  };

  if (loading) return <p>Loading tech stacks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="techstack-main-wrapper">
      <section className="techstack-content-section">
        <div className="techstack-container">
          <div className="techstack-hero-header">
            <h1 className="techstack-hero-title">Technology Stacks</h1>

            {token && role === "admin" && (
              <Link to="/admin/createTeckStack" className="add-tech-stack-button">
                + Add New Tech Stack
              </Link>
            )}
          </div>

          {/* ✅ Admin View: Table Format */}
          {token && role === "admin" ? (
            <div className="techstack-table-container-box">
            <table className="techstack-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Icon</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Popularity</th>
                  <th>Technologies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category._id}>
                    <td>{index + 1}</td>
                    <td>{category.icon}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.popularityScore}%</td>
                    <td>{category.subcategories?.length || 0}</td>
                    <td>
                      {/* <Link
                        to={`/admin/editTechStack/${category._id}`}
                        className="btn-edit"
                      >
                        Edit
                      </Link> */}
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : (
            // ✅ Public View: Card Grid
            <div className="techstack-categories-grid">
              {categories.map((category) => (
                <Link
                  to={`/techstack/${category._id}`}
                  className="techstack-category-card"
                  key={category._id}
                >
                  <div className="techstack-category-icon">{category.icon}</div>
                  <h3 className="techstack-category-name">{category.name}</h3>
                  <p className="techstack-category-description">
                    {category.description}
                  </p>
                  <div className="techstack-category-footer">
                    <span className="techstack-popularity-badge">
                      Popularity: {category.popularityScore}%
                    </span>
                    <span className="techstack-subcategories-count">
                      {category.subcategories?.length || 0} technologies
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminTechStackList;