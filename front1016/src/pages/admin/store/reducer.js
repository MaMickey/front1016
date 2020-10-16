import {constants} from './index';
const defaultState = {
   putaway:'',
   customerLevel:0,
   webOn:'',
   csvData:[],
   input:0,
   thres_msg:'',
   fileName:[],
   koganOrder:[],
   FetchkoganOrderMsg:'',
   option1:false,
   option2:false,
   option3:false,
   option4:false,
   trackInfo:[],
   sendTrackToKoganRes:{},
   changeStatus:false,
   msg:'',
   msgReq:false,
   fillResult:''
}


export default (state=defaultState,action)=>{
    if(action.type === constants.EMPTY_STATE){
        return {...state,msgReq:false,msg:'',changeStatus:false}
    }
    if(action.type === constants.UPDATE_SHIPSTATUS_FAIL){
        return {...state,msg:'update failed',msgReq:true}
    }
    if(action.type === constants.UPDATE_SHIPSTATUS_SUCC){
        return {...state,msg:'update success',msgReq:true}    
    }
    if(action.type === constants.GET_TRACK){
        return {...state,trackInfo:action.result}
    }
    if(action.type === constants.GET_TRACK_FAIL){
        return {...state,trackInfo:[]}
    }
    if(action.type === constants.SEND_TRACK_TO_KOGAN){
        return {...state,sendTrackToKoganRes:action.result,changeStatus:true}
    }
    if(action.type ===constants.OPTION1){
        return {...state,option1:true,option2:false,option3:false,option4:false,FetchkoganOrderMsg:''}
    }
    if(action.type ===constants.OPTION2){
        return {...state,option2:true,option1:false,option3:false,option4:false,FetchkoganOrderMsg:''}
    }
    if(action.type ===constants.OPTION3){
        return {...state,option3:true,option4:false,option2:false,option1:false}
    }
    if(action.type ===constants.OPTION4){
        return {...state,option4:true,option3:false,option2:false,option1:false}
    }
    if(action.type ===constants.FETCH_ORDER_KOGAN_FAIL){
        return {...state,FetchkoganOrderMsg:'Fetch new order fail, please refresh the page'}
    }
    if(action.type===constants.FETCH_ORDER_KOGAN){
        return {...state,koganOrder:action.result}
    }
    if(action.type===constants.SET_THRESHOLD){
        return {...state,thres_msg:action.result}
    }
    if(action.type === constants.INPUT_CHANGE){
        return {...state,input:action.value}
    }
    if(action.type === constants.SET_DATA){
        return {...state,csvData:action.data,fileName:state.fileName.concat(action.fileName)}
    }
    if(action.type === constants.PUTAWAY_SUCC){
        return {...state,putaway:action.result.msg}
    }
    if(action.type === constants.WEBON_SUCC){
        return {...state,webOn:action.result.msg}
    }
    if(action.type === constants.GET_USER_LEVEL){
        return {...state,customerLevel:action.level}
    }
    if(action.type === constants.FILL_CAT_SUCC){
        return {...state,fillResult:'Fill category primary successfully'}
    }
    if(action.type === constants.FILL_CAT_FAIL){
        return {...state,fillResult:'Fill category primary failed'}
    }
    
    return state;
}