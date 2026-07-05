import axios from 'axios'

// Backend URL
const API_BASE_URL = 'http://localhost:5000/api'

// Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor - Automatically token add karo
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor - Token expire ho jaye toh logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ===== AUTH APIs =====
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  resendOTP: (data) => api.post('/auth/resend-otp', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  verifyResetOTP: (data) => api.post('/auth/verify-reset-otp', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
}

// ===== USER APIs =====
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  getMT5Account: () => api.get('/user/mt5'),
  requestPayout: (data) => api.post('/user/payout', data),
  getMyPayouts: () => api.get('/user/payouts'),
  applyPromo: (data) => api.post('/user/promo/apply', data),
  getReferralInfo: () => api.get('/user/referral'),
}

// ===== ADMIN APIs =====
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getAllUsers: () => api.get('/admin/users'),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  banUser: (id) => api.put(`/admin/users/${id}/ban`),
  unbanUser: (id) => api.put(`/admin/users/${id}/unban`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  assignMT5: (data) => api.post('/admin/mt5/assign', data),
  createPromo: (data) => api.post('/admin/promo', data),
  getAllPromos: () => api.get('/admin/promo'),
  deletePromo: (id) => api.delete(`/admin/promo/${id}`),
  getPayouts: () => api.get('/admin/payouts'),
  updatePayout: (id, data) => api.put(`/admin/payouts/${id}`, data),
  addSuccessStory: (data) => api.post('/admin/stories', data),
  getSuccessStories: () => api.get('/admin/stories'),
  deleteStory: (id) => api.delete(`/admin/stories/${id}`),
}

export default api