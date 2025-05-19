import axios, { CreateAxiosDefaults } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const api_key = process.env.NEXT_PUBLIC_API_KEY;

const defaultOptions: CreateAxiosDefaults<any> = {
  baseURL,
  headers: {
    "x-api-key": api_key,
    "Content-Type": "application/json",
  },
};

const ApiClient = axios.create(defaultOptions);

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

export default ApiClient;
