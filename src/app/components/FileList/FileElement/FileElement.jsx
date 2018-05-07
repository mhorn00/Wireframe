import React from 'react';
import { setDir, refreshRequest } from '../../../actions/filepage.actions';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styles from './FileElement.scss';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'

class FileElement extends React.Component {
    constructor(props) {
        super(props);
        this.getSize = this.getSize.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, data) {
        //Dispatch to make new folder
        console.log(data.type,data.element)
    }

    getSize(size) {
        if (size < 1000) {
            return size + " B";
        } else if (size < 100000) {
            return ((Math.round(size / 1000)) + " KB");
        } else if (size < 1000000000) {
            return (Math.round(size / 1000000) + " MB");
        } else if (size < 1000000000000) {
            return (Math.round(size / 1000000000) + " GB");
        } else {
            return undefined;
        }
    }

    render() {
        var { file, dispatch } = this.props;
        let icon = "far fa-file";
        let size = this.getSize(file.fileSize);
        return (
            <ContextMenuTrigger id="element" attributes={{ className: styles.trigger }} collect={()=>{
                return this.props;
            }}>
                <div onClick={e => {
                    switch (file.type) {
                        case 'dir': {
                            var newPath = [...this.props.dir, file.name + '/'];
                            dispatch(setDir(newPath));
                            dispatch(refreshRequest(newPath, 'setDir'));
                            break;
                        }
                        case '\'': {
                            var newPath = this.props.dir.splice(0, this.props.dir.length - 1);
                            dispatch(setDir(newPath));
                            dispatch(refreshRequest(newPath, 'setDir'));
                            break;
                        }
                        default: {
                            return;
                        }
                    }
                }} className={styles.file}>
                    <div className={styles.icon}><i className={icon} /></div>
                    <div className={styles.text}>{file.name}</div>
                    <div className={styles.text}>{size}</div>
                    <div className={styles.text}>{file.type}</div>
                </div>
            </ContextMenuTrigger>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer
}

const connectedFileElement = connect(mapStateToProps)(FileElement);

export default connectedFileElement;
