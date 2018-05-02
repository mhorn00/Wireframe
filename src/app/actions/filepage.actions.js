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
    type: ACTIONS.FILEPAGE_ERROR,
        error
}


export function refreshItems(path, source) {
    return dispatch => {
        var modPath = '';
        path.forEach(t => modPath += t);
        console.log(modPath);
        var query = `query{files(path:"${modPath}" token:"${localStorage.getItem("token")}"){
            rawName,
            name,
            type,
            uploadDate
            fileSize
        }}`
        _fetch({
            query
        }).then(res => {
            dispatch(refreshComplete(path,res.data.files))
        }).catch(e => {
            dispatch(setError(e.toString()));
        })
        dispatch(refreshRequest(source));
    }
}

export function addToDir(addToPath, path) {
    return dispatch => {
        var path = [...path,addToPath];
        dispatch(refreshItems(path));
    }
    return {
        type: ACTIONS.SET_DIR,
        path: addToPath
    }
}