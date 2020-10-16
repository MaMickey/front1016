import {constants} from './index';
const defaultState = {
   orderDetail : [],
   orderCheck: []
}


export default (state=defaultState,action)=>{
    if(action.type === constants.GET_ORDER_DETAIL){
        return {...state,orderDetail:action.result}
    }
    if(action.type === constants.ORDER_CHECK){
        return {...state,orderCheck:action.result}
    }
    if(action.type === constants.CLEAR_ORDER_CHECK){
        return {...state,orderCheck:''}
    }
    if(action.type === constants.CHANGE_STATUS){
        return state;
    }
    
    return state;
}