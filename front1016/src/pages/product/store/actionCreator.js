import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';

 
export const vipClickAction = ()=>{
    return {
        type:constants.VIP_CLICK_ACTION,
    }
}
export const changePagiAction = (page)=>{
    return {
        type:constants.CHANGE_PAGI,
        page
    }
}
export const changePrePagiAction = (page)=>{
    return {
        type:constants.CHANGE_PRE_PAGI,
        page
    }
}

export const emptyProductListAction = ()=>{
    return {
        type:constants.EMPTY_PRODUCT_LIST
    }
}
export const sortAction = (value)=>{
    return {
        type: constants.SORT_PRODUCT,
        value
    }
}
export const addToCartAction = (BLOBData,WebTitle,SuccessQuantity)=>{
    return {
        type: constants.ADD_TO_CART,
        WebTitle,BLOBData,SuccessQuantity
    }
}
export const emptyPage = ()=>{
    return {
        type:constants.EMPTY_AND_PAGE
    }
}

export const getImagesAction = (labelArr)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}images/productImages/`,labelArr).then((res)=>{
            const result = res.data
            // result.map((item,index)=>{
            //     let binary = '';
            //     let TYPED_ARRAY = new Uint8Array(item.BLOBData.data);
            //     let len = TYPED_ARRAY.byteLength;
            //     for(var i=0;i<len;i++){
            //         binary += String.fromCharCode(TYPED_ARRAY[i]);
            //     }
            //     let base64String = btoa(binary)
            //     // let STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
            //     // let base64String = btoa(STRING_CHAR);
            //     item.BLOBData = `data:image/jpeg;base64,${base64String}`
            //             })
            // console.log(result);
            let action = {
                type: constants.GET_IMAGES,
                result
                    }
            dispatch(action)
        })
    }
}

export const loadProductAction = (keyword,page,value,email,vipChecked)=>{
    return (dispatch)=>{
        dispatch({type:constants.SEARCH_REQUEST})
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            if(keyword){
                axios.post(`${baseUrl}products/products/${keyword}/${page}/${value}`,{email:email,vipChecked:vipChecked}).then((res)=>{
                    const result = res.data;
                    if(!localStorage.getItem('wish')){
                        localStorage.setItem('wish','[]')

                    }
                    if(result.length === 0 ){
                        let action = {
                            type: constants.CLICK_SEARCH_NO_RESULT,
                                }
                        dispatch(action)
                    }
                    else{
                        // result[0].map((item,index)=>{
                        //     let TYPED_ARRAY = new Uint8Array(item.BLOBData.data);
                        //     let STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
                        //     let base64String = btoa(STRING_CHAR);
                        //     item.BLOBData = `data:image/jpeg;base64,${base64String}`
                        // })
                        let action = {
                            type: constants.CLICK_SEARCH_BUTTON,
                            result
                                }
                        dispatch(action)
                    }
                })
            }},100)
    })
    }
}
// export const searchPAction = (keyword,page)=>{
//     return (dispatch)=>{
//         if(keyword){
//             axios.get(`${baseUrl}products/products/${keyword}/${page}`).then((res)=>{
//                 const result = res.data;
//                 if(!localStorage.getItem('wish')){
//                     localStorage.setItem('wish','[]')

//                   }
//                 console.log('actionCreator result:',result);
//                 if(result[0].length === 0 ){
//                     let action = {
//                         type: constants.CLICK_SEARCH_NO_RESULT,
//                             }
//                     dispatch(action)
//                 }
//                 else{
//                     result[0].map((item,index)=>{
//                         let TYPED_ARRAY = new Uint8Array(item.BLOBData.data);
//                         let STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
//                         let base64String = btoa(STRING_CHAR);
//                         item.BLOBData = `data:image/jpeg;base64,${base64String}`
//                     })
//                     let action = {
//                         type: constants.CLICK_SEARCH_BUTTON,
//                         result
//                             }
//                     dispatch(action)
//                 }
//             })
//         }
//     }
// }
// export const searchAction = (keyword,number)=>{
//     return (dispatch)=>{
//         if(keyword){
//             axios.get(`${baseUrl}products/product/`+keyword+'/'+number).then((res)=>{
//                 const result = res.data;
//                 console.log('测试',result,keyword,number,baseUrl);
//                 if(result[0].length === 0 ){
//                     let action = {
//                         type: constants.CLICK_SEARCH_NO_RESULT,
//                             }
//                     dispatch(action)
//                 }
//                 else{
//                     result[0].map((item,index)=>{
//                         let TYPED_ARRAY = new Uint8Array(item.BLOBData.data);
//                         let STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
//                         let base64String = btoa(STRING_CHAR);
//                         item.BLOBData = `data:image/jpeg;base64,${base64String}`
//                     })
//                     let action = {
//                         type: constants.CLICK_SEARCH_BUTTON,
//                         result
//                             }
//                     dispatch(action)
//                 }     
//             })
//         }
//     }
// }

export const AddToWishAction = (productInfo) =>{
    if(localStorage.wish){
        const wish = JSON.parse(localStorage.getItem('wish'))
        let tempArr = []
        for(let i=0;i<wish.length;i++){
            if(wish[i].wish === productInfo.CustomLabel){
                const tempWish = wish.filter((item,index)=>{
                    return item.wish !== productInfo.CustomLabel;
                })
                localStorage.setItem('wish',JSON.stringify(tempWish))
        }else{tempArr.push([])}
        }
        if(tempArr.length === wish.length){
            wish.push({'wish':productInfo.CustomLabel,'active':true})
            localStorage.setItem('wish',JSON.stringify(wish))
        }   
    }
    else{
        localStorage.setItem('wish','[]')
        const wish = JSON.parse(localStorage.getItem('wish'))
        wish.push({'wish':productInfo.CustomLabel,'active':true})
        localStorage.setItem('wish',JSON.stringify(wish))
    }
    return {
        type:constants.ADD_TO_WISH,
        productInfo
    }
}