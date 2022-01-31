import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-6b3e1.firebaseio.com'
});

export default instance;