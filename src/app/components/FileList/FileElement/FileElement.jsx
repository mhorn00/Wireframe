import React from 'react';
import { setDir, refreshRequest } from '../../../actions/filepage.actions';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styles from './FileElement.scss';

class FileElement extends React.Component {
    constructor(props) {
        super(props);
        this.getSize = this.getSize.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, data) {
        //Dispatch to make new folder
        console.log(data.element)
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
            <tr onClick={e => {
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
                <td className={styles.icon}><ContextMenuTrigger id='element'><i className={icon} /></ContextMenuTrigger></td>
                <td className={styles.text}><ContextMenuTrigger id='element'>{file.name}</ContextMenuTrigger></td>
                <td className={styles.text}><ContextMenuTrigger id='element'>{size}</ContextMenuTrigger></td>
                <td className={styles.text}><ContextMenuTrigger id='element'>{file.type}</ContextMenuTrigger></td>
                <ContextMenu id="element" className={styles.menu}>
                <MenuItem data={{ type: 'rename', element: this.props.key }} onClick={this.handleClick} className={styles.item}>
                    <p className={styles.text}>Rename</p>
                </MenuItem>
                <MenuItem data={{ type: 'share' }} onClick={this.handleClick}>
                    <p className={styles.text}>Share</p>
                </MenuItem>
                <MenuItem data={{ type: 'share' }} onClick={this.handleClick}>
                    <p className={styles.text}>Delete</p>
                </MenuItem>
            </ContextMenu>
            </tr>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer
}

export default connect(mapStateToProps)(FileElement);
