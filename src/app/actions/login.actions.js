const SET_LOGIN_REQUEST = 'LOGIN_REQUEST';
const SET_LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const SET_LOGIN_PENDING = 'LOGIN_PENDING';
const SET_LOGIN_ERROR = 'LOGIN_ERROR';
const SET_LOGOUT_REQUEST = 'LOGIN_LOGOUT';

export default { SET_LOGIN_REQUEST, SET_LOGIN_SUCCESS, SET_LOGIN_PENDING, SET_LOGIN_ERROR, SET_LOGOUT_REQUEST }

import { createApolloFetch } from 'apollo-fetch';
import { URL } from '../const';
console.log(URL + '/graphql');
var _fetch = createApolloFetch({uri:`${URL}/graphql`});

export function setLoginPending(isLoginPending) {
    return {
        type: SET_LOGIN_PENDING,
        payload: isLoginPending
    };
}

export function login(username, password) {
    return dispatch => {
        var query = `mutation{createSession(username:"${username}", pass:"${password}"){token, username, error}}`
        _fetch({ query }).then(res => {
            if(res.data.createSession.error===''){
                dispatch(setLoginSuccess(res.data.createSession))
            }
            else{
                dispatch(setLoginError(res.data.createSession.error));
            }
        }).catch((e) => {
            dispatch(setLoginError(e));
        });
        dispatch(setLoginPending(true));
    }
}

export function setLoginSuccess(isLoginSuccess) {
    return {
        type: SET_LOGIN_SUCCESS,
        payload: isLoginSuccess,
        pending: false
    };
}

export function setLoginError(loginError) {
    return {
        type: SET_LOGIN_ERROR,
        payload: loginError,
        pending: false
    }
}

export function logout() {
    return {
        type: SET_LOGOUT_REQUEST
    }
}