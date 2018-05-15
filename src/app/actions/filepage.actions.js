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
    UPLOAD_STATE: 'UPLOAD_STATE',
    UPDATE_PROGRESS: 'UPDATE_PROGRESS',
    RESOLVE_PATH_PENDING: 'RESOLVE_PATH_PENDING',
    RESOLVE_PATH_DONE: 'RESOLVE_PATH_DONE'
}

export default ACTIONS

import { createApolloFetch } from 'apollo-fetch';
import { URL as IP } from '../const';

import gql from 'graphql-tag';

const _fetch = createApolloFetch({
    uri: `${IP}/graphql`
});

function resolvePathPending() {
    return {
        type: ACTIONS.RESOLVE_PATH_PENDING,
    }
}

function resolvePathDone(path) {
    return {
        type: ACTIONS.RESOLVE_PATH_DONE,
        payload: path
    }
}

export function resolvePath(dir) {
    var query = gql`query($path: [String]!){resolvePath(path: $path, token: "${localStorage.getItem("token")}"){
            name
            _id
        }
    }`
    return dispatch => {
        dispatch(resolvePathPending())
        _fetch({ query, variables: { path: dir } }).then(res => {
            dispatch(resolvePathDone(res.data));
        })
    }
}

export function updateProgress(progress) {
    return {
        type: ACTIONS.UPDATE_PROGRESS,
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

export function renameFile(path, file, newName) {
    var query = `mutation{renameFile(_id: "${file._id}", type: "${file.type}"newName: "${newName}", token: "${localStorage.getItem("token")}")}`
    return dispatch => {
        _fetch({ query }).then(res => {
            if (res.data && res.data.renameFile) {
                dispatch(endRename());
                dispatch(refreshFileList(path[path.length - 1]));
            } else {
                dispatch(setError(res.errors));
            }
        })
    }
}

export function removeFile(file, path) {
    var query = `mutation{remove(_id: "${file._id}", type:"${file.type}" token: "${localStorage.getItem("token")}")}`
    return dispatch => {
        _fetch({ query }).then(res => {
            if (res.data && res.data.remove) {
                dispatch(refreshFileList(path[path.length - 1]));
            } else {
                dispatch(setError(res.errors));
            }
        })
    }
}

export function finalizeFolder(name, parentId) {
    var query = `mutation{addFolder(parentId: "${parentId}", name: "${name}", token: "${localStorage.getItem("token")}")}`;
    return dispatch => {
        _fetch({
            query, variables: {
                path: parentId,
            }
        }).then(res => {
            if (res.data && res.data.addFolder) {
                dispatch(finalizeFolderComplete());
                dispatch(refreshFileList(parentId));
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

export function refreshRequested() {
    return {
        type: ACTIONS.REFRESH_REQUEST
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

export function refreshFileList(parentId) {
    var query = `query{files(parentId:"${parentId}" token:"${localStorage.getItem("token")}"){
            name,
            type,
            fileSize,
            _id
        }
    }`
    return dispatch => {
        dispatch(refreshRequested());
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

export function setDir(dir) {
    return {
        type: ACTIONS.SET_DIR,
        payload: dir
    }
}