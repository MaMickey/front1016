import React, { Component, Fragment } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import './style.css';
import {connect} from 'react-redux';
import { Link, Redirect, withRouter } from "react-router-dom";
import {bindActionCreators} from 'redux';
import {actionCreator} from './store'
import Loader from 'react-loader-spinner';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Paypalbtn extends Component {
  render() {
    const {readyPay,finalPrice,SRNumber,fromDetail,cashChecked,submitReq,submitSucc} = this.props;
    return (
      <Fragment>
      <div className="paypalBtnWrapper mt-2">
      {
        fromDetail ==='true'?null:<button onClick = {this.handlePaypalClick} id='paybtn' className="btn btn-primary btn-block mb-2 submitBtn">
          {
          submitReq===true?
          <Loader
          type="Oval"
          color="#fff"
          height={20}
          width={20}
          timeout={8000}
          />: submitSucc===true?<div className="afterSubmit" id="afterSubmit">Order submitted <FontAwesomeIcon icon={faCheck}/></div>:<div className="beforeSubmit">Submit order</div>
         }
        </button>
      }
      {readyPay && cashChecked==='cash'? 
      (localStorage.removeItem('cart'),
      setTimeout(()=>{
        this.sendOrderSuccEmail()
      },500),
      <button className="btn btn-outline-primary btn-block mb-2 submitBtn" onClick={this.handleClick}>View your order</button>)
      :null} 

      {(readyPay || fromDetail) && cashChecked !=='cash'?
       <Fragment>    
       <PayPalButton
       style={{size:'responsive'}}
       amount={finalPrice}
       shippingPreference="NO_SHIPPING"
       currency={"AUD"} 
       onSuccess={(details, data) => {
         this.changeStatus(SRNumber,finalPrice,details);
        //  alert("Transaction completed by " + details.payer.name.given_name)
        //  this.props.history.push(`/success/${SRNumber}`)
        //  console.log('details:',details,'data:',data);
          localStorage.removeItem('cart')
          this.props.history.push({
            pathname: '/success',
            state: { SRNumber:SRNumber }
            })
            setTimeout(()=>{
              this.sendOrderSuccEmail()
            },500)   
         }}
       onError={(err)=>{
           return alert('transaction was unsuccessful.')
       }}
         options={{
           //real paypal
        // clientId:"AcIjHwfsAWSEwvDbva3NAlo_gu5tRhelj0i-Bs6EgwNnWMSOXyMp8gpq9p9pMnnoyEK5HYainhaUYHW4",
        //test paypal
         clientId:
           "ASudq14_YWNV5dLiLVAe0oVFVh6YKC25lcSWkoAXk7mblqzmg-AJ0cLH27o--VCLkrG_wpFD6OWFL56A",
         currency:"AUD",
         }}
     />
     </Fragment>:null}  
      </div>
      </Fragment>
    );
  }
 componentWillUnmount(){
 }
  sendOrderSuccEmail = ()=>{
    const userEmail =  JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
    const {SRNumber}= this.props;
    this.props.sendOrderSuccEmailAction(userEmail, SRNumber)
  }
  handleClick = () =>{
    this.props.history.push('/order')
  }
  handlePaypalClick = ()=>{
    document.getElementById('paybtn').disabled = true;
    this.props.handlePaypalClick()
   
  }
  changeStatus = (SRNumber,finalPrice,details)=>{
    this.props.changeStatus(SRNumber,finalPrice,details)
  }
}
const mapStateToProps = (state)=>{
  return {
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    sendOrderSuccEmailAction: bindActionCreators(actionCreator.sendOrderSuccEmailAction, dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Paypalbtn));
