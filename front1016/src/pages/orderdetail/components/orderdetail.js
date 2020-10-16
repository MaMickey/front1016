import React, { Component } from "react";
import "../style.css";
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import {connect} from 'react-redux';
import PaypalBtn from '../../paypal';
import {bindActionCreators} from 'redux';
import {actionCreator} from '../store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPrint} from "@fortawesome/free-solid-svg-icons";

class OrderDetailPage extends Component {
  print(){
    window.print()
  }
  render() {
    let tempDetail = this.props.orderDetail.filter((item,index)=>{
      return index === 0
    })
    let trackDetail = this.props.orderDetail.filter((item,index)=>{
      return index === this.props.orderDetail.length - 1
    })
    let FinaltempDetail = Object.assign({},tempDetail[0])
    let FinaltrackDetail = Object.assign({},trackDetail[0])

    const {SRN,FirstName,LastName,SelfPickUpDetails,ContactNumber,EmailAddress,PostToAddress1,PostToAddress2,PostToCity,PostToState,PostCode,OrderPrice,OrderDateTime,OrderStatus,ShippingPrice,SelfPickUp,FinalPaidPrice,Remarks,PaymentMethod} = FinaltempDetail;
    const {TrackingNo, BestCourier} = FinaltrackDetail
    return (
        <div className="card">
        <header className="card-header"><strong>Order number:{SRN}</strong>
        <span className="print"
          onClick={this.print}>
          <span className="printTitle">Print</span>  <FontAwesomeIcon icon={faPrint} />
       </span>
        </header>
        {SelfPickUp === 'Y'?
        <div className="card-body">
          <div className="card">
          <div className="card-header row no-gutters border-bottom">
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Require delivery: No</strong> <br /> 
              </div>
            </div>
            <div className="card-body row no-gutters">
              <div className="col-5 col-lg-3 col-md-3">
                <strong>First name:</strong><p>{FirstName}</p> <br /> 
              </div>
              <div className="col-5 col-lg-3 col-md-3">
                <strong>Last name:</strong> <p>{LastName}</p><br />   
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Contact number:</strong><p>{ContactNumber}</p> <br /> 
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Pick up time:</strong><p>{SelfPickUpDetails}</p> <br /> 
              </div>
              </div>
              <div className="card-body row no-gutters border-top">
              <div className="col-5 col-lg-3 col-md-3">
                <strong>Item price:</strong><p>{OrderPrice}</p> <br /> 
              </div>
              <div className="col-5 col-lg-3 col-md-3">
                <strong>Postage:</strong><p>{ShippingPrice}</p> <br />   
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Total:</strong><p>{FinalPaidPrice}</p> <br /> 
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Order time:</strong><p>{OrderDateTime}</p> <br /> 
              </div>
              {
                  PaymentMethod ==='cash'?
                <div className="col-10 col-lg-3 col-md-3">
                <strong>Order status:</strong><p>{OrderStatus} </p > <br /> 
              </div>:<div className="col-10 col-lg-3 col-md-3">
                <strong>Order status:</strong><p>{OrderStatus}  </p > <br /> 
              </div>
              }
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Notes:</strong><p>{Remarks}</p> <br />   
              </div>
              </div>
         </div>
        </div>:
        <div className="card-body">
          <div className="card">
          <div className="card-header row no-gutters border-bottom">
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Require delivery: Yes</strong> <br /> 
              </div>
            </div>
            <div className="card-body row no-gutters">
              <div className="col-5 col-lg-3 col-md-3">
                <strong>First name:</strong> <p>{FirstName}</p><br /> 
              </div>
              <div className="col-5 col-lg-3 col-md-3">
                <strong>Last name:</strong> <p>{LastName}</p><br />   
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Contact number:</strong><p>{ContactNumber}</p> <br /> 
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Email:</strong><p>{EmailAddress}</p> <br /> 
              </div>
              <div className="row no-gutters">
              <div className="col-10 col-lg-6 col-md-6">
                <strong>Post to address:</strong> <p>{PostToAddress1}</p><br /> 
              </div>
              <div className="col-10 col-lg-6 col-md-6">
                <strong>Additional address infomation:</strong><p>{PostToAddress2}</p> <br />   
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-5 col-lg-3 col-md-3">
                <strong>Suburb:</strong> <p>{PostToCity}</p><br /> 
              </div>
              <div className="col-5 col-lg-3 col-md-3">
                <strong>State:</strong><p>{PostToState}</p> <br />   
              </div>
              <div className="col-5 col-lg-3 col-md-3">
                <strong>Postcode:</strong> <p>{PostCode}</p><br /> 
              </div>
              <div className="col-5 col-lg-3 col-md-3">
                <strong>Country:</strong><p>Australia</p> <br /> 
              </div>
            </div>
            </div>
            <div className="card-body row no-gutters border-top">
              <div className="col-5 col-lg-3 col-md-3">
                <strong>Item price:</strong><p>{OrderPrice}</p> <br /> 
              </div>
              <div className="col-5 col-lg-3 col-md-3">
                <strong>Postage:</strong><p>{ShippingPrice}</p> <br />   
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Total:</strong><p>{FinalPaidPrice}</p> <br /> 
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Notes:</strong><p>{Remarks}</p> <br />   
              </div>
              </div> 
              <div className="card-body row no-gutters orderStatusRow">
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Order time:</strong><p>{OrderDateTime}</p> <br /> 
              </div>
                <div className="col-10 col-lg-3 col-md-3">
                <strong>Order status:</strong><p>{OrderStatus}</p> <br /> 
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Tracking Number:</strong><p>{TrackingNo}</p> <br /> 
              </div>
              <div className="col-10 col-lg-3 col-md-3">
                <strong>Courier:</strong><p>{BestCourier}</p><br /> 
              </div>
            </div> 
          </div>
        </div>}

        <div className="card-body">
            <div className="card">
                <div className="card-header row no-gutters">
                    <div className="col-lg-3 col-md-3 d-none d-lg-block d-md-block"><strong>Custom label</strong></div>
                    <div className="col-lg-5 col-md-5 d-none d-lg-block d-md-block"><strong>Item</strong></div>
                    <div className="col-lg-2 col-md-2 d-none d-lg-block d-md-block detailText"><strong>Price</strong></div>
                    <div className="col-lg-2 col-md-2 d-none d-lg-block d-md-block detailText"><strong>Quantity</strong></div>
                    <div className="col-12 d-block d-lg-none d-md-none"><strong>Purchased items</strong></div>
                </div>
                {
                  this.props.orderDetail.map((item,index)=>(
                    <div className="card-body" key={index}>
                        <div className="row no-gutters">
                        <div className="col-lg-3 col-md-3 d-none d-lg-block d-md-block">{item.CustomLabel}</div>
                        <div className="col-lg-5 col-md-5 d-none d-lg-block d-md-block">{item.ItemTitle}</div>
                        <div className="col-lg-2 col-md-2 d-none d-lg-block d-md-block detailText">{item.Price}</div>
                        <div className="col-lg-2 col-md-2 d-none d-lg-block d-md-block detailText"><strong>x{item.Quantity} </strong></div>

                        <div className="col-12 d-block d-lg-none d-md-none"><strong>Custom label:</strong> {item.CustomLabel}</div>
                        <div className="col-12 d-block d-lg-none d-md-none"><strong>Item:</strong> {item.ItemTitle}</div>
                        <div className="col-12 d-block d-lg-none d-md-none"><strong>Price:</strong> {item.Price}</div>
                        <div className="col-12 d-block d-lg-none d-md-none"><strong>Quantity: x{item.Quantity} </strong></div>
                        </div>
                    </div>
                  ))
                }
                
         </div>
        </div>
              {
                OrderStatus === 'Unpaid'&&PaymentMethod!=='cash'?<div id="orderPay" className="orderToPay"><PaypalBtn SRNumber={SRN} finalPrice={FinalPaidPrice} changeStatus={this.changeStatus} fromDetail='true' /></div>:null
              }
              
      </div>
    );
  }
  componentDidMount(){
    const SRN = localStorage.getItem('SRN')
    this.props.getOrderDetailAction(SRN)
    // this.props.getOrderDetailAction(SRN)      
 }
  changeStatus = (SRNumber,finalPrice,details)=>{
    this.props.changeStatusAction(SRNumber,finalPrice,details)
}
}
const mapStateToProps = (state)=>{
  return {

  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    changeStatusAction:bindActionCreators(actionCreator.changeStatusAction,dispatch),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderDetailPage);
