// Register.js
import React, { useState } from 'react';
import '../App.css'; // Import CSS styles
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({username: '', password: ''})

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', formData)
      console.log(res.data);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            name='username'
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

