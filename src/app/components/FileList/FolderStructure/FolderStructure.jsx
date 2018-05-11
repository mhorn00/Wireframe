import React from 'react';
import {connect} from 'react-redux';

class FolderStructure extends React.Component{
    constructor(props){
        super(props);
    }

    render(){	
        return(
            <div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return state.fileListReducer;
}

export default connect(mapStateToProps)(FolderStructure);