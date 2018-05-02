import React from 'react';
import { connect } from 'react-redux';
import FileList from '../../components/FileList/FileList.jsx';
import { refreshRequest, refreshItems } from '../../actions/filepage.actions';

class FilePage extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        if (!this.props.files) {
            this.props.dispatch(refreshItems(this.props.dir));
        }
        return !this.props.pending && this.props.files ? <FileList /> : <p> i am loading ... </p>;
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(FilePage);