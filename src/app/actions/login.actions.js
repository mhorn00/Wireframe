const SET_LOGIN_REQUEST = 'LOGIN_REQUEST';
const SET_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const SET_LOGIN_PENDING = 'LOGIN_PENDING';
const SET_LOGIN_ERROR = 'LOGIN_ERROR';
const SET_LOGOUT_REQUEST = 'LOGIN_LOGOUT';

export default { SET_LOGIN_REQUEST, SET_LOGIN_SUCCESS, SET_LOGIN_PENDING, SET_LOGIN_ERROR, SET_LOGOUT_REQUEST }

import { createApolloFetch } from 'apollo-fetch';
import { URL } from '../const';
var fetch = createApolloFetch(URL + '/graphql');

export function setLoginPending(isLoginPending) {
    return {
        type: SET_LOGIN_PENDING,
        isLoginPending
    };
}

export function login(username, password) {
    return dispatch => {
        dispatch(setLoginError('woa'));
        fetch({ query: `mutation{createSession(user:"${username}" pass:"${password}")}` }).then(res => {
            dispatch(setLoginSuccess(res))
        }).catch(e => dispatch(setLoginError(e)));
    }
}

export function setLoginSuccess(isLoginSuccess) {
    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    };
}

export function setLoginError(loginError) {
    return {
        type: SET_LOGIN_ERROR,
        loginError
    }
}

export function logout() {
    return {
        type: SET_LOGOUT_REQUEST
    }
}