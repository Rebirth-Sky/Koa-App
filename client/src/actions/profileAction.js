import axios from 'axios';
import { GET_PROFILE, Get_Profile_By_Handle, GET_PROFILES, SET_CURRENT_USER, PROFILE_LOADING, Clear_Current_Profile, GET_ERRORS } from '../actions/types'


export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get("api/profile")
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payLoad: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_PROFILE,
            payLoad: {}
        })
        );
}
export const createProfile = (profileData, history) => dispatch => {
    console.log(profileData);
    axios.post("/api/profile", profileData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        )
}
export const deleteAccount = () => dispatch => {
    axios.delete("/api/profile")
        .then(res => dispatch({
            type: SET_CURRENT_USER,
            payLoad: {}
        }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        )
}
/*添加个人经历*/
export const addExperience = (profileData, history) => dispatch => {
    axios.post("/api/profile/experience", profileData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
/*添加教育经历*/
export const addEducation = (profileData, history) => dispatch => {
    axios.post("/api/profile/education", profileData)
        .then(res => history.push("/dashboard"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        )
}

// 删除个人履历
export const deleteExperience = id => dispatch => {
    axios.delete(`/api/profile/experience/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// 删除教育经历
export const deleteEducation = id => dispatch => {
    axios.delete(`/api/profile/education/${id}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payLoad: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response
            })
        )
}
//获取所有开发者信息
export const getProfiles = () => dispatch => {
    axios.get('/api/profile/all')
        .then(res =>
            dispatch({
                type: GET_PROFILES,
                payLoad: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILES,
                payLoad: {}
            })
        )
}
//通过handle获取用户信息
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`)
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payLoad: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_PROFILE,
                payLoad: {}
            })
        )
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
export const clearCurrentProfile = () => {
    return {
        type: Clear_Current_Profile
    }
}