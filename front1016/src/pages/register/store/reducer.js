import {constants} from './index';
const defaultState = {
   Fname:'',
   Lname:'',
   Email:'',
   Pnumber: 0,
   Address:'',
   OAddress:'',
   City:'',
   CityList:[],
   State:'',
   Postcode:'',
   Country:'',
   Password:'',
   Repassword:'',
   ifRegSuccHint:true,
   pwd_match:true,
   regSucc:false,
   pwd_strong:true,
}


export default (state=defaultState,action)=>{
    if(action.type === constants.REGISTER_SUCC){
        return {...state,regSucc:!state.regSucc}
    }
    if(action.type === constants.POST_MATCH_SUBURB){
        return {...state,CityList:action.result}
    }
    if(action.type === constants.PWD_NOT_MATCH){
        return {...state,pwd_match:false}
    }
    if(action.type === constants.PWD_STRONG){
        return {...state,pwd_strong:false}
    }
    if(action.type === constants.PWD_WEAK){
        return {...state,pwd_strong:true}
    }
    if(action.type === constants.PWD_CHECK_RESET){
        return {...state,pwd_match:true}
    }
    if(action.type === constants.REGISTER_FAILED){
        return {...state,ifRegSuccHint:false}
    }
    if(action.type === constants.SET_F_NAME){
        return {...state,Fname:action.text}
    }
    if(action.type === constants.SET_L_NAME){
        return {...state,Lname:action.text}
    }
    if(action.type === constants.SET_EMAIL){
        return {...state,Email:action.text,ifRegSuccHint:true}
    }
    if(action.type === constants.SET_P_NUMBER){
        return {...state,Pnumber:action.text}
    }
    if(action.type === constants.SET_ADDRESS){
        return {...state,Address:action.text}
    }
    if(action.type === constants.SET_O_ADDRESS){
        return {...state,OAddress:action.text}
    }
    if(action.type === constants.SET_CITY){
        return {...state,City:action.text}
    }
    if(action.type === constants.SET_STATE){
        return {...state,State:action.text}
    }
    if(action.type === constants.SET_POSTCODE){
        return {...state,Postcode:action.text}
    }
    if(action.type === constants.SET_COUNTRY){
        return {...state,Country:action.text}
    }
    if(action.type === constants.SET_PWD){
        return {...state,Password:action.text}
    }
    if(action.type === constants.SET_REPWD){
        return {...state,Repassword:action.text}
    }
    
    return state;
}