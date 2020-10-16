import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from "../store";
class operation extends Component {
    render() {
        const {thres_msg} = this.props
        return (
            <div>
                <label htmlFor="threshold">set a value to make all the products which stock &lt; value doesn't show on the website</label>
                <input placeholder="set stock threshold" id="threshold" onChange={this.handleChange} type="number"/>
                <button onClick={this.handleClick}>Confirm</button>
                {
                    thres_msg?thres_msg.msg:null
                }
            </div>
        );
    }
    handleClick = ()=>{
        const {inputValue} = this.props;
        if(inputValue){
            if(inputValue>0){
                this.props.setThresholdAction(inputValue)
            }
        }
        
    }
    handleChange = (e)=>{
        const value = e.target.value;
        this.props.handleChangeAction(value);
    }
}
const mapStateToProps = (state)=>{
    return {
        inputValue:state.adminReducer.input,
        thres_msg:state.adminReducer.thres_msg
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        handleChangeAction:bindActionCreators(actionCreator.handleChangeAction,dispatch),
        setThresholdAction:bindActionCreators(actionCreator.setThresholdAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(operation);