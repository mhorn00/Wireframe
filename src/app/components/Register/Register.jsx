import React from 'react';
import styles from './Register.scss'
import { connect } from 'react-redux';
import { checkEmail, checkUsername, submit } from '../../actions/register.actions';
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
        return (
            <div className={styles.cont}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.dispatch(submit(username.value, email.value, password.value))
                }} className={styles.form}>
                    <div className={styles.input}>
                        <div className={styles.sec}>
                            <input type="email" placeholder="Email" required="true" ref={node => email = node} onBlur={(e) => {
                                this.props.dispatch(checkEmail(email.value))
                            }} className={styles.textbox} />
                            <input type="password" placeholder="Password" required="true" ref={node => password = node} className={styles.textbox} />
                        </div>
                        <div className={styles.sec}>
                            <input type="text" placeholder="Username" required="true" ref={node => username = node} onBlur={(e) => {
                                this.props.dispatch(checkUsername(username.value))
                            }} className={styles.textbox} />
                            <input type="password" placeholder="Confirm Password" required="true" ref={node => confirm_password = node} onBlur={(e) => {
                                if (confirm_password.value != password.value) alert('passwords must match')
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