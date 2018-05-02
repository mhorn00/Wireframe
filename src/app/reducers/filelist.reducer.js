import actions from '../actions/filepage.actions';
import {createApolloFetch} from 'apollo-fetch';
import {URL} from '../const';

var _fetch = createApolloFetch({uri:URL+'/graphql'});


const defaults = {
    file_error: null,
    files: null,
    pending: false,
    dir: ['/']
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
            console.log([...state.dir,action.path]);
            return Object.assign({},state,{
                dir: [...state.dir,action.path],
                files: null
            })
        }
        default:
            return state;
    }
}

export default filepage