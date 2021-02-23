import axios from "axios";
import {returnErrors} from "./messages";
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING
} from "./types";

// CHECK TOKEN & LOAD USER

export const loadUser = (dispatch, getState) => {
    // User Loading
    dispatch({
        type: USER_LOADING
    });
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
}

// LOGIN USER

export const login = (username, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({
        username,
        password
    })

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.status))
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

// REGISTER USER

export const register = ({username, password, email}) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({
        username,
        password,
        email
    })

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
        dispatch(returnErrors(err.response.data, err.status))
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

// LOGOUT USER

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_SUCCESS,
    })
}

// Setup config with token - helper

export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}