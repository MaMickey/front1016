import React, { Component } from 'react';
import './style.css';
import {Link,withRouter} from 'react-router-dom';
import { faArrowRight, faArrowLeft, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class index extends Component {

    render() {
        const {productAmount,page,changePagi} = this.props;
        const pageNum = Math.ceil(productAmount / 20);
        let pageArr = []
        for(let i=0;i<pageNum;i++){
            pageArr.push(1)
        }
        let prePIdx = 0
        if((page-1)%5===0){
            prePIdx = parseInt(page)-1
        }
        else{
            for(let i =0;i<pageNum;i++){
                let intPage = parseInt(page)
                if((intPage-i)%6===0){
                    prePIdx = parseInt(intPage)-i-1
                    break
                }
            }      
        }  
        pageArr = pageArr.slice(parseInt(changePagi),parseInt(changePagi)+5)
        return (
            <div className="pagination-wrapper m-2">
                <div className="pagination">
                <span className="pagination-title"> 
                {page<pageNum? (<span>Showing {20*page} of {productAmount}</span>): (<span>Showing {productAmount} of {productAmount}</span>)}
                </span>
                {
                    page<=5?null: <Link id='aLink' to={`/products/${this.props.match.params.product}/${prePIdx}`}><button className="btn btn-responsive btn-primary float-left mr-1" onClick={this.prev5Pages}><FontAwesomeIcon icon={faArrowLeft} /> 5 Pages</button></Link>
                }
                 {
                     parseInt(page)!== 1? <Link  id='aLink' to={`/products/${this.props.match.params.product}/${parseInt(page)-1}`}><button className="btn btn-responsive btn-outline-light float-left mr-1" onClick={this.handlePreClick}><FontAwesomeIcon icon={faChevronLeft} /></button></Link>:null
                 }  
                    {
                        pageArr.map((item,index)=>{
                         return parseInt(changePagi)+index === page-1?(<Link 
                            id='aLink' key={index} to={`/products/${this.props.match.params.product}/${parseInt(changePagi)+index+1}`}><button  className="btn btn-responsive btn-light active"
                            onClick={this.handlePageClick.bind(this, parseInt(changePagi)+index+1)}>{parseInt(changePagi)+index+1}</button></Link>):(<Link id='aLink' key={index} to={`/products/${this.props.match.params.product}/${parseInt(changePagi)+index+1}`}>
                            <button className="btn btn-responsive btn-light ml-1" onClick={this.handlePageClick.bind(this, parseInt(changePagi)+index+1)}>{parseInt(changePagi)+index+1}</button></Link>)
                        })
                    }
                    {
                        parseInt(pageNum)>parseInt(page)+1? <Link id='aLink' to={`/products/${this.props.match.params.product}/${parseInt(page)+1}`}><button className="btn btn-responsive btn-outline-light mr-1 ml-1" onClick={this.handleForwardClick}><FontAwesomeIcon icon={faChevronRight} /></button></Link>:null
                    }
                    {
                       pageNum-5<page?null:<Link id='aLink' to={`/products/${this.props.match.params.product}/${parseInt(page)+5}`}><button className="btn btn-responsive btn-primary mr-1" onClick={this.next5Pages}><FontAwesomeIcon icon={faArrowRight} /> 5 Pages</button></Link>
                    }
                </div>
            </div>
        );
    }
    handlePageClick = (index)=>{
        this.props.handlePageClick(index)    
    }
    handlePreClick = ()=>{
        const {page} = this.props
        if(page>1){
            if((page-1)%5===0){
                this.props.renderNewPrePagi(page);
            }
            this.props.handlePageClick(parseInt(page)-1) 
        } 
    }
    prev5Pages = ()=>{
        const {page,productAmount} = this.props
        const pageNum = Math.ceil(productAmount / 20);
        if((page-1)%5===0){
            this.props.renderNewPrePagi(page);
            this.props.handlePageClick(parseInt(page)-1) 
        }
        else{
            for(let i =0;i<pageNum;i++){
                let intPage = parseInt(page)
                // console.log(intPage+i,(intPage+i)%5,'here',pageNum)
                if((intPage-i)%6===0){
                    this.props.renderNewPrePagi(intPage-i);
                    this.props.handlePageClick(parseInt(intPage)-i-1) 
                    break
                }
            }      
        }  
    }
    next5Pages = ()=>{
        const {page,productAmount} = this.props
        const pageNum = Math.ceil(productAmount / 20);
        if(page%5===0){
            this.props.renderNewPagi(page);
            this.props.handlePageClick(parseInt(page)+1) 
        }
        else{
            for(let i =0;i<pageNum;i++){
                let intPage = parseInt(page)
                // console.log(intPage+i,(intPage+i)%5,'here',pageNum)
                if((intPage+i)%5===0){
                    this.props.renderNewPagi(intPage+i);
                    this.props.handlePageClick(parseInt(intPage)+i+1) 
                    break
                }
            }      
        }    
    }
    handleForwardClick = ()=>{
        const {page,productAmount} = this.props
        const pageNum = Math.ceil(productAmount / 20);
        if(parseInt(pageNum)>parseInt(page)+1){
            if(page%5===0){
                this.props.renderNewPagi(page);
            }
            this.props.handlePageClick(parseInt(page)+1) 
        }
    }
}

export default withRouter(index);