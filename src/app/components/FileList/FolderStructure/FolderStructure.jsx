import React from 'react';
import { connect } from 'react-redux';
import styles from './FolderStructure.jsx';
import { getStructure } from '../../../actions/filepage.actions.js';

class FolderStructure extends React.Component {
    constructor(props) {
        super(props);
        this.getStructure = this.getStructure.bind(this);
    }

    componentWillMount(){
        if (this.props.needsStruture){
            this.props.dispatch(getStructure(localStorage.getItem('rootFolder')));
        }
    }

    getStructure(){
        let struc = [];
        
        return struc;
    }

    render() {
        let structure;
        if (this.props.needsStruture){
            structure = this.getStructure();
        }
        return (
            <div className={styles.container}>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(FolderStructure);