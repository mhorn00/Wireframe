import React from 'react';
import { connect } from 'react-redux';
import styles from './BreadCrumbs.scss';
import { setDir, resetList } from '../../../actions/filepage.actions';

class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.setBread = this.setBread.bind(this);
    }

    setBread(file) {
        let bread = [];
        let key = 0;
        /* part = part.substring(0, part.length - 1);
        if (part == '') {
            return;
        }
        bread.push(<div key={key++} className={styles.crumb} onClick={(e) => {
            e.preventDefault();
            let newPath = dir.slice(0, dir.indexOf(part != 'root' ? part + '/' : '/') + 1);
            console.log(newPath);
            this.props.dispatch(setDir(newPath));
            this.props.dispatch(resetList(newPath));
        }}>{part}</div>); */
        this.props.dir.forEach(path => {
            let indexOfPath = this.props.files.findIndex(file => file._id === path);
            if (path === '') path = 'root' // if path === '' it is the root element (empty id)
            bread.push((
                <div key={key++} className={styles.crumb} onClick={(e) => {
                    e.preventDefault();
                    let newDir = this.props.dir.slice(0, indexOfPath);
                    this.props.dispatch(setDir(newDir));
                    this.props.dispatch(resetList(newDir));
                }}>
                    {path}
                </div>
            ))
            bread.push(<div key={key++} className={styles.crumbSep} > /</div >)
        }
        )
        return bread;
    }

    render() {
        let breadcrumbs = this.setBread(this.props.dir);

        return (
            <div className={styles.cont}>
                {breadcrumbs}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.fileListReducer;
}

export default connect(mapStateToProps)(BreadCrumbs);