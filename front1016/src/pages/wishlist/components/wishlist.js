import React, { Component,Fragment } from "react";
import "../style.css";
import "../../../css/responsive.css";
import "../../../css/ui.css";
import "../../../css/bootstrap.css";
import { faTrash, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Loader from 'react-loader-spinner';

class WishlistPage extends Component {
  render() {
    const {wishList,wishImages,delWishSign,delWishReq} = this.props;
    let tempWish = JSON.parse(JSON.stringify(wishList));
				tempWish.map((item,index)=>{
				for(let i =0;i<wishImages.length;i++){
					if(wishImages[i].CustomLabel.toLowerCase()===item.wish.CustomLabel.toLowerCase()){
						item.wish['BLOBData'] = wishImages[i].BLOBData
					}
				}
			}
        )
    return (
        <div className="card">
          <div className="card-header"> My wishlist </div>
          <div className="card-body">
            <div className="row">
            {
            tempWish.map((item,index)=>{
              return(
                <div className="col-md-4 col-lg-3 col-xl-3" key={index}>
                <div className="card card-product-grid listbox wishCard">
                  <div className="img-wrap listProductImgWrap">
                  <Link to={`/detail/${item.wish.CustomLabel}`}>
                  {
                    item.wish.BLOBData? <img alt="losed" src={item.wish.BLOBData} className="listImg"/>:<div className="loaderWrapWish"><Loader
                    type="ThreeDots"
                    color="#5499c7"
                    height={250}
                    width={80}
                    timeout={9000}
                  /></div>
                  }
                  </Link>
                  </div>
                  <div className="info-wrap border-top">
                  <div className="wishProductWrap">
                    <Link to={`/detail/${item.wish.CustomLabel}`} className="title wishlistTitle">{item.wish.WebTitle}</Link>
                  </div>
                  {
                    item.wish[`${item.wish.priceType}`] === 0||item.wish['priceType']==='XinWebPrice'||item.wish[`${item.wish.priceType}`]===item.wish.XinWebPrice?<div className="productPriceOriginal">AU${item.wish.XinWebPrice}</div>:<Fragment>
                    {
                      item.wish.Stock < item.wish.estimateStock?<div className="productPriceOriginal">AU${item.wish.XinWebPrice}</div>:<Fragment><div className="productPriceOriginal">
                      <del style={{backgroundColor:"tomato"}}>AU${item.wish.XinWebPrice}</del></div>
                      <span className="productPrice">AU${item.wish[`${item.wish['priceType']}`]}</span>
                      </Fragment>
                    }
                    </Fragment>
                  }
                  {/* <div className="topbar mb-5 ml-1 price">AU${item.wish[`${item.wish.priceType}`]}</div> */}
                  <div className="topbar float-right topbarWrap">
                     <button className="btn btn-primary" onClick={this.handleAddClick.bind(this,item.wish.CustomLabel, item.wish.BLOBData, item.wish.WebTitle)}>
                        <span className="text">Add to cart</span>
                        <FontAwesomeIcon icon={faShoppingCart} className="addCartIcon ml-1"/>
                      </button>
                      {
                        delWishSign===item.wish.CustomLabel&&delWishReq===true?<div className="ml-2"><Loader
                        type="Bars"
                        color="#5499c7"
                        height={40}
                        width={37}
                        timeout={500}
                      /></div>:
                      <button className="btn btn-light trashBtn ml-2" onClick={this.handleDelClick.bind(this,item.wish.CustomLabel)}>
                          <FontAwesomeIcon icon={faTrash} />
                      </button>}
                    </div>
                </div>
              </div>
              </div>
              )
            })}
            </div>
          </div>
        </div>
    );
  }
  handleDelClick = (CustomLabel)=>{
    this.props.handleDelClick(CustomLabel)
  }
  handleAddClick = (label, img, title)=>{
    const cart = JSON.parse(localStorage.getItem('cart'))
    if(localStorage.cart){
      const cart = JSON.parse(localStorage.getItem('cart'))
      let tempArr = []
      for(let i=0;i<cart.length;i++){
          if(cart[i].cart === label){
              cart[i].quantity = cart[i].quantity + 1
              localStorage.setItem('cart',JSON.stringify(cart))
      }else{tempArr.push([])}
      }
      if(tempArr.length === cart.length){
          cart.push({'quantity':1,'cart':label})
          localStorage.setItem('cart',JSON.stringify(cart))
      }   
  }
  else{
      localStorage.setItem('cart','[]')
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.push({'quantity':1,'cart':label})
      localStorage.setItem('cart',JSON.stringify(cart))
  }
  const successCart =JSON.parse(localStorage.getItem('cart'))
  let SuccessQuantity;
  for(let i=0; i<successCart.length;i++){
    if(successCart[i].cart === label){
      SuccessQuantity = successCart[i].quantity
    }
  }
  this.props.handleAddToCartClick(img, title, SuccessQuantity)
  }
}

export default WishlistPage;
