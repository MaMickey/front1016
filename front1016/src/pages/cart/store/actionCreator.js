import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';

export const cartOverStockAction = (indexArr)=>{
    return {
        type:constants.CART_OVER_STOCK,
        indexArr
    }
}
export const clearIndexArr = () => {
    return {
        type: constants.CLEAR_INDEXARR
    }
}
export const cartInputChangeAction = (index,inputValue) =>{
    return {
        type:constants.CART_INPUT_CHANGE,
        index,
        inputValue
    }
}
export const delReqAction = (index)=>{
    return {
        type:constants.DEL_REQUEST,
        index
    }
}
export const cartItemDelete = (index)=>{
    return {
        type:constants.CART_ITEM_DELETE,
        index
    }
}
export const cartQuantityAdd = (index)=>{
    return {
        type:constants.CART_QUANTITY_ADD,
        index
    }
}
export const cartQuantityMinus = (index)=>{
    return {
        type:constants.CART_QUANTITY_MINUS,
        index
    }
}
export const getImagesAction = (label)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}images/cartimages`,{'data':label}).then((res)=>{
            const result = res.data;
            result.map((item,index)=>{
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
            })
            // result.map((item,index)=>{
            //     for(let i=0;i<data.length;i++){
            //         if(item.CustomLabel===data[i].cart){
            //             data[i].cart = item
            //         }
            //     }     
            // })
            
            const action = {
                type:constants.GET_CART_IMAGES,
                result
            }
            dispatch(action)
        })
    }
}
export const startCartAction = (data,email)=>{
    if(data.length === 0){
       
        return {
                type:constants.EVOKE_CART_DATA,
                data
            }
    }
    else{
    return (dispatch)=>{
        axios.post(`${baseUrl}cart/getcart`,{'data':data,'email':email}).then((res)=>{
            const result = res.data;
            // result.map((item,index)=>{
            //     let TYPED_ARRAY = new Uint8Array(item.BLOBData.data);
            //     let STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
            //     let base64String = btoa(STRING_CHAR);
            //     item.BLOBData = `data:image/jpeg;base64,${base64String}`
            // })
   
            result.map((item,index)=>{
                for(let i=0;i<data.length;i++){
                    if(item.CustomLabel===data[i].cart){
                        data[i].cart = item
                    }
                }     
            })

            const action = {
                type:constants.EVOKE_CART_DATA,
                data
            }
            dispatch(action)
        })
    }
}
}