import React from 'react';
import { setDir, refreshRequest } from '../../../actions/filepage.actions';
import { connect } from 'react-redux';
import styles from './FileElement.scss';

class FileElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { file, dispatch } = this.props;

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
                        var newPath = this.props.dir.splice(0,this.props.dir.length-1);
                        dispatch(setDir(newPath));
                        dispatch(refreshRequest(newPath, 'setDir'));
                        break;
                    }
                    default: {
                        return;
                    }
                }

            }} className={styles.file}>
                <td className={styles.icon}><i className="far fa-file"/></td>
                <td className={styles.text}>{file.name}</td>
                <td className={styles.text}>{file.fileSize}</td>
                <td className={styles.text}>{file.type}</td>
            </tr>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer
}

export default connect(mapStateToProps)(FileElement);
