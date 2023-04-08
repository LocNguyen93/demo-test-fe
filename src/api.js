import axios from 'axios';

const axiosClient = axios.create();

const baseUrl = process.env.REACT_APP_API_ENDPOINT
axiosClient.defaults.baseURL = baseUrl;

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

export default axiosClient