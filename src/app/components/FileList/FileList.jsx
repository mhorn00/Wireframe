import React from 'react';
import { connect } from 'react-redux';
import FileElement from './FileElement.jsx';

class FileList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.files.map((f,key)=>{
                    // replace me with file/folder element
                    return <FileElement key={key} file={f}/>
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(FileList);