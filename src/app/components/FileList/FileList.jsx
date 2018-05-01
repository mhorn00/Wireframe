import React from 'react';
import { connect } from 'react-redux';

class FileList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.files.map((f,key)=>{
                    // replace me with file/folder element
                    return <p key={key}> {f.name}, {f.type}, {f.fileSize} </p>
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(FileList);