import actions from '../actions/login.actions';

const login = (state = { username: localStorage.getItem('username')?localStorage.getItem('username'):null, pending: false, error: null, jwt: localStorage.getItem('token')?localStorage.getItem('token'):'' }, action) => {
    switch(action.type){
        case actions.SET_LOGIN_PENDING: {
            return Object.assign({},state,{pending: action.payload})
        }
        case actions.SET_LOGIN_REQUEST: {
            return Object.assign({},state,{pending: true});
        }
        case actions.SET_LOGIN_ERROR: {
            return Object.assign({}, state,{error:action.payload, pending:false})
        }
        case actions.SET_LOGIN_SUCCESS: {
            console.log(action.payload);
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("username", action.payload.username);
            localStorage.setItem("rootFolder", action.payload.rootFolder)
            return Object.assign({}, state,{jwt: action.payload.token, username: action.payload.username, pending: false})
        }
        default: return state;
    }
}

export default login;