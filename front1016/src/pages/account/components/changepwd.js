import React, { Component, Fragment } from 'react';
import {withRouter,Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import  Alert from '../../../common/alert';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class changepwd extends Component {
    constructor(){
        super();
        this.state= {inputIcon: 'password', inputIcon1: 'password', inputIcon2: 'password'}
     }
    render() {
        const {oldPwd,newPwd,RnewPwd,notmatch,msg} = this.props;
        return (
            <Fragment>
                {
                JSON.parse(sessionStorage.getItem('holdAlert'))===true?<Alert handleAlertClick={this.handleAlertClick} alertmsg='Reset password successfully!' btn='Login again'/>:null
                }
            <div className="card mt-2" id="accountpwd">
            <div className="card-header">
            <h6 className="card-title">Change password</h6>
            </div>
            <div className="card-body">
                    <div className="form-group">
                        <label>Current password</label>
                        <div className="input-group">
                            <input className="form-control" type={this.state.inputIcon} name="Oldpassword" value={oldPwd} onChange={this.handleChange} required/>
                            <div className="input-group-append clickEye">
                            {this.state.inputIcon==='password'?
                             <span className="input-group-text" onClick={() => this.setState({inputIcon: 'text'})}>
                              <FontAwesomeIcon icon={faEyeSlash} />
                              </span>:
                               <span className="input-group-text" onClick={() => this.setState({inputIcon: 'password'})}>
                              <FontAwesomeIcon icon={faEye} />
                              </span>
                            }
                            </div>
                        </div>
                        {
                          msg !==''? <div className="form-text AccHint">{msg}</div>:null
                        }
                    </div>  
                    <div className="form-group">
                        <label>New password</label>
                        <div className="input-group">
                             <input className="form-control" type={this.state.inputIcon1} name="Newpassword"  value={newPwd} onChange={this.handleChange} onBlur={this.props.handleBlur}  required/>
                             <div className="input-group-append clickEye">
                            {this.state.inputIcon1==='password'?
                             <span className="input-group-text" onClick={() => this.setState({inputIcon1: 'text'})}>
                              <FontAwesomeIcon icon={faEyeSlash} />
                              </span>:
                               <span className="input-group-text" onClick={() => this.setState({inputIcon1: 'password'})}>
                              <FontAwesomeIcon icon={faEye} />
                              </span>
                            }
                            </div>
                        </div>
                        {this.props.pwd_strong?null:<div className="form-text AccHint">Password must have at least 8 characters with numbers and letters!</div>}
                    </div> 
                    <div className="form-group">
                        <label>Confirm new password</label>
                        <div className="input-group">
                            <input className="form-control" type={this.state.inputIcon2} name="RNewpassword"  value={RnewPwd} onFocus={this.handleFocus} onChange={this.handleChange} required/>
                            <div className="input-group-append clickEye">
                            {this.state.inputIcon2==='password'?
                             <span className="input-group-text" onClick={() => this.setState({inputIcon2: 'text'})}>
                              <FontAwesomeIcon icon={faEyeSlash} />
                              </span>:
                               <span className="input-group-text" onClick={() => this.setState({inputIcon2: 'password'})}>
                              <FontAwesomeIcon icon={faEye} />
                              </span>
                            }
                            </div>
                        </div>
                        {
                            notmatch?<div className="form-text AccHint">Password doesn't match!</div>:null
                        }
                    </div> 
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleClick}> Change Password  </button>
                     </div> 
                </div>
            </div>
            </Fragment>
        );
    }
    componentWillUnmount(){
        sessionStorage.removeItem('holdAlert')
    }
    handleAlertClick =()=>{
        sessionStorage.setItem('isLogin', 'false')
        this.props.history.push('/login')
    }
    handleFocus = ()=>{
        this.props.handleFocus()
    }
    handleChange = (e) =>{
        this.props.handleInputChange(e);
    }
    handleClick=()=>{
        this.props.handleClick();
    }
}
export default withRouter(changepwd);