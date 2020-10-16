import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';

export const getAddressAction = (email)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}users/getUserAddress/${email}`).then((res)=>{
            let result= res.data
            let finalresult=[]
            if(result.length>0){
                finalresult = [{
                    'RN':result[0].RN,
                    'ContactNumber':result[0].ContactNumber,
                    'FirstName':result[0].FirstName,
                    'LastName':result[0].LastName,
                    'PostCode':result[0].Postcode,
                    'Address1':result[0].Address1,
                    'Address2':result[0].Address2,
                    'City':result[0].City,
                    'State':result[0].State
            }]
        }
            // console.log('r',result);
            const action = {
                type:constants.GET_DEFAULT_ADDRESS,
                finalresult
            }
            dispatch(action)
        })
    }
}
export const getEditSuburbAction = (RN)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}postcode/postcodeByRN/${RN}`).then((res)=>{
            let result= res.data
            if(result.code){
                result = {'SubName':['postcode does not exist']}
                const action = {
                    type:constants.GET_SUBURB_RN,
                    result
                }
                dispatch(action)
            }
            else{
                const action = {
                    type:constants.GET_SUBURB_RN,
                    result
                }
                dispatch(action)
            }
        })
    }
}
export const getEditAddressAction = (RN)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}users/getWebCustomerEditAddress/${RN}`).then((res)=>{
            let result= res.data
            let finalresult=[]
            if(result.length>0){
                finalresult = [{
                    'RN':result[0].RN,
                    'ContactNumber':result[0].ContactNumber,
                    'FirstName':result[0].FirstName,
                    'LastName':result[0].LastName,
                    'PostCode':result[0].Postcode,
                    'Address1':result[0].Address1,
                    'Address2':result[0].Address2,
                    'City':result[0].City,
                    'State':result[0].State
            }]
        }
            const action = {
                type:constants.GET_EDIT_ADDRESS,
                finalresult
            }
            dispatch(action)
        })
    }
}
export const editAddressAction =(formValue,RN)=>{
    return (dispatch)=>{
        axios.put(`${baseUrl}users/editAddress/${RN}`,formValue).then((res)=>{
            let result= res.data;
            const action = {
                type:constants.EDIT_SUCC
            }
            dispatch(action)
        })
        }
}
export const setPnumberAction = (value)=>{
    return {
        type:constants.SET_PNUMBNER,
        value
    }
}
export const getSuburbAction = (email)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}postcode/postcode/${email}`).then((res)=>{
            let result= res.data
            if(result.code){
                result = {'SubName':['postcode does not exist']}
                const action = {
                    type:constants.GET_SUBURB,
                    result
                }
                dispatch(action)
            }
            else{
                const action = {
                    type:constants.GET_SUBURB,
                    result
                }
                dispatch(action)
            }
        })
    }
}
export const changePostcodeAction = (postcode)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}postcode/change/${postcode}`).then((res)=>{
            let result= res.data
            if(result.code){
                result = {'SubName':['does not exist']}
            }
            const action = {
                type:constants.CHANGE_POSTCODE_GET_SUBURB,
                result,postcode
            }
            dispatch(action)
        })
    }
}
export const submitAddressAction =(formValue,email)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/addPostAddress/${email}`,formValue).then((res)=>{
            let result= res.data
            const action = {
                type:constants.ADD_ADDRESS,
                result
            }
            dispatch(action)
        })
    }
}
export const emptyAddressAction = ()=>{
    return {
        type:constants.EMPTY_ADDRESS
    }
}