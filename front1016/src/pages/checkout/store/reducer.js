import {constants} from './index';
const defaultState = {
    postage: 0,
    finalPrice:0,
    CityList:[],
    pickupChecked:false,
    changeAddress:false,
    cashChecked:'',
    doPayment:false,
    formValueObj:{},
    readyPay:false,
    SRNumber:0,
    states:'',
    postcode:'',
    suburb:'',
    remark:'',
    cartInfo:[],
    userInfo:[],
    // clickUserInfo:[],
    checkoutCartImages:[],
    submitReq:false,
    submitSucc:false
}


export default (state=defaultState,action)=>{
    if(action.type===constants.SUBMIT_REQUEST){
        return {...state,submitReq:true}
    }
    if(action.type === constants.CHANGE_ADDRESS){
        return {...state,changeAddress:action.value}
    }
    if(action.type === constants.GET_CHECKOUT_IMAGES){
        return {...state,checkoutCartImages:action.result}
    }
    // if(action.type === constants.ADDRESS_CLICK){
    //     return {...state,clickUserInfo:[action.value]}
    // }
    if(action.type ===constants.EVOKE_CART_DATA){
        return {...state,cartInfo:action.data}
    }
    if(action.type === constants.USER_INFO){
        return {...state,userInfo:action.result}
    }
    if(action.type === constants.CHANGE_STATUS){
        return state;
    }
    if(action.type === constants.SET_TEXTAREA){
        return {...state,remark:action.value}
    }
    if(action.type === constants.READY_PAY){
        return {...state,readyPay:true,SRNumber:action.result.SRNumber,finalPrice:action.mainPrice,submitReq:false,submitSucc:true}
    }
    if(action.type===constants.EMPTY_READY_PAY){
        return {...state,readyPay:false,states:'',suburb:'', cashChecked:'',userInfo:[],clickUserInfo:[],submitSucc:false}
    }
    if(action.type === constants.CAL_POSTAGE){
        return {...state,postage:action.postage,finalPrice:action.finalPrice,doPayment:true}
    }
    if(action.type === constants.SET_FORMVALUE || action.type===constants.SET_FORMVALUE_BY_CLICK){
        return {...state,formValueObj:action.formValue}
    }
    if(action.type === constants.SET_SUBURB){
        return {...state,suburb:action.value}
    }
    if(action.type === constants.SET_STATE){
        return {...state,states:action.value}
    }
    if(action.type === constants.EMPTY_PAYMENT_DISPLAY){
        return {...state,doPayment:false,pickupChecked:false,cashChecked:'',CityList:[],postcode:'',changeAddress:false}
    }
    if(action.type === constants.NO_POSTAGE){
        return {...state,postage:0,doPayment:true}
    }
    if(action.type === constants.POST_MATCH_SUBURB){
        return {...state,CityList:action.result}
    }
    if(action.type === constants.CHANGE_POSTCODE){
        return {...state,CityList:action.result,postcode:action.postcode}
    }
    if(action.type === constants.SET_PICKUP_MOOD){
        return {...state,pickupChecked:true,changeAddress:false,cashChecked:''}
    }
    if(action.type === constants.SET_DELIVERY_MOOD){
        return {...state,pickupChecked:false,changeAddress:false,cashChecked:''}
    }
    if(action.type === constants.SET_PAY_CASH){
        return {...state,cashChecked:'cash'}
    }
    if(action.type === constants.SET_PAY_ONLINE){
        return {...state,cashChecked:''}
    }
    return state;
}