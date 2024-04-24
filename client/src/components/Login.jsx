// Login.js
import React, { useState } from 'react';
import '../App.css';
import Register from './Register'
import { Link } from 'react-router-dom' ;
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({username: '', password: ''})

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', formData);
      console.log(res);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/register"><button>Register</button></Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
