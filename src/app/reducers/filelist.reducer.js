import actions from '../actions/filepage.actions';
import {createApolloFetch} from 'apollo-fetch';
import {URL} from '../const';

var _fetch = createApolloFetch({uri:URL+'/graphql'});


const defaults = {
    error: null,
    files: null,
    pending: false,
    dir: ['/'],
    isMakingFolder: false
}



const filepage = (state = defaults, action) => {
    switch (action.type) {
        case actions.MAKE_FOLDER:{
            return Object.assign({}, state, {
                isMakingFolder: true
            });
        }
        case actions.FILEPAGE_ERROR:
            {
                return Object.assign({}, state, {
                    error: action.error,
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
                dir: action.payload,
                error: null,
                files: null
            })
        }
        default:
            return state;
    }
}

export default filepage