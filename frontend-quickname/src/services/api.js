// API Configuration
// Django project: quickmed, App: home
// Backend URL: http://localhost:8000
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

/**
 * Reviews API Service
 * Integrates with Django REST Framework backend
 * Project: quickmed, App: home
 */
export const reviewsAPI = {
  /**
   * Get all approved reviews from Django backend
   * Endpoint: GET /api/reviews/
   * @returns {Promise<Array>} Array of review objects
   */
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch reviews';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      // Handle paginated response (DRF default) or direct array
      return Array.isArray(data) ? data : (data.results || []);
    } catch (error) {
      console.error('Error fetching reviews from Django backend:', error);
      // Re-throw with more context
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  /**
   * Create a new review in Django backend
   * Endpoint: POST /api/reviews/
   * @param {Object} reviewData - Review data {name, email, rating, comment}
   * @returns {Promise<Object>} Created review object
   */
  create: async (reviewData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to create review';
        try {
          const errorData = JSON.parse(errorText);
          // Handle Django REST Framework validation errors
          if (errorData.non_field_errors) {
            errorMessage = errorData.non_field_errors.join(', ');
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else {
            // Handle field-specific errors
            const fieldErrors = Object.entries(errorData)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
              .join('; ');
            errorMessage = fieldErrors || errorMessage;
          }
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating review in Django backend:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  /**
   * Get a specific review by ID from Django backend
   * Endpoint: GET /api/reviews/{id}/
   * @param {number} id - Review ID
   * @returns {Promise<Object>} Review object
   */
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch review';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching review from Django backend:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },
};

/**
 * Authentication API Service
 * Handles signup and login for all user types
 */
export const authAPI = {
  /**
   * Sign up a new user
   * Endpoint: POST /api/auth/signup/
   * @param {Object} userData - User data with user_type, full_name, email, phone, password, etc.
   * @returns {Promise<Object>} Created user object
   */
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to create account';
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.non_field_errors) {
            errorMessage = errorData.non_field_errors.join(', ');
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else {
            // Handle field-specific errors
            const fieldErrors = Object.entries(errorData)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
              .join('; ');
            errorMessage = fieldErrors || errorMessage;
          }
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  /**
   * Login user
   * Endpoint: POST /api/auth/login/
   * @param {Object} credentials - {email, password, user_type}
   * @returns {Promise<Object>} User object with token/session info
   */
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Login failed';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },
};

/**
 * Profile API Service
 * Handles getting and updating user profiles for all user types
 */
export const profileAPI = {
  /**
   * Get user profile
   * Endpoint: GET /api/profile/?user_id={id}&user_type={type}
   * @param {number} userId - User ID
   * @param {string} userType - User type (user, vendor, delivery, doctor)
   * @returns {Promise<Object>} User profile object
   */
  get: async (userId, userType) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/?user_id=${userId}&user_type=${userType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch profile';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  /**
   * Update user profile
   * Endpoint: PUT /api/profile/update/
   * @param {Object} profileData - Profile data with user_id, user_type, and fields to update
   * @returns {Promise<Object>} Updated user profile object
   */
  update: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to update profile';
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.non_field_errors) {
            errorMessage = errorData.non_field_errors.join(', ');
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else {
            // Handle field-specific errors
            const fieldErrors = Object.entries(errorData)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
              .join('; ');
            errorMessage = fieldErrors || errorMessage;
          }
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },
};

/**
 * Doctors API Service
 * Handles fetching registered doctors for consultation booking
 */
export const doctorsAPI = {
  /**
   * Get all registered doctors
   * Endpoint: GET /api/doctors/
   * @returns {Promise<Array>} Array of doctor objects
   */
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/doctors/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch doctors';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data.doctors || [];
    } catch (error) {
      console.error('Error fetching doctors:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },
};

/**
 * Orders API Service
 * Handles creating and fetching orders
 */
export const ordersAPI = {
  /**
   * Get all orders for a user
   * Endpoint: GET /api/orders/?user_id={id}
   * @param {number} userId - User ID
   * @returns {Promise<Array>} Array of order objects
   */
  getUserOrders: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/?user_id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch orders';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data.orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  /**
   * Create a new order
   * Endpoint: POST /api/orders/create/
   * @param {Object} orderData - Order data with user_id, items, total, delivery_address, etc.
   * @returns {Promise<Object>} Created order object
   */
  createOrder: async (orderData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to create order';
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.non_field_errors) {
            errorMessage = errorData.non_field_errors.join(', ');
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          } else {
            const fieldErrors = Object.entries(errorData)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
              .join('; ');
            errorMessage = fieldErrors || errorMessage;
          }
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data.order;
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },

  /**
   * Get all orders for a vendor
   * Endpoint: GET /api/orders/vendor/?vendor_id={id}&status={status}
   * @param {number} vendorId - Vendor ID
   * @param {string} status - Optional status filter
   * @returns {Promise<Array>} Array of order objects
   */
  getVendorOrders: async (vendorId, status = null) => {
    try {
      // Ensure vendorId is a number/string
      const id = String(vendorId).trim();
      if (!id || id === 'undefined' || id === 'null') {
        throw new Error('Invalid vendor ID');
      }
      
      let url = `${API_BASE_URL}/api/orders/vendor/?vendor_id=${id}`;
      if (status) {
        url += `&status=${status}`;
      }
      
      console.log('Fetching vendor orders from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch vendor orders';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.detail || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        console.error('Vendor orders API error:', errorMessage);
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Vendor orders API response:', data);
      return data.orders || [];
    } catch (error) {
      console.error('Error fetching vendor orders:', error);
      console.error('Vendor ID used:', vendorId);
      if (error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.');
      }
      throw error;
    }
  },
};

