import axios from "axios";

const phonecting = axios.create({
    baseURL: 'http://localhost:3000/api'
});
export default phonecting;
