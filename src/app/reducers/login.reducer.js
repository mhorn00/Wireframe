import actions from '../actions/login.actions';

const defaults = {
    username: localStorage.getItem('username') ? localStorage.getItem('username') : undefined,
    jwt: localStorage.getItem('token') ? localStorage.getItem('token') : undefined,
    rootFolder: localStorage.getItem('rootFolder') ? localStorage.getItem('rootFolder') : undefined,
    login_pending: false,
    login_error: null,
    auth_error: null,
    authenticated: false,
    auth_pending: false,
    logged_out: false,
    auth_failed: false
}

const login = (state = defaults, action) => {
    switch (action.type) {
        case actions.AUTH_ERROR:
            {
                return Object.assign({}, state, {
                    auth_pending: false,
                    authenticated: false,
                    auth_error: action.payload,
                    auth_failed: true
                })
            }
        case actions.AUTH_SUCCESS:
            {
                return Object.assign({}, state, {
                    auth_pending: false,
                    authenticated: true,
                    auth_failed: false
                })
            }
        case actions.AUTH_FAILURE:
            {
                return Object.assign({}, state, {
                    auth_pending: false,
                    authenticated: false,
                    auth_failed: true
                })
            }
        case actions.AUTH_PENDING:
            {
                return Object.assign({}, state, {
                    auth_pending: true
                })
            }
        case actions.LOGOUT:
            {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("rootFolder");
                return Object.assign({}, state, {
                    authenticated: false,
                    username: undefined,
                    jwt: undefined,
                    rootFolder: undefined,
                    logged_out: true
                })
            }
        case actions.LOGIN_PENDING:
            {
                return Object.assign({}, state, {
                    login_pending: true
                })
            }
        case actions.LOGIN_SUCCESS:
            {
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("username", action.payload.username);
                localStorage.setItem("rootFolder", action.payload.rootFolder);
                return Object.assign({}, state, {
                    jwt: action.payload.token,
                    username: action.payload.username,
                    rootFolder: action.payload.rootFolder,
                    login_pending: false,
                    authenticated: true,
                    logged_out: false
                })
            }
        case actions.LOGIN_ERROR:
            {
                return Object.assign({}, state, {
                    login_error: action.payload,
                    login_pending: false
                })
            }
        default:
            return state;
    }
}

export default login;