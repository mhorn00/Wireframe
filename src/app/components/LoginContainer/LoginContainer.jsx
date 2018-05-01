import React from 'react';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import { connect } from 'react-redux';

class LoginContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.screen == "login" ? <Login /> : <Register />}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.homecontainerReducer;
}

export default connect(mapStateToProps)(LoginContainer);
