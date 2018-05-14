const ACTIONS = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_PENDING: 'LOGIN_PENDING',
    LOGIN_ERROR: 'LOGIN_ERROR',
    AUTHENTICATE: 'AUTHENTICATE',
    AUTH_PENDING: 'AUTH_PENDING',
    AUTH_SUCCESS: 'AUTH_RES',
    AUTH_FAILURE: 'AUTH_FAILURE',
    AUTH_ERROR: 'AUTH_ERROR',
    LOGOUT: 'LOGOUT'
};

export default ACTIONS;

import { createApolloFetch } from 'apollo-fetch';
import { URL } from '../const';

var _fetch = createApolloFetch({ uri: `${URL}/graphql` });

export function authenticate(token) {
    return dispatch => {
        dispatch(authPending());
        var query = `query{authenticate(token:"${token}")}`
        _fetch({ query }).then(res => {
            if (res.errors) {
                dispatch(authError(res.errors));
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.removeItem('rootFolder');
            } else {
                if (res.data.authenticate) {
                    dispatch(authSuccess());
                } else {
                    dispatch(authFailure());
                }
            }
        })
    }
}

function authPending() {
    return {
        type: ACTIONS.AUTH_PENDING
    }
}

function authError(err) {
    return {
        type: ACTIONS.AUTH_ERROR,
        payload: err
    }
}

function authSuccess() {
    return {
        type: ACTIONS.AUTH_ERROR
    }
}

function authFailure() {
    return {
        type: ACTIONS.AUTH_ERROR
    }
}
export function logout() {
    return {
        type: ACTIONS.LOGOUT
    }
}

export function login(username, password) {
    return dispatch => {
        dispatch(loginPending());
        var query = `mutation{createSession(username:"${username}", pass:"${password}"){
            token, 
            username, 
            rootFolder,
            error}}`
        _fetch({ query }).then(res => {
            if (!res.data.createSession.error) {
                dispatch(LoginSuccess(res.data.createSession))
            } else {
                dispatch(LoginError(res.data.createSession.error));
            }
        })
    }
}

function loginPending() {
    return {
        type: ACTIONS.LOGIN_PENDING
    }
}

function LoginSuccess(session) {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: session
    };
}

function LoginError(loginError) {
    return {
        type: ACTIONS.LOGIN_ERROR,
        payload: loginError
    }
}