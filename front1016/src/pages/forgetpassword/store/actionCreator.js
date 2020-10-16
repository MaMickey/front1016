import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';

export const emailInputAction = (text)=>{
    return {
        type:constants.EMAIL_INPUT,
        text
    }
}
export const codeInputAction = (text)=>{
    return {
        type:constants.CODE_INPUT,
        text
    }
}
export const handleSendEmail = (theEmail) =>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/forgetpwd/`, {'theEmail':theEmail}).then((res)=>{
            let code = res.data.key
            if(res.data.code === 0){
                let action = {
                    type:constants.FORGETPWD_SUCC,
                    code
                }
                dispatch(action)
            }
            if(res.data.code === 1){
                let action = {
                    type:constants.FORGETPWD_FAIL,
                }
                dispatch(action)
            }
            if(res.data.code === 2){
                let action = {
                    type:constants.FAIL_TO_SEND_EMAIL,
                }
                dispatch(action)
            }
        })
    }
}
export const clearStateAction = ()=>{
    return {
        type:constants.CLEAR_STATE
    }
}
export const verifyCodeAction = (email, emailCode) =>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/resetForgetPwd/`,{email, emailCode}).then((res)=>{
            if(res.data.code === 0){
                const action = {
                    type:constants.CHANGE_PWD_SUCC
                }
                dispatch(action)
            }
            else{
                const action = {
                    type:constants.FAIL_VERIFY_ACTION
                }
            }
        })
    }
}
export const failverifyAction = (text)=>{
    return {
        type:constants.FAIL_VERIFY_ACTION,
        text
    }
}
export const waitEmailAction = ()=>{
    return {
        type:constants.WAIT_EMIAL_RESPONESE,
    }
}

