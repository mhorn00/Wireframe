import React from 'react';
import styles from './Login.scss';
import { login } from '../../actions/login.actions';
import { connect } from 'react-redux';
import {switchScreen} from '../../actions/homecontainer.actions';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let username;
        let password;
        if (this.props.loginReducer.pending) {
            return (<p> Pending </p>)
        }
        return (
            <div className={styles.cont}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.dispatch(login(username.value, password.value))
                }} className={styles.form}>
                    <div className={styles.input}>
                        <input type="text" placeholder="Username" ref={node => username = node} className={styles.textbox}/>
                        <input type="password" placeholder="Password" ref={node => password = node} className={styles.textbox} />
                    </div>
                    <input type="submit" className={styles.submit}/>
                    
                </form>
                <a onClick={e=>{
                    this.props.dispatch(switchScreen("register"));
                }} className={styles.register}> Register </a>
            </div>
        )
    }
}

function mapStateToprops(state) {
    return state;
}

export default connect(mapStateToprops)(Login);