// ContactUs.js
import React, { useState } from 'react';
import '../../CSSFiles/PublicPages/Contact.css';
// import ContactHeader from './components/ContactHeader';
// import ContactForm from './components/ContactForm';
// import ContactInfo from './components/ContactInfo';
// import SupportTeam from './components/SupportTeam';
// import FAQSection from './components/FAQSection';
import { FcBusinessman } from "react-icons/fc";
import { FcBusinesswoman } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
const Contact = () => {
  const [activeTab, setActiveTab] = useState('general');
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    priority: 'medium',
    message: '',
    attachment: null
  });

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Technical Support Lead',
      email: 'sarah@elearning.com',
      avatar: <FcBusinessman />,
      specialty: 'Platform Issues & Bugs',
      availability: 'Online',
      responseTime: '15 min'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Billing Specialist',
      email: 'mike@elearning.com',
      avatar: <FcBusinessman />,
      specialty: 'Payments & Subscriptions',
      availability: 'Online',
      responseTime: '30 min'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Content Manager',
      email: 'emily@elearning.com',
      avatar: <FcBusinesswoman />,
      specialty: 'Course Content & Materials',
      availability: 'Away',
      responseTime: '2 hours'
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      role: 'Partnership Manager',
      email: 'alex@elearning.com',
      avatar: <FcManager />,
      specialty: 'Business & Collaborations',
      availability: 'Online',
      responseTime: '1 hour'
    }
  ];

   const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Send us an email anytime',
      details: 'support@elearning.com',
      action: 'mailto:support@elearning.com',
      color: 'contact-method--primary'
    },
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 6pm',
      details: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      color: 'contact-method--secondary'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: '24/7 instant support',
      details: 'Start Chat',
      action: '#chat',
      color: 'contact-method--accent'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Our main office',
      details: '123 Education St, Learning City',
      action: '#map',
      color: 'contact-method--info'
    }
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'technical', label: 'Technical Support', icon: '🔧' },
    { value: 'billing', label: 'Billing Issue', icon: '💰' },
    { value: 'feature', label: 'Feature Request', icon: '💡' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#48bb78' },
    { value: 'medium', label: 'Medium', color: '#ed8936' },
    { value: 'high', label: 'High', color: '#f56565' },
    { value: 'urgent', label: 'Urgent', color: '#e53e3e' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      attachment: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: 'general',
      priority: 'medium',
      message: '',
      attachment: null
    });
    
    alert('Message sent successfully! We\'ll get back to you soon.');
  };

   const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I reset my admin password?",
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page. A reset link will be sent to your registered email address. Alternatively, contact our support team for immediate assistance.",
      category: "Account"
    },
    {
      question: "Can I export course analytics data?",
      answer: "Yes, you can export course analytics in CSV or Excel format. Go to Analytics > Reports section and use the export feature. For large datasets, it might take a few minutes to process.",
      category: "Analytics"
    },
    {
      question: "How do I add new instructors to the platform?",
      answer: "Navigate to Users > Instructors and click 'Add New Instructor'. You'll need to provide their email, assign permissions, and set up their profile. They'll receive an invitation email to complete registration.",
      category: "Users"
    },
    {
      question: "What's the process for course approval?",
      answer: "New courses go through a review process. Submit the course for review, our team will check content quality, and you'll receive feedback within 24-48 hours. You can track status in the Courses dashboard.",
      category: "Courses"
    },
    {
      question: "How do I set up payment gateways?",
      answer: "Go to Settings > Payments to configure payment gateways. We support Stripe, PayPal, and bank transfers. Each gateway requires specific API keys and configuration settings.",
      category: "Billing"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="contact-us-admin">
      {/* <ContactHeader /> */}
    <section className="contact-header">
      <div className="contact-header__container">
        <div className="contact-header__content">
          <h1 className="contact-header__title">
            Get in <span className="contact-header__highlight">Touch</span>
          </h1>
          <p className="contact-header__subtitle">
            We're here to help you succeed. Reach out to our support team for any questions, 
            technical issues, or partnership opportunities.
          </p>
          <div className="contact-header__stats">
            <div className="contact-stat">
              <div className="contact-stat__icon">⏱️</div>
              <div className="contact-stat__info">
                <div className="contact-stat__value">Under 2 Hours</div>
                <div className="contact-stat__label">Average Response Time</div>
              </div>
            </div>
            <div className="contact-stat">
              <div className="contact-stat__icon">✅</div>
              <div className="contact-stat__info">
                <div className="contact-stat__value">98%</div>
                <div className="contact-stat__label">Issue Resolution Rate</div>
              </div>
            </div>
            <div className="contact-stat">
              <div className="contact-stat__icon">👥</div>
              <div className="contact-stat__info">
                <div className="contact-stat__value">24/7</div>
                <div className="contact-stat__label">Support Available</div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-header__visual">
          <div className="contact-header__graphic">
            <div className="contact-header__orb contact-header__orb--1"></div>
            <div className="contact-header__orb contact-header__orb--2"></div>
            <div className="contact-header__orb contact-header__orb--3"></div>
            <div className="contact-header__main-illustration">💬</div>
          </div>
        </div>
      </div>
    </section>
      
      <div className="contact-us-admin__content">
        <div className="contact-us-admin__main">
          {/* <ContactForm activeTab={activeTab} setActiveTab={setActiveTab} /> */}
          <section className="contact-form-section">
      <div className="contact-form-section__header">
        <h2 className="contact-form-section__title">Send us a Message</h2>
        <p className="contact-form-section__subtitle">
          Fill out the form below and our team will get back to you as soon as possible.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="contact-categories">
        {categories.map(category => (
          <button
            key={category.value}
            className={`contact-category-tab ${activeTab === category.value ? 'contact-category-tab--active' : ''}`}
            onClick={() => {
              setActiveTab(category.value);
              setFormData(prev => ({ ...prev, category: category.value }));
            }}
          >
            <span className="contact-category-tab__icon">{category.icon}</span>
            <span className="contact-category-tab__label">{category.label}</span>
          </button>
        ))}
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form__row">
          <div className="contact-form__group">
            <label className="contact-form__label">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="contact-form__input"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="contact-form__group">
            <label className="contact-form__label">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="contact-form__input"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>

        <div className="contact-form__row">
          <div className="contact-form__group">
            <label className="contact-form__label">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="contact-form__input"
              placeholder="Brief subject of your message"
              required
            />
          </div>
          
          <div className="contact-form__group">
            <label className="contact-form__label">Priority Level</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="contact-form__select"
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="contact-form__group">
          <label className="contact-form__label">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="contact-form__textarea"
            placeholder="Please describe your issue or question in detail..."
            rows="6"
            required
          ></textarea>
        </div>

        <div className="contact-form__group">
          <label className="contact-form__label">
            Attachment
            <span className="contact-form__optional"> (Optional)</span>
          </label>
          <div className="file-upload">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-upload__input"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="file-upload__label">
              <span className="file-upload__icon">📎</span>
              <span className="file-upload__text">
                {formData.attachment ? formData.attachment.name : 'Choose file or drag & drop here'}
              </span>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          className={`contact-form__submit ${isSubmitting ? 'contact-form__submit--loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="contact-form__spinner"></div>
              Sending Message...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </section>
          {/* <SupportTeam /> */}
             <section className="support-team">
      <div className="support-team__header">
        <h3 className="support-team__title">Meet Our Support Team</h3>
        <p className="support-team__subtitle">
          Get direct help from our dedicated support specialists
        </p>
      </div>

      <div className="support-team__grid">
        {teamMembers.map(member => (
          <div key={member.id} className="team-member-card">
            <div className="team-member-card__header">
              <div className="team-member-card__avatar">{member.avatar}</div>
              <div className="team-member-card__status">
                <div className={`status-indicator status-indicator--${member.availability.toLowerCase()}`}>
                  {member.availability}
                </div>
              </div>
            </div>
            
            <div className="team-member-card__body">
              <h4 className="team-member-card__name">{member.name}</h4>
              <p className="team-member-card__role">{member.role}</p>
              <p className="team-member-card__specialty">{member.specialty}</p>
              
              <div className="team-member-card__meta">
                <div className="meta-item">
                  <span className="meta-item__label">Response Time</span>
                  <span className="meta-item__value">{member.responseTime}</span>
                </div>
              </div>
            </div>
            
            <div className="team-member-card__footer">
              <a href={`mailto:${member.email}`} className="team-member-card__contact">
                Contact {member.name.split(' ')[0]}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
        </div>
        
        <div className="contact-us-admin__sidebar">
          {/* <ContactInfo /> */}
              <section className="contact-info">
      <div className="contact-info__header">
        <h3 className="contact-info__title">Contact Information</h3>
        <p className="contact-info__subtitle">
          Multiple ways to get in touch with our team
        </p>
      </div>

      <div className="contact-methods">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.action}
            className={`contact-method ${method.color}`}
          >
            <div className="contact-method__icon">{method.icon}</div>
            <div className="contact-method__content">
              <h4 className="contact-method__title">{method.title}</h4>
              <p className="contact-method__description">{method.description}</p>
              <span className="contact-method__details">{method.details}</span>
            </div>
            <div className="contact-method__arrow">→</div>
          </a>
        ))}
      </div>

      <div className="office-hours">
        <h4 className="office-hours__title">Office Hours</h4>
        <div className="office-hours__list">
          <div className="office-hour">
            <span className="office-hour__day">Monday - Friday</span>
            <span className="office-hour__time">8:00 AM - 6:00 PM</span>
          </div>
          <div className="office-hour">
            <span className="office-hour__day">Saturday</span>
            <span className="office-hour__time">9:00 AM - 4:00 PM</span>
          </div>
          <div className="office-hour">
            <span className="office-hour__day">Sunday</span>
            <span className="office-hour__time">Emergency Support Only</span>
          </div>
        </div>
      </div>
    </section>
          {/* <FAQSection /> */}
           <section className="faq-section">
      <div className="faq-section__header">
        <h3 className="faq-section__title">Frequently Asked Questions</h3>
        <p className="faq-section__subtitle">
          Quick answers to common questions
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'faq-item--open' : ''}`}
          >
            <button 
              className="faq-item__question"
              onClick={() => toggleFAQ(index)}
            >
              <span className="faq-item__category">{faq.category}</span>
              <span className="faq-item__text">{faq.question}</span>
              <span className="faq-item__icon">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            
            <div className="faq-item__answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-cta">
        <p className="faq-cta__text">
          Still have questions? We're here to help!
        </p>
        <a href="#contact" className="faq-cta__button">
          Get Personalized Help
        </a>
      </div>
    </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;