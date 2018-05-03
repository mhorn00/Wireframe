import React from 'react';
import { connect } from 'react-redux';
import styles from './User.scss';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MasterLayout>
                <div className={styles.cont}>
                    <div className={styles.sidebar}>

                    </div>
                    <div className={styles.content}>

                    </div>
                </div>
            </MasterLayout>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(User);