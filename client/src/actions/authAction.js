import { GET_ERRORS, SET_CURRENT_USER } from './types'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import setAuthToken from '../utils/authToken'

export const registerUser = (userData, history) => dispatch => {
    axios.post("/api/users/register", userData)
        .then(res => history.push("/login")) //注册成功跳转到登录页面
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        );
}

export const loginUser = (userData, history) => dispatch => {
    axios.post("/api/users/login", userData)
        .then(res => {
            const { token } = res.data;
            //存储token到LS
            localStorage.setItem("jwtToken", token);
            //设置axios的headers token
            setAuthToken(token);

            //解析token
            const decoded = jwt_decode(token) || {};
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}
export const logoutUser = (history) => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));

}
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payLoad: decoded
    }
}