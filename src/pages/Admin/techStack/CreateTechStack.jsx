import React, { useState } from 'react';
import axios from 'axios';
import '../../../CSSFiles/Admin/CreateTeckStack.css'; // Optional: for styling

const CreateTechStack = () => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [popularityScore, setPopularityScore] = useState('');
  const [subcategories, setSubcategories] = useState([{ name: '', description: '' }]);
  const [message, setMessage] = useState('');

  const handleSubcategoryChange = (index, field, value) => {
    const updatedSubcategories = [...subcategories];
    updatedSubcategories[index][field] = value;
    setSubcategories(updatedSubcategories);
  };

  const addSubcategory = () => {
    setSubcategories([...subcategories, { name: '', description: '' }]);
  };

  const removeSubcategory = (index) => {
    const updated = [...subcategories];
    updated.splice(index, 1);
    setSubcategories(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/techstack/', {
        name,
        icon,
        description,
        popularityScore,
        subcategories,
      });

      if (response.status === 201) {
        setMessage('Tech Stack created successfully!');
        // Optionally clear form
        setName('');
        setIcon('');
        setDescription('');
        setPopularityScore('');
        setSubcategories([{ name: '', description: '' }]);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating tech stack.');
    }
  };

  return (
    // <div className="create-techstack-wrapper">
    //   <h2>Create New Tech Stack</h2>
    //   <form onSubmit={handleSubmit} className="create-techstack-form">
    //     <label>
    //       Name <span>*</span>
    //       <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
    //     </label>

    //     <label>
    //       Icon (emoji or image URL)
    //       <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} />
    //     </label>

    //     <label>
    //       Description
    //       <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
    //     </label>

    //     <label>
    //       Popularity Score (%)
    //       <input
    //         type="number"
    //         value={popularityScore}
    //         onChange={(e) => setPopularityScore(e.target.value)}
    //         min="0"
    //         max="100"
    //       />
    //     </label>

    //     <div className="subcategories-section">
    //       <h3>Subcategories</h3>
    //       {subcategories.map((sub, index) => (
    //         <div key={index} className="subcategory-item">
    //           <input
    //             type="text"
    //             placeholder="Subcategory Name"
    //             value={sub.name}
    //             onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)}
    //             required
    //           />
    //           <input
    //             type="text"
    //             placeholder="Subcategory Description"
    //             value={sub.description}
    //             onChange={(e) => handleSubcategoryChange(index, 'description', e.target.value)}
    //           />
    //           {subcategories.length > 1 && (
    //             <button type="button" onClick={() => removeSubcategory(index)} className="remove-btn">
    //               ❌
    //             </button>
    //           )}
    //         </div>
    //       ))}
    //       <button type="button" onClick={addSubcategory} className="add-btn">
    //         ➕ Add Subcategory
    //       </button>
    //     </div>

    //     <button type="submit" className="submit-btn">
    //       Create Tech Stack
    //     </button>
    //     {message && <p className="form-message">{message}</p>}
    //   </form>
    // </div>
    <div className="cts-wrapper">
  <h2>Create New Tech Stack</h2>
  <form onSubmit={handleSubmit} className="cts-form">
    <label>
      Name <span>*</span>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
    </label>

    <label>
      Icon (emoji or image URL)
      <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} />
    </label>

    <label>
      Description
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
    </label>

    <label>
      Popularity Score (%)
      <input
        type="number"
        value={popularityScore}
        onChange={(e) => setPopularityScore(e.target.value)}
        min="0"
        max="100"
      />
    </label>

    <div className="cts-subcategories">
      <h3>Subcategories</h3>
      {subcategories.map((sub, index) => (
        <div key={index} className="cts-subcategory-item">
          <input
            type="text"
            placeholder="Subcategory Name"
            value={sub.name}
            onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Subcategory Description"
            value={sub.description}
            onChange={(e) => handleSubcategoryChange(index, 'description', e.target.value)}
          />
          {subcategories.length > 1 && (
            <button type="button" onClick={() => removeSubcategory(index)} className="cts-remove-btn">
              ❌
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addSubcategory} className="cts-add-btn">
        ➕ Add Subcategory
      </button>
    </div>

    <button type="submit" className="cts-submit-btn">
      Create Tech Stack
    </button>
    {message && <p className="cts-message">{message}</p>}
  </form>
</div>

  );
};

export default CreateTechStack;
