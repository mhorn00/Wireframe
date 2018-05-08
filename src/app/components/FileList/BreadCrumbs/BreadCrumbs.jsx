import React from 'react';
import { connect } from 'react-redux';
import styles from './BreadCrumbs.scss';
import { setDir, resetList } from '../../../actions/filepage.actions';

class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.setBread = this.setBread.bind(this);
    }

    setBread(dir) {
        let bread = [];
        let key = 0;
        bread.push(<div key={key++} className={styles.crumb} onClick={(e) => {
            e.preventDefault();
            let newPath = [''];
            this.props.dispatch(setDir(newPath));
            this.props.dispatch(resetList(newPath));
        }}>root</div>);
        dir.forEach(part => {
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
            if (part !== '') {
                bread.push(
                    <div key={key++} className={styles.crumb} onClick={(e) => {
                        e.preventDefault();
                        console.log(key);

                    }}>
                    {part}
                    </div>
                )
            }
            bread.push(<div key={key++} className={styles.crumbSep}>/</div>)
        });
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