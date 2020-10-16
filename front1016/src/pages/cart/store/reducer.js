import {constants} from './index';
const defaultState = {
    onChangeEvent: false,
    cartList:[],
    images:[],
    quantity:1,
    delReq:false,
    delSignIdx:'',
    indexArr:[]
}

export default (state=defaultState,action)=>{   
    if(action.type === constants.CART_ITEM_DELETE){
        return {...state,delReq:false,delSignIdx:'',cartList:state.cartList.filter((item,index)=>{
           return index !== action.index
        })}
    }
    if(action.type === constants.CLEAR_INDEXARR){
        return {...state,indexArr:[]}
    }
    if(action.type === constants.CART_OVER_STOCK){
        return {...state,indexArr:action.indexArr}
    }
    if(action.type === constants.DEL_REQUEST){
        return {...state,delReq:true,delSignIdx:action.index}
    }
    if(action.type === constants.GET_CART_IMAGES){
        return {...state,images:action.result}
    }
    if(action.type===constants.CART_INPUT_CHANGE){
        let cartCopy = [];
        state.cartList.map((product,index)=>{
            if(index === action.index){
                return cartCopy.push({...product,quantity:action.inputValue}) 
            }
            else{
                return cartCopy.push(product)
            }    
        })
        return {...state,cartList:cartCopy,quantity:action.inputValue}
    }
    if(action.type===constants.EVOKE_CART_DATA){
        return {...state,cartList:action.data}
    }
    if(action.type === constants.CART_QUANTITY_ADD || action.type === constants.CART_QUANTITY_MINUS){
        let cartCopy = [];
        state.cartList.map((product,index)=>{
            if(index === action.index){
                if(action.type === constants.CART_QUANTITY_MINUS){
                    if(parseInt(product.quantity)>1){
                        cartCopy.push({...product,quantity:(parseInt(product.quantity)-1)})
                    }
                    else{
                        cartCopy.push(product)
                    }
                }
                else{
                cartCopy.push({...product,quantity:(parseInt(product.quantity)+1)})   
                }           
            }
            else{
                cartCopy.push(product)
            }    
        })
        return {...state,cartList:cartCopy,quantity:1}
    }
    return state;
}