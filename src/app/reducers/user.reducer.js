import actions from '../actions/user.actions';

const userReducer = (state={jwt:localStorage.getItem('token'),username:localStorage.getItem('username'), authenticated: null, auth_pending: false}, action) => {
    switch(action.type){
        case actions.AUTH_PENDING:{
            return Object.assign({},state,{
                auth_pending: true
            });
        }
        case actions.AUTH_RES:{
            if(action.payload===false){
                console.log('its false buddy')
                localStorage.clear('username');
                localStorage.clear('token');
            }
            else{
                console.log('true btw');
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
        case actions.SET_USERNAME:{
            return Object.assign({},state,{
                username: action.payload
            })
        }
        default: return state
    }
}

export default userReducer;