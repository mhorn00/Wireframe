import React from 'react';
import { connect } from 'react-redux';
import styles from './BreadCrumbs.scss';
import { resolvePath, refreshFileList, setDir } from '../../../actions/filepage.actions.js';
import { DropTarget } from 'react-dnd';
import {flow} from 'lodash';
import Crumb from './Crumb.jsx';

class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.getCrumbs = this.getCrumbs.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(resolvePath(this.props.dir))
        //FIXME: for some reason this needs to be here of the file list doesnt update inside folders. weird
        this.props.dispatch(refreshFileList(this.props.dir[this.props.dir.length - 1]))
    }

    getCrumbs(dir) {
        //var {connectDropTarget} = this.props;
        let crumbs = [];
        let key = 0;
        try {
            this.props.resolvedPath.resolvePath.forEach(crumb => {
                crumbs.push(<Crumb key={key++} name={crumb.name} _id = {crumb._id}/>);
                crumbs.push(<div key={key++} className={styles.crumbSep}>/</div>)
            })
        } catch (e) {
            return undefined;
        }
        return crumbs;
    }

    render() {
        let bread;
        if (!this.props.resolvePathPending) {
            bread = this.getCrumbs(this.props.dir);
        }
        return (
            <div className={styles.cont}>
                {this.props.resolvePathPending ? <div className={styles.loading}>Loading</div> : bread}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default flow(connect(mapStateToProps))(BreadCrumbs);