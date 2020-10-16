import React, { Component, Fragment } from 'react';
import '../style.css';
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Alert from '../../../common/alert';

class changeEmail extends Component {
    render() {
        const {oldEmail,showVeriCode, sendEmailClicked, failmessage, failSendEmail,verifyCodeCheck,changeSucc,changeFail} = this.props;
        const userEmail =  JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
        return (
            <div className="changeEmailWrapper">
            <div className="card mt-2" id="accountpwd">
            <div className="card-header">
            <h6 className="card-title">Change email</h6>
            </div>
                    <div className="card-body">
                    <div className="mt-2">We kindly remind you that all your account information and order history will be transfered to your new account email.</div>
                    <div className=" text-muted mt-2">Please enter your new email address so we can send you an email with the verification code.</div>
                        <form>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="New email" name="" 
                                onChange={this.props.handleChange} 
                                value={oldEmail} required/>
                                <span className="input-group-append">
                                <button className="btn btn-primary" onClick={this.props.changeSendEmail}>Send email</button>
                                </span>
                            </div>
                        </form>
                        {userEmail===oldEmail?<div className="mt-2 failEmailHint">You are using your current account email as your new email.</div>:null}

                        {failSendEmail?<div className="mt-2 failEmailHint">Failed to send email</div>:null}
                        {sendEmailClicked?
                        <div className="changeEmailLoaderWrap mt-4">
                        <Loader
                            type="ThreeDots"
                            color="#5499c7"
                            height={20}
                            width={60}
                            timeout={9000}
                            className="changeEmailLoader"
                        /></div>:null}
                        {showVeriCode?
                        <Fragment>
                        <div className="mt-4 text-muted">An email has been sent to you. Please enter the verification code we sent to your email.</div>
                        <form className="confirmChanges mt-1">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Verification code" name="" 
                                onChange={this.props.handleCodeChange} 
                                required/>
                                <span className="input-group-append">
                                <button className="btn btn-primary" onClick={this.props.handleVerifyCode}>Confirm change</button>
                                </span>
                            </div>
                        </form>
                        <div className="mt-2">Please note that once you click on the confirm change button,
                        your new email address will be set.</div>   
                        </Fragment>:
                         (failmessage?<div className="mt-2 failEmailHint">Failed to send email!</div>:null)
                        }
                        {
                            verifyCodeCheck===2?<div className="mt-2 failEmailHint">Verification code isn't correct</div>:null
                        }
                        {
                            changeFail?<div className="mt-2 failEmailHint">Change email failed! (Perhaps this email address has already been registed)</div>:null
                        }
                        {
                         JSON.parse(sessionStorage.getItem('holdEmailAlert'))===true && verifyCodeCheck===1? 
                        <Alert handleAlertClick={this.handleAlertClick} alertmsg='Changed email successfully!' alertBodyMsg="Please login with your new email and old password"  btn='Login again'/>
                        :null
                      }
                    </div> 
                    </div>
                </div>
        );
    }
    handleAlertClick=()=>{
        this.props.history.push('/login')
    }
}

export default withRouter(changeEmail);