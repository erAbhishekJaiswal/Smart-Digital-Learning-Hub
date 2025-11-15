import React from 'react';
import '../../CSSFiles/PublicPages/About.css'; // Rename your CSS file accordingly

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Olivia Thompson",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop&crop=face",
      bio: "Visionary leader with a passion for innovation and customer success.",
      skills: ["Leadership", "Strategy", "Customer Experience"]
    },
    {
      id: 2,
      name: "James Anderson",
      role: "Head of Marketing",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face",
      bio: "Driven by storytelling and building meaningful brand connections.",
      skills: ["Digital Marketing", "Branding", "Growth"]
    },
    {
      id: 3,
      name: "Sophia Lee",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
      bio: "Creative designer with an eye for aesthetics and user experience.",
      skills: ["UX/UI", "Visual Design", "Creative Direction"]
    },
    {
      id: 4,
      name: "Daniel Green",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face",
      bio: "Focused on delivering impactful products that delight users.",
      skills: ["Product Strategy", "User Research", "Agile Development"]
    }
  ];

  const features = [
    {
      icon: "🚀",
      title: "Innovation",
      description: "Building cutting-edge solutions that drive progress."
    },
    {
      icon: "🌍",
      title: "Global Reach",
      description: "Connecting people and businesses across the globe."
    },
    {
      icon: "🤝",
      title: "Customer-Centric",
      description: "Putting customers at the heart of everything we do."
    },
    {
      icon: "📱",
      title: "Modern Technology",
      description: "Leveraging the latest tools to stay ahead of the curve."
    },
    {
      icon: "📈",
      title: "Growth Focused",
      description: "Committed to delivering scalable solutions for all."
    },
    {
      icon: "💡",
      title: "Creative Thinking",
      description: "Encouraging innovation and creative problem solving."
    }
  ];

  const stats = [
    { number: "100K+", label: "Happy Users" },
    { number: "50+", label: "Countries Served" },
    { number: "10M+", label: "Downloads" },
    { number: "7+", label: "Years of Innovation" }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🌟</span>
            About Us
          </div>
          <h1 className="hero-title">
            Empowering the Future of 
            <span className="highlight"> Digital Experiences</span>
          </h1>
          <p className="hero-description">
            We’re a team of passionate creators, designers, and innovators dedicated to building 
            world-class digital products that enhance lives and businesses globally.
          </p>
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p>
                To inspire and enable businesses and individuals to grow by delivering exceptional 
                digital experiences that combine creativity, technology, and purpose.
              </p>
              <div className="mission-points">
                <div className="mission-point">
                  <span className="point-icon">💎</span>
                  <div>
                    <h4>Quality</h4>
                    <p>Delivering top-tier experiences with attention to detail</p>
                  </div>
                </div>
                <div className="mission-point">
                  <span className="point-icon">📢</span>
                  <div>
                    <h4>Transparency</h4>
                    <p>Clear communication and honest relationships with users</p>
                  </div>
                </div>
                <div className="mission-point">
                  <span className="point-icon">🌱</span>
                  <div>
                    <h4>Sustainability</h4>
                    <p>Growing responsibly with future generations in mind</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mission-visual">
              <div className="visual-card">
                <div className="card-icon">📦</div>
                <h3>Product Excellence</h3>
                <p>Focused on delivering intuitive and powerful products</p>
              </div>
              <div className="visual-card">
                <div className="card-icon">🌐</div>
                <h3>Global Vision</h3>
                <p>Making a meaningful impact across the world</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>What We Offer</h2>
            <p>Explore how we bring value to our customers and partners</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate minds behind our journey</p>
          </div>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="member-overlay">
                    <div className="social-links">
                      <button className="social-btn">📧</button>
                      <button className="social-btn">💼</button>
                      <button className="social-btn">🌐</button>
                    </div>
                  </div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-skills">
                    {member.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>What we believe in and how we work</p>
          </div>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🌟</div>
              <h3>Excellence</h3>
              <p>Committed to delivering our best in every interaction</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💬</div>
              <h3>Respect</h3>
              <p>Valuing every individual and encouraging diverse voices</p>
            </div>
            <div className="value-item">
              <div className="value-icon">📖</div>
              <h3>Learning</h3>
              <p>Always improving, always evolving</p>
            </div>
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <h3>Passion</h3>
              <p>Driven by purpose and love for what we do</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Journey</h2>
            <p>We're always looking for partners, talent, and opportunities to grow</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Contact Us</button>
              <button className="cta-btn secondary">Careers</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
