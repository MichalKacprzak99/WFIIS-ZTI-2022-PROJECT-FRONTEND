import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = 'https://zti-restaurant-matcher.herokuapp.com/api/';
axios.defaults.headers['Content-Type'] = 'application/json';

export default axios.create();