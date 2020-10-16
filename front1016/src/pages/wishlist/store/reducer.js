import {constants} from './index';

const defaultState = {
    wishList:[],
    refresh:true,
    wishImages:[],
    Succimg:'', 
    Succtitle:'',
    SuccessQuantity:0,
    delWishReq:false,
    delWishSign:''
}

export default (state=defaultState,action)=>{  
    if(action.type===constants.EVOKE_WISH_DATA){
        return {...state,wishList:action.data,delWishReq:false,delWishSign:''}
    }
    if(action.type === constants.DELETE_WISH){
        return {...state,refresh:!state.refresh,delWishReq:true,delWishSign:action.CustomLabel}
    }
    if(action.type === constants.ADD_TO_CART){
        return {...state, refresh:!state.refresh,Succimg:action.Succimg, Succtitle:action.Succtitle, SuccessQuantity:action.SuccessQuantity}
    }
    if(action.type === constants.GET_WISH_IMAGES){
        return {...state,wishImages:action.result}
    }
    return state;
}