const ACTIONS = {
    CHECK_USERNAME: "CHECK_USERNAME",
    CHECK_EMAIL: "CHECK_EMAIL",
    SET_PASS: "SET_PASS", 
    REGISTER_REQUESET: "REGISTER_REQUESET", 
    EMAIL_CHECK_PENDING: "EMAIL_CHECK_PENDING", 
    CHECK_ERROR: "CHECK_ERROR", 
    USERNAME_CHECK_PENDING: "USERNAME_CHECK_PENDING", 
    PASSWORDS_MATCH: "PASSWORDS_MATCH",
    REGISTER_RESULT: "REGISTER_RESULT"
}

export default ACTIONS;

import { createApolloFetch } from 'apollo-fetch';
import { URL } from '../const';
var _fetch = createApolloFetch({ uri: `${URL}/graphql` });


export function checkEmail(email) {
    return dispatch => {
        var query = `query{userExists(email:"${email}")}`
        _fetch({ query }).then(res => {
            dispatch(emailChecked(email, !res.data.userExists))
        }).catch(e => {
            dispatch(checkError('EMAIL', e))
        });
        dispatch(emailCheckPending(true));
    }
}

export function checkUsername(username) {
    return dispatch => {
        var query = `query{userExists(username:"${username}")}`
        _fetch({ query }).then(res => { dispatch(userChecked(username, !res.data.userExists));}).catch(e => {
            dispatch(checkError(`USERNAME`, e.message))
        })
        dispatch(usernameCheckPending(true));
    }
}

export function userChecked(username, valid) {
    return {
        type: ACTIONS.CHECK_USERNAME,
        username,
        valid
    }
}

export function emailChecked(email, valid) {
    return {
        type: ACTIONS.CHECK_EMAIL,
        email,
        valid
    }
}

export function emailCheckPending(payload) {
    return {
        type: ACTIONS.EMAIL_CHECK_PENDING,
        payload
    }
}

export function usernameCheckPending(payload) {
    return {
        type: ACTIONS.USERNAME_CHECK_PENDING,
        payload
    }
}

export function checkError(source, error) {
    return {
        type: ACTIONS.CHECK_ERROR,
        source,
        error
    }
}

export function passwordsMatch(pass, conf_pass){
    return {
        type: ACTIONS.PASSWORDS_MATCH,
        payload: pass===conf_pass
    }
}

export function submit(username, email, password) {
    return dispatch => {
        var query = `mutation{register(email:"${email}" username:"${username}" password:"${password}")}`
        _fetch({ query }).then(res => {
            dispatch(registerResult(res.data.register))
        }).catch(e=>{if(e)dispatch(registerResult(false))});
    }
}

export function registerResult(payload) {
    return {
        type: ACTIONS.REGISTER_RESULT,
        payload
    }
}