import {constants} from './index';
const defaultState = {
   orderList : [],
   delOrderReq: false,
   delsignIndex: ''
}


export default (state=defaultState,action)=>{
    if(action.type === constants.GET_ORDER_LIST){
        return {...state,orderList:action.result}
    }
    if(action.type === constants.DELETE_REQ){
        return {...state, delOrderReq:true, delsignIndex: action.delsignIndex}
    }
    if(action.type === constants.DELETE_SUCC){
        return {...state, delOrderReq:false, delsignIndex:'', orderList:state.orderList.filter((item)=>{
           return  item.SRN !== action.SRN
        })}
    }
    return state;
}