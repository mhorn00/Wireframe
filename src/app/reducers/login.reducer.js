import actions, {setLoginPending} from '../actions/login.actions';
import {createApolloFetch} from 'apollo-fetch';
import {URL} from '../const';

var fetch = createApolloFetch({uri: URL});

const login = (state = { loggedIn: false, pending: false, jwt: '' }, action) => {
    switch(action.type){
        case actions.SET_LOGIN_PENDING: {
            return {...state, pending: true}
        }
        case actions.SET_LOGIN_REQUEST: {
            var query = `query{createSession(username:"${action.username}", pass:"${action.password}")}`
            fetch({query}).then(res=>{
                if(res.data.createSession!==null && res.data.createSession.Token!=='not approved'){
                    dispatch(setLoginpending(false));
                }
            });
            dispatch(setLoginPending(true));
        }
    }
}

export default login;