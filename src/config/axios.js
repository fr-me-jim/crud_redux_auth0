import axios from 'axios';


const axiosClient = axios.create({
    baseURL: 'https://ad-exploratoria-db.herokuapp.com'
});

export default axiosClient;