import React, { Component } from "react";
import Banner from "./components/banner";
import Notice from './components/notice';
import Products from "./components/products";
// import Video from './components/video';
import Brands from './components/brands';
import Backtop from '../../common/backtop';
import {connect} from 'react-redux';
import {actionCreator} from '../product/store';
import { bindActionCreators } from 'redux';
import './style.css';

class Home extends Component {
  render() {
    return (
      <div className="HomeWrapper">
        <Banner />
        <Notice />
        <Products />
        {/* <Video /> */}
        <Brands />
        <Backtop />
      </div>
    );
  }
  componentDidMount(){
    this.props.emptyProductListAction();
  }
}
const mapStateToProps = (state)=>{
  return {

  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    emptyProductListAction:bindActionCreators(actionCreator.emptyProductListAction,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);
