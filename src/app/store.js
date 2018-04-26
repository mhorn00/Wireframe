import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import loginReducer from './reducers/login.reducer';

const reducers = combineReducers({
    //Add reducers here
    loginReducer
})

const store = createStore(reducers, composeWithDevTools(), applyMiddleware(thunk));

export default store;
