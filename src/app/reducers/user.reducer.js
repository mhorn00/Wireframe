import actions from '../actions/user.actions';

const defaults = {
    jwt: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    rootFolder: localStorage.getItem('rootFolder'),
    authenticated: null,
    auth_pending: false
}

const userReducer = (state =defaults, action) => {
    switch (action.type) {
        case actions.LOGOUT: {
            localStorage.removeItem('username');
            localStorage.removeItem('rootFolder');
            localStorage.removeItem('token');
            return Object.assign({}, state, {
                authenticated: null,
                jwt: undefined,
                username: undefined,
                rootFolder: undefined
            });
        }
        case actions.AUTH_PENDING: {
            return Object.assign({}, state, {
                auth_pending: true
            });
        }
        case actions.AUTH_RES: {
            if (action.payload === false) {
                localStorage.removeItem('username');
                localStorage.removeItem('token');
            }
            return Object.assign({}, state, {
                authenticated: action.payload,
                auth_pending: false
            });
        }
        case actions.SET_TOKEN: {
            return Object.assign({}, state, {
                jwt: action.payload
            })
        }
        case actions.SET_USERNAME: {
            return Object.assign({}, state, {
                username: action.payload
            })
        }
        default: return state
    }
}

export default userReducer;