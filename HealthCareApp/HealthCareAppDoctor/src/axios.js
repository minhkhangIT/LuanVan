import axios from 'axios';
import { REACT_APP_BACKEND_URL } from '@env'

const instance = axios.create({
    baseURL: "http://192.168.43.7:3001"
});

instance.interceptors.response.use(
    (response) => {
        return response.data;
    }
);

export default instance;