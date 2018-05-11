import React from 'react';
import { connect } from 'react-redux';
import { uploadState, updateProgress } from '../../../actions/filepage.actions';
import styles from './Uploader.scss'
import { URL as IP } from '../../../const';

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
            data.append('path', this.props.dir);
            data.append('fromSite', true);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (e) => {
                if (xhr.readyState == XMLHttpRequest.OPENED) {
                    this.props.dispatch(uploadState('uploading'));
                } else if (xhr.readyState == XMLHttpRequest.DONE) {
                    this.props.dispatch(uploadState('resting'));
                    this.props.dispatch(updateProgress(0));
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
        this.props.dispatch(uploadState('dropHover'))
    }

    onDragStopped(e) {
        e.preventDefault();
        this.props.dispatch(uploadState('resting'))
    }

    render() {
        return (
            <div className={styles.base}>
                <p className={styles.text}>Drop Files Here</p>
                <div className={styles[`${this.props.uploadState}`]} onDrop={this.onDrop} onDragEnter={this.onDragStarted} onDragLeave={this.onDragStopped}  onDragOver={(e) => { e.preventDefault() }}>
                    <div className={styles.loading}>
                        <p className={styles.text}>{this.props.uploadProgress}</p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(Uploader);