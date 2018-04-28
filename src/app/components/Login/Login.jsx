import React from'react';
import {login} from '../../actions/login.actions';
import {connect} from 'react-redux';
const Login = ({dispatch}) => {
    let pass;
    let user;
    console.log(this.props);
    return (
        <div>
            <form onSubmit={e=>{
                e.preventDefault();
                dispatch(login(user.value, pass.value));
            }}>
                <input type="text" placeholder="Username" ref={node=>user=node}/>
                <input type="password" ref={node=>pass=node}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

function mapStateToprops(state) {
    return state;
}

export default connect(mapStateToprops)(Login);
/* export default class Login extends React.Component{
    
} */