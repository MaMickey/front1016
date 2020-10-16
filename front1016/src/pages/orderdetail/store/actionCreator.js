import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';

export const getOrderDetailAction = (SRN) =>{
    return (dispatch)=>{
        axios.get(`${baseUrl}orders/orderDetail/${SRN}`).then((res)=>{
            const result = res.data;
            const action = {
                type:constants.GET_ORDER_DETAIL,
                result
            }
            dispatch(action)
        })
    }
}
export const checkOrderAction = (SRN, email) =>{
    return (dispatch)=>{
        axios.get(`${baseUrl}orders/orderCheck/${SRN}/${email}`).then((res)=>{
            const result = res.data;
            const action = {
                type: constants.ORDER_CHECK,
                result
            }
            dispatch(action)
        })
    }
}
export const clearOrderCheck = ()=>{
    return {
        type:constants.CLEAR_ORDER_CHECK
    }
}

export const changeStatusAction = (SRNumber,finalPrice,details)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}orders/payStatus/${SRNumber}/${finalPrice}`,details).then((res)=>{
            const action = {
                type:constants.CHANGE_STATUS,

            }
            dispatch(action)
        })
    }
}
