import React from 'react';
import {connect} from 'react-redux';

import {refreshRequest, refreshItems} from '../../actions/filepage.actions';

class FilePage extends React.Component{
    constructor(props){
        super(props);
        this.props.dispatch(refreshItems(this.props.dir,'constructor'))
    }

    render(){	
        console.log(this.props);
        return (
            <div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return state.filelistReducer;
}

export default connect(mapStateToProps)(FilePage);