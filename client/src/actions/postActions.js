import axios from 'axios';
import { ADD_POST, GET_POSTS, GET_POST, DELETE_POST, POST_LOADDING, GET_ERRORS } from './types';

// 添加评论
export const addPost = postData => dispatch => {
    axios.post("/api/posts", postData)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payLoad: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        )
}

// 获取评论
export const getPosts = () => dispatch => {
    dispatch(setPostLoading);
    axios.get("/api/posts")
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payLoad: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payLoad: null
            })
        )
}

// 获取单条评论
export const getPost = id => dispatch => {
    dispatch(setPostLoading);
    axios.get(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payLoad: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
                payLoad: null
            })
        )
}

// 删除一条评论
export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payLoad: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        )
};

// 点赞
export const addLike = id => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(res =>
            window.location.reload()
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        )
};

// 取消点赞
export const removeLike = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
        .then(res =>
            window.location.reload()
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        )
};

// 添加留言
export const addComment = (postId, commentData) => dispatch => {
    axios.post(`/api/posts/comment/${postId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_POST,
                payLoad: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        )
}

// 删除留言
export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payLoad: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data
            })
        )
};

// 加载动画
export const setPostLoading = () => {
    return {
        type: POST_LOADDING
    }
}