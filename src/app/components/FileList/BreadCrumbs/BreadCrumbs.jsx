import React from 'react';
import { connect } from 'react-redux';
import styles from './Breadcrumbs.scss';
import { resolvePath, refreshFileList, setDir } from '../../../actions/filepage.actions.js';

class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.getCrumbs = this.getCrumbs.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(resolvePath(this.props.dir))
        //FIXME: for some reason this needs to be here of the file list doesnt update inside folders. weird
        this.props.dispatch(refreshFileList(this.props.dir[this.props.dir.length-1]))
    }

    getCrumbs(dir) {
        let crumbs = [];
        let key = 0;
        try {
            this.props.resolvedPath.resolvePath.forEach(crumb => {
                crumbs.push(<div key={key++} className={styles.crumb} onClick={(e) => {
                    e.preventDefault();
                    let newDir = this.props.dir.splice(0,this.props.dir.indexOf(crumb._id)+1);
                    this.props.dispatch(setDir(newDir));
                    this.props.dispatch(refreshFileList(newDir));
                }}>{crumb.name}</div>)
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

export default connect(mapStateToProps)(BreadCrumbs);