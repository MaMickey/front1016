import React, { Fragment, Component } from "react";
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {actionCreator} from '../store';
import PaypalBtn from '../../paypal';
import Pickup from './pickup';
import Delivery from './delivery';
import '../style.css';
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import Loader from 'react-loader-spinner';


class checkout extends Component {

  render() {
    const {cartInfo,userInfo,CityList,pickupChecked,changeAddress,postage,finalPrice,doPayment,readyPay,SRNumber,cashChecked,states,checkoutCartImages,postcode,submitReq,submitSucc} = this.props
    // let userTempInfo = Object.assign({},userInfo[0])
    let userTempInfo = userInfo.slice()
    let mainPrice = 0;
    let tempCart = JSON.parse(JSON.stringify(cartInfo));
				tempCart.map((item,index)=>{
          if(item.cart.Stock<item.cart.estimateStock){
            mainPrice += item.cart['XinWebPrice']*item.quantity
					}
					else{
						mainPrice += (item.cart[`${item.cart.priceType}`]===0?item.cart['XinWebPrice']:item.cart[`${item.cart.priceType}`])*item.quantity
					}
          // mainPrice += (item.cart[`${item.cart.priceType}`]===0?item.cart['XinWebPrice']:item.cart[`${item.cart.priceType}`])*item.quantity
				for(let i =0;i<checkoutCartImages.length;i++){
					if(checkoutCartImages[i].CustomLabel.toLowerCase()===item.cart.CustomLabel.toLowerCase()){
						item.cart['BLOBData'] = checkoutCartImages[i].BLOBData
					}
				}
			}
        )
    return (
      <Fragment>
      <div className="card mt-2">
        <div className="card-header">
          <strong className="d-inline-block mr-3 mb-2">Confirm Information</strong>
            {
              doPayment?null:
              <Fragment>
              <div className="d-inline-block">
              <button className="btn btn-primary deliveryBtn mr-4" id="checkbox2" onClick={this.handleDeliveryClick}>Delivery</button>
              <button className="btn btn-primary pickipBtn" id="checkbox2" onClick={this.handlePickClick}>Pick up</button></div>
              </Fragment>
            } 
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-md-12 col-lg-12">
            {
                pickupChecked?
                <form onSubmit={this.pickupSubmit} id="pickupForm">
                <Pickup 
                userTempInfo={userTempInfo} 
                handleCashChecked = {this.props.handleCashChecked}
                handleOnlineChecked = {this.props.handleOnlineChecked}/>
                </form>:
                <Delivery userTempInfo={userTempInfo} doPayment={doPayment} changeAddress={changeAddress} CityList={CityList} 
                postcode={postcode} handleAddressClick={this.props.handleAddressClick} handleSubmit={this.handleSubmit} 
                handleStateChange={this.props.handleStateChange} handleSuburbChange={this.props.handleSuburbChange} pickupChecked={pickupChecked}
                pickAddressChange={this.props.pickAddressChange}
                handlePostCode={this.props.handlePostCode}/>
            }                
            </div>         
            </div>
          </div>   
        </div>

      {doPayment?
      <Fragment>
      <div className="card mt-2">
            <div className="card-header">
              <strong className="d-inline-block mr-3">Order Detail</strong>
            </div>
            <div className="row no-gutters">
            <div className="col-md-9 col-lg-9 col-12">
            <div className="card-body">
				    <div className="row">
                   <div className="col-4 col-lg-3 col-md-3"><strong>Custom label</strong></div>
                   <div className="col-4 col-lg-3 col-md-2 itemTitle"><strong>Item</strong></div>
                   <div className="col-4 col-lg-4 col-md-3 itemTitle"><strong>Item title</strong></div>
                   <div className="col-lg-2 col-md-4 d-none d-lg-block d-md-block itemTitle"><strong>Quantity</strong></div>
            </div>
            </div>
				{tempCart.map((item,index) => (
					<Fragment key={index}>
				<div className="card-body border-top">
				<div className="row">
              <div className="col-3 col-lg-3 col-md-3">{item.cart.CustomLabel}</div>
							<div className="img-wrap mr-3 col-4 col-lg-3 col-md-2">
              {item.cart.BLOBData? 
              <img src={item.cart.BLOBData} alt='' className="border img-sm checkoutSmall" />:<div className="loaderWrapCheckout"><Loader
              type="ThreeDots"
              color="#5499c7"
              height={60}
              width={30}
              timeout={9000}/></div>}
             </div>
								<div className="col-4 col-lg-4 col-md-4">
									<a className="title h6">{item.cart.WebTitle} </a>
									<div className="price-wrap">AU${item.cart[`${item.cart.priceType}`]===0?(item.cart.XinWebPrice*item.quantity).toFixed(2):<Fragment>
                    {
                      item.cart.Stock<item.cart.estimateStock?(item.cart.XinWebPrice*item.quantity).toFixed(2):(item.cart[`${item.cart.priceType}`]*item.quantity).toFixed(2)
                    }
                  </Fragment>}
                  </div>
								</div>
                          <div className="col-11 d-lg-none d-md-none d-block mt-5 numberBottom"><strong>Quantity:&nbsp;&nbsp;&nbsp; x{item.quantity}</strong></div>
                           <div className="col-lg-1 col-md-2 d-none d-lg-block d-md-block numberBottom"><strong>x{item.quantity}</strong></div>
                        </div>
                        </div>
                        </Fragment>
						))
					}      
            </div>
        <div className="col-md-3 col-lg-3 col-12 border-left border-top itemRight">
		<div className="card-body">
			<dl className="dlist-align">
			  <dt>Item price:</dt>
			  <dd className="text-right">AU${mainPrice.toFixed(2)}</dd>
			</dl>
			<dl className="dlist-align">
			  <dt>Postage:</dt>
			  <dd className="text-right">AU${parseFloat(postage)}</dd>
			</dl>
			{/* <dl className="dlist-align">
			  <dt>Discount:</dt>
			  <dd className="text-right text-danger">- AU$00.00</dd>
			</dl> */}
			<dl className="dlist-align">
			  <dt>Total:</dt>
			  <dd className="text-right text-dark b"><strong>AU${ postage === 0?mainPrice.toFixed(2):(parseFloat(mainPrice.toFixed(2))+parseFloat(postage)).toFixed(2)}</strong></dd>
			</dl>
          {/* <PaypalBtn handlePaypalClick={this.handlePaypalClick} readyPay={readyPay} finalPrice={finalPrice} changeStatus={this.changeStatus} SRNumber={SRNumber}/>			 */}
		</div> 
	</div> 
</div>
</div>
<div className="card col-md-12 mt-2">
    <div className="card-header">
    <strong className="d-inline-block mr-3">Notes (Optional)</strong>       
    </div>
    <div className="card-body">
          <textarea className="col-md-12" id="remarktextarea" onChange={this.handleTextAreaChange}/>
    </div>
  </div>
  <PaypalBtn  handlePaypalClick={this.handlePaypalClick} readyPay={readyPay} submitSucc={submitSucc} submitReq={submitReq} pickupChecked={pickupChecked} cashChecked={cashChecked} finalPrice={finalPrice} changeStatus={this.changeStatus} SRNumber={SRNumber}/>
</Fragment>
      :null}
  
</Fragment>
    );
  }
  componentDidMount(){
  }
  componentWillUnmount(){
      this.props.emptyReadyPayAction();
  }
  changeStatus = (SRNumber,finalPrice,details)=>{
      this.props.changeStatusAction(SRNumber,finalPrice,details)
  }
  // handlePostCode = (e)=>{
  //   this.props.handlePostCode(e.target.value);
  // }
  handleTextAreaChange = (e)=>{
    const value = e.target.value;
    this.props.handleTextAreaChange(value);
  }
  handleSubmit = (e)=>{
    const {userInfo,states,suburb,CityList} = this.props; 
    let userTempInfo = userInfo[0];
    let finalstate = ''
    let finalcity = ''
    if(states!==''){
      finalstate = states
    }else{finalstate=userTempInfo.shipToState}
    if(suburb!==''){
      finalcity = suburb
    }
    else{
      finalcity = userTempInfo.shipToCity
    }
    if(CityList[0]!==userTempInfo.shipToCity){
      finalcity = CityList[0]
    }
    this.props.handleSubmit(e,finalstate,finalcity);
    var form = document.getElementById("deliveryForm");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
    }
    document.getElementById('inputCountry').disabled = true;
    document.getElementById('inputState').disabled = true;
    document.getElementById('inputSuburb').disabled = true;
    document.getElementById('checkbox2').disabled = true;
    document.getElementById('checkbox1').disabled = true;
    let btn = document.getElementsByClassName('btn btn-primary btn-sm defaultAddressBtn')
    for (var i = 0; i < btn.length; i++) {
      btn.item(i).disabled = true;
   }
}
pickupSubmit = (e)=>{
    // pickupForm
    this.props.pickupSubmit(e);
    var form = document.getElementById("pickupForm");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
    elements[i].disabled = true;
    }
    document.getElementById('exampleRadios1').disabled = true;
    document.getElementById('exampleRadios2').disabled = true;
    document.getElementById('exampleRadios3').disabled = true;
    document.getElementById('exampleRadios4').disabled = true;
    document.getElementById('exampleRadios5').disabled = true;
}
handlePaypalClick = ()=>{
    const {formValueObj,cartInfo,finalPrice,postage,remark,cashChecked,checkoutCartImages} = this.props
    var mainPrice = 0;
    let tempCart = JSON.parse(JSON.stringify(cartInfo));
				tempCart.map((item,index)=>{
          // mainPrice += (item.cart[`${item.cart.priceType}`]===0?item.cart['XinWebPrice']:item.cart[`${item.cart.priceType}`])*item.quantity
          if(item.cart.Stock<item.cart.estimateStock){
            mainPrice += item.cart['XinWebPrice']*item.quantity
					}
					else{
						mainPrice += (item.cart[`${item.cart.priceType}`]===0?item.cart['XinWebPrice']:item.cart[`${item.cart.priceType}`])*item.quantity
					}
				for(let i =0;i<checkoutCartImages.length;i++){
					if(checkoutCartImages[i].CustomLabel.toLowerCase()===item.cart.CustomLabel.toLowerCase()){
						item.cart['BLOBData'] = checkoutCartImages[i].BLOBData
					}
				}
			}
				)
    // console.log('1:',formValueObj);
    // console.log('2:',cartInfo);
    // console.log('3:',mainPrice);
    // console.log('4:',postage);
    let formTempValueObj = Object.assign({},formValueObj)
    formTempValueObj['postage'] = postage;
    formTempValueObj['remarks'] = remark;
    document.getElementById('remarktextarea').disabled = true;
    // document.getElementById('checkbox2').disabled = true;
    if(postage === 0){
      formTempValueObj.finalPrice = mainPrice.toFixed(2);
    }
    else{
      formTempValueObj.finalPrice = finalPrice;
    }
    let orderBody = {}
    let cartInfoTemp = {}
    let cartTempArr = []
    for(let i=0;i<tempCart.length;i++){
        for(var j in tempCart[i].cart){
            if(j!=='BLOBData'){
                cartInfoTemp[`${j}`] = tempCart[i].cart[`${j}`]
            }
        }
        cartInfoTemp.quantity = tempCart[i].quantity
        let cartInfoTempFinal = Object.assign({},cartInfoTemp)
        cartTempArr.push(cartInfoTempFinal)
    }
    orderBody['form'] = formTempValueObj;
    orderBody['cart'] = cartTempArr;
    this.props.submitRequestAction()
    setTimeout(()=>{this.props.submitOrderAction(orderBody,formTempValueObj.finalPrice,cashChecked)},500)
    
}
handleCheckChange = (e)=>{
    this.props.handleCheckChange(e);
}
handlePickClick = () =>{
    this.props.handlePickClick();
}
handleDeliveryClick = ()=>{
    this.props.handleDeliveryClick();
}
}
const mapStateToProps = (state)=>{
    return {
        readyPay :state.checkoutReducer.readyPay,
        SRNumber:state.checkoutReducer.SRNumber,
        submitReq:state.checkoutReducer.submitReq,
        submitSucc:state.checkoutReducer.submitSucc
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        submitRequestAction:bindActionCreators(actionCreator.submitRequestAction,dispatch),
        submitOrderAction:bindActionCreators(actionCreator.submitOrderAction,dispatch),
        changeStatusAction:bindActionCreators(actionCreator.changeStatusAction,dispatch),
        emptyReadyPayAction:bindActionCreators(actionCreator.emptyReadyPayAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(checkout));
