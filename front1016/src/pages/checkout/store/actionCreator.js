import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';

export const calPostageAction = (cartTempArr,userPostcode)=>{    
    return (dispatch)=>{
        axios.post(`${baseUrl}products/postage/${userPostcode}`,cartTempArr).then((res)=>{
            const result = res.data
            const action = {
                type:constants.CAL_POSTAGE,
                postage:result.postage,
                finalPrice:result.finalPrice
            }
            dispatch(action)
        })
        
    }
} 
// export const handleAddressClickAction = (value)=>{
//     return {
//         type: constants.ADDRESS_CLICK,
//         value
//     }
// } 
export const getWebCustomerAction = (email)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}users/getWebCustomerAddress/${email}`).then((res)=>{
            const result= res.data
            const action = {
                type:constants.USER_INFO,
                result
            }
            dispatch(action)
        })
    }
}
// export const getUserInfoAction = (email)=>{
//     return (dispatch)=>{
//         axios.get(`${baseUrl}users/getUserinfo/${email}`).then((res)=>{
//             const result= res.data
          
//             const action = {
//                 type:constants.USER_INFO,
//                 result
//             }
//             dispatch(action)
//             // this.props.history.push({ pathname: '/order' });
//         })
//     }
// }
export const emptyReadyPayAction = ()=>{
    return {
        type:constants.EMPTY_READY_PAY
    }
}
export const changeStatusAction = (SRNumber,finalPrice,details)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}orders/payStatus/${SRNumber}/${finalPrice}`,details).then((res)=>{
            const action = {
                type:constants.CHANGE_STATUS,
            }
            // this.props.history.push({ pathname: '/order' });
        })
    }
}
export const submitRequestAction = ()=>{
    return {
        type:constants.SUBMIT_REQUEST
    }
}
export const submitOrderAction = (orderBody,mainPrice,cashChecked)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}orders/order/${cashChecked === ''?'no':cashChecked}`,orderBody).then((res)=>{
            const result = res.data;
            const action = {
                type:constants.READY_PAY,
                result,mainPrice
            }
            
            dispatch(action)
        })
    }
}
export const setStateAction = (value)=>{
    return {
        type:constants.SET_STATE,
        value
    }
}
export const setSuburbAction = (value)=>{
    return {
        type:constants.SET_SUBURB,
        value
    }
}
export const setFormValueAction = (formValue)=>{
        return {
                type:constants.SET_FORMVALUE_BY_CLICK,
                formValue
            }
}
export const setFormValueAndAddressAction = (formValue)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/addPostAddress/${formValue.email}`,formValue).then((res)=>{
            const action = {
                type:constants.SET_FORMVALUE,
                formValue
            }
            dispatch(action)
        })
    }
}

export const noPostageAction = ()=>{
    return {
        type: constants.NO_POSTAGE
    }
}
export const setPaymentDisplayAction = ()=>{
    return {
        type:constants.EMPTY_PAYMENT_DISPLAY
    }
}
export const setTextareaAction = (value)=>{
    return {
        type:constants.SET_TEXTAREA,
        value
    }
}
export const getCartImagesActon = (label)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}images/checkoutCartimages`,{'data':label}).then((res)=>{
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
          
            const action = {
                type:constants.GET_CHECKOUT_IMAGES,
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
            let tempData = data.slice()
            result.map((item,index)=>{
                for(let i=0;i<tempData.length;i++){
                    if(tempData[i].cart.toString().toLowerCase()===item.CustomLabel.toString().toLowerCase()){
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

// export const getSuburbAction = (email) =>{
//     return (dispatch)=>{
//         axios.get(`${baseUrl}postcode/postcode/${email}`).then((res)=>{
//             const result = res.data;
//             if(result.code){
//                 let action = {
//                     type:constants.POST_MATCH_SUBURB,
//                     result:['does not exist']
//                 }
//                 dispatch(action)
//             }
//             else{
//                 let action = {
//                     type:constants.POST_MATCH_SUBURB,
//                     result:result.SubName,

//                 }
//                 dispatch(action)
//             }
            
//         })
//     }
// }
export const changeSuburbAction = (postcode) =>{
    return (dispatch)=>{
        axios.get(`${baseUrl}postcode/change/${postcode}`).then((res)=>{
            const result = res.data;
            if(result.code){
                let action = {
                    type:constants.CHANGE_POSTCODE,
                    result:['does not exist']
                }
                dispatch(action)
            }
            else{
                let action = {
                    type:constants.CHANGE_POSTCODE,
                    result:result.SubName,
                    postcode
                }
                dispatch(action)
            }
            
        })
    }
}
export const pickUpAction = () =>{
    return {
        type:constants.SET_PICKUP_MOOD,
    }
}
export const deliveryAction = () =>{
    return {
        type:constants.SET_DELIVERY_MOOD,
    }
}
export const pickAddressAction = (value)=>{
    return {
        type: constants.CHANGE_ADDRESS,
        value
    }
}
export const payCashAction = (value) =>{
    return {
        type:constants.SET_PAY_CASH,
        value
    }
}
export const payOnlineAction = (value) =>{
    return {
        type:constants.SET_PAY_ONLINE,
        value
    }
}


// export const postOrderInfoAction = ()=>{
//     return (dispatch) =>{
//         axios.get(``).then((res)=>{
//             let action = {}
//             dispatch(action)
//         })
//     }
// }
