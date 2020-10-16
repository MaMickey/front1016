import React, { Component } from 'react';
import Addressedit from './components/addressedit';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { actionCreator } from './store';
class index extends Component {
    render() {
        const {Address,suburbList,postcode,Pnumber} = this.props;
        // const from  = this.props.match.params.from;
        return(
            <div className="AddAddressWrapper">
        {
            suburbList.SubName?
                    <Addressedit Address={Address} 
                    postcode={postcode}
                    suburbList={suburbList}
                    handleFormSubmit={this.handleFormSubmit}
                    handlePostcodeChange={this.handlePostcodeChange}
                    handlePnumberChange= {this.handlePnumberChange}
                    />
               :null
        }
        </div>
        )
        
    }
    componentDidMount(){
        const from  = this.props.match.params.from;
        let email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
        if(from.slice(0,4) ==='edit'){
            let RN = from.slice(4);
            this.props.getEditAddressAction(RN)
            this.props.getEditSuburbAction(RN)
        }
        if(from ==='addnew'){
            this.props.getAddressAction(0)
            this.props.getSuburbAction(0)
        }
        document.querySelector('body').scrollTo(0,0)
    }
    componentWillUnmount(){
        this.props.emptyAddressAction();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.add_succ !==nextProps.add_succ){
            this.props.history.push('/account')
        }
    }
    handlePnumberChange=(e)=>{
        const value = e.target.value;
        this.props.setPnumberAction(value)
    }
    handleFormSubmit=(RN,e)=>{
        e.preventDefault()
        const data = new FormData(e.target)
        const formValue = {}
        for(let item of data.entries()){
            formValue[`${item[0]}`] = item[1]  
        }
        const from  = this.props.match.params.from;
        let email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
        if(from.slice(0,4) ==='edit'){
            this.props.editAddressAction(formValue,RN)
        }
        if(from ==='addnew'){
            this.props.submitAddressAction(formValue,email)
        }
        
        
    }
    handlePostcodeChange=(value)=>{
        this.props.changePostcodeAction(value)
    }
}
const mapStateToProps = (state)=>{
    return {
        add_succ:state.addressEditReducer.add_succ,
        Address:state.addressEditReducer.Address,
        suburbList:state.addressEditReducer.suburbList,
        postcode:state.addressEditReducer.postcode,
        Pnumber:state.addressEditReducer.Pnumber
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        submitAddressAction:bindActionCreators(actionCreator.submitAddressAction,dispatch),
        changePostcodeAction:bindActionCreators(actionCreator.changePostcodeAction,dispatch),
        getEditAddressAction:bindActionCreators(actionCreator.getEditAddressAction,dispatch),
        editAddressAction:bindActionCreators(actionCreator.editAddressAction,dispatch),
        getEditSuburbAction:bindActionCreators(actionCreator.getEditSuburbAction,dispatch),
        getAddressAction:bindActionCreators(actionCreator.getAddressAction,dispatch),
        getSuburbAction:bindActionCreators(actionCreator.getSuburbAction,dispatch),
        emptyAddressAction:bindActionCreators(actionCreator.emptyAddressAction,dispatch),
        setPnumberAction:bindActionCreators(actionCreator.setPnumberAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(index));