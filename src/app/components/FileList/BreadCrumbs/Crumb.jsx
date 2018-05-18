import React from 'react';
import { connect } from 'react-redux';
import {setDir, moveElement} from '../../../actions/filepage.actions';
import {flow} from 'lodash';
import {DropTarget} from 'react-dnd';
import styles from './BreadCrumbs.scss';

const fileDrop = {
    canDrop(props, monitor) {
        return true
    },
    drop(prop, monitor, connect) {
        var props = connect.props;
        var element = monitor.getItem();
        props.dispatch(moveElement(element._id, props.dir[props.dir.length - 1], props._id, element.type==="|dir|"));
    }
}

function folderDropCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Crumb extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var {connectDropTarget} = this.props;

        return connectDropTarget(
            <div className={styles.crumb} onClick={(e) => {
                e.preventDefault();
                console.log(this.props.dir);
                let newDir = this.props.dir.splice(0, this.props.dir.indexOf(this.props._id) + 1);
                this.props.dispatch(setDir(newDir));
                //this.props.dispatch(refreshFileList(newDir));
            }}>
                {this.props.name}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default flow(DropTarget(['file', 'folder'],fileDrop, folderDropCollect),connect(mapStateToProps))(Crumb);