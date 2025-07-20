import axios, { AxiosError, CreateAxiosDefaults } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const api_key = process.env.NEXT_PUBLIC_API_KEY

const defaultOptions: CreateAxiosDefaults = {
  baseURL,
  headers: {
    'x-api-key': api_key,
    'Content-Type': 'application/json',
  },
}

const ApiClient = axios.create(defaultOptions)

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      if (!error.response) {
        // Es un error de red (Network Error, timeout, etc.)
        // Could not connect to the server
        throw new Error('Something went wrong, please try again later')
      }
      // Es un error HTTP (con status code)
      throw error
    }
    throw new Error('Unknown error')
  }
)

export default ApiClient
