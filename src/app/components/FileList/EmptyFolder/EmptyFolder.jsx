import React from 'react';
import { setDir, refreshRequest, finalizeFolder } from '../../../actions/filepage.actions';
import { connect } from 'react-redux';
import styles from './EmptyFolder.scss';

class EmptyFolder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let icon = "far fa-folder";
        let filename;
        return (
            <div className={styles.file}>
                <div className={styles.icon}><i className={icon} /></div>
                <div className={styles.text}>
                    <form onSubmit={e => {
                        e.preventDefault();
                        this.props.dispatch(finalizeFolder(filename.value, this.props.dir));
                    }} className={styles.form}>
                        <input type="text" placeholder="New Folder" ref={node => filename = node} className={styles.textbox} />
                    </form>
                </div>
                <div className={styles.text}></div>
                <div className={styles.text}></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer
}

const connectedFileElement = connect(mapStateToProps)(EmptyFolder);

export default connectedFileElement;
