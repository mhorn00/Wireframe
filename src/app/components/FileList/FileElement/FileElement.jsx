import React from 'react';
import { setDir, refreshRequest } from '../../../actions/filepage.actions';
import { connect } from 'react-redux';

class FileElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { file, dispatch } = this.props;
        return (
            <div onClick={e => {
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

            }}>
                <p>{file.name}</p>
                <p>{file.uploadDate}</p>
                <p>{file.type}</p>
                <p>{file.fileSize}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer
}

export default connect(mapStateToProps)(FileElement);
