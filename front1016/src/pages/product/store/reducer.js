import {constants} from './index';
const defaultState = {
    text:'',
    productList:[],
    renderNotFound:false,
    productAmount:0,
    page:1,
    index:1,
    priceType:'',
    productInfo: [],
    images:[],
    wish:[],
    sort:'default',
    productRequest:false,
    BLOBData:'',
    WebTitle:'',
    SuccessQuantity:0,
    vipChecked:false,
    changePagi:0
}


export default (state=defaultState,action)=>{
    // if(action.type === constants.CLICK_SEARCH_BUTTON){
    //     return {...state,productList:state.productList.concat(action.result[0]),renderNotFound:false,productAmount:action.result[1].productAmount}
    // }
    if(action.type === constants.CHANGE_PRE_PAGI){
        return {...state,changePagi:action.page-6}
    }
    if(action.type === constants.CHANGE_PAGI){
        return {...state,changePagi:action.page}
    }
    if(action.type === constants.VIP_CLICK_ACTION){
        return {...state,vipChecked:!state.vipChecked}
    }
    if(action.type === constants.GET_IMAGES){
        return {...state,images:action.result,productRequest:false}
    }
    if(action.type === constants.SEARCH_REQUEST){
        return {...state,productRequest:false}
    }
    if(action.type === constants.ADD_TO_CART){
        return {...state,wish:state.wish,BLOBData:action.BLOBData,WebTitle:action.WebTitle,SuccessQuantity:action.SuccessQuantity}
    }
    if(action.type === constants.CLICK_SEARCH_BUTTON){
        return {...state,productList:action.result[0],renderNotFound:false,productAmount:action.result[1][0].productAmount,page:action.result[2][0].page,priceType:action.result[3][0],productRequest:true}
    }
    if(action.type === constants.CLICK_SEARCH_BUTTON_END){
        return {...state,productList:state.productList.concat(action.result[0]),renderNotFound:true}
    }
    if(action.type === constants.CLICK_SEARCH_NO_RESULT){
        return {...state,renderNotFound:true,productList:[]}
    }
    if(action.type === constants.EMPTY_AND_PAGE){
        return {...state,page:1,sort:'default',changePagi:0}
    }
    if(action.type === constants.EMPTY_PRODUCT_LIST){
        return {...state,productList:[],renderNotFound:false,productAmount:0,productRequest:false}
    }
    if(action.type === constants.ADD_TO_WISH){
        return {...state,wish:state.wish.concat({'wish':action.productInfo})}
    }
    if(action.type === constants.SORT_PRODUCT){
        return {...state,sort:action.value}
    }
    return state;
}