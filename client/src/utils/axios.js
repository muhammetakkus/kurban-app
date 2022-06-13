import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_ENV === "production" ? process.env.REACT_APP_API_PROD_BASE_URL : process.env.REACT_APP_API_LOCAL_BASE_URL;//process.env.REACT_APP_API_BASE_URL;
//axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    /* request.baseUrl - request.data - request.method - request.url */
    //console.log(request); 

    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    /* same as axios then return response */
    //console.log(response);
    
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

/*export default axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
})*/