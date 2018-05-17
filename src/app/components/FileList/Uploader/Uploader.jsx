import React from 'react';
import { connect } from 'react-redux';
import { uploadState, updateProgress, refreshFileList } from '../../../actions/filepage.actions';
import { DropTarget, DragDropContext } from 'react-dnd';
import styles from './Uploader.scss'
import { URL as IP } from '../../../const';
import { flow } from 'lodash';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';

function uploaderDropTargetCollector(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

const uploadDropActionHandler = {
    canDrop(props, monitor) {
        return true
    },
    drop(props_others, monitor, connect) {
        var fileArray = monitor.getItem().files;
        var props = connect.selector.props;
        for (var i = 0; i < fileArray.length; i++) {
            var data = new FormData();
            data.append('file', fileArray[i]);
            data.append('token', localStorage.getItem("token"));
            data.append('path', props.dir[props.dir.length - 1]);
            data.append('fromSite', true);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState == XMLHttpRequest.OPENED) {
                    props.dispatch(uploadState('uploading'));
                } else if (xhr.readyState == XMLHttpRequest.DONE) {
                    props.dispatch(uploadState('resting'));
                    props.dispatch(updateProgress(0));
                    props.dispatch(refreshFileList(props.dir[props.dir.length - 1]))
                }
            };
            xhr.open('POST', `${IP}/upload`, true);
            xhr.upload.addEventListener('progress', (e) => {
                let progress = 0;
                if (e.total !== 0) {
                    progress = parseInt((e.loaded / e.total) * 100, 10);
                }
                props.dispatch(updateProgress(progress));
            });
            xhr.send(data);
        }
    },
    hover(props,monitor,connect){
        var props = connect.selector.props;
        if(monitor.isOver()){
            props.dispatch(uploadState('resting'))
        }
        else{
            props.dispatch(uploadState('dropHover'))
        }
    }
}


class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
        this.onDragStarted = this.onDragStarted.bind(this);
        this.onDragStopped = this.onDragStopped.bind(this);
    }
    onDrop(e) {
        e.preventDefault();
        for (var i = 0; i < e.dataTransfer.files.length; i++) {
            var data = new FormData();
            data.append('file', e.dataTransfer.files[i]);
            data.append('token', localStorage.getItem("token"));
            data.append('path', this.props.dir[this.props.dir.length - 1]);
            data.append('fromSite', true);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState == XMLHttpRequest.OPENED) {
                    this.props.dispatch(uploadState('uploading'));
                } else if (xhr.readyState == XMLHttpRequest.DONE) {
                    this.props.dispatch(uploadState('resting'));
                    this.props.dispatch(updateProgress(0));
                    this.props.dispatch(refreshFileList(this.props.dir[this.props.dir.length - 1]))
                }
            };
            xhr.open('POST', `${IP}/upload`, true);
            xhr.upload.addEventListener('progress', (e) => {
                let progress = 0;
                if (e.total !== 0) {
                    progress = parseInt((e.loaded / e.total) * 100, 10);
                }
                this.props.dispatch(updateProgress(progress));
            });
            xhr.send(data);
        }
    }

    onDragStarted(e) {
        e.preventDefault();
        
    }

    onDragStopped(e) {
        e.preventDefault();
        this.props.dispatch(uploadState('resting'))
    }

    render() {
        var { connectDropTarget, isOver } = this.props;

        return (
            <div className={styles.base}>
                <p className={styles.text}>Drop Files Here</p>
                {/* <form onSubmit={this.onDrop}>
                    <input type='file' />
                    <input type='submit' />
                </form> */}
                {connectDropTarget(<div className={styles[(()=>{
                    if(this.props.uploadState=='uploading') return 'uploading';
                    else if(isOver) return 'dropHover'
                    else return 'resting'
                })()]}>
                    <div className={styles.loading} style={{ height: 100 - this.props.uploadProgress + '%' }}>
                        <p className={styles.text}>{this.props.uploadProgress}</p>
                    </div>
                </div>)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default flow(connect(mapStateToProps), DropTarget(NativeTypes.FILE, uploadDropActionHandler, uploaderDropTargetCollector))(Uploader);