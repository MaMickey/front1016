import {constants} from './index';
const defaultState = {
    Address:[],
    suburbList:[],
    add_succ:true,
    postcode:'',
    Pnumber:0
}


export default (state=defaultState,action)=>{
    if(action.type === constants.SET_PNUMBNER){
        return {...state,Pnumber:action.value}
    }
    if(action.type===constants.EDIT_SUCC){
        return {...state,add_succ:!state.add_succ}
    }
    if(action.type===constants.ADD_ADDRESS){
        return{...state,add_succ:!state.add_succ}
    }
    if(action.type===constants.EMPTY_ADDRESS){
        return {...state,Address:[],suburbList:[],postcode:''}
    }
    if(action.type===constants.GET_EDIT_ADDRESS){
        return {...state,Address:action.finalresult}
    }
    if(action.type===constants.GET_DEFAULT_ADDRESS){
        return{...state,Address:action.finalresult}
    }
    if(action.type === constants.GET_SUBURB_RN){
        return {...state,suburbList:action.result}
    }
    if(action.type===constants.GET_SUBURB){
        return {...state,suburbList:action.result}
    }
    if(action.type === constants.CHANGE_POSTCODE_GET_SUBURB){
        return {...state,suburbList:action.result,postcode:action.postcode}
    }

    return state;
}