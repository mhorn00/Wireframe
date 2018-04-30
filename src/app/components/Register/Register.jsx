import React from 'react';
import { connect } from 'react-redux';
import {checkEmail, checkUsername, submit} from '../../actions/register.actions';
import {switchScreen} from '../../actions/homecontainer.actions';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let username;
        let email;
        let password;
        let confirm_password;
        console.log(this.props)
        return (
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.dispatch(submit(username.value, email.value, password.value))
                }}>
                    <input type="text" placeholder="Username" required="true" ref={node=>username=node} onBlur={(e) => {
                        // check username validity
                        // onblur is fired when element loses focus
                        this.props.dispatch(checkUsername(username.value))
                    }} />
                    <input type="email" placeholder="johnsmith@gmail.com" required="true" ref={node=>email=node} onBlur={(e) => {
                        // check email validity
                        this.props.dispatch(checkEmail(email.value))
                    }} />
                    <input type="password" placeholder="Password" required="true" ref={node=>password=node}/>
                    <input type="password" placeholder="Confirm Password" required="true" ref={node=>confirm_password=node} onBlur={(e)=>{
                        // check that passwords match
                        if(confirm_password.value!=password.value) alert('passwords must match')
                    }}/>
                    <input type="submit" value="Register!"/>
                </form>
                <button  onClick={e=>{
                    this.props.dispatch(switchScreen("login"));
                }}> Login </button>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return state.registerReducer;
}

export default connect(mapStateToProps)(Register);