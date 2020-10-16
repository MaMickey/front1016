import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import ProductItem from './productItem';
import '../style.css';
import Pagination from '../../pagination'
class ProductList extends PureComponent{
    render(){
        const {productList,productAmount,page,wish,priceType,images,changePagi} = this.props;
        // let productListcopy = productList.slice();
        // if(images.length>0){
        //     productListcopy.map((item,index)=>{
        //         for(let i=0;i<images.length;i++){
        //             if(images[i].CustomLabel.toLowerCase()===item.CustomLabel.toLowerCase()){
        //                 item['BLOBData'] = images[i].BLOBData
        //             }
        //         }
        //     })
        // }
        return (
            <Fragment>
                    <div><div className="productListWrapper">
                    <div className="row">
                    {
                    productList.map((item,index)=>{
                        return <ProductItem key={index} data={item} handleClick={this.props.handleClick} wish={wish} priceType={priceType}
                        handleAddToCartClick={this.props.handleAddToCartClick} 
                        />
                    })
                    }
                </div>
                </div>
                <Pagination changePagi={changePagi} productAmount={productAmount} page={page}
                 handlePageClick={this.props.handlePageClick} renderNewPagi={this.props.renderNewPagi} renderNewPrePagi={this.props.renderNewPrePagi}/></div>
                
            </Fragment>
        )
    }
    componentDidUpdate(){
        if(this.props.productRequest === true){
            let labelArr = []
            this.props.productList.map((item,index)=>{
                labelArr.push(item.CustomLabel)
            })
            this.props.getImages(labelArr)
        }
    }
    componentDidMount(){
        if(this.props.productRequest === true){
            let labelArr = []
            this.props.productList.map((item,index)=>{
                labelArr.push(item.CustomLabel)
            })
            this.props.getImages(labelArr)
        }
    }
    // handleClick = (data)=>{
    //     this.props.handleClick(data)
    // }
}
export default connect(null,null)(ProductList);