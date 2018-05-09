import React from 'react';
import { connect } from 'react-redux';
import FileElement from '../FileElement/FileElement.jsx';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styles from './FileList.scss';
import { resetList, makeFolder, removeFile, startRename } from '../../../actions/filepage.actions';
import EmptyFolder from '../EmptyFolder/EmptyFolder.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs.jsx';
import { Folder } from '../FileElement/FileElement.jsx';


class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.fileElementClick = this.fileElementClick.bind(this);
        this.emptyAreaClick = this.emptyAreaClick.bind(this);
    }

    fileElementClick(e, data) {
        switch (data.type) {
            case "rename": {
                this.props.dispatch(startRename(data.file._id));
                return;
            }
            case "delete": {
                this.props.dispatch(removeFile(data.dir, data.file.name));
                return;
            }
            case "share": {
                //TODO: add share link
                //this.props.dispatch();
                return;
            }
        }
    }

    emptyAreaClick(e, data) {
        switch (data.type) {
            case "newFolder": {
                this.props.dispatch(makeFolder());
                return;
            }
        }
    }

    componentWillMount() {
        this.props.dispatch(resetList(this.props.dir));
    }

    render() {
        if (!this.props.files && !this.props.error) {
            return <p className={styles.loading}>Loading</p>
        }
        return (
            <div className={styles.cont}>
                <ContextMenuTrigger id="filelist" >
                    <div className={styles.content}>
                        <div className={styles.bread}>
                            <BreadCrumbs />
                        </div>
                        <div className={styles.files}>
                            <div className={styles.header}>
                                <div className={styles.icon}></div>
                                <div className={styles.info}>Name</div>
                                <div className={styles.info}>Size</div>
                                <div className={styles.info}>Type</div>
                            </div>
                            {this.props.isMakingFolder ? <EmptyFolder /> : <div />}
                            {this.props.files != null ? this.props.files.map((f, key) => {
                                return (f.type!=='dir'?<FileElement key={key} file={f} />:<Folder key={key} file={f}/>)
                            }) : <p> i have no files </p>}
                        </div>
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id="filelist" className={styles.menu}>
                    <MenuItem data={{ type: 'newFolder' }} onClick={this.emptyAreaClick} className={styles.item}>
                        <p className={styles.text}>New Folder</p>
                    </MenuItem>
                </ContextMenu>
                <ContextMenu id="element" className={styles.menu}>
                    <MenuItem data={{ type: 'rename' }} onClick={this.fileElementClick} className={styles.item}>
                        <p className={styles.text}>Rename</p>
                    </MenuItem>
                    <MenuItem data={{ type: 'delete' }} onClick={this.fileElementClick} className={styles.item}>
                        <p className={styles.text}>Delete</p>
                    </MenuItem>
                    <MenuItem data={{ type: 'share' }} onClick={this.fileElementClick} className={styles.item}>
                        <p className={styles.text}>Share</p>
                    </MenuItem>
                </ContextMenu>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(FileList));