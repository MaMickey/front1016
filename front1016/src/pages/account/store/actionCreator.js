import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';
export const setOldpwdAction = (value)=>{
    return {
        type:constants.OLD_PWD,
        value
    }
}
export const pwdStrongAction = ()=>{
    return {
        type:constants.PWD_STRONG
    }
}
export const pwdWeakAction = ()=>{
    return {
        type:constants.PWD_WEAK
    }
}
export const handleFocusAction = ()=>{
    return {
        type:constants.EMPTY_ERRMSG
    }
}
export const setNewpwdAction = (value)=>{
    return {
        type:constants.NEW_PWD,
        value
    }
}
export const setRNewpwdAction = (value)=>{
    return {
        type:constants.RNEW_PWD,
        value
    }
}
export const setIsSuccAction = ()=>{
    return {
        type:constants.SET_ISSUCC
    }
}
export const handleSelectAction = (value)=>{
    return {
        type: constants.HANDLE_SELECT_ACTION,
        value
    }
}
export const changePwdAction = (obj)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/changePassword/`,obj).then((res)=>{
            const result = res.data;
            if(result.code === 0){
                sessionStorage.setItem('holdAlert','true')
                let action = {
                    type:constants.CHANGE_SUCC,
                    msg:result.msg
                }
                dispatch(action)
            }
            if(result.code === 1){
                let action = {
                    type:constants.CHANGE_FAIL,
                    msg:result.msg
                }
                dispatch(action)
            }
        })

    }
}
export const notMatchAction = ()=>{
    return {
        type:constants.NOT_MATCH
    }
}
export const getUserInfoAction = (email)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}users/getUserAddress/${email}`).then((res)=>{
            const result= res.data
            const action = {
                type:constants.USER_ADDRESS,
                result
            }
            dispatch(action)
        })
    }
}
export const delAddressRequestAction = (RN)=>{
    return {
        type :constants.DEL_ADDRESS_REQUEST,
        RN
    }
}
export const delAddressAction = (RN)=>{
    return (dispatch)=>{
        axios.delete(`${baseUrl}users/delUserAddress/${RN}`).then((res)=>{
            const action = {
                type:constants.DEL_USER_ADDRESS,
                RN
            }
            dispatch(action)
        })
    }
}
//email's start here
export const emailInputAction = (text)=>{
    return {
        type:constants.CHANGE_EMAIL_INPUT,
        text
    }
}
export const codeInputAction = (text)=>{
    return {
        type:constants.CODE_INPUT,
        text
    }
}
export const failverifyAction = ()=>{
    return {
        type:constants.VERIFY_CODE_FAIL
    }
}
export const verifyCodeAction = ()=>{
    return {
        type:constants.VERIFY_CODE_CORRECT
    }
}
export const handleChangeSendEmail = (oldEmail) =>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/changeEmail/`, {'oldEmail':oldEmail}).then((res)=>{
            let code = res.data.key
            if(res.data.code === 0){
                let action = {
                    type:constants.CHANGE_SEND_EMAIL_SUCC,
                    code
                }
                dispatch(action)
            }
            if(res.data.code === 1){
                let action = {
                    type:constants.CHANGE_SEND_EMAIL_FAIL,
                }
                dispatch(action)
            }
        })
    }
}
export const waitEmailAction = ()=>{
    return {
        type:constants.WAIT_CHANGE_EMIAL_RESPONESE,
    }
}
export const setNewEmailAction = (oldEmail,loginEmail)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/setNewEmail`,{oldEmail,loginEmail}).then((res)=>{
            const result = res.data;
            if(result.code===0){
                sessionStorage.setItem('isLogin','false')
                sessionStorage.setItem('holdEmailAlert','true')
                const action = {
                    type:constants.CHANGE_EMAIL_SUCC
                }
                dispatch(action)
            }
            else{
                const action = {
                    type:constants.CHANGE_EMAIL_FAIL
                }
                dispatch(action)
            }
        })
    }
}