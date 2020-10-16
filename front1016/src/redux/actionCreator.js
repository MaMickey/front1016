import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../util';
export const getWebVersionAction = ()=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}version`).then((res)=>{
           const result = res.data
            const action = {
                type:constants.GET_VERSION,
                result
            }
            dispatch(action)
        })}
}
export const getCategoryAction = ()=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}category`).then((res)=>{
           const result = res.data
            const action = {
                type:constants.GET_CATEGORY,
                result
            }
            dispatch(action)
        })}
}
export const getAllCustomerLevelAction = (email)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}admin/UserLevel/${email}`).then((res)=>{
            const result = res.data;
            let theLevel = parseInt(result[0].CustomerLevel)
            const action = {
                type: constants.GET_ALL_CUSTOMER_LEVEL,
                theLevel
            }
        dispatch(action)
    })}
}  
export const inputAction = (text)=>{
    return (dispatch)=>{
        const action = {
            type: constants.SET_SEARCH_INPUT,
            text
        }
        dispatch(action)
    }
}  
export const logoutAction = ()=>{
    return {
        type:constants.LOGOUT
    }
}
export const emptyTextAction = ()=>{
    return (dispatch)=>{
        const action = {
            type: constants.EMPTY_SEARCHBOX_TEXT,
        }
        dispatch(action)
    }
}
