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
    END_RENAME: 'END_RENAME',
    GET_CRUMBS: 'GET_CRUMBS',
    SET_CRUMBS: 'SET_CRUMBS',
    UPLOAD_STATE: 'UPLOAD_STATE',
    UPDATE_PROGRESS: 'UPDATE_PROGRESS'
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

export function updateProgress(progress) {
    return {
        type: ACTIONS.UPLOAD_STATE,
        payload: progress
    }
}

export function uploadState(type) {
    return {
        type: ACTIONS.UPLOAD_STATE,
        payload: type
    }
}

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

export function renameFile(path, _id, newName) {
    var query = gql`mutation{renameFile(_id: "${_id}", newName: "${newName}", token: "${localStorage.getItem("token")}")}`
    return dispatch => {
        _fetch({ query }).then(res => {
            if (res.data && res.data.renameFile) {
                dispatch(endRename());
                dispatch(resetList(path));
            } else {
                dispatch(setError(res.errors));
            }
        })
    }
}

export function removeFile(path, _id) {
    var query = `mutation{remove(_id: "${_id}", token: "${localStorage.getItem("token")}")}`
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
    console.log(path);
    var query = `mutation{addFolder(parentId: "${path}", name: "${name}", token: "${localStorage.getItem("token")}")}`;
    return dispatch => {
        _fetch({
            query, variables: {
                path: path,
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

export function resetList(parentId) {
   var query = `query{files(parentId:"${parentId}" token:"${localStorage.getItem("token")}"){
            name,
            type,
            fileSize,
        }
    }`
    return dispatch => {
        dispatch(refreshRequest('resetList'));
        _fetch({
            query
        }).then(res => {
            if (res.data && res.data.files) {
                dispatch(refreshComplete(res.data.files));
            }
            else {
                dispatch(setError(res.errors));
            }
        })
    } 
}

function setCrumbs(payload) {
    return {
        type: ACTIONS.SET_CRUMBS,
        payload
    }
}

export function getCrumbs(_id) {
    var crumbs = [];
    return dispatch => {
        var query = `query{getCrumbs(_id:"${_id}" token:"${localStorage.getItem('token')}")
    }`
        _fetch({ query }).then(res => {
        })
    }
}

export function setDir(path) {
    return {
        type: ACTIONS.SET_DIR,
        payload: path
    }
}