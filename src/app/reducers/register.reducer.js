import actions from '../actions/register.actions';

const defaultState = {
    emailCheckPending: false,
    usernameCheckPending: false,
    checkError: {
        source: null,
        error: null
    },
    username: null,
    usernameValid: null,
    email: null,
    emailValid: null,
    registerPending: false,
    registerResult: null
}

const register = (state = defaultState, action) => {
    switch (action.type) {
        case actions.CHECK_ERROR:
            {
                console.log(`this is action.error`)
                console.log(action.error);
                return Object.assign({}, state, {
                    checkError: {
                        source: action.source,
                        error: action.error
                    }
                })
            }
        case actions.CHECK_EMAIL:
            {
                return Object.assign({}, state, {
                    emailCheckPending: false,
                    email: action.email,
                    emailValid: action.valid,
                });
            }
        case actions.CHECK_USERNAME:
            {
                return Object.assign({}, state, {
                    usernameCheckPending: false,
                    username: action.username,
                    usernameValid: action.valid
                });
            }
        case actions.EMAIL_CHECK_PENDING:
            {
                return Object.assign({}, state, {
                    emailCheckPending: action.payload
                })
            }
        case actions.USERNAME_CHECK_PENDING:{
            return Object.assign({},state,{
                usernameCheckPending: action.payload
            })
        }
        case actions.REGISTER_REQUESET:{
            return Object.assign({},state,{
                registerPending: true
            })
        }
        case actions.REGISTER_RESULT:{
            return Object.assign({},state,{
                registerPending: false,
                registerResult: action.payload
            })
        }
        default:
            return state;
    }
}

export default register;