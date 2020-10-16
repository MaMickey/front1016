import React, { Component } from 'react';
import ForgetPassowrd from './components/forgetpassowrd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreator} from './store';
import './style.css'

class ForgetPwd extends Component {
    render() {
        const {theEmail, resetPwd, sendEmailClicked, emailCode, enterCode, failmessage,changePwdSucc, failSendEmail} = this.props;
        return (
            <div id='forgetpwd'>
               <ForgetPassowrd handleChange={this.handleChange}
               sendEmail= {this.sendEmail} 
               changePwdSucc={changePwdSucc}
               handleCodeChange = {this.handleCodeChange}
               theEmail={theEmail} resetPwd={resetPwd} 
               sendEmailClicked={sendEmailClicked}
               emailCode={emailCode} enterCode={enterCode}
               failmessage={failmessage} failSendEmail={failSendEmail}
               handleVerifyCode={this.handleVerifyCode}/> 
            </div>
        );
    }
componentWillUnmount(){
    this.props.clearStateAction()
}
handleChange = (e) =>{
    const value = e.target.value;
    this.props.emailInputAction(value)
}
handleCodeChange = (e) =>{
    const value = e.target.value;
    this.props.codeInputAction(value)
}
sendEmail = () =>{
   const {theEmail} = this.props;
   this.props.handleSendEmail(theEmail)
   this.props.waitEmailAction()
}
handleVerifyCode = () =>{
    const {enterCode,emailCode} = this.props;
    const {theEmail} = this.props;
    if(enterCode===emailCode){
      this.props.verifyCodeAction(theEmail, emailCode);
    }else{
      this.props.failverifyAction()
    }
}
}
const mapStateToProps = (state) =>{
    return {
        theEmail:state.forgetpwdReducer.theEmail,
        resetPwd: state.forgetpwdReducer.resetPwd,
        sendEmailClicked: state.forgetpwdReducer.sendEmailClicked,
        emailCode: state.forgetpwdReducer.emailCode,
        enterCode: state.forgetpwdReducer.enterCode,
        failmessage: state.forgetpwdReducer.failmessage,
        changePwdSucc:state.forgetpwdReducer.changePwdSucc,
        failSendEmail:state.forgetpwdReducer.failSendEmail
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        emailInputAction: bindActionCreators(actionCreator.emailInputAction, dispatch),
        handleSendEmail: bindActionCreators(actionCreator.handleSendEmail, dispatch),
        waitEmailAction: bindActionCreators(actionCreator.waitEmailAction, dispatch),
        codeInputAction: bindActionCreators(actionCreator.codeInputAction, dispatch),
        failverifyAction: bindActionCreators(actionCreator.failverifyAction, dispatch),
        verifyCodeAction: bindActionCreators(actionCreator.verifyCodeAction, dispatch),
        clearStateAction:bindActionCreators(actionCreator.clearStateAction,dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPwd);