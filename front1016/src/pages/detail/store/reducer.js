import {constants} from './index';
const defaultState = {
    productList: [],
    // detail 
    productInfo: [],
    quantity:1,
    cart:[],
    totalPrice:0,
    outStock:false
}

export default (state=defaultState,action)=>{   
    if(action.type === constants.GET_PRODUCT_DETAIL){
        return {...state,productInfo:action.result}
    }
    if(action.type === constants.OUT_STOCK){
        return {...state,outStock:true}
    }
    if(action.type === constants.CHANGE_INPUT_QUANTITY){
        return {...state,quantity:action.quantity,outStock:false}
    }
    if(action.type === constants.MINUS_QUANTITY_1){
        if(state.quantity === 1){
            return state
        }
        else{
            return {...state,quantity:state.quantity-1,outStock:false}
        }     
    }
    if(action.type === constants.ADD_QUANTITY_1){
        return {...state,quantity:state.quantity+1,outStock:false}
    }
    if(action.type === constants.ADD_TO_CART){
        return {...state,cart:state.cart.concat({'quantity':action.quantity,'cart':action.productInfo})}
    }
    if(action.type === constants.EMPTY_QUANTITY_AND_DETAIL){
        return {...state,quantity:1,productInfo:[],outStock:false}
    }
    return state;
}