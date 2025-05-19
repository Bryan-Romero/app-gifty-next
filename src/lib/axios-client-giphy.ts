import axios, { CreateAxiosDefaults } from "axios";

const baseURL = process.env.NEXT_PUBLIC_GIPHY_API_URL;
const api_key = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

const defaultOptions: CreateAxiosDefaults<any> = {
  baseURL,
  params: {
    api_key,
  },
};

const ApiClientGiphy = axios.create(defaultOptions);

ApiClientGiphy.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

export default ApiClientGiphy;
