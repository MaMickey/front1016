import React, { Component,Fragment } from 'react';
import '../style.css';
import '../../../css/responsive.css';
import '../../../css/ui.css';
import '../../../css/bootstrap.css';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from 'react-redux';
import { Link,withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';


class cart extends Component {
    render() {
				const {cartList,images,quantity,delReq,delSignIdx, indexArr} = this.props;
				let mainPrice = 0;
				let beforeDiscount = 0;
				let ifCheckout = true;
				cartList.map((item,index)=>{
					if(item.quantity === 0){
						ifCheckout = false
					}
				})
				let tempCart = JSON.parse(JSON.stringify(cartList));
				tempCart.map((item,index)=>{
					if(item.cart.Stock<item.cart.estimateStock){
            mainPrice += item.cart['XinWebPrice']*item.quantity
					}
					else{
						mainPrice += (item.cart[`${item.cart.priceType}`]===0?item.cart['XinWebPrice']:item.cart[`${item.cart.priceType}`])*item.quantity
					}
				beforeDiscount += item.cart['XinWebPrice']*item.quantity
				for(let i =0;i<images.length;i++){
					if(images[i].CustomLabel.toLowerCase()===item.cart.CustomLabel.toLowerCase()){
						item.cart['BLOBData'] = images[i].BLOBData
					}
				}
				return mainPrice
			}
		)
        return (
        <div className="cartWrapper">
			<div className="card">
          <div className="row no-gutters">
	        <div className="col-md-9">
				{tempCart.map((item,index) => (
					<Fragment key={index}>
				<div className="card-body border-top cartRow">
				<div className="row">
					<div className="col-md-7">
						<div className="media">
							<div className="img-wrap mr-3">
							{item.cart.BLOBData?
							<img src={item.cart.BLOBData} alt='' className="border img-sm cartSmall" />:<div className="loaderWrapCart"><Loader
            type="ThreeDots"
            color="#5499c7"
            height={60}
            width={30}
            timeout={9000}
          /></div>}
							</div>
								<div className="media-body">
									<a className="title h6">{item.cart.WebTitle} </a>
									{
										item.cart[`${item.cart.priceType}`] ===0||item.cart['priceType']==='XinWebPrice'||item.cart[`${item.cart.priceType}`]===item.cart.XinWebPrice?<div className="price-wrap">AU${(item.cart.XinWebPrice*item.quantity).toFixed(2)}</div>:
										<div>{
											item.cart.Stock < item.cart.estimateStock?
											<div className="price-wrap">AU${(item.cart.XinWebPrice*item.quantity).toFixed(2)}</div>:<Fragment><div className="">
											<del style={{backgroundColor:"tomato"}}>AU${(item.cart.XinWebPrice*item.quantity).toFixed(2)}</del></div>
											<span className="">AU${(item.cart[`${item.cart.priceType}`]*item.quantity).toFixed(2)}</span>
											</Fragment>
										}</div>
										
									}
									 {
              item.cart.Stock > 10&&item.cart.priceType==='XinWebPrice'? <div className="cartStock">More than 10 left</div>:<div className="cartStock">{item.cart.Stock} left</div>
            			}
								</div>
							</div> 
							{
									indexArr.map((item)=>{
											if(item===index){
													return <div className="cartStockHint" key={index}>Stock is limited. Please enter a correct quantity.</div>
											}
									})
							}
						</div>
						<div className="col-md-5 text-md-right text-right"> 
							<div className="input-group input-spinner">
							{
							delReq ===true && index ===delSignIdx?<Fragment><div className="input-group-prepend addBtnBg"> 
							<Loader
							type="Bars"
							color="#5499c7"
							height={38}
							width={118}
							timeout={500}
						/></div><button className="btn btn-light ml-4 delBtn" onClick={this.handleDelete.bind(this,index)}><FontAwesomeIcon icon={faTrash} /></button></Fragment>:
								<Fragment>
							  <div className="input-group-prepend addBtnBg">
							    <button className="btn btn-light addBtn" type="button" id="button-plus" onClick={this.handleClickAdd.bind(this,index)}> + </button>
							  </div>
								<input type="text" className="form-control cartInputQuantity"  value={parseInt(item.quantity)} onChange={this.handleChange.bind(this,index)}/>
							  <div className="input-group-append addBtnBg">
							    <button className="btn btn-light addBtn" type="button" id="button-minus" onClick={this.handleClickMinus.bind(this,index)}> − </button>
							  </div>
								<button className="btn btn-light ml-4 delBtn" onClick={this.handleDelete.bind(this,index)}><FontAwesomeIcon icon={faTrash} /></button>
								</Fragment>}
							  
						</div> 
							{parseInt(item.quantity)===0?
								<div className="quantityHint text-left" id="Qhint">*Quantity must be greater than 0</div>: null}
						</div>
						</div> 
			           </div> 
						</Fragment>
						))
					} 
	</div> 

	<div className="col-md-3 border-left">
		<div className="card-body">
			<dl className="dlist-align">
			  <dt>Item price:</dt>
			  <dd className="text-right">AU${beforeDiscount.toFixed(2)}</dd>
			</dl>
			{/* <dl className="dlist-align">
			  <dt>Postage:</dt>
			  <dd className="text-right">$0</dd>
			</dl> */}
			<dl className="dlist-align">
			  <dt>Discount:</dt>
			  <dd className="text-right text-danger">- AU${(beforeDiscount-mainPrice).toFixed(2)}</dd>
			</dl>
			<dl className="dlist-align">
			  <dt>Total:</dt>
			  <dd className="text-right text-dark b"><strong>AU${mainPrice.toFixed(2)}</strong></dd>
			</dl>
			<hr />
					{
                    sessionStorage.getItem('isLogin') === 'true' && localStorage.getItem('cart')!=='[]' && ifCheckout===true?
                    <div className="checkoutBtn"><div className="btn btn-primary btn-block" id="checkout" onClick={this.handleCheckoutClick}> Check Out </div></div>:null
          }
					{
							sessionStorage.getItem('isLogin') === 'true' && localStorage.getItem('cart')==='[]'?null:null
					}
					{
							sessionStorage.getItem('isLogin') !== 'true' && ifCheckout===true? <Link to="/login"><div className="btn btn-primary btn-block"> Check Out </div></Link>:null
					}
			<a className="btn btn-light btn-block mt-4" onClick={this.clickGoBack}>Continue Shopping</a>
		</div> 
	</div> 
</div> 
</div>
</div>
        );
		}
		handleCheckoutClick = ()=>{
			this.props.handleCheckoutClick();
	  }
		handleChange(index,e){
				let inputValue = e.target.value;
				// const {data} = this.props;
				// data[index].quantity = inputValue;
				// localStorage.setItem('cart',JSON.stringify(data))
				if(inputValue===''){
					inputValue = '0'
				}
				if(inputValue >=0){
					this.props.handleInputChange(index,parseInt(inputValue),10)
				}
				
		}
		clickGoBack = ()=>{
			this.props.history.push('/');
		}
		handleClickAdd(index){
				this.props.handleClickAdd(index)
		}
		handleClickMinus(index){
			this.props.handleClickMinus(index)
		}
		handleDelete(index){
			this.props.handleDelete(index)
		}
}
const mapStateToProps = (state)=>{
  return {
		// totalPrice: state.detailReducer.totalPrice
		delReq:state.cartReducer.delReq,
		delSignIdx:state.cartReducer.delSignIdx
	}
}
const mapDispatchToProps = (dispatch) =>{
	return {

	}
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(cart));