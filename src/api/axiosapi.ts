import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://book-repository-api-hy1l.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
