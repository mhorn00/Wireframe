import React from 'react';
import styles from './Register.scss'
import { connect } from 'react-redux';
import { checkEmail, checkUsername, submit, passwordsMatch } from '../../actions/register.actions';
import { switchScreen } from '../../actions/homecontainer.actions';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let username;
        let email;
        let password;
        let confirm_password;
        let err;
        if (this.props.emailValid==false) {
            err = <p style={{ margin: 0 }}>Email is already in use</p>;
        } else if (this.props.usernameValid == false) {
            err = <p style={{ margin: 0 }}>Username is already in use</p>;
        } else if (this.props.passwordsMatch == false) {
            err = <p style={{ margin: 0 }}>Passwords do not match</p>;
        }
        return (
            <div className={styles.cont}>
                <div className={styles.error}>
                    {err}
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.dispatch(submit(username.value, email.value, password.value));
                    this.props.dispatch(switchScreen("login"));
                }} className={styles.form}>
                    <div className={styles.input}>
                        <div className={styles.sec}>
                            <input type="email" placeholder="Email" required="true" ref={node => email = node} onBlur={(e) => {
                                this.props.dispatch(checkEmail(email.value))
                            }} className={styles.textbox} />
                            <input type="password" placeholder="Password" required="true" ref={node => password = node} onBlur={(e) => {
                                if (confirm_password.value) this.props.dispatch(passwordsMatch(password.value, confirm_password.value));
                            }} className={styles.textbox} />
                        </div>
                        <div className={styles.sec}>
                            <input type="text" placeholder="Username" required="true" ref={node => username = node} onBlur={(e) => {
                                this.props.dispatch(checkUsername(username.value))
                            }} className={styles.textbox} />
                            <input type="password" placeholder="Confirm Password" required="true" ref={node => confirm_password = node} onBlur={(e) => {
                                this.props.dispatch(passwordsMatch(password.value, confirm_password.value));
                            }} className={styles.textbox} />
                        </div>
                    </div>
                    <input type="submit" value="Register" className={styles.submit} />
                </form>
                <a onClick={e => {
                    this.props.dispatch(switchScreen("login"));
                }} className={styles.login}> Login </a>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return state.registerReducer;
}

export default connect(mapStateToProps)(Register);