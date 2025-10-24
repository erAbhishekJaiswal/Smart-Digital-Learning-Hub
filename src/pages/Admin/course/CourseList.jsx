import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../CSSFiles/Admin/AdminCourseList.css';
import { Link, useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    techStack: '',
    liveCodeEnabled: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const [techStacks, setTechStacks] = useState([]);

  const navigate = useNavigate();

  // Fetch courses and tech stacks
  useEffect(() => {
    fetchCourses();
    fetchTechStacks();
  }, []);

  // Filter courses when search term or filters change
  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/v1/courses');
      setCourses(response.data);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTechStacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/techstack/');
      setTechStacks(response.data);
    } catch (error) {
      console.error('Error fetching tech stacks:', error);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(course => course.category === filters.category);
    }

    // Level filter
    if (filters.level) {
      filtered = filtered.filter(course => course.level === filters.level);
    }

    // Tech Stack filter
    if (filters.techStack) {
      filtered = filtered.filter(course => course.techStack._id === filters.techStack);
    }

    // Live Code filter
    if (filters.liveCodeEnabled !== '') {
      filtered = filtered.filter(course => 
        course.liveCodeEnabled === (filters.liveCodeEnabled === 'true')
      );
    }

    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      level: '',
      techStack: '',
      liveCodeEnabled: ''
    });
  };

  // Get current courses for pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique categories from courses
  const categories = [...new Set(courses.map(course => course.category))];

  const handleaddtonewcourse = () => {
    navigate('/admin/addnewcourse');
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h1>Course Management</h1>
        <p>Manage and view all courses in your library</p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-bar">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search courses by title, description, or category..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="course-search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <button className='add-new-course' onClick={handleaddtonewcourse}>Add New Course</button>
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Level</label>
            <select
              value={filters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tech Stack</label>
            <select
              value={filters.techStack}
              onChange={(e) => handleFilterChange('techStack', e.target.value)}
            >
              <option value="">All Tech Stacks</option>
              {techStacks.map(techStack => (
                <option key={techStack._id} value={techStack._id}>
                  {techStack.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Live Code</label>
            <select
              value={filters.liveCodeEnabled}
              onChange={(e) => handleFilterChange('liveCodeEnabled', e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Enabled</option>
              <option value="false">Disabled</option>
            </select>
          </div>

          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>
          Showing {currentCourses.length} of {filteredCourses.length} courses
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Courses Grid */}
      {currentCourses.length === 0 ? (
        <div className="no-courses">
          <div className="no-courses-icon">📚</div>
          <h3>No courses found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="courses-grid">
          {currentCourses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            ← Previous
          </button>

          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return '#22c55e';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="course-card">
      <div className="course-card-header">
        <div className="course-thumbnail">
          {course.thumbnail ? (
            <img src={course.thumbnail} alt={course.title} />
          ) : (
            <div className="thumbnail-placeholder">
              {course.techStack?.icon || '📚'}
            </div>
          )}
        </div>
        <div className="course-badges">
          <span 
            className="level-badge"
            style={{ backgroundColor: getLevelColor(course.level) }}
          >
            {course.level}
          </span>
          {course.liveCodeEnabled && (
            <span className="live-code-badge">💻 Live Code</span>
          )}
        </div>
      </div>

      <div className="course-card-body">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
        
        <div className="course-meta">
          <div className="meta-item">
            <span className="meta-label">Category:</span>
            <span className="meta-value">{course.category}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Tech Stack:</span>
            <span className="meta-value">{course.techStack?.name}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Materials:</span>
            <span className="meta-value">{course.contentLinks?.length || 0} files</span>
          </div>
        </div>
      </div>

      <div className="course-card-footer">
        <div className="course-date">
          Created: {formatDate(course.createdAt)}
        </div>
        <div className="course-actions">
          <button className="action-btn edit-btn">Edit</button>
          <button className="action-btn view-btn">View</button>
        </div>
      </div>
    </div>
  );
};

export default CourseList;