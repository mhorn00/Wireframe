import React from 'react';
import styles from './Home.scss';
import MasterLayout from '../../layouts/MasterLayout/MasterLayout.jsx';
import Particle from '../../components/Particle/Particle.jsx';
import LoginContaier from '../../components/LoginContainer/LoginContainer.jsx';

export default class Home extends React.Component {
    render() {
        return (
            <MasterLayout>
                <div className={styles.top}>
                    <Particle />
                    <div className={styles.content}>
                        <div className={styles.container}>
                            <div className={styles.logo}>
                                <img src='logo/Wireframe-Full.png'/>
                            </div>
                            <div className={styles.login}>
                                <LoginContaier />
                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        )
    }
}