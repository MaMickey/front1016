import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';
export const getOrderListAction = (email)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}orders/orderList`,email).then((res)=>{
            const result = res.data;
            const action = {
                type:constants.GET_ORDER_LIST,
                result 
            }
            dispatch(action)
        })
    }
}
export const deleteOrderAction = (SRN)=>{
    return (dispatch)=>{
        axios.delete(`${baseUrl}orders/deleteOrder/${SRN}`).then((res)=>{
            const result = res.data;
            if(result.code === 0){
                const action = {
                    type:constants.DELETE_SUCC,
                    SRN
                }
                dispatch(action)
            }
        })
    }
}
export const deleteReqAction = (delsignIndex)=>{
    return {
        type: constants.DELETE_REQ,
        delsignIndex
    }
}

