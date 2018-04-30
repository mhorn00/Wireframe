import actions from '../actions/homecontainer.actions';

const homecontainer = (state={screen:'login'}, action) =>{
    switch(action.type){
        case actions.SWITCH_VIEW:{
            return Object.assign({}, state, {screen: action.toScreen});
        }
        default:
            return state;
    }
}

export default homecontainer;