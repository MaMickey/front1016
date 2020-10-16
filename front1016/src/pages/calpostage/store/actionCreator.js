import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';
export const handleChangeAction = (value)=>{
    return {
        type:constants.HANDLE_CHANGE,
        value
    }
}
export const submitAction = (value)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}calpostage/bestpostage/${value}`).then((res)=>{
            const result = res.data
            const action = {
                type: constants.GET_INFO,
                result
            }
            dispatch(action)
        })
            
    }
}
export const calculateAction = (order)=>{
    const obj = {
        "parcels": [
        {
        "weight": order[0].HunterWeight,
        "qty": 1,
        "length": 5,
        "height": 5,
        "width": 5
        }
        ],
        "shipTo": {
        "shipTo_suburb": `${order[0]['Buyer City']}`,
        "shipTo_postcode": `${order[0].PostCode}`,
        "shipTo_country": "AU"
        },
        "shipFrom": {
        "from_suburb": "sunshine west",
        "from_postcode": "3020",
        "from_country": "AU"
        }
    }
    return (dispatch)=>{
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $2y$10$.eAfLLkD7c/kzPoj85DLKeL4shljEn7NlAbciOKJD9cnoAxYpdvia'
          }
        axios.post('https://app.eiz.com.au/api/auth/fulfillments/v2/quote',obj,{'headers':headers}).then((res)=>{
            const result = res.data.data.availableQuotes;
            const action = {
                type:constants.CALCULATE,
                result 
            }
            dispatch(action)
        })
    }
}