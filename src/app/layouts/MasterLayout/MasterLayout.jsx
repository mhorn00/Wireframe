import React from 'react';
import styles from './MasterLayout.scss';
import { connect } from 'react-redux';
import { authenticate, logout } from '../../actions/login.actions'
import { Redirect } from 'react-router-dom';

class MasterLayout extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (this.props.jwt && !this.props.authenticated) {
            this.props.dispatch(authenticate(this.props.jwt));
        }
        if (!this.props.authenticated && !this.props.auth_pending && this.props.auth_failed && !this.props.logged_out) {
            this.props.dispatch(logout());
        }
        if (!localStorage.getItem('token') || !localStorage.getItem('username') || !localStorage.getItem('rootFolder')) {
            this.props.dispatch(logout());
        }
    }

    render() {
        if (this.props.location && this.props.location.pathname != '/' && this.props.logged_out && (this.props.auth_failed || !this.props.authenticated)) {
            return <Redirect to='/' />
        }
        if (this.props.location && this.props.location.pathname == '/') {
            return (
                <div className={styles.contentNoNav}>
                    {this.props.children}
                </div>
            )
        }
        return (
            <div>
                <header>
                    <nav className={styles.header}>
                        <div className={styles.logo}>
                            <img src='/Logo\Wireframe-Letter.svg' className={styles.logoimg} />
                        </div>
                        <div className={styles.links}>

                        </div>
                        <div className={styles.logout} >
                            {this.props.authenticated && !this.props.logged_out ? <button className={styles.button} onClick={e => {
                                e.preventDefault();
                                this.props.dispatch(logout());
                            }}>Logout</button> : null}
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

function mapStateToProps(state) {
    return state.loginReducer;
}

export default connect(mapStateToProps)(MasterLayout);