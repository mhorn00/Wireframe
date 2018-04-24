import React from 'react';
import styles from './Home.scss';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import Particle from '../../components/Particle/Particle.jsx';

export default class Home extends React.Component {
    render() {
        return (
            <MasterLayout>
                <div className={styles.top}>
                    <Particle />
                </div>
            </MasterLayout>
        )
    }
}