import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';
export const pwdCheckAction = ()=>{
    return {
        type:constants.PWD_NOT_MATCH
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
export const resetPwdCheckAction = ()=>{
    return {
        type:constants.PWD_CHECK_RESET
    }
}
export const submitAction = (formValue)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/register/`,formValue).then((res)=>{
            if(res.data.code === 0){
                sessionStorage.setItem('isLogin','true');
                sessionStorage.setItem('userInfo',JSON.stringify([{'Email':res.data.userInfo[0].email}]))              
                let action = {
                    type:constants.REGISTER_SUCC,
                    userInfo:res.data.userInfo
                }
                dispatch(action)
            }
            if(res.data.code === 1){
               let action = {
                type: constants.REGISTER_FAILED
               }
                dispatch(action)
            }

            })
    }
}

export const getSuburbAction = (postcode) =>{
    return (dispatch)=>{
        axios.get(`${baseUrl}postcode/change/${postcode}`).then((res)=>{
            const result = res.data;
            if(result.code){
                let action = {
                    type:constants.POST_MATCH_SUBURB,
                    result:['does not exist']
                }
                dispatch(action)
            }
            else{
                let action = {
                    type:constants.POST_MATCH_SUBURB,
                    result:result.SubName
                }
                dispatch(action)
            }
            
        })
    }
}


export const setFnameAction = (text)=>{
    return {
        type:constants.SET_F_NAME,
        text
    }
}
export const setLnameAction = (text)=>{
    return {
        type:constants.SET_L_NAME,
        text
    }
}
export const setEmailAction = (text)=>{
    return {
        type:constants.SET_EMAIL,
        text
    }
}
export const setPnumberAction = (text)=>{
    return {
        type:constants.SET_P_NUMBER,
        text
    }
}
export const setAddressAction = (text)=>{
    return {
        type:constants.SET_ADDRESS,
        text
    }
}

export const setOAddressAction = (text)=>{
    return {
        type:constants.SET_O_ADDRESS,
        text
    }
}
export const setCityAction = (text)=>{
    return {
        type:constants.SET_CITY,
        text
    }
}
export const setStateAction = (text)=>{
    return {
        type:constants.SET_STATE,
        text
    }
}
export const setPostcodeAction = (text)=>{
    return {
        type:constants.SET_POSTCODE,
        text
    }
}

export const setPwdAction = (text)=>{
    return {
        type:constants.SET_PWD,
        text
    }
}
export const setRepwdAction = (text)=>{
    return {
        type:constants.SET_REPWD,
        text
    }
}
export const setCountryAction = (text)=>{
    return {
        type:constants.SET_COUNTRY,
        text
    }
}