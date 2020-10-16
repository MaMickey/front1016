import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from "../store";

class koganAPI extends Component {
    render() {
        const {koganOrder,FetchkoganOrderMsg} = this.props;
        return (
            <div>
                <h2>KOGAN ORDER</h2>
                {
                    FetchkoganOrderMsg===''?null:<p>{FetchkoganOrderMsg}</p>
                }
                {
                    koganOrder.Status==='Complete'&&koganOrder.ResponseBody.length>0?<button id='saveorderBtn' onClick={this.handleClick}>Save to database</button>:null
                }
                <button id='saveorderBtn' onClick={this.handleClick}>Save to database</button>

            </div>
        );
    }
    componentDidMount(){
        // this.props.FetchNewOrderAction()
    }
    handleClick =()=>{
        const {koganOrder} = this.props
        let testkoganOrder = {
            "Status": "Complete",
            "PendingUri": null,
            "Errors": [
              {
                "ID": 1000,
                "ErrorCode": "Info",
                "Message": "string"
              }
            ],
            "ResponseBody": [
                {
                    "Currency": "string",
                    "ID": "4567",
                    "Items": [
                      {
                        "ID": "123",
                        "Quantity": 1,
                        "SellerSku": "string",
                        "UnitPrice": "12.5"
                      }
                    ],
                    "OrderDateUtc": "2020-09-23T04:29:39Z",
                    "OrderStatus": "ReleasedForShipment",
                    "TotalPrice": "18",
                    "TotalShippingPrice": "5.5",
                    "BuyerAddress": {
                      "AddressLine1": "string",
                      "AddressLine2": "string",
                      "City": "string",
                      "CompanyName": "string",
                      "Country": "string",
                      "DaytimePhone": "string",
                      "EmailAddress": "string",
                      "FirstName": "string",
                      "LastName": "string",
                      "PostalCode": "3145",
                      "StateOrProvince": "string"
                    },
                    "DeliverByDateUtc": "2020-09-23T04:29:39Z",
                    "ShippingAddress": {
                      "AddressLine1": "string",
                      "AddressLine2": "string",
                      "City": "string",
                      "CompanyName": "string",
                      "Country": "string",
                      "DaytimePhone": "string",
                      "EmailAddress": "string",
                      "FirstName": "string",
                      "LastName": "string",
                      "PostalCode": "3161",
                      "StateOrProvince": "string"
                    }
                  }
                ,
              {
                "Currency": "string",
                "ID": "777",
                "Items": [
                  {
                    "ID": "555",
                    "Quantity": 1,
                    "SellerSku": "string",
                    "UnitPrice": "12.5"
                  },
                  {
                    "ID": "666",
                    "Quantity": 1,
                    "SellerSku": "string",
                    "UnitPrice": "12.5"
                  }
                ],
                "OrderDateUtc": "2020-09-23T04:29:39Z",
                "OrderStatus": "ReleasedForShipment",
                "TotalPrice": "18",
                "TotalShippingPrice": "5.5",
                "BuyerAddress": {
                  "AddressLine1": "string",
                  "AddressLine2": "string",
                  "City": "string",
                  "CompanyName": "string",
                  "Country": "string",
                  "DaytimePhone": "string",
                  "EmailAddress": "string",
                  "FirstName": "string",
                  "LastName": "string",
                  "PostalCode": "3145",
                  "StateOrProvince": "string"
                },
                "DeliverByDateUtc": "2020-09-23T04:29:39Z",
                "ShippingAddress": {
                  "AddressLine1": "string",
                  "AddressLine2": "string",
                  "City": "string",
                  "CompanyName": "string",
                  "Country": "string",
                  "DaytimePhone": "string",
                  "EmailAddress": "string",
                  "FirstName": "string",
                  "LastName": "string",
                  "PostalCode": "3161",
                  "StateOrProvince": "string"
                }
              }
            ]
          }
        let koganArr = []
        for(let i=0;i<testkoganOrder.ResponseBody.length;i++){
            const {ID,Items,OrderDateUtc,OrderStatus,TotalPrice,TotalShippingPrice,BuyerAddress,ShippingAddress} = testkoganOrder.ResponseBody[i]
            const {AddressLine1,AddressLine2,City,CompanyName,Country,DaytimePhone,EmailAddress,FirstName,LastName,PostalCode,StateOrProvince} = BuyerAddress
            koganArr.push({
                'KoganID':ID,
                'PostToEmailAddress':ShippingAddress.EmailAddress,
                'PostToFirstName':ShippingAddress.FirstName,
                'PostToLastName':ShippingAddress.LastName,
                'PostToAddress1':ShippingAddress.AddressLine1,
                'PostToAddress2':ShippingAddress.AddressLine2,
                'PostToCity':ShippingAddress.City,
                'PostToState':ShippingAddress.StateOrProvince,
                'PostToPostCode':ShippingAddress.PostalCode,
                'PostToContactNumber':ShippingAddress.DaytimePhone,
                'ShippingPrice':TotalShippingPrice,
                'FinalPaidPrice':TotalPrice,
                'OrderDateTime':OrderDateUtc,
                'OrderStatus':OrderStatus,
                'BuyerEmailAddress':EmailAddress,
                'BuyerFirstName':FirstName,
                'BuyerLastName':LastName,
                'BuyerAddress1':AddressLine1,
                'BuyerAddress2':AddressLine2,
                'BuyerCity':City,
                'BuyerState':StateOrProvince,
                'BuyerPostCode':PostalCode,
                'BuyerContactNumber':DaytimePhone,
                'Items':Items
            })
    }
        this.props.saveKoganOrderAction(koganArr)
        document.getElementById('saveorderBtn').disabled = true;
    }
}
const mapStateToProps = state=>{
    return {
        koganOrder:state.adminReducer.koganOrder,
        FetchkoganOrderMsg:state.adminReducer.FetchkoganOrderMsg
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        // FetchNewOrderAction:bindActionCreators(actionCreator.FetchNewOrderAction,dispatch),
        saveKoganOrderAction:bindActionCreators(actionCreator.saveKoganOrderAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(koganAPI);