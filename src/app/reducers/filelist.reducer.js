import actions from '../actions/filepage.actions';
import {createApolloFetch} from 'apollo-fetch';
import {URL} from '../const';

var _fetch = createApolloFetch({uri:URL+'/graphql'});


const defaults = {
    error: null,
    files: null,
    pending: false,
    dir: [''],
    isMakingFolder: false,
    isRenaming: {isEditing: false, _id: null},
    uploadState: 'resting'
}



const filepage = (state = defaults, action) => {
    switch (action.type) {
        case actions.UPLOAD_STATE:{
            return Object.assign({}, state, {
                uploadState: action.payload
            });
        }
        case actions.START_RENAME:{
            return Object.assign({}, state, {
                isRenaming: {isEditing: true, _id: action.payload}
            });
        }
        case actions.END_RENAME:{
            return Object.assign({}, state, {
                isRenaming: {isEditing: false, key: null}
            });
        }
        case actions.FINALIZE_FOLDER_COMPLETE:{
            return Object.assign({}, state, {
                isMakingFolder: false
            });
        }
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