import React from 'react';
import { connect } from 'react-redux';
import FileElement from '../FileElement/FileElement.jsx';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import styles from './FileList.scss';
import { resetList } from '../../../actions/filepage.actions';

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, data) {
        //Dispatch to make new folder
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
                <ContextMenuTrigger id="filelist">
                    <div className={styles.content}>
                        <div className={styles.bread}>
                        </div>

                        <table className={styles.files}>
                            <tbody>
                                <tr className={styles.header}>
                                    <th className={styles.icon}></th>
                                    <th className={styles.info}>Name</th>
                                    <th className={styles.info}>Size</th>
                                    <th className={styles.info}>Type</th>
                                </tr>
                                {this.props.files != null ? this.props.files.map((f, key) => {
                                    return (<FileElement key={key} file={f} />)
                                }) : <tr></tr>}

                            </tbody>
                        </table>
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id="filelist" className={styles.menu}>
                    <MenuItem data={{ type: 'newFolder' }} onClick={this.handleClick} className={styles.item}>
                        <p className={styles.text}>New Folder</p>
                    </MenuItem>
                </ContextMenu>
            </div>
        )
    }
    /*  {this.props.dir.length<=1?null:<FileElement file={{type:'\'', name:'..'}}/>}

                 */
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(FileList);