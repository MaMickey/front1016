import React, { Component, Fragment } from 'react';
import '../style.css';
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';

class forgetpassword extends Component {
    render() {
        const {theEmail, resetPwd, sendEmailClicked,changePwdSucc, emailCode, enterCode, failmessage, failSendEmail} = this.props
        return (
            <div className="forgetpwdWrapper">
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title mb-4">Reset password</h4>
                    <div className="mt-4 text-muted">Please enter the email address that you used to sign up so we can send you an email with the verification code. </div>
                        <form>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Email" name="" 
                                onChange={this.props.handleChange} 
                                value={theEmail} required/>
                                <span className="input-group-append">
                                <button className="btn btn-primary" onClick={this.props.sendEmail}>Send email</button>
                                </span>
                            </div>
                        </form>
                        {failSendEmail?<div className="mt-2 failEmailHint">Failed to send email</div>:null}
                        {sendEmailClicked?
                        <div className="emailLoaderWrap mt-4">
                        <Loader
                            type="ThreeDots"
                            color="#5499c7"
                            height={20}
                            width={60}
                            timeout={9000}
                            className="emailLoader"
                        /></div>:null}
                        {resetPwd?
                        <Fragment>
                        <div className="mt-4 text-muted">An email has been sent to you. Please enter the verification code we sent to your email</div>
                        <form className="verifyCode mt-1">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Verification code" name="" 
                                onChange={this.props.handleCodeChange} 
                                value={enterCode} required/>
                                <span className="input-group-append">
                                <button className="btn btn-primary" onClick={this.props.handleVerifyCode}>Verify</button>
                                </span>
                            </div>
                            {failmessage?<div className="mt-2 failEmailHint">Verification code isn't correct</div>:null}
                        </form>
                        </Fragment>:
                         (failmessage?<div className="mt-2 failEmailHint">Email doesn't exist</div>:null)
                        }
                    </div> 
                    </div>
                    {
                        changePwdSucc?
                        <div className='card mt-2'>
                            <div className="card-header">
                            <p>Your temporary password has been reset to:  <strong>{enterCode}</strong></p>
                            <p>You can find this temporary password in your email that is the same as the verification code.</p>
                            <p>Please use this temporary passowrd to login again. We kindly remind you to change this temporary password after you login.</p>
                            <button className="btn btn-primary" onClick={this.handleClick}>Login again</button>
                            </div>
                        </div>:null
                    }
                </div>
        );
    }
    handleClick = ()=>{
        this.props.history.push('/login')
    }
}

export default withRouter(forgetpassword);