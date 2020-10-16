import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrownOpen as faFrownOpenRegular } from '@fortawesome/free-regular-svg-icons'
import ProductList from './components/productList';
import { bindActionCreators } from 'redux';
import {actionCreator} from '../product/store';
import {withRouter,Redirect} from 'react-router-dom';
import Backtop from '../../common/backtop';
import Loader from 'react-loader-spinner';
import './style.css';
import Vipswitch from './components/vipswitch';

var Settime = null;
var timer = null;


class Product extends Component {

    render() {
        const {productList,renderNotFound,productAmount,changePagi,page,wish,sort,priceType,images,productRequest,BLOBData, WebTitle,SuccessQuantity,vipChecked,theLevel} = this.props
        const {productInfo} = this.props;
        let aList = Object.keys(productList).map((key) => productList[key]);
        return (
          <Fragment>
          {
              renderNotFound ? (
                  ( 
                  <div>
                    {theLevel>0?
                  <div className="listHeaderWrapper">
                   <div className="container">
                    <div className="row align-items-center ">
                        <div className="col-lg-8 col-sm-7 col-md-8 col-10"></div>
                        <div className="VipDiv col-lg-4 col-sm-5 col-md-4 col-2">
                        <div className="vip">
                        <label className="float-left mt-2 mr-2 ml-6"><strong>VIP Offers</strong></label>
                         <Vipswitch vipChecked={vipChecked} handleVipClick={this.handleVipClick}/>
                       </div>
                          </div>
                          </div>
                       </div>
                       </div>:null
                    }
                       <div className="noResultIcon">
                       <FontAwesomeIcon icon={faFrownOpenRegular} />
                       </div>
                       <div className="noListHeader">
                        NO RESULTS FOUND
                       </div>
                      </div>
                      )
              ): <div>{   
                  aList.length > 0 ?(<Fragment> 
                   <div className="listHeaderWrapper">
                   <div className="container">
                    <div className="row align-items-center ">
                    <div className="sortBtnWrapper col-lg-5 col-xl-4 col-sm-8 col-md-5 col-5">
                      <div className="float-left sortBtnDiv">
                      <label className="mr-2"><strong>Sort By </strong></label>
                      <select id="sort" className="sort" onChange={this.handleChange} defaultValue={sort}>
                            {/* <option value={sort}>{sort}</option> */}
                            <option value="default">Alphabetically</option>
                            <option value="DESC">Price High to Low</option>
                            <option value="ASC">Price Low to High</option>  
                        </select>
                      </div>
                      </div>
                    
                      {
                      productAmount===1?
                      <div className="productListHeader col-lg-3 col-xl-4 col-sm-7 col-md-3 col-4 ">
                          1 RESULT FOUND
                      </div>: 
                      <div className="productListHeader col-lg-3 col-xl-4 col-sm-7 col-md-3 col-4 ">
                          {productAmount} RESULTS FOUND
                        </div>
                        }
                      <div className="VipDiv col-lg-4 col-sm-5 col-md-4 col-2">
                      {theLevel > 0?
                       <div className="vip">
                        <label className="float-left mt-2 mr-2 ml-6"><strong>VIP Offers</strong></label>
                         <Vipswitch vipChecked={vipChecked} handleVipClick={this.handleVipClick}/>
                       </div>:null}
                      </div>
                        <div className="card col-xl-2 col-lg-3 col-md-4 col-8 addSuccess" id="addsuccess" >
                        <div className="no-gutters successRow1">
                            <span className="img-wrap mr-3 col-5">
                              <img src={BLOBData} alt='' className="border img-sm cartSmall" />
                          </span>
                          <span className="col-6"><span className="title SuccessTitle">{WebTitle}</span></span>
                          <span className='col-5' />
                          <span className="SuccessQuantity col-6">Quantity: x{SuccessQuantity}</span>
                          <div>
                        </div>
                      </div>
                      <div className="no-gutters successRow2">
                        <div className="col-sm-12">Added Successfully!</div>
                      </div>
                    </div>
                      </div>
                  </div> 
                  </div>  
                  <ProductList productList={productList} productAmount={productAmount} changePagi={changePagi} page={page} handlePageClick={this.handlePageClick}
                  renderNewPagi = {this.renderNewPagi} renderNewPrePagi={this.renderNewPrePagi}
                  handleClick = {this.handleClickAddWish} wish={wish} priceType={priceType} handleAddToCartClick={this.handleAddToCartClick}
                  productRequest={productRequest} getImages={this.getImages} images={images}
                  />
                  </Fragment>):<div className="ListloaderWrap"><Loader
                  type="ThreeDots"
                  color="#5499c7"
                  height={300}
                  width={100}
                  timeout={9000}
                  className='Listloader'
                /></div>
              }</div>
          }
           <Backtop />
          </Fragment>     
        )    
    }
    shouldComponentUpdate(nextProps, nextState){
        return true
    }
    //page和url变化各种情况下的组件更新
    componentDidUpdate(prevProps) {
        if(this.props.match.params.product !== prevProps.match.params.product||this.props.match.params.page !== prevProps.match.params.page){
          const {emptyProductListAction,vipChecked} = this.props;
          const product = this.props.match.params.product;
          const number = this.props.match.params.page;
          emptyProductListAction();
          if(JSON.parse(sessionStorage.getItem('userInfo'))){
            let email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
            this.props.loadProductAction(product,number,this.props.sort,email,vipChecked)
          }
          else{
            this.props.loadProductAction(product,number,this.props.sort,0,false)
          }
        //   this.props.emptyPage();
        //   searchAction(product,number);
            // this.props.searchPAction(product,number)

        }
      }
    componentDidMount(){
        const product = this.props.match.params.product;
        const {vipChecked} = this.props;
        const number = 1
        // searchAction(product,number);
        // this.props.searchPAction(product,number)
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            let email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
            this.props.loadProductAction(product,number,this.props.sort,email,vipChecked)
          }
          else{
            this.props.loadProductAction(product,number,this.props.sort,0,false)  
          }
          // document.querySelector('body').scrollTo(0,0)
    }
    componentWillUnmount(){
        this.props.emptyPage();
        this.props.emptyProductListAction();
        // this.props.emptyText();
        clearTimeout(this.timer)
    }
    getImages = (label)=>{
        this.props.getImagesAction(label)
    }
    handleAddToCartClick=(BLOBData, WebTitle,SuccessQuantity)=>{
        this.props.addToCartAction(BLOBData, WebTitle,SuccessQuantity);
        document.getElementById('addsuccess').style.display = "block"
        let element = document.getElementById('addsuccess')
        Settime=()=>setTimeout(()=>{element.style.display ="none"},1000)
        this.timer=Settime()
    }
    handleChange = (e)=>{
        const {vipChecked} = this.props;
        const value = e.target.value;
        this.props.sortAction(value);
        const product = this.props.match.params.product;
        const number = 1
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            let email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
            this.props.loadProductAction(product,number,value,email,vipChecked)
          }
          else{
            this.props.loadProductAction(product,number,value,0,false)
          }
    }
    renderNewPagi = (page)=>{
        this.props.changePagiAction(page)
    }
    renderNewPrePagi = (page)=>{
      this.props.changePrePagiAction(page)
    }
    handlePageClick = (index)=>{
        const {vipChecked} = this.props;
        window.scroll(0,0)
        this.props.emptyProductListAction();
        const product = this.props.match.params.product;
        // this.props.searchPAction(product,index)
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            let email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
            this.props.loadProductAction(product,index,this.props.sort,email,vipChecked)
            if(this.props.productRequest === 'true'){

            }
          }
          else{
            this.props.loadProductAction(product,index,this.props.sort,0,false)
            if(this.props.productRequest === 'true'){
                
            }
          }
    }
    handleClickAddWish = (productInfo)=>{
        this.props.AddToWishAction(productInfo)
    }
    handleVipClick = () =>{
      const {vipChecked } = this.props;
      this.props.vipClickAction()
      const product = this.props.match.params.product;
      const number = 1
      if(JSON.parse(sessionStorage.getItem('userInfo'))){
        let email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
        this.props.loadProductAction(product,number,this.props.sort,email,!vipChecked)
      }
      else{
        this.props.loadProductAction(product,number,this.props.sort,0,false)  
      }
    }

}

