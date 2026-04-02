import React, { useState } from 'react';
import './UserForm.css';

const UserForm = () => {
  // 1. State for form data
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  // 2. State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.includes('@')) newErrors.email = "Invalid email format";
    if (formData.password.length < 6) newErrors.password = "Password must be 6+ chars";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Form Submitted Successfully!");
      console.log("User Data:", formData);
      setErrors({});
      setFormData({ name: '', email: '', password: '' }); // Reset form
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="input-group">
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserForm;