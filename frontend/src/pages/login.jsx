import React, { useState } from 'react';

const AuthApp = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User'
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }
    
    return errors;
  };

  const validateSignup = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors[0]; // Show first error
        newErrors.passwordStrength = passwordErrors; // Store all errors for detailed display
      }
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = validateLogin();
    
    if (Object.keys(newErrors).length === 0) {
      
      alert(`Login successful for ${formData.email}`);
      
    } else {
      setErrors(newErrors);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const newErrors = validateSignup();
    
    if (Object.keys(newErrors).length === 0) {
      
      alert(`Account created successfully for ${formData.name} as ${formData.role}`);
      
      setCurrentPage('login');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'User'
      });
    } else {
      setErrors(newErrors);
    }
  };

  const switchPage = (page) => {
    setCurrentPage(page);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'User'
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '40px',
      minWidth: '400px',
      maxWidth: '450px',
      width: '100%',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '16px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '6px'
    },
    input: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    inputError: {
      borderColor: '#ef4444'
    },
    select: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '16px',
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none'
    },
    error: {
      color: '#ef4444',
      fontSize: '14px',
      marginTop: '4px'
    },
    passwordStrength: {
      marginTop: '8px',
      padding: '12px',
      backgroundColor: '#fef2f2',
      borderRadius: '6px',
      border: '1px solid #fecaca'
    },
    strengthTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#dc2626',
      marginBottom: '6px'
    },
    strengthList: {
      margin: 0,
      paddingLeft: '16px'
    },
    strengthItem: {
      fontSize: '13px',
      color: '#7f1d1d',
      marginBottom: '2px'
    },
    button: {
      backgroundColor: '#667eea',
      color: 'white',
      padding: '14px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '10px'
    },
    buttonHover: {
      backgroundColor: '#5a67d8',
      transform: 'translateY(-1px)'
    },
    switchText: {
      textAlign: 'center',
      marginTop: '24px',
      color: '#6b7280'
    },
    switchLink: {
      color: '#667eea',
      cursor: 'pointer',
      fontWeight: '500',
      textDecoration: 'none'
    }
  };

  const LoginPage = () => (
    <div style={styles.card}>
      <div style={styles.header}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to your event management account</p>
      </div>
      
      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              ...styles.input,
              ...(errors.email ? styles.inputError : {})
            }}
            placeholder="Enter your email"
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              ...styles.input,
              ...(errors.password ? styles.inputError : {})
            }}
            placeholder="Enter your password"
          />
          {errors.password && <span style={styles.error}>{errors.password}</span>}
        </div>

        <button type="button" style={styles.button} onClick={handleLogin}>
          Sign In
        </button>
      </div>

      <p style={styles.switchText}>
        Don't have an account?{' '}
        <span style={styles.switchLink} onClick={() => switchPage('signup')}>
          Sign up here
        </span>
      </p>
    </div>
  );

  const SignupPage = () => (
    <div style={styles.card}>
      <div style={styles.header}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join our event management platform</p>
      </div>
      
      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{
              ...styles.input,
              ...(errors.name ? styles.inputError : {})
            }}
            placeholder="Enter your full name"
          />
          {errors.name && <span style={styles.error}>{errors.name}</span>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              ...styles.input,
              ...(errors.email ? styles.inputError : {})
            }}
            placeholder="Enter your email"
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              ...styles.input,
              ...(errors.password ? styles.inputError : {})
            }}
            placeholder="Create a password"
          />
          {errors.password && <span style={styles.error}>{errors.password}</span>}
          {errors.passwordStrength && errors.passwordStrength.length > 0 && (
            <div style={styles.passwordStrength}>
              <div style={styles.strengthTitle}>Password Requirements:</div>
              <ul style={styles.strengthList}>
                {errors.passwordStrength.map((error, index) => (
                  <li key={index} style={styles.strengthItem}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            style={{
              ...styles.input,
              ...(errors.confirmPassword ? styles.inputError : {})
            }}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="User">User</option>
            <option value="Organizer">Organizer</option>
          </select>
        </div>

        <button type="button" style={styles.button} onClick={handleSignup}>
          Create Account
        </button>
      </div>

      <p style={styles.switchText}>
        Already have an account?{' '}
        <span style={styles.switchLink} onClick={() => switchPage('login')}>
          Sign in here
        </span>
      </p>
    </div>
  );

  return (
    <div style={styles.container}>
      {currentPage === 'login' ? <LoginPage /> : <SignupPage />}
    </div>
  );
};

export default AuthApp;