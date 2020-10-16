import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';

export const fillCatprimaryAction = () =>{
    return dispatch=>{
        axios.get(`${baseUrl}admin/fillCatPrimary`).then(res=>{
            let result = res.data;
            if(result.code === 0){
                const action = {
                    type:constants.FILL_CAT_SUCC
                }
                dispatch(action)
            }
            if(result.code === 1){
                const action = {
                    type:constants.FILL_CAT_FAIL
                }
                dispatch(action)
            }
        })
    }
}

export const saveKoganOrderAction = (koganArr)=>{
    return dispatch=>{
        axios.post(`${baseUrl}orders/savekoganOrder`,koganArr).then(res=>{
            const action ={}

        })
    }
}
export const emptyStateAction =()=>{
    return {
        type: constants.EMPTY_STATE
    }
}
export const changeShipStatusAction = (idArr) =>{
    return dispatch=>{
        axios.post(`${baseUrl}orders/changeShipStatus`,idArr).then(res=>{
            let result = res.data;
            if(result.code === 0){
                const action = {
                    type:constants.UPDATE_SHIPSTATUS_SUCC
                }
                dispatch(action)
            }
            if(result.code === 1){
                const action = {
                    type:constants.UPDATE_SHIPSTATUS_FAIL
                }
                dispatch(action)
            }
        })
    }
}
export const handleKoganClickAction =(resultArr)=>{
    return (dispatch)=>{
        const headers = {
            'Content-Type': 'application/json',
            'SellerToken': 'ad6853309ce1391f55bf9a3ab439f7b60c8e3122',
            'SellerID':'xinsports',
          }
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        axios.post(proxyurl+'https://nimda-marketplace.aws.kgn.io/api/marketplace/orders/fulfill',resultArr,{'headers':headers}).then((res)=>{
            const result = res.data;
            const action = {
                type:constants.SEND_TRACK_TO_KOGAN,
                result
            }
            dispatch(action)
            
        })
    }
}
export const getHBorderAction = ()=>{
    return dispatch =>{
        axios.get(`${baseUrl}orders/getKOrderInfo`).then(res=>{
            let result = res.data;
            if(result.code){
                const action = {
                    type:constants.GET_TRACK_FAIL,
                    result
                }
                dispatch(action)
            }
            else{
                const action = {
                    type:constants.GET_TRACK,
                    result
                }
                dispatch(action)
            }   
        })
    }
}
export const FetchNewOrderAction = ()=>{
    return (dispatch)=>{
        const headers = {
            'Content-Type': 'application/json',
            'SellerToken': 'ad6853309ce1391f55bf9a3ab439f7b60c8e3122',
            'SellerID':'xinsports',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Credentials': true
          }
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        axios.get(proxyurl+'https://nimda-marketplace.aws.kgn.io/api/marketplace/orders',{'headers':headers,'params':{'status':'ReleasedForShipment'}}).then((res)=>{
            const result = res.data;
            if(result.Status==="Complete"){
                const action = {
                    type:constants.FETCH_ORDER_KOGAN,
                    result 
                }
                dispatch(action)
            }
            else{
                const action = {
                    type:constants.FETCH_ORDER_KOGAN_FAIL,
                    result 
                }
                dispatch(action)
            }
            
        })
    }
}
export const Option1ClickAction = ()=>{
    return {
        type:constants.OPTION1
    }
}
export const Option2ClickAction = ()=>{
    return {
        type:constants.OPTION2
    }
}
export const Option3ClickAction = ()=>{
    return {
        type:constants.OPTION3
    }
}
export const Option4ClickAction = ()=>{
    return {
        type:constants.OPTION4
    }
}

export const putawayAction = data =>{
    return (dispatch)=>{
                axios.post(`${baseUrl}admin/putaway/`,data).then((res)=>{
                    const result = res.data;
                    const action = {
                        type:constants.PUTAWAY_SUCC,
                        result
                    }
                    dispatch(action)
                })         
    
    }
}
export const setThresholdAction = (inputValue)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}admin/setThreshold/`,{'inputValue':inputValue}).then((res)=>{
            const result = res.data;
            const action = {
                type:constants.SET_THRESHOLD,
                result
            }
            dispatch(action)
        })   
    }
}
export const setdataAction = (data,fileName)=>{
    return {
        type: constants.SET_DATA,
        data,fileName
    }
}
export const handleChangeAction = (value)=>{
    return {
        type :constants.INPUT_CHANGE,
        value
    }
}
export const webOnAction = data =>{
    return (dispatch)=>{
        axios.post(`${baseUrl}admin/webOn/`,data).then((res)=>{
            const result = res.data;
            const action = {
                type:constants.WEBON_SUCC,
                result
            }
            dispatch(action)
        })         
    
    }
}
export const getUserLevelAction = (email)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}admin/UserLevel/${email}`).then((res)=>{
            const result = res.data;
            if(result.length>0){
                let level = result[0].CustomerLevel
                const action = {
                    type:constants.GET_USER_LEVEL,
                    level
                }
                dispatch(action)
            }
            else{
                let level = 0
                const action = {
                    type:constants.GET_USER_LEVEL,
                    level
                }
                dispatch(action)
            }
            
        })         

    }
}