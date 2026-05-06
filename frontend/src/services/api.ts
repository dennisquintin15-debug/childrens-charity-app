import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  register: (data: any) => apiClient.post('/auth/register', data),
  login: (data: any) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  getMe: () => apiClient.get('/auth/me'),
};

// Donations API
export const donationsAPI = {
  getAll: () => apiClient.get('/donations'),
  getById: (id: string) => apiClient.get(`/donations/${id}`),
  create: (data: any) => apiClient.post('/donations', data),
  updateStatus: (id: string, status: string) => apiClient.put(`/donations/${id}/status`, { status }),
};

// Chat API
export const chatAPI = {
  getMessages: () => apiClient.get('/chat/messages'),
  sendMessage: (data: any) => apiClient.post('/chat/messages', data),
  markAsRead: (id: string) => apiClient.put(`/chat/messages/${id}/read`),
  getUnreadCount: () => apiClient.get('/chat/unread/count'),
};

// Media API
export const mediaAPI = {
  getAll: (type?: string) => apiClient.get('/media', { params: { type } }),
  getById: (id: string) => apiClient.get(`/media/${id}`),
  upload: (data: any) => apiClient.post('/media', data),
  like: (id: string) => apiClient.post(`/media/${id}/like`),
};

// Tips API
export const tipsAPI = {
  getAll: (status?: string) => apiClient.get('/tips', { params: { status } }),
  getById: (id: string) => apiClient.get(`/tips/${id}`),
  create: (data: any) => apiClient.post('/tips', data),
  upvote: (id: string) => apiClient.post(`/tips/${id}/upvote`),
  downvote: (id: string) => apiClient.post(`/tips/${id}/downvote`),
  updateStatus: (id: string, status: string) => apiClient.put(`/tips/${id}/status`, { status }),
};

export default apiClient;
