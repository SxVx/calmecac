import axios from 'axios';
import Config from 'react-native-config';

const axiosInstance = axios.create({
  baseURL: 'https://9a96-2806-262-487-140d-3d09-79eb-5b1-644f.ngrok.io',
});

export default axiosInstance;
