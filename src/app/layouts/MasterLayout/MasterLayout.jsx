import React from 'react';

export default class MasterLayout extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <nav className={styles.header}>
                        <div className={styles.links}>

                        </div>
                        <div className={styles.logout} >

                        </div>
                    </nav>
                </header>
                {this.props.children}
            </div>
        )
    }
}