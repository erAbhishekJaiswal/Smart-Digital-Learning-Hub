// ApplyPopup.js
import React, { useState } from 'react';
import './ApplyPopup.css';

const ApplyPopup = ({ job, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    portfolio: '',
    linkedin: '',
    salaryExpectation: '',
    noticePeriod: '',
    source: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    if (!formData.salaryExpectation.trim()) newErrors.salaryExpectation = 'Salary expectation is required';
    if (!formData.noticePeriod.trim()) newErrors.noticePeriod = 'Notice period is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep === 2 && validateStep2()) {
      onSubmit(formData);
      onClose();
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
        portfolio: '',
        linkedin: '',
        salaryExpectation: '',
        noticePeriod: '',
        source: ''
      });
      setCurrentStep(1);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="apply-popup-overlay" onClick={handleOverlayClick}>
      <div className="apply-popup-container">
        {/* Header */}
        <div className="popup-header">
          <div className="popup-job-info">
            <h3 className="popup-job-title">{job?.title}</h3>
            <p className="popup-company-name">{job?.company} • {job?.location}</p>
          </div>
          <button className="popup-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Progress Steps */}
        <div className="application-steps">
          <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Personal Info</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Application Details</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="application-form">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="form-step">
              <h4 className="step-title">Personal Information</h4>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="resume" className="form-label">
                    Upload Resume *
                  </label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onChange={handleInputChange}
                      className="file-input"
                      accept=".pdf,.doc,.docx"
                    />
                    <label htmlFor="resume" className="file-upload-label">
                      <div className="upload-icon">📄</div>
                      <div className="upload-text">
                        <span className="upload-title">Click to upload resume</span>
                        <span className="upload-subtitle">PDF, DOC, DOCX (Max 5MB)</span>
                      </div>
                    </label>
                  </div>
                  {formData.resume && (
                    <div className="file-preview">
                      ✅ {formData.resume.name}
                    </div>
                  )}
                  {errors.resume && <span className="error-message">{errors.resume}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="linkedin" className="form-label">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="portfolio" className="form-label">
                    Portfolio/Website
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="button" className="btn-primary" onClick={handleNext}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Application Details */}
          {currentStep === 2 && (
            <div className="form-step">
              <h4 className="step-title">Application Details</h4>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="coverLetter" className="form-label">
                    Cover Letter *
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className={`form-textarea ${errors.coverLetter ? 'error' : ''}`}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    rows="6"
                  />
                  {errors.coverLetter && <span className="error-message">{errors.coverLetter}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="salaryExpectation" className="form-label">
                    Salary Expectation *
                  </label>
                  <input
                    type="text"
                    id="salaryExpectation"
                    name="salaryExpectation"
                    value={formData.salaryExpectation}
                    onChange={handleInputChange}
                    className={`form-input ${errors.salaryExpectation ? 'error' : ''}`}
                    placeholder="$80,000 - $100,000"
                  />
                  {errors.salaryExpectation && <span className="error-message">{errors.salaryExpectation}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="noticePeriod" className="form-label">
                    Notice Period *
                  </label>
                  <select
                    id="noticePeriod"
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                    className={`form-select ${errors.noticePeriod ? 'error' : ''}`}
                  >
                    <option value="">Select notice period</option>
                    <option value="immediately">Immediately</option>
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2 months">2 months</option>
                    <option value="3 months">3 months</option>
                  </select>
                  {errors.noticePeriod && <span className="error-message">{errors.noticePeriod}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="source" className="form-label">
                    How did you hear about this position?
                  </label>
                  <select
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">Select source</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="indeed">Indeed</option>
                    <option value="company_website">Company Website</option>
                    <option value="referral">Employee Referral</option>
                    <option value="job_board">Job Board</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-summary">
                <h5>Application Summary</h5>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-label">Position:</span>
                    <span className="summary-value">{job?.title}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Company:</span>
                    <span className="summary-value">{job?.company}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Name:</span>
                    <span className="summary-value">{formData.fullName}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Email:</span>
                    <span className="summary-value">{formData.email}</span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="btn-primary submit-btn">
                  Submit Application
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplyPopup;