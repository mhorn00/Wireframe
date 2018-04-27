import React from 'react';
import {login} from '../../actions/login.actions';
import {connect} from 'react-redux';

class LoginTest extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        let username;
        let password;
        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.dispatch(login(username.value, password.value))
                }}>
                    <input type="text" placeholder="username" ref={node=>username=node}/>
                    <input type="password" ref={node => password = node}/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

function mapStateToprops(state){
    return state;
}

export default connect(mapStateToprops)(LoginTest);