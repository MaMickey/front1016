import {constants} from './index';
const defaultState = {
    text:'',
    logout:false,
    categoryList:[],
    version:'',
    theLevel:0
}


export default (state=defaultState,action)=>{
    if(action.type === constants.GET_VERSION){
        return {...state,version:action.result}
    }
    if(action.type === constants.GET_CATEGORY){
        return {...state,categoryList:action.result}
    }
    if(action.type === constants.SET_SEARCH_INPUT){
        return {...state,text:action.text}
    }
    if(action.type === constants.GET_ALL_CUSTOMER_LEVEL){
        return {...state,theLevel:action.theLevel}
    }
    if(action.type === constants.LOGOUT){
        return {...state,logout:true, theLevel:0}
    }
    if(action.type === constants.EMPTY_SEARCHBOX_TEXT){
        return {...state,text:''}
    }
    return state;
}