import React from 'react';
import { setDir, renameFile, refreshFileList } from '../../../actions/filepage.actions';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styles from './FolderElement.scss';
import { DragSource, DropTarget, DragLayer } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import { History } from 'react-router';
import { IP } from '../../../const'
import { flow } from 'lodash';

const folderDragSource = {
    beginDrag(props) {
        return {

        };
    }
};

const fileDrop = {
    canDrop(props, monitor) {
        return true
    },
    drop(props, monitor, connect){
        console.log(props, monitor, connect);
    }
}

function folderDragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview()
    }
}

function folderDropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Folder extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.isRenaming.isEditing && this.props.isRenaming._id == this.props.folder._id) {
            this.filename.focus();
        }
    }

    render() {
        var { folder, dispatch } = this.props;
        let { connectDragSource, isDragging, connectDragPreview, connectDropTarget } = this.props;
        let icon = 'far fa-folder';
        var contained = (
            <div onClick={e => {
                if (this.props.isRenaming.isEditing) {
                    return;
                }
                var newPath = [...this.props.dir, folder._id]
                dispatch(setDir(newPath));
                dispatch(refreshFileList(newPath));
            }} className={styles.file}>
                <div className={styles.icon}><i className={icon} /></div>
                {this.props.isRenaming.isEditing && this.props.isRenaming._id == folder._id
                    ? <form onSubmit={e => {
                        e.preventDefault();
                        this.props.dispatch(renameFile(this.props.dir, folder, this.filename.value));
                    }} className={styles.form}>
                        <input type="text" placeholder={folder.name} ref={node => this.filename = node} className={styles.textbox} autoFocus />
                    </form>
                    : <div className={styles.text}>{folder.name}</div>}
                <div className={styles.text}></div>
                <div className={styles.text}></div>
            </div>
        )

        const stuff = this;
        return (
            <ContextMenuTrigger id="folderelement" attributes={{
                className: styles.trigger,
                style: {
                    cursor: function () {
                        if (stuff.props.canDrop && stuff.props.isMoving) {
                            return 'copy'
                        }
                        else if (stuff.props.isMoving) {
                            return 'move'
                        }
                        else {
                            return 'pointer'
                        }
                    }()
                }
            }} collect={() => { return stuff.props; }} disable={stuff.props.isDragging} >
                {connectDragSource(connectDropTarget(contained))}
            </ContextMenuTrigger >
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer
}

var reduxConnectedComponent = connect(mapStateToProps)(Folder);

export default flow(connect(mapStateToProps), DropTarget(['folder', 'file'], fileDrop, folderDropCollect), DragSource('folder', folderDragSource, folderDragCollect))(Folder);
