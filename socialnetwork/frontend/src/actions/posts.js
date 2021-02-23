import axios from "axios";
import {createMessage, returnErrors} from "./messages";

import {GET_POSTS, DELETE_POST, ADD_POST} from "./types";
import {tokenConfig} from "./auth";


// GET POSTS
export const getPosts = () => (dispatch, getState) => {
    axios.get('api/posts/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// GET USER POSTS
export const getUserPosts = () => (dispatch, getState) => {
    axios.get('api/posts/self/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// DELETE POST
export const deletePost = (id) => (dispatch, getState) => {
    axios.delete(`api/posts/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deletePost: "Post Deleted"}))
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// ADD POST
export const addPost = (post) => (dispatch, getState) => {
    let formData = new FormData()
    formData.append("title", post.title)
    if (post.image) {
        formData.append("image", post.image)
    }
    formData.append("content", post.content)
    let config = tokenConfig(getState)
    config.headers['Content-Type'] = 'multipart/form-data'
    axios.post('api/posts/', formData, config)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            });
            dispatch(createMessage({addPost: "Post Added"}))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// LIKE POST
export const likePost = (id) => (dispatch, getState) => {
    axios.post(`api/posts/${id}/like/`, null, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({likePost: "Post Liked"}))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// DISLIKE POST
export const dislikePost = (id) => (dispatch, getState) => {
    axios.delete(`api/posts/${id}/dislike/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({dislikePost: "Post Disliked"}))
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}