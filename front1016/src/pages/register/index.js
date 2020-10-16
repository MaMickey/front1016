import React, { Component, Fragment } from 'react';
import RegisterForm from './components/register';
import './style.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreator} from './store';
import md5 from 'md5';
class Register extends Component {
    render() {
        const {Fname,Lname, Email, Pnumber, Address, OAddress, City, State, Postcode, Country,Password,Repassword,ifRegSuccHint,pwd_match,pwd_strong,regSucc,isLogin,logout,CityList} = this.props;
        return (
            <Fragment>
                <div className="RegWrapper">
                <RegisterForm onChange={this.handleOnchange}
                    handleBlur = {this.handleBlur}
                    handlePostCodeBlur = {this.handlePostCodeBlur}
                    handleFocus = {this.handleFocus}
                    ifRegSuccHint = {ifRegSuccHint}
                    pwd_match = {pwd_match}
                    pwd_strong ={pwd_strong}
                    regSucc={regSucc}
                    isLogin={isLogin}
                    logout={logout}
                    handleSubmit = {this.handleSubmit}
                    CityList={CityList}
                    Fname={Fname}
                    Lname={Lname}
                    Email={Email}
                    Pnumber={Pnumber}
                    Address={Address}
                    OAddress={OAddress}
                    City={City}
                    State={State}
                    Postcode={Postcode}
                    Country={Country}
                    Password={Password}
                    Repassword={Repassword}
                /></div>
            </Fragment>
        )
    }
    componentWillUnmount(){
        this.props.resetPwdCheckAction();
    }
    handleFocus = ()=>{
        this.props.resetPwdCheckAction()
    }
    handleBlur = ()=>{
        if((this.props.Password !== this.props.Repassword) && this.props.Repassword !==''){
            this.props.pwdCheckAction()
        }  
        const strongRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");
        if(strongRegex.test(this.props.Password) !== true){
            this.props.pwdStrongAction()
        }else{
            this.props.pwdWeakAction()
        }
    }
    handlePostCodeBlur = (e) =>{
        const postcode = e.target.value;
        if(postcode !== ''){
            this.props.getSuburbAction(postcode)
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        const data = new FormData(e.target)
        const formValue = {}
        for(let item of data.entries()){
            if(item[0]==='password' || item[0]==='Repassword' ){
                formValue[`${item[0]}`] = md5(`${item[1]}`)
            }
            else{
                formValue[`${item[0]}`] = item[1]
            }       
        }
        // console.log('register form:',formValue);
        const strongRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");
        if(this.props.Password === this.props.Repassword && strongRegex.test(this.props.Password) === true){
            this.props.submitAction(formValue)
        }
    }
    handleOnchange = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        switch(name){
            case 'Fname':
            this.props.setFnameAction(value)
            break
            case 'Lname':
            this.props.setLnameAction(value)
            break
            case 'email':
            this.props.setEmailAction(value)
            break
            case 'Pnumber':
            this.props.setPnumberAction(value)
            break
            case 'address':
            this.props.setAddressAction(value)
            break
            case 'Oaddress':
            this.props.setOAddressAction(value)
            break
            case 'city':
            this.props.setCityAction(value)
            break
            case 'state':
            this.props.setStateAction(value)
            break
            case 'postcode':
            this.props.setPostcodeAction(value)
                if(value !== ''){
                    this.props.getSuburbAction(value)
                }
            break
            case 'country':
            this.props.setCountryAction(value)
            break
            case 'password':
            this.props.setPwdAction(value)
            break
            case 'Repassword':
            this.props.setRepwdAction(value)
            break
            default:
            break
        }
    }
}
const mapStateToProps = (state)=>{
    const Regstate = state.registerReducer;

    return {
        isLogin:state.loginReducer.isLogin,
        logout: state.headerReducer.logout,
        CityList:Regstate.CityList,
        regSucc:Regstate.regSucc,
        pwd_match:Regstate.pwd_match,
        pwd_strong:Regstate.pwd_strong,
        ifRegSuccHint:Regstate.ifRegSuccHint,
        Fname:Regstate.Fname,
        Lname:Regstate.Lname,
        Email:Regstate.Email,
        Pnumber: Regstate.Pnumber,
        Address: Regstate.Address,
        OAddress: Regstate.OAddress,
        City: Regstate.City,
        State:  Regstate.State,
        Postcode: Regstate.Postcode,
        Country:Regstate.Country,
        Password:Regstate.Password,
        Repassword:Regstate.Repassword,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getSuburbAction:bindActionCreators(actionCreator.getSuburbAction,dispatch),
        resetPwdCheckAction:bindActionCreators(actionCreator.resetPwdCheckAction,dispatch),
        pwdCheckAction:bindActionCreators(actionCreator.pwdCheckAction,dispatch), 
        pwdStrongAction:bindActionCreators(actionCreator.pwdStrongAction,dispatch), 
        pwdWeakAction:bindActionCreators(actionCreator.pwdWeakAction,dispatch), 
        submitAction:bindActionCreators(actionCreator.submitAction,dispatch),
        setFnameAction:bindActionCreators(actionCreator.setFnameAction,dispatch),
        setLnameAction:bindActionCreators(actionCreator.setLnameAction,dispatch),
        setEmailAction:bindActionCreators(actionCreator.setEmailAction,dispatch),
        setPnumberAction:bindActionCreators(actionCreator.setPnumberAction,dispatch),
        setAddressAction:bindActionCreators(actionCreator.setAddressAction,dispatch),
        setOAddressAction:bindActionCreators(actionCreator.setOAddressAction,dispatch),
        setCityAction:bindActionCreators(actionCreator.setCityAction,dispatch),
        setStateAction:bindActionCreators(actionCreator.setStateAction,dispatch),
        setPostcodeAction:bindActionCreators(actionCreator.setPostcodeAction,dispatch),
        setCountryAction:bindActionCreators(actionCreator.setCountryAction,dispatch),
        setPwdAction:bindActionCreators(actionCreator.setPwdAction,dispatch),
        setRepwdAction:bindActionCreators(actionCreator.setRepwdAction,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);