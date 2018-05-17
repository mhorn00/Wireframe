import React from 'react';
import { connect } from 'react-redux';
import FileElement from '../FileElement/FileElement.jsx';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styles from './FileList.scss';
import { refreshFileList, makeFolder, removeFile, startRename, downloadFile, updatePersistance } from '../../../actions/filepage.actions';
import EmptyFolder from '../EmptyFolder/EmptyFolder.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import Folder from '../FolderElement/FolderElement.jsx';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs.jsx';
import { URL as IP } from '../../../const.js';

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.fileElementClick = this.fileElementClick.bind(this);
        this.folderElementClick = this.folderElementClick.bind(this);
        this.emptyAreaClick = this.emptyAreaClick.bind(this);
    }

    fileElementClick(e, data) {
        console.log(data);
        switch (data.type) {
            case "rename": {
                this.props.dispatch(startRename(data.file._id));
                return;
            }
            case "delete": {
                this.props.dispatch(removeFile(data.file, data.dir));
                return;
            }
            case "share": {
                //TODO: add share link
                //this.props.dispatch(createShareLink);
                return;
            }
            case "download": {
                //TODO: download should not show up for folders
                window.open(`${IP}/filedl?token=${localStorage.getItem('token')}&_id=${data.file._id}&name=${data.file.name}`);
                return;
            }
        }
    }


    folderElementClick(e,data){
        switch(data.type){
            case "rename": {
                this.props.dispatch(startRename(data.folder._id));
                return;
            }
            case "delete": {
                console.log(data);
                this.props.dispatch(removeFile(data.folder, data.dir));
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

    componentDidMount() {
        this.props.dispatch(refreshFileList(this.props.dir[this.props.dir.length - 1]))        
        if (this.props.persistanceNeedsUpdate){
            this.props.dispatch(updatePersistance(<BreadCrumbs />, files));
        }
    }

    render() {
        let files = this.props.files != null ? this.props.files.map((f, key) => {
            return (f.type !== '|dir|' ? <FileElement key={key} file={f} /> : <Folder key={key} folder={f} />)
        }) : <div></div>;
        if (!this.props.files && !this.props.error) {
            return (
                <div className={styles.cont}>
                    <div className={styles.content}>
                        <div className={styles.bread}>
                            {this.props.persistance.breadcrumbs}
                        </div>
                        <div className={styles.files}>
                            <div className={styles.header}>
                                <div className={styles.icon}></div>
                                <div className={styles.info}>Name</div>
                                <div className={styles.info}>Size</div>
                                <div className={styles.info}>Type</div>
                                {this.props.persistance.filelist}
                            </div>
                        </div>
                    </div>
                </div>)
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
                                <div className={styles.icon}><i className='far fa-file' /></div>
                                <div className={styles.info}>Name</div>
                                <div className={styles.info}>Size</div>
                                <div className={styles.info}>Type</div>
                            </div>
                            {this.props.isMakingFolder ? <EmptyFolder /> : <div />}
                            {files}
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
                    <MenuItem data={{ type: 'download' }} onClick={this.fileElementClick} className={styles.item}>
                        <p className={styles.text}>Download</p>
                    </MenuItem>
                </ContextMenu>

                <ContextMenu id="folderelement" className={styles.menu}>
                    <MenuItem data={{ type: 'rename' }} onClick={this.folderElementClick} className={styles.item}>
                        <p className={styles.text}>Rename</p>
                    </MenuItem>
                    <MenuItem data={{ type: 'delete' }} onClick={this.folderElementClick} className={styles.item}>
                        <p className={styles.text}>Delete</p>
                    </MenuItem>
                    <MenuItem data={{ type: 'share' }} onClick={this.folderElementClick} className={styles.item}>
                        <p className={styles.text}>Share</p>
                    </MenuItem>
                    {/* <MenuItem data={{ type: 'download' }} onClick={this.fileElementClick} className={styles.item}>
                        <p className={styles.text}>Download</p>
                    </MenuItem> 
                    
                    Disabled Folder Download Button for now

                    */}
                </ContextMenu>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(FileList);