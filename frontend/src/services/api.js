import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
});

// Attach JWT automatically on each request
API.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

export default API;

/* ======================== AUTH UTILITIES ======================== */

/**
 * Sets or removes the authentication token in localStorage and API default headers.
 * @param {string|null} token - Token to set, or null to clear.
 */
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('token', token);
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
  }
}

/**
 * Gets the current authentication token from localStorage.
 * @returns {string|null} The token if it exists, otherwise null.
 */
export function getAuthToken() {
  return localStorage.getItem('token');
}

/**
 * Clears the authentication token from localStorage and API default headers.
 */
export function clearAuthToken() {
  localStorage.removeItem('token');
  delete API.defaults.headers.common['Authorization'];
}

/**
 * Sets the user's role in localStorage.
 * @param {string} role - The user's role to set.
 */
export function setUserRole(role) {
  localStorage.setItem('role', role);
}

/**
 * Gets the user's role from localStorage.
 * @returns {string|null} The user's role if it exists, otherwise null.
 */
export function getUserRole() {
  return localStorage.getItem('role');
}

/**
 * Clears the user's role from localStorage.
 */
export function clearUserRole() {
  localStorage.removeItem('role');
}

/**
 * Checks if the user is authenticated by verifying the presence of a token.
 * @returns {boolean} True if authenticated, otherwise false.
 */
export function isAuthenticated() {
  return !!getAuthToken();
}

/**
 * Checks if the user has a specific role.
 * @param {string} role - The role to check against.
 * @returns {boolean} True if the user has the specified role, otherwise false.
 */
export function hasRole(role) {
  return getUserRole() === role;
}

/**
 * Clears all authentication-related data from localStorage and API headers.
 */
export function clearAuthData() {
  clearAuthToken();
  clearUserRole();
}

/**
 * Sets the authentication token and user role in localStorage and API headers.
 * @param {string} token - The authentication token.
 * @param {string} role - The user's role.
 */
export function setAuthData(token, role) {
  setAuthToken(token);
  setUserRole(role);
}

/**
 * Gets the current authentication data including token and role.
 * @returns {{ token: string|null, role: string|null }}
 */
export function getAuthData() {
  return {
    token: getAuthToken(),
    role: getUserRole(),
  };
}

/**
 * Checks if the user is authenticated and has a specific role.
 * @param {string} role - The role to check against.
 * @returns {boolean} True if authenticated and has the specified role, otherwise false.
 */
export function isAuthenticatedWithRole(role) {
  return isAuthenticated() && hasRole(role);
}