import React, { useState } from "react";
import axios from "axios";
import "./CreateTest.css"; // Import the CSS file

const CreateTest = () => {
  const [form, setForm] = useState({
    title: "",
    subcategory: "",
    difficulty: "medium",
    duration: 30,
    passingScore: 60,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/test/", form);
      const data = res.data;
      console.log(data);

      alert("✅ Test Created Successfully!");
      // localStorage.setItem("testId", data.test._id);
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="create-test-form">
      <form onSubmit={handleSubmit}>
        <h2>Create a New Test</h2>

        <div className="form-group">
          <label>Test Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter test title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quiz Title / Subcategory</label>
          <input
            type="text"
            name="subcategory"
            placeholder="Enter quiz title"
            value={form.subcategory}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="form-group">
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            placeholder="e.g. 30"
            value={form.duration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Passing Score (%)</label>
          <input
            type="number"
            name="passingScore"
            placeholder="e.g. 60"
            value={form.passingScore}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create Test</button>
      </form>
    </div>
  );
};

export default CreateTest;
