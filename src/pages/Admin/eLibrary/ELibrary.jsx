// eLibrary.js
import React, { useState, useEffect } from 'react';
import '../../../CSSFiles/Admin/eLibrary.css';
import LibraryHeader from './compo/LibraryHeader';
import FilterSidebar from './compo/FilterSidebar';
import ResourceGrid from './compo/ResourceGrid';
import ResourceModal from './compo/ResourceModal';

const ELibrary = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    difficulty: 'all',
    type: 'all',
    rating: 'all'
  });
  const [sortBy, setSortBy] = useState('newest');

  // Mock data - in real app, this would come from an API
  useEffect(() => {
    const mockResources = [
      {
        id: 1,
        title: "Advanced JavaScript Patterns",
        author: "Dr. Sarah Chen",
        type: "ebook",
        category: "Programming",
        difficulty: "Advanced",
        rating: 4.8,
        reviews: 124,
        duration: "8 hours",
        pages: 320,
        thumbnail: "📘",
        description: "Master advanced JavaScript patterns and modern ES6+ features with practical examples and real-world applications.",
        tags: ["JavaScript", "ES6", "Design Patterns", "Advanced"],
        isFeatured: true,
        isNew: true,
        progress: 0
      },
      {
        id: 2,
        title: "React Masterclass 2024",
        author: "Mike Johnson",
        type: "course",
        category: "Web Development",
        difficulty: "Intermediate",
        rating: 4.9,
        reviews: 89,
        duration: "12 hours",
        lessons: 24,
        thumbnail: "⚛️",
        description: "Complete React guide from fundamentals to advanced concepts including hooks, context, and state management.",
        tags: ["React", "Hooks", "Redux", "Frontend"],
        isFeatured: true,
        isNew: false,
        progress: 35
      },
      {
        id: 3,
        title: "Data Science Fundamentals",
        author: "Dr. Emily Rodriguez",
        type: "ebook",
        category: "Data Science",
        difficulty: "Beginner",
        rating: 4.6,
        reviews: 67,
        duration: "6 hours",
        pages: 280,
        thumbnail: "📊",
        description: "Introduction to data science concepts, Python programming, and basic machine learning algorithms.",
        tags: ["Python", "Data Science", "Machine Learning", "Beginner"],
        isFeatured: false,
        isNew: true,
        progress: 0
      },
      {
        id: 4,
        title: "UX Design Principles",
        author: "Lisa Wang",
        type: "course",
        category: "Design",
        difficulty: "Beginner",
        rating: 4.7,
        reviews: 45,
        duration: "10 hours",
        lessons: 18,
        thumbnail: "🎨",
        description: "Learn fundamental UX design principles and create user-centered digital experiences.",
        tags: ["UX Design", "UI", "User Research", "Wireframing"],
        isFeatured: false,
        isNew: false,
        progress: 0
      },
      {
        id: 5,
        title: "Machine Learning with Python",
        author: "Dr. Alex Kumar",
        type: "ebook",
        category: "Data Science",
        difficulty: "Advanced",
        rating: 4.9,
        reviews: 156,
        duration: "14 hours",
        pages: 450,
        thumbnail: "🤖",
        description: "Comprehensive guide to machine learning algorithms and their implementation using Python.",
        tags: ["Machine Learning", "Python", "AI", "Advanced"],
        isFeatured: true,
        isNew: false,
        progress: 0
      },
      {
        id: 6,
        title: "Mobile App Development",
        author: "David Kim",
        type: "course",
        category: "Mobile Development",
        difficulty: "Intermediate",
        rating: 4.5,
        reviews: 78,
        duration: "15 hours",
        lessons: 30,
        thumbnail: "📱",
        description: "Build cross-platform mobile applications using React Native and modern development tools.",
        tags: ["React Native", "Mobile", "JavaScript", "Cross-platform"],
        isFeatured: false,
        isNew: true,
        progress: 0
      },
      {
        id: 7,
        title: "Database Design & SQL",
        author: "Maria Gonzalez",
        type: "ebook",
        category: "Database",
        difficulty: "Intermediate",
        rating: 4.4,
        reviews: 92,
        duration: "7 hours",
        pages: 310,
        thumbnail: "🗄️",
        description: "Learn database design principles and master SQL for efficient data management.",
        tags: ["SQL", "Database", "Design", "Backend"],
        isFeatured: false,
        isNew: false,
        progress: 0
      },
      {
        id: 8,
        title: "DevOps & Cloud Computing",
        author: "Robert Taylor",
        type: "course",
        category: "DevOps",
        difficulty: "Advanced",
        rating: 4.8,
        reviews: 63,
        duration: "20 hours",
        lessons: 35,
        thumbnail: "☁️",
        description: "Master DevOps practices and cloud computing with AWS, Docker, and Kubernetes.",
        tags: ["DevOps", "AWS", "Docker", "Kubernetes"],
        isFeatured: true,
        isNew: false,
        progress: 0
      }
    ];

    setResources(mockResources);
    setFilteredResources(mockResources);
  }, []);

  // Filter resources based on current filters
  useEffect(() => {
    let filtered = resources.filter(resource => {
      const matchesSearch = filters.search === '' || 
        resource.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        resource.author.toLowerCase().includes(filters.search.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      
      const matchesCategory = filters.category === 'all' || resource.category === filters.category;
      const matchesDifficulty = filters.difficulty === 'all' || resource.difficulty === filters.difficulty;
      const matchesType = filters.type === 'all' || resource.type === filters.type;
      const matchesRating = filters.rating === 'all' || resource.rating >= parseFloat(filters.rating);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesRating;
    });

    // Sort resources
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredResources(filtered);
  }, [filters, resources, sortBy]);

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResource(null);
  };

  const handleStartLearning = (resourceId) => {
    console.log(`Starting resource: ${resourceId}`);
    // In real app, this would navigate to the course/ebook
    alert(`Starting ${resources.find(r => r.id === resourceId).title}`);
  };

  return (
    <div className="e-library">
      {/* <LibraryHeader 
        searchQuery={filters.search}
        onSearchChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
        resultCount={filteredResources.length}
      /> */}
      
      <div className="e-library__content">
        <FilterSidebar 
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        
        <ResourceGrid 
          resources={filteredResources}
          onResourceClick={handleResourceClick}
          onStartLearning={handleStartLearning}
        />
      </div>

      {isModalOpen && selectedResource && (
        <ResourceModal 
          resource={selectedResource}
          onClose={handleCloseModal}
          onStartLearning={handleStartLearning}
        />
      )}
    </div>
  );
};

export default ELibrary;