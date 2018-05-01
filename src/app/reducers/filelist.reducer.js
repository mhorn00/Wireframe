import actions from '../actions/filepage.actions';

const defaults = {
    file_error: null,
    files: [],
    pending: false,
    dir: '/'
    //sort_param: null
}

const filepage = (state = defaults, action) => {
    switch (action.type) {
        case actions.FILEPAGE_ERROR:
            {
                return Object.assign({}, state, {
                    file_error: action.error,
                    pending: false
                });
            }
        case actions.REFRESH_REQUEST:
            {
                return Object.assign({}, state, {
                    pending: true
                });
            }
        case actions.REFRESH_COMPLETE:
            {
                return Object.assign({}, state, {
                    files: action.payload,
                    pending: false
                })
            }
        case actions.SET_DIR:{
            return Object.assign({},state,{
                dir: actions.path
            })
        }
        default:
            return state;
    }
}

export default filepage