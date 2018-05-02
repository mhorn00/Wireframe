const CHECK_USERNAME = 'CHECK_USERNAME';
const CHECK_EMAIL = 'CHECK_EMAIL';
const SET_PASS = 'SET_PASS';
const REGISTER_REQUESET = 'REGISTER_REQUEST';
const EMAIL_CHECK_PENDING = 'EMAIL_CHECK_PENDING';
const USERNAME_CHECK_PENDING = 'USERNAME_CHECK_PENDING';
const CHECK_ERROR = 'CHECK_ERROR';
const REGISTER_RESULT = 'REGISTER_RESULT';

export default {CHECK_USERNAME, CHECK_EMAIL, SET_PASS, REGISTER_REQUESET, EMAIL_CHECK_PENDING, CHECK_ERROR, USERNAME_CHECK_PENDING};

import { createApolloFetch } from 'apollo-fetch';
import { URL } from '../const';
var _fetch = createApolloFetch({ uri: `${URL}/graphql` });


export function checkEmail(email){
    return dispatch => {
        var query = `query{userExists(email:"${email}")}`
        _fetch({query}).then(res=>{
            console.log(res);
            dispatch(emailChecked(email, ! res.data.userExists))
        }).catch(e=>{
            dispatch(checkError('EMAIL', e))
        });
        dispatch(emailCheckPending(true));
    }
}

export function checkUsername(username){
    return dispatch => {
        var query = `query{userExists(username:"${username}")}`
        _fetch({query}).then(res=>{dispatch(userChecked(username, ! res.data.userExists)) ;console.log(res)}).catch(e=>{
            console.log(e);
            dispatch(checkError(`USERNAME`,e.message))})
        dispatch(usernameCheckPending(true));
    }
}

export function userChecked(username, valid){
    return {
        type: CHECK_USERNAME,
        username,
        valid
    }
}

export function emailChecked(email, valid){
    return {
        type: CHECK_EMAIL,
        email,
        valid
    }
}

export function emailCheckPending(payload){
    return {
        type: EMAIL_CHECK_PENDING,
        payload
    }
}

export function usernameCheckPending(payload){
    return{
        type: USERNAME_CHECK_PENDING,
        payload
    }
}

export function checkError(source, error){
    return {
        type: CHECK_ERROR,
        source,
        error
    }
}

export function submit(username, email, password){
    return dispatch => {
        //register(email: String! password: String! username: String!): Boolean!
        var query = `mutation{register(email:"${email}" username:"${username}" password:"${password}")}`
        _fetch({query}).then(res=>{
            dispatch(registerResult(res.data.register))
        }).catch(e=>{if(e)dispatch(registerResult(false))});
    }
}

export function registerResult(payload){
    return{
        type: REGISTER_RESULT,
        payload
    }
}