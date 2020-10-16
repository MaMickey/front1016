import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';
export const resetVcodeStatus = ()=>{
    return {
        type:constants.RESET_VCODE_STATUS
    }
}
export const vcodeChangeAction = (VcodeValue) =>{
    return {
        type:constants.SET_VCODE_VALUE,
        VcodeValue
    }
}
export const codeNotMatch = ()=>{
    return {
        type:constants.CODE_NOT_MATCH
    }
}
export const loginAction = (formValue) =>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/login/`,formValue).then((res)=>{
            if(res.data.code === 0){
                sessionStorage.setItem('isLogin','true');
                sessionStorage.setItem('userInfo',JSON.stringify([{'Email':res.data.userInfo[0].Email}]))
                // console.log('local:',sessionStorage.getItem('userInfo'));
                let action = {
                    type:constants.LOGIN_SUCC,
                    // userInfo:res.data.userInfo
                }
                dispatch(action)
            }
            if(res.data.code === 1){
                let action = {
                    type:constants.LOGIN_FAILURE
                }
                dispatch(action)
            }
        })
    }
}
export const setEmailAction = (text)=>{
    return {
        type:constants.SET_EMAIL_TO_LOGIN,
        text
    }
}

export const setPasswordAction = (text)=>{
    return {
        type:constants.SET_PWD_TO_LOGIN,
        text
    }
}

export const setVerifycodeAction = (text) =>{
    return {
        type:constants.SET_VERIFYCODE_TO_LOGIN,
        text
    }
}