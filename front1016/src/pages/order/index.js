import React, { Component } from 'react';
import OrderDisplay from './components/order';
import "./style.css";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from '../order/store';

class Order extends Component {
    render() {
        const {orderList, delOrderReq, delsignIndex} = this.props
        return (
            <div className="orderWrapper">
                <OrderDisplay orderList={orderList} delOrderReq={delOrderReq} delsignIndex={delsignIndex} handleDeleteClick={this.handleDeleteClick} deleteReqAction={this.deleteReqAction}/>
            </div>
        );
    }
    componentDidMount(){
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      const email = userInfo[0].Email
      this.props.getOrderListAction({'email':email})
      document.querySelector('body').scrollTo(0,0)
    }
    handleDeleteClick = (SRN) =>{
        this.props.deleteOrderAction(SRN);
    }
    deleteReqAction =(delsignIndex) =>{
        this.props.deleteReqAction(delsignIndex)
    }
    componentWillUnmount(){
    }
}
const mapStateToProps = (state)=>{
    return {
        orderList:state.orderReducer.orderList,
        delOrderReq:state.orderReducer.delOrderReq,
        delsignIndex: state.orderReducer.delsignIndex
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        deleteOrderAction:bindActionCreators(actionCreator.deleteOrderAction,dispatch),
        getOrderListAction:bindActionCreators(actionCreator.getOrderListAction,dispatch),
        deleteReqAction:bindActionCreators(actionCreator.deleteReqAction,dispatch)
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Order);