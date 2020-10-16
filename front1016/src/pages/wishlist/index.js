import React, { Component, Fragment } from 'react';
import WishlistPage from './components/wishlist';
import Backtop from '../../common/backtop';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from '../wishlist/store';
import {withRouter} from 'react-router-dom';

var Settime = null;
var timer = null;
class Wishlist extends Component {
    render() {
        const {wishList,wishImages, Succimg, Succtitle, SuccessQuantity,delWishSign,delWishReq} = this.props
        return (
            <Fragment>
            <div className="card col-xl-2 col-lg-3 col-md-4 col-8 addSuccess" id="addsuccess" >
                <div className="no-gutters successRow1">
                    <span className="img-wrap mr-3 col-5">
                        <img src={Succimg} alt='' className="border img-sm cartSmall" />
                    </span>
                    <span className="col-6"><span className="title SuccessTitle">{Succtitle}</span></span>
                    <span className='col-5' />
                    <span className="SuccessQuantity col-6">Quantity: x{SuccessQuantity}</span>
                    <div>
                </div>
                </div>
                <div className="no-gutters successRow2">
                <div className="col-sm-12">Added Successfully!</div>
                </div>
            </div>
            <div className="wishlistWrapper">
              <WishlistPage wishList={wishList} wishImages={wishImages} delWishSign={delWishSign} delWishReq={delWishReq}
              handleDelClick={this.handleDelClick} handleAddToCartClick={this.handleAddToCartClick}/> 
              <Backtop />
            </div>
            </Fragment>
        );
    }
    componentDidMount(){
        let data = []
        let email = ''
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
          }
        else{
            email = '0'
        }
        if(JSON.parse(localStorage.getItem('wish'))){
            data = JSON.parse(localStorage.getItem('wish'))
        }
        else{
            localStorage.setItem('wish','[]');
            data = JSON.parse(localStorage.getItem('wish'))
        }
        this.props.startWishAction(data,email)
        this.props.getImagesAction(data)
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
    }
    handleAddToCartClick = (Succimg, Succtitle, SuccessQuantity)=>{
        this.props.AddToCartAction(Succimg, Succtitle, SuccessQuantity)
        document.getElementById('addsuccess').style.display = "block"
        let element = document.getElementById('addsuccess')
        Settime=()=>setTimeout(()=>{element.style.display ="none"},1000)
        this.timer=Settime()
    }
    handleDelClick = (CustomLabel)=>{
        const tempWish = JSON.parse(localStorage.getItem('wish')).filter((item,index)=>{
            return item.wish !== CustomLabel
        })
        localStorage.setItem('wish',JSON.stringify(tempWish))
        this.props.deleteWishAction(CustomLabel)
        let email = ''
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
          }
        else{
            email = '0'
        }
        setTimeout(()=>{    
            let data = []
                if(JSON.parse(localStorage.getItem('wish'))){
                    data = JSON.parse(localStorage.getItem('wish'))
                }
                else{
                    localStorage.setItem('wish','[]');
                    data = JSON.parse(localStorage.getItem('wish'))
                }
            this.props.startWishAction(data,email)
            this.props.getImagesAction(data)
        },500)
        
    }
}

const mapStateToProps = (state,props)=>{
    return {
        wishList:state.wishReducer.wishList,
        refresh:state.wishReducer.refresh,
        wishImages:state.wishReducer.wishImages,
        Succimg:state.wishReducer.Succimg,
        Succtitle:state.wishReducer.Succtitle,
        SuccessQuantity:state.wishReducer.SuccessQuantity,
        delWishSign:state.wishReducer.delWishSign,
        delWishReq:state.wishReducer.delWishReq
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        getImagesAction:bindActionCreators(actionCreator.getImagesAction,dispatch),
        AddToCartAction:bindActionCreators(actionCreator.AddToCartAction,dispatch),
        startWishAction:bindActionCreators(actionCreator.startWishAction,dispatch),
        deleteWishAction:bindActionCreators(actionCreator.deleteWishAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Wishlist)); 