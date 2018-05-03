import React from 'react';
import styles from './MasterLayout.scss';

export default class MasterLayout extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <nav className={styles.header}>
                        <div className={styles.logo}>
                            <img src='Logo\Wireframe-Letter.svg' width='100' height='60'/>
                        </div>
                        <div className={styles.links}>
                            
                        </div>
                        <div className={styles.logout} >

                        </div>
                    </nav>
                </header>
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}