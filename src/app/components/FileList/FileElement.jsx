import React from 'react';
import {addToDir} from '../../actions/filepage.actions';
import {connect} from 'react-redux';

class FileElement extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var {file} = this.props;
        return(
            <div onClick={e=>{
                this.props.dispatch(addToDir(file.name+'/', file.userRelativePath))
            }}>
                <p>{file.name}</p>
                <p>{file.uploadDate}</p>
                <p>{file.type}</p>
                <p>{file.fileSize}</p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state.fileListReducer
}

export default connect(mapStateToProps)(FileElement);
