import axios from 'axios';

const instance = axios.create( {
    baseURL : 'https://weather-1-9f485.firebaseio.com/',

});
export default instance;