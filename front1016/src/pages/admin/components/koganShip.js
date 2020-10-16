import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from "../store";

class koganShip extends Component {
    render() {
        const {trackInfo,changeStatus,msg,msgReq} = this.props
        let tempData = trackInfo.slice()
        let finalData = []
        if(trackInfo.length>0){
            tempData[1].map((item,index)=>{
                let arr = []
                let obj = {}
                finalData.push([])
                for(let i =0;i<tempData[0].length;i++){
                    if(tempData[0][i].SRN===item.SRN){
                        arr.push({
                            'OrderItemID':tempData[0][i].KoganID,
                            'SellerSku':tempData[0][i].CustomLabel,
                            'Quantity':tempData[0][i].Quantity,
                            // 'SRN':tempData[0][i].SRN,
                            'ShippingCarrier':item.BestCourier,
                            'ShippedDateUtc':item['Posted on Date'],
                            'TrackingNumber':item.TrackingNo
                        })
                    }   
                }
                obj = {
                    'ID':'',
                    'Items':arr,
                }
                finalData[index].push(obj)  
                for(let j=0;j<tempData[2].length;j++){
                    if(tempData[2][j].SRN===item.SRN){
                        finalData[index][0].ID=tempData[2][j].ID
                    }
                }
            })    
        }
        return (
            <div>
                {
                    trackInfo.length>0?
                    <Fragment>
                                <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">TrackingNo</th>
                                    <th scope="col">BestCourier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                            finalData.map((item,index)=>(
                                    <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td>{item[0].ID}</td>
                                    <td>{item[0].Items[0].TrackingNumber}</td>
                                    <td>{item[0].Items[0].ShippingCarrier}</td>
                                    </tr>
                                       ))
                                    }
                                </tbody>
                                </table>
                        <button onClick={this.handleKoganClick.bind(this,finalData)} >Confirm Send To Kogan</button>
                        {
                            changeStatus ?<button onClick={this.handleChangeShipStatusClick.bind(this,finalData)}>Change database status to Shipped</button>:null
                        }
                        {
                            msgReq?<div>{msg}</div>:null
                        }
                    </Fragment>:<h3>Currently, No Tracking info need to be sent to Kogan ~~</h3>
                }
            </div>
        );
    }
    componentDidMount(){
        this.props.getHBorderAction()
    }
    componentWillUnmount(){
        this.props.emptyStateAction()
    }
    handleKoganClick(finalData){
        // console.log('finalData',finalData)
        let resultArr = []
        finalData.map((item,index)=>{
            let obj = {
                "ID":item[0].ID,
                "Items":item[0].Items
            }
            resultArr.push(obj)
        })
        this.props.handleKoganClickAction(resultArr)
    }
    handleChangeShipStatusClick(finalData){
        const {sendTrackToKoganRes} = this.props
        let idArr = []
        if(sendTrackToKoganRes.Status==="CompleteWithErrors"){
            for(let i=0;i<sendTrackToKoganRes.ResponseBody.length;i++){
                let tempID = sendTrackToKoganRes.ResponseBody[i].ID.split('_')
                idArr.push(tempID[tempID.length-1])
            }
            this.props.changeShipStatusAction(idArr)
        }
        
    }
}
const mapStateToProps =state=>{
    return{
        trackInfo:state.adminReducer.trackInfo,
        changeStatus:state.adminReducer.changeStatus,
        sendTrackToKoganRes:state.adminReducer.sendTrackToKoganRes,
        msg:state.adminReducer.msg,
        msgReq:state.adminReducer.msgReq
    }
}
const mapDispatchToProps =dispatch=>{
    return {
        getHBorderAction:bindActionCreators(actionCreator.getHBorderAction,dispatch),
        handleKoganClickAction:bindActionCreators(actionCreator.handleKoganClickAction,dispatch),
        changeShipStatusAction:bindActionCreators(actionCreator.changeShipStatusAction,dispatch),
        emptyStateAction:bindActionCreators(actionCreator.emptyStateAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(koganShip);