const ACTIONS = {
    REFRESH_REQUEST: 'REFRESH_REQUEST',
    REFRESH_COMPLETE: 'REFRESH_COMPLETE',
    FILEPAGE_ERROR: 'FILEPAGE_ERROR',
    SET_DIR: 'SET_DIR'
}

export default ACTIONS

import {
    createApolloFetch
} from 'apollo-fetch';
import {
    URL as IP
} from '../const';

const _fetch = createApolloFetch({
    uri: `${IP}/graphql`
});

export function refreshRequest(source) {
    return {
        type: ACTIONS.REFRESH_REQUEST,
        source
    }
}

export function refreshComplete(data) {
    return {
        type: ACTIONS.REFRESH_COMPLETE,
        payload: data
    }
}

export function setError(error) {
    return {
        type: ACTIONS.FILEPAGE_ERROR,
        error
    }
}

export function resetList(path) {
    var pathString = '';
    path.forEach(part => pathString += part);
    var query = `query{files(path:"${pathString}" token:"${localStorage.getItem("token")}"){
            rawName,
            name,
            type,
            uploadDate,
            fileSize
        }
    }`
    return dispatch => {
        dispatch(refreshRequest('resetList'));
        _fetch({ query }).then(res => {
            if (res.data && res.data.files) {
                dispatch(refreshComplete(res.data.files));
            }
            else {
                dispatch(setError(res.errors));
            }
        })
    }
}

export function setDir(path) {
    return {
        type: ACTIONS.SET_DIR,
        payload: path
    }
}