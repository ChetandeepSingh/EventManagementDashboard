import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import './Login.css';
import API from '../services/api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email';
    if (!password.trim()) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
    } else {
      try {
        const { data } = await API.post('/users/login', { email, password });
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('role', data.user.role);
        navigate(data.user.role === 'Organizer' ? '/organizer-dashboard' : '/user-dashboard');
      } catch (err) {
        setErrors({ api: err.response?.data?.error || 'Login failed' });
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); }}
              className={errors.email ? 'input-error' : ''}
              placeholder="you@example.com"
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); }}
              className={errors.password ? 'input-error' : ''}
              placeholder="••••••••"
            />
            {errors.password && <small className="error">{errors.password}</small>}
          </label>

          <button type="submit" className="auth-btn">Sign In</button>
          {errors.api && <small className="error">{errors.api}</small>}
        </form>
        <p className="switch-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}