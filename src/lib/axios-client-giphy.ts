import axios, { AxiosError, CreateAxiosDefaults } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_GIPHY_API_URL
const api_key = process.env.NEXT_PUBLIC_GIPHY_API_KEY

const defaultOptions: CreateAxiosDefaults<any> = {
  baseURL,
  params: {
    api_key,
  },
}

const ApiClientGiphy = axios.create(defaultOptions)

ApiClientGiphy.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      if (!error.response) {
        // Es un error de red (Network Error, timeout, etc.)
        // Could not connect to the Giphy server
        throw new Error('Something went wrong')
      }
      // Es un error HTTP (con status code)
      throw error
    }
    throw new Error('Unknown error')
  }
)

export default ApiClientGiphy
