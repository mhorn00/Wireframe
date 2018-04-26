import actions, {setLoginPending, setLoginError} from '../actions/login.actions';
import {createApolloFetch} from 'apollo-fetch';
import {URL} from '../const';

var fetch = createApolloFetch({uri: URL+'/graphql'});

const login = (state = { loggedIn: false, pending: false, jwt: '' }, action) => {
    switch(action.type){
        case actions.SET_LOGIN_PENDING: {
            return Object.assign({},state,{pending: action.pending})
        }
        case actions.SET_LOGIN_REQUEST: {
            console.log('hey');
            var query = `query{createSession(username:"${action.username}", pass:"${action.password}")}`
            fetch({query}).then(res=>{
                if(res.data.createSession!==null && res.data.createSession.Token!=='not approved'){
                    dispatch(setLoginpending(false));
                }
                else{
                    console.log('yeah it failed');
                    dispatch(setLoginError(res.data))
                }
            }).catch((e)=>{
                dispatch(setLoginError(e));
            });
            return Object.assign({},state,{pending: true});
        }
        default: return state;
    }
}

export default login;