import {constants} from './index';
const defaultState = {
    Email: '',
    Password: '',
    Verifycode:'',
    VcodeValue:'',
    isLogin:false,
    WrongCode:false,
    PwdOrUsernameWrong:false,
}

export default (state=defaultState, action) =>{
    if(action.type === constants.RESET_VCODE_STATUS){
        return {...state,WrongCode:false,PwdOrUsernameWrong:false,Login:false}
    }
    if(action.type === constants.CODE_NOT_MATCH){
        return {...state,WrongCode:true,PwdOrUsernameWrong:false}
    }
    if(action.type === constants.LOGIN_FAILURE){
        return {...state,Login:false,WrongCode:false,PwdOrUsernameWrong:true}
    }
    if(action.type === constants.LOGIN_SUCC){
        return {...state,isLogin:!state.isLogin,WrongCode:false,PwdOrUsernameWrong:false}
    }
    if(action.type === constants.SET_VCODE_VALUE){
        return {...state,VcodeValue:action.VcodeValue}
    }
    if(action.type === constants.SET_EMAIL_TO_LOGIN){
        return {...state, Email: action.text}
    }
    if(action.type === constants.SET_PWD_TO_LOGIN){
        return {...state,Password:action.text}
    }
    if(action.type === constants.SET_VERIFYCODE_TO_LOGIN){
        return {...state, Verifycode:action.text}
    }
    return state;
}