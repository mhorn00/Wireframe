const ACTIONS = {
    AUTHENTICATE: 'AUTHENTICATE',
    AUTH_PENDING: 'AUTH_PENDING',
    AUTH_RES: 'AUTH_RES',
    SET_TOKEN: 'SET_TOKEN',
    SET_USERNAME: 'SET_USERNAME'
}

export default ACTIONS;

import { createApolloFetch } from 'apollo-fetch';
import { URL as IP } from '../const';

var _fetch = createApolloFetch({ uri: IP + '/graphql' })

export function authenticate(token) {
    return dispatch => {
        var query = `query{authenticate(token:"${token}")}`
        _fetch({ query }).then(res => {
            if (res.errors) {
                dispatch(setAuthRes(false));
                localStorage.setItem('token', '');
            } else {
                dispatch(setAuthRes(res.data.authenticate));
            }
        })
        dispatch(setAuthPending());
    }
}

export function setToken(token) {
    return {
        type: ACTIONS.SET_TOKEN,
        payload: token
    }
}

export function setUsername(username) {
    return {
        type: ACTIONS.SET_USERNAME,
        payload: username
    }
}

function setAuthPending() {
    return {
        type: ACTIONS.AUTH_PENDING
    }
}

function setAuthRes(isUserAuthenticated) {
    return {
        type: ACTIONS.AUTH_RES,
        payload: isUserAuthenticated
    }
}