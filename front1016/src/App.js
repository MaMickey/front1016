import "@babel/polyfill";
import Header from './common/header';
import Footer from './common/footer';
import NotFoundPage from './common/notfound';
import Home from './pages/home';
import Product from './pages/product/';
import Login from './pages/login/';
import Register from './pages/register/';
import CheckOut from './pages/checkout';
import Details from './pages/detail';
import Cart from './pages/cart';
import Order from './pages/order';
import Wishlist from './pages/wishlist';
import Account from './pages/account';
import Addressedit from './pages/addressEdit';
import Admin from './pages/admin';
import OrderDetail from './pages/orderdetail';
import Success from './common/success';
import CalPostage from './pages/calpostage';
import ForgetPwd from './pages/forgetpassword'
import {Route,Switch,withRouter,HashRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import React,{Component } from 'react';
import './App.css';
import './asserts/scss/index.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
class App extends Component {
  render(){
    return (
        <HashRouter>
        <Header />
        <div className="main">
        <Switch>
        <Route path="/" exact component={withRouter(Home)}></Route>
        <Route path="/admin" exact component={withRouter(Admin)}></Route>
        <Route path="/getBestPostage" exact component={CalPostage} />
        <Route path="/detail/:CustomLabel" exact component={withRouter(Details)}></Route>
        <Route path="/products/:product/:page" exact component={withRouter(Product)}></Route>
        <Route path="/cart" exact component={withRouter(Cart)}></Route>
        <Route path="/wishlist" exact component={withRouter(Wishlist)}></Route>
        <Route path="/checkout" exact component={withRouter(CheckOut)}></Route>
        <Route path="/login" exact component={withRouter(Login)}></Route>
        <Route path="/forgetpwd" exact component={withRouter(ForgetPwd)}></Route>
        <Route path="/account" exact component={withRouter(Account)}></Route>
        <Route path="/editAddress/:from" exact component={withRouter(Addressedit)}></Route>
        <Route path="/register" exact component={withRouter(Register)}></Route>
        <Route path="/order" exact component={withRouter(Order)}></Route>
        <Route path="/orderDetail" exact component={withRouter(OrderDetail)}></Route>
        <Route path="/success" exact component={withRouter(Success)}></Route>
        <Route path="*"  component={NotFoundPage} />
        </Switch>
        </div>
        <Footer />
        </HashRouter>
    );
  }
  
}


export default connect(null,null)(App);
