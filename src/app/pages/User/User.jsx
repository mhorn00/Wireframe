import React from 'react';
import { connect } from 'react-redux';
import styles from './User.scss';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import FileList from '../../components/FileList/FileList/FileList.jsx';

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
                        <FileList />
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