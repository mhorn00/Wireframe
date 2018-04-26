import { createStore, combineReducers } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import loginReducer from './reducers/login.reducer';

const reducers = combineReducers({
    //Add reducers here
    loginReducer
})

const store = createStore(reducers, composeWithDevTools());
