import React, { Component } from 'react';
import './style.css';
import {connect} from 'react-redux';
import {actionCreator} from './store';
import {bindActionCreators} from 'redux';
class index extends Component {
    
    render() {
        const {order,inputValue,finalResult} = this.props;
        // console.log(finalResult,order);
        return (
            <div className="wrapper">
                <label htmlFor="postid">OrderGuid:</label>
                <input id="postid" placeholder="orderguid" className="input" value={inputValue} onChange = {this.handleChange}/>
                <button onClick={this.handleClick}>Submit</button>
                {finalResult.length > 0?<div>{
                    finalResult.map((item,index)=>{
                        return(
                            <div key={index}>
                            <div>{item.displayName}</div>
                            <div>{item.amount}</div>
                            </div>
                        )
                    })
                }</div>
                :null}
            </div>
        );
    }
    componentDidUpdate(prevProps){
        if(prevProps.order !== this.props.order){
            this.props.calculateAction(this.props.order)
        }
    }
    handleChange=(e)=>{
        const value = e.target.value
        this.props.handleChangeAction(value);
    }
    handleClick = ()=>{
        const {inputValue} = this.props;
        this.props.submitAction(inputValue)
    }
    // handleCalculate = ()=>{
    //     this.props.calculateAction(this.props.order)
    // }
}
const mapStateToProps = (state)=>{
    return {
        inputValue:state.calpostageReducer.inputValue,
        order:state.calpostageReducer.order,
        finalResult:state.calpostageReducer.finalResult
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        handleChangeAction:bindActionCreators(actionCreator.handleChangeAction,dispatch),
        submitAction:bindActionCreators(actionCreator.submitAction,dispatch),
        calculateAction:bindActionCreators(actionCreator.calculateAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(index);