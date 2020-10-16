import React, { Component,Fragment } from 'react';
import './style.css'
import LoginPage from './components/login'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreator} from './store';
import md5 from 'md5';
class Login extends Component {
    render() {
        const {Email, Password, Verifycode,isLogin,regSucc,logout,PwdOrUsernameWrong,WrongCode} = this.props;
        return (
            <Fragment><div className="loginWrapper">
                <LoginPage 
                           handleChange={this.handleOnchange}
                           handleSubmit = {this.handleSubmit}
                           Email={Email}
                           regSucc={regSucc}
                           isLogin={isLogin}
                           logout={logout}
                           PwdOrUsernameWrong={PwdOrUsernameWrong}
                           WrongCode={WrongCode}
                           handleVChange = {this.handleVChange}
                           Password={Password} 
                           Verifycode={Verifycode}/>
                </div>
            </Fragment>
            // <div className="loginWrapper">
            // <LoginPage 
            //            handleChange={this.handleOnchange}
            //            handleSubmit = {this.handleSubmit}
            //            Email={Email}
            //            Login={Login}
            //            PwdOrUsernameWrong={PwdOrUsernameWrong}
            //            WrongCode={WrongCode}
            //            handleVChange = {this.handleVChange}
            //            Password={Password} 
            //            Verifycode={Verifycode}/>
            // </div>
        );
    }
    componentWillUnmount(){
        this.props.resetVcodeStatus()
    }
    handleSubmit = ()=>{
        const {VcodeValue,Verifycode,Email,Password} = this.props;
        const md5Password = md5(Password);  
        if(VcodeValue === Verifycode){
            const formValue = {'email':Email,'password':md5Password}
            this.props.loginAction(formValue)
        }else{
            this.props.codeNotMatch()
        }
    }
    handleVChange = (VcodeValue) =>{
        this.props.vcodeChangeAction(VcodeValue)
    }
    handleOnchange = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        switch(name){
            case 'Email':
                this.props.setEmailAction(value)
                break
            case 'Password':
                this.props.setPasswordAction(value)
                break
            case 'Verifycode':
                this.props.setVerifycodeAction(value)
                break
            default:
                break
        }    
    }
}

const mapStateToProps = (state) =>{
    const Loginstate = state.loginReducer;
    return {
        regSucc:state.registerReducer.regSucc,
        Email: Loginstate.Email,
        logout: state.headerReducer.logout,
        Password: Loginstate.Password,
        Verifycode: Loginstate.Verifycode,
        VcodeValue:Loginstate.VcodeValue,
        isLogin:Loginstate.isLogin,
        WrongCode:Loginstate.WrongCode,
        PwdOrUsernameWrong:Loginstate.PwdOrUsernameWrong
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setEmailAction: bindActionCreators(actionCreator.setEmailAction, dispatch),
        setPasswordAction: bindActionCreators(actionCreator.setPasswordAction, dispatch),
        setVerifycodeAction: bindActionCreators(actionCreator.setVerifycodeAction, dispatch),
        vcodeChangeAction:bindActionCreators(actionCreator.vcodeChangeAction,dispatch),
        loginAction:bindActionCreators(actionCreator.loginAction,dispatch),
        codeNotMatch:bindActionCreators(actionCreator.codeNotMatch,dispatch),
        resetVcodeStatus:bindActionCreators(actionCreator.resetVcodeStatus,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);