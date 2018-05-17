import React from 'react';
import { connect } from 'react-redux';
import styles from './User.scss';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import FileList from '../../components/FileList/FileList/FileList.jsx';
import Uploader from '../../components/FileList/Uploader/Uploader.jsx';
import FolderStructure from '../../components/FileList/FolderStructure/FolderStructure.jsx';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {flow} from 'lodash'

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MasterLayout location='/profile'>
                <div className={styles.cont}>
                    <div className={styles.sidebar}>
                        <div className={styles.folderStruc}>
                            <FolderStructure />
                        </div>
                        <div className={styles.uploader}>
                            <Uploader />
                        </div>
                    </div>
                    <div className={styles.content}>
                        <FileList />
                    </div>
                </div>
            </MasterLayout>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default flow(DragDropContext(HTML5Backend),connect(mapStateToProps))(User);