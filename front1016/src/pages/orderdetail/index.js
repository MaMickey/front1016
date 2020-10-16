import React, { Component } from 'react';
import OrderDetailPage from './components/orderdetail';
import "./style.css";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from '../orderdetail/store';
import NotFound from "../../common/notfound";


class OrderDetail extends Component {
    render() {
        const {orderDetail, orderCheck, getOrderDetailAction } = this.props;
        return (
            orderCheck.length>0?
            <div className="orderdetailWrapper">
                <OrderDetailPage orderDetail={orderDetail} getOrderDetailAction={getOrderDetailAction}/>            
            </div>:null
        );
    }
    componentDidMount(){
        // const SRN = this.props.match.params.SRN;
        // const SRN = this.props.location.state.SRN  
        const SRN = localStorage.getItem('SRN')
        const email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
        this.props.checkOrderAction(SRN,email)    
    }
    componentWillUnmount(){
        this.props.clearOrderCheck()
    }
}
const mapStateToProps = (state)=>{
    return {
        orderDetail:state.orderDetailReducer.orderDetail,
        orderCheck:state.orderDetailReducer.orderCheck
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getOrderDetailAction:bindActionCreators(actionCreator.getOrderDetailAction,dispatch),
        checkOrderAction:bindActionCreators(actionCreator.checkOrderAction,dispatch),
        clearOrderCheck:bindActionCreators(actionCreator.clearOrderCheck,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail);