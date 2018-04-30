import React from 'react';
import styles from './Login.scss';
import { login } from '../../actions/login.actions';
import { connect } from 'react-redux';
import {switchScreen} from '../../actions/homecontainer.actions';

class LoginTest extends React.Component {
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
            <div className={styles.loginContainer}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.dispatch(login(username.value, password.value))
                }}>
                    <div className={styles.cont}>
                        <input type="text" placeholder="Username" ref={node => username = node} className={styles.user}/>
                        <input type="password" placeholder="Password" ref={node => password = node} className={styles.pass} />
                    </div>
                    <input type="submit" className={styles.submit}/>
                </form>
                <button onClick={e=>{
                    this.props.dispatch(switchScreen("register"));
                }}> Register </button>
            </div>
        )
    }
}

function mapStateToprops(state) {
    return state;
}

export default connect(mapStateToprops)(LoginTest);