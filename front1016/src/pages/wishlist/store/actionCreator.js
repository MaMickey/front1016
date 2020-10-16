import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';

export const startWishAction = (data,email)=>{
    if(data.length === 0){
        return {
                type:constants.EVOKE_WISH_DATA,
                data
            }
    }
    else{
    return (dispatch)=>{
        axios.post(`${baseUrl}wish/getwish`,{'data':data,'email':email}).then((res)=>{
            const result = res.data;
            // result.map((item,index)=>{
            //     let TYPED_ARRAY = new Uint8Array(item.BLOBData.data);
            //     let STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
            //     let base64String = btoa(STRING_CHAR);
            //     item.BLOBData = `data:image/jpeg;base64,${base64String}`
            // })
            result.forEach((item,index)=>{
                data[index].wish = item
            })

            const action = {
                type:constants.EVOKE_WISH_DATA,
                data
            }
            dispatch(action)
        })
    }
}
}
export const getImagesAction = (label)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}images/wishimages`,{'data':label}).then((res)=>{
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
                type:constants.GET_WISH_IMAGES,
                result
            }
            dispatch(action)
        })
    }
}
export const AddToCartAction = (Succimg, Succtitle, SuccessQuantity)=>{
    return {
        type:constants.ADD_TO_CART,
        Succimg, Succtitle, SuccessQuantity
    }
}
export const deleteWishAction = (CustomLabel)=>{
    return {
        type: constants.DELETE_WISH,
        CustomLabel
    }
}