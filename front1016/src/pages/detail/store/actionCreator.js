import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';
export const setTextAction = (quantity) =>{
    return {
        type:constants.CHANGE_INPUT_QUANTITY,
        quantity
    }
}
export const addQuantityAction = ()=>{
    return {
        type:constants.ADD_QUANTITY_1
    }
}
export const minusQuantityAction = ()=>{
    return {
        type:constants.MINUS_QUANTITY_1
    }
}
export const emptyQuantityAndDetailAction = ()=>{
    return {
        type:constants.EMPTY_QUANTITY_AND_DETAIL
    }
}
export const AddToCartAction = (quantity,productInfo) =>{
    const price = productInfo[`${productInfo.priceType}`]
    const totalPrice = quantity * price
    if(localStorage.cart){
        const cart = JSON.parse(localStorage.getItem('cart'))
        let tempArr = []
        for(let i=0;i<cart.length;i++){
            if(cart[i].cart === productInfo.CustomLabel){
            
                cart[i].quantity = cart[i].quantity + quantity
                localStorage.setItem('cart',JSON.stringify(cart))
                // const price = parseFloat(localStorage.getItem('totalPrice'))
                // const totalPrice = price - price;
                // localStorage.setItem('totalPrice',totalPrice.toString())
                // cart.map((item,index)=>{
                //     const price = parseFloat(localStorage.getItem('totalPrice'))
                //     const totalPrice = price + item.quantity * item.cart[`${productInfo.priceType}`]
                //     localStorage.setItem('totalPrice',totalPrice.toString())

                //     return localStorage.totalPrice
        // })
        }else{tempArr.push([])}
        }
        if(tempArr.length === cart.length){
            cart.push({'quantity':quantity,'cart':productInfo.CustomLabel})
            localStorage.setItem('cart',JSON.stringify(cart))
            // const price = parseFloat(localStorage.getItem('totalPrice'))
            // const totalPrice = price - price;
            // localStorage.setItem('totalPrice',totalPrice.toString())
            // cart.map((item,index)=>{
            //     const price = parseFloat(localStorage.getItem('totalPrice'))
            //     const totalPrice = price + item.quantity * item.cart[`${productInfo.priceType}`]
            //     localStorage.setItem('totalPrice',totalPrice.toString())
    
            //     return localStorage.totalPrice
            // })
        }   
    }
    else{
        localStorage.setItem('cart','[]')
        // localStorage.setItem('totalPrice','0')
        const cart = JSON.parse(localStorage.getItem('cart'))
        cart.push({'quantity':quantity,'cart':productInfo.CustomLabel})
        localStorage.setItem('cart',JSON.stringify(cart))
        // const price = parseFloat(localStorage.getItem('totalPrice'))
        // const totalPrice = price + cart[0].quantity*cart[0].cart.VIPPrice5
        // localStorage.setItem('totalPrice',totalPrice.toString())
    }
    return {
        type:constants.ADD_TO_CART,
        quantity,
        productInfo,
        totalPrice
    }
}
export const outStockAction = ()=>{
    return {
        type:constants.OUT_STOCK
    }
}
export const detailAction = (CustomLabel,email)=>{
    return (dispatch) =>{
        axios.post(`${baseUrl}detail/detail/`+ CustomLabel,{email:email}).then((res)=>{
            const result = res.data;
            if(result){
                result.map((item,index)=>{
                    if(item.BLOBData){
                        let binary = '';
                        let TYPED_ARRAY = new Uint8Array(item.BLOBData.data);
                        let len = TYPED_ARRAY.byteLength;
                        for(var i=0;i<len;i++){
                            binary += String.fromCharCode(TYPED_ARRAY[i]);
                        }
                        let base64String = btoa(binary)
                        // let STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
                        // let base64String = btoa(STRING_CHAR);
                        item.BLOBData = `data:image/jpeg;base64,${base64String}`
                    } 
                })
                const action = {
                    type: constants.GET_PRODUCT_DETAIL,
                    result
                }
                dispatch(action);   
            }
                     
        });
    }
}