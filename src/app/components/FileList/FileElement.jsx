import React from 'react';
import {connect} from 'react-redux'

class FileElement extends React.Component{
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
    return state;
}

export default connect(mapStateToProps)(FileElement)