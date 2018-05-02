import React from 'react';
import styles from './Login.scss';
import { login } from '../../actions/login.actions';
import { connect } from 'react-redux';
import { switchScreen } from '../../actions/homecontainer.actions';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let username;
        let password;
        let err;
        if (this.props.error) {
            if (this.props.error == "ERR_INVALIDUSER") {
                err = <p style={{margin:0}}>Invalid Username</p>;
            } else if (this.props.error == "ERR_UNAPPROVED") {
                err = <p style={{margin:0}}>Account not approved</p>;
            } else if (this.props.error == "ERR_WRONGPASS") {
                err = <p style={{margin:0}}>Invalid Password</p>;
            }
        }
        if (this.props.pending) {
            return (<p> Pending </p>)//ADD LOADING ANIMATION
        }
        return (
            <div className={styles.cont}>
                <div className={styles.error}>
                    {err}
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.dispatch(login(username.value, password.value))
                }} className={styles.form}>
                    <div className={styles.input}>
                        <input type="text" placeholder="Username" ref={node => username = node} className={styles.textbox} />
                        <input type="password" placeholder="Password" ref={node => password = node} className={styles.textbox} />
                    </div>
                    <input type="submit" className={styles.submit} />

                </form>
                <a onClick={e => {
                    this.props.dispatch(switchScreen("register"));
                }} className={styles.register}> Register </a>
            </div>
        )
    }
}

function mapStateToprops(state) {
    return state.loginReducer;
}

export default connect(mapStateToprops)(Login);