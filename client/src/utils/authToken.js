import axios from 'axios'

const setAuthToken = token => {
    if (token) {
        //headers 每个请求都要用到
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}
export default setAuthToken;