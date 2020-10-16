import {constants} from './index';
const defaultState = {
    inputValue:'',
    order:[],
    finalResult:[]
}

export default (state=defaultState, action) =>{
    if(action.type === constants.HANDLE_CHANGE){
        return {...state,inputValue:action.value}
    }
   if(action.type === constants.GET_INFO){
       return {...state,order:action.result}
   }
   if(action.type=== constants.CALCULATE){
       return {...state,finalResult:action.result}
   }
    return state;
}