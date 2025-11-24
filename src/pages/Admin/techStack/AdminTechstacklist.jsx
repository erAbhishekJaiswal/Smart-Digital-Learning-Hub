// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./AdminTechStackList.css";
// import "../../../CSSFiles/PublicPages/TechStackPage.css";
// import { getToken, getUserRole } from "../../../utils/localstorage";
// const BasseUrl = import.meta.env.VITE_BASE_URL
// const AdminTechStackList = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = getToken();
//   const role = getUserRole();

//   // ✅ Fetch Tech Stack Categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${BasseUrl}/techstack/`);
//         setCategories(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load categories.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // ✅ Delete Handler for Admin
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this tech stack?")) return;
//     try {
//       await axios.delete(`${BasseUrl}/techstack/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCategories(categories.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete tech stack.");
//     }
//   };

//   if (loading) return <p>Loading tech stacks...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="techstack-main-wrapper">
//       <section className="techstack-content-section">
//         <div className="techstack-container">
//           <div className="techstack-hero-header">
//             <h1 className="techstack-hero-title">Technology Stacks</h1>

//             {token && role === "admin" && (
//               <Link to="/admin/createTeckStack" className="add-tech-stack-button">
//                 + Add New Tech Stack
//               </Link>
//             )}
//           </div>

//           {/* ✅ Admin View: Table Format */}
//           {token && role === "admin" ? (
//             <div className="techstack-table-container-box">
//             <table className="techstack-table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Icon</th>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Popularity</th>
//                   <th>Technologies</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categories.map((category, index) => (
//                   <tr key={category._id}>
//                     <td>{index + 1}</td>
//                     <td>{category.icon}</td>
//                     <td>{category.name}</td>
//                     <td>{category.description}</td>
//                     <td>{category.popularityScore}%</td>
//                     <td>{category.subcategories?.length || 0}</td>
//                     <td>
//                       {/* <Link
//                         to={`/admin/editTechStack/${category._id}`}
//                         className="btn-edit"
//                       >
//                         Edit
//                       </Link> */}
//                       <button
//                         className="btn-delete"
//                         onClick={() => handleDelete(category._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           ) : (
//             // ✅ Public View: Card Grid
//             <div className="techstack-categories-grid">
//               {categories.map((category) => (
//                 <Link
//                   to={`/techstack/${category._id}`}
//                   className="techstack-category-card"
//                   key={category._id}
//                 >
//                   <div className="techstack-category-icon">{category.icon}</div>
//                   <h3 className="techstack-category-name">{category.name}</h3>
//                   <p className="techstack-category-description">
//                     {category.description}
//                   </p>
//                   <div className="techstack-category-footer">
//                     <span className="techstack-popularity-badge">
//                       Popularity: {category.popularityScore}%
//                     </span>
//                     <span className="techstack-subcategories-count">
//                       {category.subcategories?.length || 0} technologies
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AdminTechStackList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminTechStackList.css";
import "../../../CSSFiles/PublicPages/TechStackPage.css";
import toast from "react-hot-toast";
import { getToken, getUserRole } from "../../../utils/localstorage";
const BasseUrl = import.meta.env.VITE_BASE_URL;

const AdminTechStackList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    popularityScore: 0,
    subcategories: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const token = getToken();
  const role = getUserRole();

  // ✅ Fetch Tech Stack Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BasseUrl}/techstack/`);
        setCategories(response.data);
        console.log(response.data);
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
    if (!window.confirm("Are you sure you want to delete this tech stack?"))
      return;
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

  // ✅ Open Edit Modal
  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      popularityScore: category.popularityScore,
      subcategories: category.subcategories || [],
    });
    setIsEditModalOpen(true);
  };

  // Handle subcategory change
  const handleSubChange = (index, field, value) => {
    const updated = [...formData.subcategories];
    updated[index][field] = value;
    setFormData({ ...formData, subcategories: updated });
  };

  // Add new subcategory
  const addSubcategory = () => {
    setFormData({
      ...formData,
      subcategories: [...formData.subcategories, { name: "", description: "" }],
    });
  };

  // Delete subcategory
  const deleteSubcategory = (index) => {
    const filtered = formData.subcategories.filter((_, i) => i !== index);
    setFormData({ ...formData, subcategories: filtered });
  };

  // ✅ Close Edit Modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      icon: "",
      popularityScore: 0,
    });
  };

  // ✅ Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "popularityScore" ? parseInt(value) : value,
    }));
  };

  // ✅ Submit Edit Form
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);

  //   try {
  //     const response = await axios.put(
  //       `${BasseUrl}/techstack/${editingCategory._id}`,
  //       formData,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     // Update the categories list with the updated category
  //     setCategories(categories.map(cat =>
  //       cat._id === editingCategory._id ? response.data : cat
  //     ));

  //     handleCloseModal();
  //     alert("Tech stack updated successfully!");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to update tech stack.");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.put(
        `${BasseUrl}/techstack/${editingCategory._id}`,
        formData, // ← now sending subcategories too
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCategories(
        categories.map((cat) =>
          cat._id === editingCategory._id ? response.data : cat
        )
      );

      handleCloseModal();
      toast.success("Tech stack updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update tech stack.");
    } finally {
      setSubmitting(false);
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
              <Link
                to="/admin/createTeckStack"
                className="add-tech-stack-button"
              >
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
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </button>
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

      {/* ✅ Edit Modal */}
      {isEditModalOpen && (
        <div className="techstack-modal-overlay">
          <div className="techstack-modal">
            <div className="techstack-modal-header">
              <h2>Edit Tech Stack</h2>
              <button
                className="techstack-modal-close"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="techstack-modal-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
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

              <div className="form-group">
                <label htmlFor="icon">Icon:</label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="Enter icon code or emoji"
                  required
                />
              </div>

              {/* SUBCATEGORIES SECTION */}
              <div className="form-group">
                <label>Subcategories:</label>

                {formData.subcategories.map((sub, index) => (
                  <div key={index} className="subcategory-box">
                    <input
                      type="text"
                      placeholder="Subcategory Name"
                      value={sub.name}
                      onChange={(e) =>
                        handleSubChange(index, "name", e.target.value)
                      }
                      required
                    />

                    <input
                      type="text"
                      placeholder="Subcategory Description"
                      value={sub.description}
                      onChange={(e) =>
                        handleSubChange(index, "description", e.target.value)
                      }
                      required
                    />

                    <button
                      type="button"
                      className="btn-delete-sub"
                      onClick={() => deleteSubcategory(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn-add-sub"
                  onClick={addSubcategory}
                >
                  + Add Subcategory
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="popularityScore">Popularity Score (%):</label>
                <input
                  type="number"
                  id="popularityScore"
                  name="popularityScore"
                  value={formData.popularityScore}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  required
                />
              </div>

              <div className="techstack-modal-actions">
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

export default AdminTechStackList;
