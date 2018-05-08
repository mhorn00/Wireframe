import React from 'react';
import { connect } from 'react-redux';
import styles from './BreadCrumbs.scss'; 

class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.setBread = this.setBread.bind(this);
    }

    setBread(dir){        
        let bread = [];
        let key=0;
        dir.forEach(part => {
            console.log(part)
            bread.push(<div key={key++} className={styles.text}>{part}</div>);
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