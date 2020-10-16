import React, { Component, Fragment } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledCollapse
} from "reactstrap";
import "./style.css";
import "../../css/ui.css";
import "../../css/responsive.css";
import "../../css/bootstrap.css";
import {
  faSearch,
  faShoppingCart,
  faHeart,
  faUser,
  faCrown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { actionCreator } from "../../redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import LogoImg from "../../images/logo.png";
import ThemeSwitcher from "react-theme-switcher";
import axios from 'axios';
import {baseUrl} from '../../util.js'

class Header extends Component {
  render() {
    const { cart,wish,version, theLevel} = this.props;
    const userInfo =  JSON.parse(sessionStorage.getItem('userInfo'))
    return (
      <Fragment>
        <div className="section-header" id="theHeader">
          <div className="header-main border-bottom hearTopPart">
            <div className="container">
              <div className="row align-items-center">
              {
                version.version ==='AddressTest'?<div id="preview-banner" style={{padding:'10px', width:'250px','textAlign': 'center', background: '#5499c7', 'zIndex': '2147483647', position: 'fixed', left: '-60px', top: '30px', transform: 'rotate(-45deg)', color: 'white', 'fontWeight': 'bold', 'fontSize': '32px'}}>Preview</div>:null
              }
                <div className="col-lg-3 col-sm-4 col-md-3 col-5">
                  <Link to="/" className="brand-wrap">
                    <img className="logo" alt='' src={LogoImg} />
                  </Link>
                  <div className="modeBtn d-none d-lg-block">
                    <ThemeSwitcher 
                    cssSelector="body"
                    switcherColor="#5499c7"
                    darkColor="#1B262C"
                    darkTextColor="#0f4c75"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-xl-5 col-sm-8 col-md-5 d-none d-md-block">

                  <form className="search searchArea">
                    <div className="input-group w-100">
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "55%" }}
                        placeholder="Search"
                        onChange={this.handleChange}
                        onKeyUp={this.onKeyup}
                      />
                      <div className="input-group-append">
                        {this.props.text.length === 0 ? (
                          <Link to="/">
                            <button className="btn btn-primary" type="submit">
                              <FontAwesomeIcon icon={faSearch} />
                            </button>
                          </Link>
                        ) : (
                          <Link to={`/products/${this.props.text}/1`}>
                            <button className="btn btn-primary" type="submit">
                              <FontAwesomeIcon icon={faSearch} />
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-5 col-xl-4 col-sm-8 col-md-4 col-7">
                  <div className="d-flex justify-content-end">
                  {
                    sessionStorage.getItem('isLogin') === 'true'?
                  <div className="widget-header mr-3 d-none d-lg-block" style={{display:"block"}}>
                    <div className="AfterLoginInfo">Hi! {userInfo[0].Email}</div></div>:
                    null
                  }
                    <Link to="/cart" className="widget-header mr-3">
                      <div className="icon icon-sm rounded-circle border">
                        <FontAwesomeIcon icon={faShoppingCart} />
          <span>{ 
            localStorage.getItem('cart') ? (<span className="notify"> {JSON.parse(localStorage.getItem('cart')).length} </span>):(<span className="notify"> 0 </span>)
          }</span>
                      </div>
                    </Link>
                    <Link to="/wishlist" className="widget-header mr-3">
                      <div className="icon icon-sm rounded-circle border">
                        <FontAwesomeIcon icon={faHeart} />
                        {
            localStorage.getItem('wish') ? (<span className="notify"> {JSON.parse(localStorage.getItem('wish')).length} </span>):(<span className="notify"> 0 </span>)
                        }
                      </div>
                    </Link>
                    <UncontrolledDropdown className="widget-header">
                      <DropdownToggle tag="a" className="dropdown-toggle" caret>
                        <div className="icon icon-sm rounded-circle border ">
                          <FontAwesomeIcon icon={faUser} />
                          {theLevel > 0?<span className="levelLogo"> <FontAwesomeIcon icon={faCrown} /> VIP {theLevel} </span>:null}
                        </div>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-right">
                      {sessionStorage.getItem('isLogin') === 'true'?<Fragment><Link to="/order">
                        <DropdownItem className="dropdown-item">
                          My Orders
                        </DropdownItem></Link>
                        <Link to="/account">
                        <DropdownItem className="dropdown-item">
                          Account
                        </DropdownItem></Link>
                        <hr className="dropdown-divider" /></Fragment>:null
                         }
                        {
                          sessionStorage.getItem('isLogin') === 'true'?
                          <Link to="/">
                        <DropdownItem className="dropdown-item" onClick={this.handleClick}>
                          Logout
                        </DropdownItem></Link>:<Fragment>
                        <Link to="/register" className="register">
                        <DropdownItem className="dropdown-item" >
                          Register
                        </DropdownItem>
                        </Link>
                        <Link to="/login" className="login">
                        <DropdownItem className="dropdown-item">
                          Login
                        </DropdownItem>
                        </Link></Fragment>
                          }           
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar navbar-expand-md navbar-main border-bottom navigationBar">
          <div className="container">
          <form className="d-md-none my-2">
		      	<div className="input-group">
            <input type="text" className="form-control" placeholder="Search"  
            onChange={this.handleChange} onKeyUp={this.onKeyup}/>
				    <div className="input-group-append">
            {this.props.text.length === 0 ? (
                          <Link to="/">
                            <button className="btn btn-primary" type="submit">
                              <FontAwesomeIcon icon={faSearch} />
                            </button>
                          </Link>
                        ) : (
                          <Link to={`/products/${this.props.text}/1`}>
                            <button className="btn btn-primary" type="submit">
                              <FontAwesomeIcon icon={faSearch} />
                            </button>
                          </Link>
                        )}
				</div>
			</div>
		</form>
    
    <button className="navbar-toggler" type="button" id="toggler">
			<span className="navbar-toggler-icon"></span>
		</button>

       <UncontrolledCollapse className="collapse navbar-collapse" toggler="#toggler">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"
                className="nav-link dropdown-toggle dropdownHead"
                caret
                onClick = {this.cateClick}
              >
                All Categories
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu">
              {this.props.categoryList.map((item, index) => {
              return(
                <Link to={`/products/searchByCategory-${item.CATNAME}/1`} key={index}>
                <DropdownItem className="dropdown-item">
                  {item.CATNAME}
                </DropdownItem>
                </Link>
                )})}
              </DropdownMenu>
            </UncontrolledDropdown>
      </UncontrolledCollapse>

          </div>
        </div>
        </div>
      </Fragment>
    );
  }
  componentDidMount(){
    this.props.getWebVersionAction()
    if(sessionStorage.getItem('isLogin') === 'true'){
      let email =  JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
      this.props.getAllCustomerLevelAction(email)
    }
   
  }
  componentDidUpdate(prevProps){
    if((sessionStorage.getItem('isLogin') === 'true'&& this.props.theLevel !==prevProps.theLevel)||this.props.isLogin!==prevProps.isLogin){
      let email =  JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
      this.props.getAllCustomerLevelAction(email)
    }
    if(sessionStorage.getItem('isLogin') === 'false'){
      this.props.logoutAction()
    }
  }
  handleClick = ()=>{
    sessionStorage.setItem('isLogin','false')
  
    sessionStorage.removeItem('userInfo')
    this.props.logoutAction()
  }
  onKeyup = (e) => {
    if (e.keyCode === 13) {
      // this.SearchClick();
      // return <Redirect to="/products/"/>
      this.props.history.push({ pathname: `/products/${this.props.text}/1` });
    }
  };
  handleChange = (e) => {
    this.props.inputAction(e.target.value);
  };
  cateClick=()=>{
    this.props.getCategoryAction()
  }
}
const mapStateToProps = (state, props) => {
  return {
    categoryList:state.headerReducer.categoryList,
    text: state.headerReducer.text,
    cart: state.detailReducer.cart,
    refresh:state.wishReducer.refresh,
    wish: state.productReducer.wish,
    cartList:state.cartReducer.cartList,
    logout:state.headerReducer.logout,
    version:state.headerReducer.version,
    theLevel: state.headerReducer.theLevel,
    isLogin:state.loginReducer.isLogin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWebVersionAction:bindActionCreators(actionCreator.getWebVersionAction,dispatch),
    getCategoryAction:bindActionCreators(actionCreator.getCategoryAction,dispatch),
    inputAction: bindActionCreators(actionCreator.inputAction, dispatch),
    logoutAction: bindActionCreators(actionCreator.logoutAction, dispatch),
    getAllCustomerLevelAction: bindActionCreators(actionCreator.getAllCustomerLevelAction, dispatch)
    //  searchAction:bindActionCreators(actionCreator.searchAction,dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
