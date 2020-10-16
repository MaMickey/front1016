import {constants} from './index';
const defaultState = {
    theEmail: '',
    resetPwd: false, 
    sendEmailClicked: false,
    emailCode: '',
    enterCode:'',
    failmessage:false,
    changePwdSucc:false,
    failSendEmail:false
}

export default (state=defaultState, action) =>{
    if(action.type===constants.CLEAR_STATE){
        return {...state,changePwdSucc:false,failmessage:false,sendEmailClicked:false,resetPwd:false}
    }
    if(action.type === constants.CHANGE_PWD_SUCC){
        return {...state,changePwdSucc:true}
    }
    if(action.type === constants.EMAIL_INPUT){
        return {...state,theEmail:action.text}
    }
    if(action.type === constants.CODE_INPUT){
        return {...state,enterCode:action.text}
    }
    if(action.type === constants.FORGETPWD_FAIL){
        return {...state,resetPwd:false, sendEmailClicked:false, failmessage:true}
    }
    if(action.type === constants.FAIL_TO_SEND_EMAIL){
        return {...state,resetPwd:false, sendEmailClicked:false, failSendEmail:true}
    }
    if(action.type === constants.FORGETPWD_SUCC){
        return {...state,resetPwd:true, sendEmailClicked:false, failSendEmail:false, emailCode:action.code}
    }
    if(action.type === constants.WAIT_EMIAL_RESPONESE){
        return {...state,sendEmailClicked:true, failmessage:false, failSendEmail:false}
    }
    if(action.type === constants.FAIL_VERIFY_ACTION){
        return {...state,failmessage:true}
    }
    return state;
}