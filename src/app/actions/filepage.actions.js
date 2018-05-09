const ACTIONS = {
    REFRESH_REQUEST: 'REFRESH_REQUEST',
    REFRESH_COMPLETE: 'REFRESH_COMPLETE',
    FILEPAGE_ERROR: 'FILEPAGE_ERROR',
    SET_DIR: 'SET_DIR',
    MAKE_FOLDER: 'MAKE_FOLDER',
    FINALIZE_FOLDER: 'FINALIZE_FOLDER',
    FINALIZE_FOLDER_COMPLETE: 'FINALIZE_FOLDER_COMPLETE',
    REMOVE_FILE: 'REMOVE_FILE',
    RENAME_FILE: 'RENAME_FILE',
    START_RENAME: 'START_RENAME',
    END_RENAME: 'END_RENAME'
}

export default ACTIONS

import {
    createApolloFetch
} from 'apollo-fetch';
import {
    URL as IP
} from '../const';

import gql from 'graphql-tag';

const _fetch = createApolloFetch({
    uri: `${IP}/graphql`
});

export function startRename(_id) {
    return {
        type: ACTIONS.START_RENAME,
        payload: _id
    }
}

export function endRename() {
    return {
        type: ACTIONS.END_RENAME,
    }
}

export function renameFile(path, oldName, newName) {
    var pathString = '';
    path.forEach(part => pathString += part);
    var query = gql`mutation($path:![!String]){renameFile(path: $path, oldName: "${oldName}", newName: "${newName}", token: "${localStorage.getItem("token")}")}`
    return dispatch => {
        _fetch({
            query, variables: {
                path: path
            }
        }).then(res => {
            if (res.data && res.data.renameFile) {
                dispatch(endRename());
                dispatch(resetList(path));
            } else {
                dispatch(setError(res.errors));
            }
        })
    }
}

export function removeFile(path, name) {
    var pathString = '';
    path.forEach(part => pathString += part);
    var query = `mutation{remove(path: "${pathString}", name: "${name}", token: "${localStorage.getItem("token")}")}`
    return dispatch => {
        _fetch({ query }).then(res => {
            if (res.data && res.data.remove) {
                dispatch(resetList(path));
            } else {
                dispatch(setError(res.errors));
            }
        })
    }
}

export function finalizeFolder(name, path) {
    var query = gql`mutation($path: [String!], $name: String!, $token: String!){
        addFolder(path: $path, name: $name, token:$token)
    }`;    
    return dispatch => {
        _fetch({
            query, variables: {
                path: path,
                token: localStorage.getItem("token"),
                name: name
            }
        }).then(res => {
            if (res.data && res.data.addFolder) {
                dispatch(finalizeFolderComplete());
                dispatch(resetList(path));
            } else {
                dispatch(setError(res.errors));
            }
        })
    }
}

function finalizeFolderComplete() {
    return {
        type: ACTIONS.FINALIZE_FOLDER_COMPLETE
    }
}

export function makeFolder() {
    return {
        type: ACTIONS.MAKE_FOLDER
    }
}

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
    var query = gql`query($path:[String!]){files(path:$path token:"${localStorage.getItem("token")}"){
            _id,
            rawName,
            name,
            type,
            uploadDate,
            fileSize,
            userRelativePath
        }
    }`
    return dispatch => {
        dispatch(refreshRequest('resetList'));
        _fetch({ query, variables:{
            path: path
        } }).then(res => {
            if (res.data && res.data.files) {
                console.log(res.data.files);
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