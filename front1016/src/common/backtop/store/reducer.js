import * as constants from './constants';

const defaultState = {
    showScroll:false
};

export default (state = defaultState, action) =>{
    if(action.type === constants.TOGGLE_TOP_SHOW){
        return {...state,showScroll:action.show}
    }
    return state;
}