import axios from 'axios';
import {constants} from './index';


export const emptyProductListAction = ()=>{
    return {
        type:constants.EMPTY_PRODUCT_LIST
    }
}