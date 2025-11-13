import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdsListPage.css";
import { useNavigate } from "react-router-dom";
const BasseUrl = import.meta.env.VITE_BASE_URL
const AdsListPage = () => {
    const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch ads
  const fetchAds = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BasseUrl}/ads`, {
        params: { search, category, status, page },
      });
      setAds(res.data.ads);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching ads:", err);
      setMessage("Failed to load ads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [search, category, status, page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      await axios.delete(`${BasseUrl}/ads/${id}`);
      fetchAds();
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("Error deleting ad.");
    }
  };

  return (
    <div className="ads-list-container">
      
      <div className="created-new-ad-button">
        <h2 className="ads-list-title">Manage Ads</h2>
        <button
          className="ads-list-btn"
          onClick={() => navigate("/admin/create/ads")}
        >
          Add New Ad
        </button>
      </div>

      {/* Filters */}
      <div className="ads-list-filters">
        <input
          type="text"
          placeholder="Search by title or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="real_estate">Real Estate</option>
          <option value="vehicles">Vehicles</option>
          <option value="jobs">Jobs</option>
          <option value="services">Services</option>
          <option value="electronics">Electronics</option>
          <option value="others">Others</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Ad List */}
      {loading ? (
        <p className="ads-list-loading">Loading ads...</p>
      ) : ads.length === 0 ? (
        <p className="ads-list-empty">No ads found.</p>
      ) : (
        <div className="ads-list-grid">
          {ads.map((ad) => (
            <div key={ad._id} className="ads-list-card">
              <img
                src={ad.image || "https://via.placeholder.com/150"}
                alt={ad.title}
                className="ads-list-img"
              />
              <div className="ads-list-info">
                <h3>{ad.title}</h3>
                <p className="ads-list-category">{ad.category}</p>
                <div className="ads-list-price-status">
                <p className="ads-list-price">₹{ad.price || "N/A"}</p>
                <p className={`ads-list-status status-${ad.status}`}>{ad.status}</p>
                </div>
              </div>
              <div className="ads-list-actions">
                {/* <button className="btn-edit">Edit</button> */}
                <button className="btn-delete" onClick={() => handleDelete(ad._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="ads-list-pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ◀ Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next ▶
        </button>
      </div>

      {message && <p className="ads-list-message">{message}</p>}
    </div>
  );
};

export default AdsListPage;
