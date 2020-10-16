import React, { Component } from 'react';
import {connect} from 'react-redux';
import Cart from './components/cart'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { actionCreator } from '../cart/store';
class CartIndex extends Component {
    render() {
        const {cartList,images,quantity, indexArr} = this.props
        // const data = JSON.parse(localStorage.getItem('cart'))
        return (
            <div>
                <Cart cartList={cartList} images={images} quantity={quantity}
                indexArr={indexArr}
                handleCheckoutClick={this.handleCheckoutClick}
                handleInputChange={this.handleInputChange} handleClickAdd={this.handleClickAdd} handleClickMinus={this.handleClickMinus} handleDelete={this.handleClickDelete}/>
            </div>
        );
    }
    handleCheckoutClick = ()=>{
        const {cartList} = this.props
        let indexArr = []
        cartList.map((item,index)=>{
            if( item.cart.Stock < item.quantity){
                indexArr.push(index)
            }
        })
        if(indexArr.length>0){
            this.props.cartOverStockAction(indexArr)
        }
        else{
            this.props.history.push('/checkout')
        }
    }
    handleInputChange = (index,inputValue)=>{
        this.props.cartInputChangeAction(index,inputValue)
        const data = JSON.parse(localStorage.getItem('cart'))
        data[index].quantity = inputValue;
        localStorage.setItem('cart',JSON.stringify(data))
        
    }
    handleClickDelete = (index) =>{   
        const data = JSON.parse(localStorage.getItem('cart'))
		data.splice(index,1);
        localStorage.setItem('cart',JSON.stringify(data))
        this.props.delReqAction(index)
        setTimeout(()=>{
            this.props.cartItemDelete(index)
        },500)
        
    }
    handleClickAdd = (index)=>{
        this.props.cartQuantityAdd(index)
        const data = JSON.parse(localStorage.getItem('cart'))
		data[index].quantity = parseInt(data[index].quantity) + 1;
        localStorage.setItem('cart',JSON.stringify(data))
    }
    handleClickMinus = (index)=>{
        const data = JSON.parse(localStorage.getItem('cart'))
        if(parseInt(data[index].quantity)>1){
            data[index].quantity = parseInt(data[index].quantity) - 1;
            localStorage.setItem('cart',JSON.stringify(data))
            this.props.cartQuantityMinus(index)
        }
		
    }
    componentDidMount(){
        let tempdata = []
        let email = ''
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
          }
        else{
            email = '0'
        }
        if(JSON.parse(localStorage.getItem('cart'))){
            tempdata = JSON.parse(localStorage.getItem('cart'))
            this.props.startCartAction(JSON.parse(localStorage.getItem('cart')),email)
           
            let label = []
            tempdata.map((item,index)=>{
                label.push(item.cart)
            })
            this.props.getImagesAction(label)
        }
        else{
            localStorage.setItem('cart','[]');
            tempdata = JSON.parse(localStorage.getItem('cart'))
            this.props.startCartAction(JSON.parse(localStorage.getItem('cart')),email)
        }

    }
    componentDidUpdate(){
        // console.log('update data is :',this.props.cartList);
    }
    componentWillMount(){
       this.props.clearIndexArr()
    }
}
const mapStateToProps = (state) =>{
    return {
        images:state.cartReducer.images,
        quantity:state.cartReducer.quantity,
        data:state.detailReducer.cart,
        // onChangeEvent:state.cartReducer.onChangeEvent,
        cartList:state.cartReducer.cartList,
        indexArr:state.cartReducer.indexArr
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        cartOverStockAction:bindActionCreators(actionCreator.cartOverStockAction,dispatch),
        getImagesAction:bindActionCreators(actionCreator.getImagesAction,dispatch),
        cartInputChangeAction:bindActionCreators(actionCreator.cartInputChangeAction,dispatch),
        cartQuantityAdd:bindActionCreators(actionCreator.cartQuantityAdd,dispatch),
        cartQuantityMinus:bindActionCreators(actionCreator.cartQuantityMinus,dispatch),
        cartItemDelete:bindActionCreators(actionCreator.cartItemDelete,dispatch),
        startCartAction:bindActionCreators(actionCreator.startCartAction,dispatch),delReqAction:bindActionCreators(actionCreator.delReqAction,dispatch),
        clearIndexArr:bindActionCreators(actionCreator.clearIndexArr,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CartIndex)