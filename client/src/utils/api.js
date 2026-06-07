export const apiRequest = async (endpoint, options = {}) => {

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const storedUser = localStorage.getItem('slicecraft_user');
  let token = null;
  if (storedUser) {
    try {
      token = JSON.parse(storedUser)?.token;
    } catch (e) {
      console.error("Session evaluation failure:", e);
    }
  }

  const headers = { ...options.headers };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'System pipeline network anomaly recorded.');
  }

  return data;
};