import React, { Component } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style.css";
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import {Link, withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';



class OrderDisplay extends Component {
  render() {
    const {orderList,delOrderReq, delsignIndex} = this.props;
    return (
      <div className="card" >
      <header className="card-header h6"> My Orders</header>
      {orderList.map((item,index)=>{
        return (
          <div className="card-body" key={index}>
            <div className="card">
              <div className="card-body row no-gutters">
              <div className="col-10 col-lg-3 col-md-3" >
                  <strong>Order number:</strong> <br />
                  {/* <Link to={`/orderDetail/${item.SRN}`}> {item.SRN}</Link> */}
                  {/* to={{pathname: '/orderDetail', state: {SRN:item.SRN}}} */}
                  <span className="OrderSrn" onClick={this.handeClick.bind(this,item.SRN)}>{item.SRN}</span>
                </div>
                <div className="col-10 col-lg-3 col-md-3">
                  <strong>Order time:</strong> <br />
                  {item.OrderDateTime}
                </div>
                <div className="col-10 col-lg-3 col-md-3">
                  <strong>Total:</strong> <br /> AU${item.FinalPaidPrice}
                </div>
                {
                  item.PaymentMethod ==='cash'?<div className="col-10 col-lg-2 col-md-2">
                  <strong>Status:</strong> <br /> {item.OrderStatus}
                </div>:<div className="col-10 col-lg-2 col-md-2">
                  <strong>Status:</strong> <br /> {item.OrderStatus}
                </div>
                }
                {
                  item.OrderStatus === 'Unpaid' &&  delsignIndex !== item.SRN?
                  <div className="col-1 col-lg-1 col-md-1 icon-md" onClick={this.handleDeleteClick.bind(this,item.SRN)}>
                  <button className="btn btn-light"><FontAwesomeIcon icon={faTrash}/></button>
                 </div>:
                  item.OrderStatus === 'Unpaid' && delOrderReq && delsignIndex=== item.SRN?
                 <div className="col-1 col-lg-1 col-md-1 icon-md">
                  <Loader
                  type="Bars"
                  color="#5499c7"
                  height={40}
                  width={37}
                  timeout={800} /></div>:null
                }
              </div>
            </div>
          </div>
        )}
    )}</div>
    )}
    handleDeleteClick = (SRN)=>{
      this.props.deleteReqAction(SRN)
      setTimeout(()=>{
      this.props.handleDeleteClick(SRN)},500)
    }
    handeClick = (SRN) =>{
      localStorage.setItem('SRN',SRN)
      this.props.history.push('/orderDetail')
    }
   
}

export default withRouter(OrderDisplay);
