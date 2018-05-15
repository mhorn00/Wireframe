import React from 'react';
import { connect } from 'react-redux';
import styles from './Breadcrumbs.scss';
import { resolvePath } from '../../../actions/filepage.actions.js';

class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.getBread = this.getBread.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(resolvePath(this.props.dir))
    }

    getBread(dir) {
        let crumbs = [];
        let key = 0;
    }

    render() {
        let crumbs = this.getBread(this.props.dir);
        return (
            <div className={styles.cont}>
                {crumbs}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(BreadCrumbs);