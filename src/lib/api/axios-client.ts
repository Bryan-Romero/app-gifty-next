import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const api_key = process.env.NEXT_PUBLIC_API_KEY

const ApiClient = axios.create({
  baseURL,
  headers: {
    'x-api-key': api_key,
    'Content-Type': 'application/json',
  },
  // timeout: 10000, // 10 seconds
})

// Request interceptor (optional)
ApiClient.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url)
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor (optional)
ApiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', response.status, response.config.url)
    }
    return response
  },
  (error) => {
    // Global error handling in development
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', error.response?.status, error.config?.url)
    }

    return Promise.reject(error)
  }
)

export default ApiClient
