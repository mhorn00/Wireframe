import React from 'react';
import { connect } from 'react-redux';
import FileElement from '../FileElement/FileElement.jsx';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styles from './FileList.scss';
import { resetList, makeFolder } from '../../../actions/filepage.actions';
import EmptyFolder from '../EmptyFolder/EmptyFolder.jsx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'


class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.fileElementClick.bind(this);
        this.emptyAreaClick = this.emptyAreaClick.bind(this);
    }

    fileElementClick(e, data) {
    }

    emptyAreaClick(e, data){
        switch(data.type){
            case "newFolder":{
                this.props.dispatch(makeFolder());
            }
        }
    }

    componentWillMount() {
        this.props.dispatch(resetList(this.props.dir));
    }

    render() {
        if (!this.props.files && !this.props.error) {
            return <p>Loading</p>
        }
        return (
            <div className={styles.cont}>
                <ContextMenuTrigger id="filelist" >
                    <div className={styles.content}>
                        <div className={styles.bread}>
                        </div>
                        <div className={styles.files}>
                            <div className={styles.header}>
                                <div className={styles.icon}></div>
                                <div className={styles.info}>Name</div>
                                <div className={styles.info}>Size</div>
                                <div className={styles.info}>Type</div>
                            </div>
                            {
                                this.props.isMakingFolder? <EmptyFolder/> : <div/>
                            }
                            {this.props.files != null ? this.props.files.map((f, key) => {
                                return (<FileElement key={key} file={f} />)
                            }) : <div></div>}
                        </div>
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id="filelist" className={styles.menu}>
                    <MenuItem data={{ type: 'newFolder' }} onClick={this.fileElementClick} className={styles.item}>
                        <p className={styles.text}>New Folder</p>
                    </MenuItem>
                </ContextMenu>
                <ContextMenu id="element" className={styles.menu}>
                    <MenuItem data={{ type: 'rename', element: this.props.key }} onClick={this.emptyAreaClick} className={styles.item}>
                        <p className={styles.text}>Rename</p>
                    </MenuItem>
                    <MenuItem data={{ type: 'delete', element: this.props.key }} onClick={this.emptyAreaClick} className={styles.item}>
                        <p className={styles.text}>Delete</p>
                    </MenuItem>
                    <MenuItem data={{ type: 'share', element: this.props.key }} onClick={this.emptyAreaClick} className={styles.item}>
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