const mapStateToProps = (state,props) =>{
    return{
    productRequest:state.productReducer.productRequest,
    images:state.productReducer.images,
    page:state.productReducer.page,
    sort:state.productReducer.sort,
    wish: state.productReducer.wish,
    productList:state.productReducer.productList,
    renderNotFound:state.productReducer.renderNotFound,
    productAmount:state.productReducer.productAmount,
    priceType:state.productReducer.priceType,
    productInfo:state.productReducer.productInfo,
    BLOBData: state.productReducer.BLOBData,
    WebTitle: state.productReducer.WebTitle,
    SuccessQuantity:state.productReducer.SuccessQuantity,
    vipChecked: state.productReducer.vipChecked,
    theLevel:state.headerReducer.theLevel,
    changePagi:state.productReducer.changePagi
    }
};
const mapDispatchToProps = (dispatch) =>({
    changePrePagiAction:bindActionCreators(actionCreator.changePrePagiAction,dispatch),
    changePagiAction:bindActionCreators(actionCreator.changePagiAction,dispatch),
    getImagesAction:bindActionCreators(actionCreator.getImagesAction,dispatch),
    loadProductAction:bindActionCreators(actionCreator.loadProductAction,dispatch),
    addToCartAction:bindActionCreators(actionCreator.addToCartAction,dispatch),
    emptyPage:bindActionCreators(actionCreator.emptyPage,dispatch),
    emptyProductListAction:bindActionCreators  (actionCreator.emptyProductListAction,dispatch),
    AddToWishAction:bindActionCreators(actionCreator.AddToWishAction,dispatch),
    sortAction:bindActionCreators(actionCreator.sortAction,dispatch),
    vipClickAction: bindActionCreators(actionCreator.vipClickAction, dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Product)); 