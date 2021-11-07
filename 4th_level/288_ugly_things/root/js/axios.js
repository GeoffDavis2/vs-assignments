import axios from "axios";

// Base url
const instance = axios.create({
    baseURL: 'https://api.vschool.io/geoffdavis/thing'
});

export default instance;