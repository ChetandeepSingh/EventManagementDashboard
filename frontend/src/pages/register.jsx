import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import './Register.css';
import API from '../services/api.js';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'User'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (form.password.length < 8) e.password = 'At least 8 chars';
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords must match';
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
    } else {
      try {
        await API.post('/users/register', {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role
        });
        navigate('/');
      } catch (err) {
        setErrors({ api: err.response?.data?.error || 'Registration failed' });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <small className="error">{errors.password}</small>}
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && (
              <small className="error">{errors.confirmPassword}</small>
            )}
          </label>

          <label>
            Role
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="User">User</option>
              <option value="Organizer">Organizer</option>
            </select>
          </label>
          <button type="submit" className="auth-btn">
            Sign Up
          </button>
          {errors.api && <small className="error">{errors.api}</small>}
        </form>
        <p className="switch-text">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}