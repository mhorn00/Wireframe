import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import Login from './components/Login/Login.jsx';
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path ='/*' component={Login}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}