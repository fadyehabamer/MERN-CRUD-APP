// Backend base URL. Override with VITE_API_URL (e.g. in client/.env.local)
// to point the client at a local server such as http://localhost:3001.
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://mern-crud-app-cig8.onrender.com';
