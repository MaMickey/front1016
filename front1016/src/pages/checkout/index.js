import React, { Component } from 'react';
import CheckOut from './components/checkout';
import './style.css';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreator } from './store';
class index extends Component {
    render() { 
        const {postage,finalPrice,CityList,pickupChecked,changeAddress,doPayment,formValueObj,remark,cartInfo,userInfo,cashChecked,suburb,states,postcode,checkoutCartImages} = this.props
        return (
            <div className="checkoutWrapper">
                {userInfo.length>0?
              <CheckOut postage={postage} 
               finalPrice={finalPrice}
               checkoutCartImages={checkoutCartImages}
               formValueObj={formValueObj}
               userInfo={userInfo}
               suburb = {suburb}
               states = {states}
               postcode={postcode}
               remark={remark}
               changeAddress={changeAddress}
               pickAddressChange={this.pickAddressChange}
               handleAddressClick = {this.handleAddressClick}
               handleStateChange={this.handleStateChange}
               handleSuburbChange={this.handleSuburbChange}
               handleSelectChange = {this.handleSelectChange}
               handleTextAreaChange = {this.handleTextAreaChange}
               cartInfo={cartInfo}
               doPayment={doPayment}
               pickupChecked = {pickupChecked}
               cashChecked = {cashChecked}
               handleSubmit = {this.handleSubmit} 
               pickupSubmit = {this.pickupSubmit}
               handlePostCode = {this.handlePostCode}
            //    handlePostCodeBlur={this.handlePostCodeBlur} 
               CityList = {CityList}
               handleCheckChange = {this.handleCheckChange}
               handlePickClick = {this.handlePickClick}
               handleDeliveryClick ={this.handleDeliveryClick}
               handleCashChecked = {this.handleCashChecked}
               handleOnlineChecked = {this.handleOnlineChecked}/>:null}
            </div>
        );
    }
    componentDidMount(){
        
        // let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        // let {first,second} = this.getPostageInfo(userPostcode)
        // this.props.calPostageAction(first,second);
        // let data = []
        let email = ''
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
          }
        else{
            email = '0'
        }
       
        let data = JSON.parse(localStorage.getItem('cart'))
        this.props.getWebCustomerAction(email)
        this.props.startCartAction(data,email)
        
