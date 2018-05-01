import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import Register from './components/Register/Register.jsx';
import FilePage from './Pages/Files/FilePage.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {/*<Route exact path='/' component={Home} />*/}
                        <Route path ='/register' component={Register}/>
                        <Route path='/files' component={FilePage}/>
                        <Route path ='/*' component={Home}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}