import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';

export const sendOrderSuccEmailAction = (userEmail,SRNumber) =>{
    return (dispatch)=>{
        axios.post(`${baseUrl}orders/sendSuccOrderEmail/${SRNumber}`, {'userEmail':userEmail}).then((res)=>{
            let code = res.data.key
            if(res.data.code === 0){
                let action = {
                    type:constants.SEND_ORDER_EMAIL_SUCC,
                    code
                }
                dispatch(action)
            }
            if(res.data.code === 1){
                let action = {
                    type:constants.SEND_ORDER_EMAIL_FAIL,
                }
                dispatch(action)
            }
        })
    }
}


