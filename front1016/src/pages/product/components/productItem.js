import React, { Component, Fragment } from "react";
import {
  faSearchPlus,
  faHeart,faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../style.css";
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import Loader from 'react-loader-spinner';

class productItem extends Component {
  render() {
    const {
      Stock,
      WebTitle,
      CustomLabel,
      estimateStock
    } = this.props.data;
    let BLOBData = ''
    const {images} = this.props;
        if(images.length>0){
            images.map((item,index)=>{
                if(item.CustomLabel.toLowerCase()===CustomLabel.toLowerCase()){
                    BLOBData = item.BLOBData
                }
            })
        }
    const {priceType} = this.props;
    return (
      <Fragment>
      <div className="col-md-4 col-lg-3">
        <div className="card card-product-grid productListCard">
          <div className="img-wrap listProductImgWrap">
          <Link to={`/detail/${CustomLabel}`}>
          {
            BLOBData?<img alt="losed" src={BLOBData} className="listImg"/>:<div className="loaderWrapProduct"><Loader
            type="ThreeDots"
            color="#5499c7"
            height={225}
            width={75}
            timeout={9000}
          /></div>
          }
          </Link>
            <Link to={`/detail/${CustomLabel}`} className="btn-overlay">
             <FontAwesomeIcon icon={faSearchPlus} /> Quick view
            </Link>
          </div>
          <div className="info-wrap border-top">
            <div className="listProductWrap">
            <Link to={`/detail/${CustomLabel}`} className="title listProductTitle">{WebTitle}</Link>
            </div>
            <div className="stockDiv">
            {
              Stock > 10&&priceType.priceType==='XinWebPrice'? <div>More than 10 left</div>:<div>{Stock} left</div>
            }
          </div>
          {
            this.props.data[`${priceType.priceType}`] === 0||priceType.priceType==='XinWebPrice'||this.props.data[`${priceType.priceType}`]===this.props.data.XinWebPrice?<div className="productPriceOriginal">AU${this.props.data.XinWebPrice}</div>:
            <div>{
              Stock<estimateStock?<div className="productPriceOriginal">AU${this.props.data.XinWebPrice}</div>:
              <Fragment><div className="productPriceOriginal">
              <del style={{backgroundColor:"tomato"}}>AU${this.props.data.XinWebPrice}</del></div>
              <span className="productPrice">AU${this.props.data[`${priceType.priceType}`]}</span></Fragment>
            }
            </div>
          }
          <span className="topbar">
          {
            JSON.parse(localStorage.getItem('wish')).filter((item,index)=>{return item.wish===CustomLabel}).length > 0?(
            <a className="float-right mb-2 mr-1" onClick={this.handleClick}>
            <FontAwesomeIcon icon={faHeart}  className="activewish"/>
            </a >
        ):(
              <a className="float-right mb-2 mr-1" onClick={this.handleClick}>
              <FontAwesomeIcon icon={faHeart}  className="normalwish"/>
              </a >
          )
          }
          <button className="btn btn-primary btn-sm btn-block float-right" onClick={this.handleAddClick}>
              <span className="text">Add to cart</span>
              <FontAwesomeIcon icon={faShoppingCart} className="addCartIcon ml-1"/>
          </button>
          </span>
        </div>
      </div></div></Fragment>
    );
  }
  handleAddClick = ()=>{
    const {CustomLabel, WebTitle} = this.props.data;
    let BLOBData = ''
    const {images} = this.props;
        if(images.length>0){
            images.map((item,index)=>{
                if(item.CustomLabel.toLowerCase()===CustomLabel.toLowerCase()){
                    BLOBData = item.BLOBData
                }
            })
        }
    if(localStorage.cart){
      const cart = JSON.parse(localStorage.getItem('cart'))
      let tempArr = []
      for(let i=0;i<cart.length;i++){
          if(cart[i].cart === CustomLabel){
              cart[i].quantity = cart[i].quantity + 1
              localStorage.setItem('cart',JSON.stringify(cart))
      }else{tempArr.push([])}
      }
      if(tempArr.length === cart.length){
          cart.push({'quantity':1,'cart':CustomLabel})
          localStorage.setItem('cart',JSON.stringify(cart))
      }   
  }
  else{
      localStorage.setItem('cart','[]')
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.push({'quantity':1,'cart':CustomLabel})
      localStorage.setItem('cart',JSON.stringify(cart))
  }
  const successCart =JSON.parse(localStorage.getItem('cart'))
  let SuccessQuantity;
  for(let i=0; i<successCart.length;i++){
    if(successCart[i].cart === CustomLabel){
      SuccessQuantity = successCart[i].quantity
    }
  }
  this.props.handleAddToCartClick(BLOBData,WebTitle,SuccessQuantity)
  }

  handleClick = () => {
    const { data } = this.props;
    let tempData = Object.assign({},data)
    tempData['priceType'] = this.props.priceType.priceType
    this.props.handleClick(tempData);
  };
}
const mapStateToProps = (state)=>{
  return {
    images:state.productReducer.images
    
  }
}

export default connect(mapStateToProps, null)(productItem);