        // this.props.getUserInfoAction(email)
        // this.props.getSuburbAction(email) 
    }
    handleStateChange = (value) =>{
        this.props.setStateAction(value)
    }
    // handleAddressClick = (value)=>{
    //     this.props.handleAddressClickAction(value)
    // }
    handleTextAreaChange = (value) =>{
        this.props.setTextareaAction(value)
    }
    handleSuburbChange = (e) =>{
        const value = e.target.value
        this.props.setSuburbAction(value)
       
    }
    handlePickClick = () =>{
        // const value = e.target.checked;
        this.props.pickUpAction();
    }
    handleDeliveryClick = () =>{
        this.props.deliveryAction();
    }
    pickAddressChange=(e)=>{
        const value = e.target.checked;
        this.props.pickAddressAction(value);
    }
    handleCashChecked = (e) =>{
        const value = e.target.checked;
        this.props.payCashAction(value);
    }
    handleOnlineChecked = (e) =>{
        const value = e.target.checked;
        this.props.payOnlineAction(value);
    }
    handleSubmit = (e,state,city)=>{
        e.preventDefault()
        const {states,suburb} = this.props;
  
        const data = new FormData(e.target)
        const formValue = {}
        for(let item of data.entries()){
            formValue[`${item[0]}`] = item[1]  
        }
        if(states===''){
            formValue['state'] = state
        }
        else{
            formValue['state'] = states
        }
        if(suburb===''){
            formValue['city'] = city 
        }
        else{
            formValue['city'] = suburb 
        }
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        let email = userInfo[0].Email    
        formValue['email'] = email
        formValue['selPickUp'] = 'N'
        // console.log('heere,',formValue);
        this.props.setFormValueAndAddressAction(formValue)
        let {first,second} = this.getPostageInfo(formValue.postcode)
        this.props.calPostageAction(first,second);
        let cartdata = []
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
          }
        else{
            email = '0'
        }
        cartdata = JSON.parse(localStorage.getItem('cart'))
        this.props.startCartAction(cartdata,email)
        this.props.getCartImagesActon(cartdata)
        
    }
    handleAddressClick=(item)=>{
        let formValue = {
            'Fname':item.FirstName,
            'Lname':item.LastName,
            'Oaddress':item.Address2,
            'address':item.Address1,
            'city':item.City,
            'Pnumber':item.ContactNumber,
            'country':'Australia',
            'email':JSON.parse(sessionStorage.getItem('userInfo'))[0].Email,
            'postcode':item.Postcode,
            'selPickUp':'N',
            'state':item.State
        }
        this.props.setFormValueAction(formValue)
        let {first,second} = this.getPostageInfo(formValue.postcode)
        this.props.calPostageAction(first,second);
        let cartdata = []
        let email ='';
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
          }
        else{
            email = '0'
        }
        cartdata = JSON.parse(localStorage.getItem('cart'))
        this.props.startCartAction(cartdata,email)
        this.props.getCartImagesActon(cartdata)
    }
    pickupSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData(e.target)
        const formValue = {}
        for(let item of data.entries()){
            formValue[`${item[0]}`] = item[1]  
        }
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        let email = userInfo[0].Email    
        formValue['email'] = email
        formValue['selPickUp'] = 'Y'
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd
        let momentBusinessDays = require("moment-business-days");
        let businessday = []
        for(let i=1;i<=5;i++){
        let nextday = momentBusinessDays(today, 'YYYY-MM-DD').businessAdd(i)._d
        let dd = String(nextday.getDate()).padStart(2, '0');
        let mm = String(nextday.getMonth() + 1).padStart(2, '0'); 
        let yyyy = nextday.getFullYear();
        let weekday = String(nextday).slice(0,3)
        nextday = yyyy + '-' + mm + '-' + dd + ' ' + weekday
        businessday.push(nextday)
        }
        switch(formValue.exampleRadios){
            case 'option1':
                formValue['exampleRadios'] = businessday[0]+', 10:00AM - 16:00PM'
                break
            case 'option2':
                formValue['exampleRadios'] = businessday[1]+', 10:00AM - 16:00PM'
                break
            case 'option3':
                formValue['exampleRadios'] = businessday[2]+', 10:00AM - 16:00PM'
                break
            case 'option4':
                formValue['exampleRadios'] = businessday[3]+', 10:00AM - 16:00PM'
                break
            case 'option5':
                formValue['exampleRadios'] = businessday[4]+', 10:00AM - 16:00PM'
                break
            default:
                break
        } 
        this.props.setFormValueAction(formValue)
        this.props.noPostageAction()
        let cartdata = []
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
          }
        else{
            email = '0'
        }
        cartdata = JSON.parse(localStorage.getItem('cart'))
        this.props.startCartAction(cartdata,email)
        this.props.getCartImagesActon(cartdata)
        // let {first,second} = this.getPostageInfo()
        // this.props.calPostageAction(first,second);
        
    }
    // handlePostCodeBlur = (e) =>{
    //     console.log('blur:',e.target.value);
    //     const postcode = e.target.value;
    //     if(postcode !== ''){
    //         this.props.getSuburbAction(postcode)
    //     }
    // }
    handlePostCode =(postcode)=>{
        if(postcode !== ''){
            this.props.changeSuburbAction(postcode)
        }
    }
    getPostageInfo(postcode){
        const {cartInfo} = this.props;
        let cartTempArr = []
        let cartTempObj = {};
        let userPostcode = postcode
        cartInfo.map((item,index)=>{
            cartTempObj['CustomLabel'] = item.cart.CustomLabel
            if(item.cart.Stock<item.cart.estimateStock){
                cartTempObj['itemPrice'] = item.cart['XinWebPrice']
                        }
            else{
                cartTempObj['itemPrice'] = item.cart[`${item.cart.priceType}`]===0?item.cart['XinWebPrice']:item.cart[`${item.cart.priceType}`]
            }
            // cartTempObj['itemPrice'] = item.cart[`${item.cart.priceType}`]===0?item.cart.XinWebPrice: item.cart[`${item.cart.priceType}`]
            cartTempObj['quantity'] = item.quantity
            cartTempObj['D WEIGHT'] = item.cart['D WEIGHT']
            // console.log('ca:',cartTempObj);
            const temp = Object.assign({},cartTempObj)
            cartTempArr.push(temp)
            // console.log('here',cartTempArr);
            return cartTempArr
        })
        return {
            first:cartTempArr,
            second:userPostcode
        }
    }
    componentWillUnmount(){
        this.props.setPaymentDisplayAction()
    }
    componentDidUpdate(){

    }
}
const mapStateToProps = (state)=>{
    return {
        cartInfo:state.checkoutReducer.cartInfo,
        postage:state.checkoutReducer.postage,
        remark:state.checkoutReducer.remark,
        finalPrice:state.checkoutReducer.finalPrice,
        CityList:state.checkoutReducer.CityList,
        pickupChecked:state.checkoutReducer.pickupChecked,
        changeAddress:state.checkoutReducer.changeAddress,
        cashChecked: state.checkoutReducer.cashChecked,
        doPayment:state.checkoutReducer.doPayment,
        states:state.checkoutReducer.states,
        suburb:state.checkoutReducer.suburb,
        postcode:state.checkoutReducer.postcode,
        formValueObj:state.checkoutReducer.formValueObj,
        userInfo:state.checkoutReducer.userInfo,
        checkoutCartImages:state.checkoutReducer.checkoutCartImages
    }
} 
const mapDispatchToProps = (dispatch)=>{
    return {
        setFormValueAndAddressAction:bindActionCreators(actionCreator.setFormValueAndAddressAction,dispatch),
        // handleAddressClickAction:bindActionCreators(actionCreator.handleAddressClickAction,dispatch),
        changeSuburbAction:bindActionCreators(actionCreator.changeSuburbAction,dispatch),
        getWebCustomerAction:bindActionCreators(actionCreator.getWebCustomerAction,dispatch),
        // getUserInfoAction:bindActionCreators(actionCreator.getUserInfoAction,dispatch),
        getCartImagesActon:bindActionCreators(actionCreator.getCartImagesActon,dispatch),
        startCartAction:bindActionCreators(actionCreator.startCartAction,dispatch),
        setFormValueAction:bindActionCreators(actionCreator.setFormValueAction,dispatch),
        setTextareaAction:bindActionCreators(actionCreator.setTextareaAction,dispatch),
        setStateAction:bindActionCreators(actionCreator.setStateAction,dispatch),
        setSuburbAction:bindActionCreators(actionCreator.setSuburbAction,dispatch),
        // getSuburbAction:bindActionCreators(actionCreator.getSuburbAction,dispatch),
        calPostageAction:bindActionCreators(actionCreator.calPostageAction,dispatch),
        pickUpAction:bindActionCreators(actionCreator.pickUpAction,dispatch),
        deliveryAction:bindActionCreators(actionCreator.deliveryAction,dispatch),
        pickAddressAction:bindActionCreators(actionCreator.pickAddressAction,dispatch),
        payCashAction:bindActionCreators(actionCreator.payCashAction,dispatch),
        payOnlineAction:bindActionCreators(actionCreator.payOnlineAction,dispatch),
        noPostageAction:bindActionCreators(actionCreator.noPostageAction,dispatch),
        setPaymentDisplayAction:bindActionCreators(actionCreator.setPaymentDisplayAction,dispatch)
        // postOrderInfoAction:bindActionCreators(actionCreator.postOrderInfoAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(index);