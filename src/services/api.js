const API_URL = import.meta.env.VITE_API_URL;

// Helper function for API calls
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth APIs
export const authAPI = {
  login: (email, password) => 
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  register: (userData) => 
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  getProfile: () => 
    fetchAPI('/auth/profile'),
  
  updateProfile: (data) => 
    fetchAPI('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Product APIs
export const productAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return fetchAPI(`/products?${queryString}`);
  },
  
  getById: (id) => 
    fetchAPI(`/products/${id}`),
  
  getFeatured: () => 
    fetchAPI('/products/featured'),
  
  getByCategory: (category) => 
    fetchAPI(`/products/category/${category}`),
  
  search: (query) => 
    fetchAPI(`/products/search?q=${encodeURIComponent(query)}`),
};

// Category APIs
export const categoryAPI = {
  getAll: () => 
    fetchAPI('/categories'),
  
  getById: (id) => 
    fetchAPI(`/categories/${id}`),
  
  getBySlug: (slug) => 
    fetchAPI(`/categories/slug/${slug}`),
};

export default fetchAPI;
