import { createStore, combineReducers } from 'redux';

const reducers = combineReducers({
    //Add reducers here
})

const store = createStore(reducers, {});

store.subscribe(()=>{
    console.log("STORE CHANGE",store.getState());
})