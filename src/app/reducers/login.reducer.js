import actions from '../actions/login.actions';

const login = (state = { loggedIn: false, username: null, pending: false, error: null, jwt: '' }, action) => {
    switch(action.type){
        case actions.SET_LOGIN_PENDING: {
            return Object.assign({},state,{pending: action.payload})
        }
        case actions.SET_LOGIN_REQUEST: {
            return Object.assign({},state,{pending: true});
        }
        case actions.SET_LOGIN_ERROR: {
            console.log(action);
            return Object.assign({}, state,{error:action.payload, pending:false})
        }
        case actions.SET_LOGIN_SUCCESS: {
            console.log(action);
            return Object.assign({}, state,{jwt: action.payload.token, username: action.payload.username, pending: false})
        }
        default: return state;
    }
}

export default login;