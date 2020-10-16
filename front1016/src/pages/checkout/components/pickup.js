import React, { Component ,Fragment} from 'react';
import {connect} from 'react-redux';
import '../style.css';
import {Nav} from 'react-bootstrap';

class pickup extends Component {
    render() {
        const {userTempInfo} = this.props;
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd
        let momentBusinessDays = require("moment-business-days");
        let businessday = []
        for(let i=1;i<=5;i++){
        let nextday = momentBusinessDays(today, 'YYYY-MM-DD').businessAdd(i)._d
        let dd = String(nextday.getDate()).padStart(2, '0');
        let mm = String(nextday.getMonth() + 1).padStart(2, '0'); 
        let yyyy = nextday.getFullYear();
        let weekday = String(nextday).slice(0,3)
        nextday = yyyy + '-' + mm + '-' + dd + ' ' + weekday
        businessday.push(nextday)
        }
        return (
            <div>
                {
                <Fragment>
                <div className="form-row">
                <div className="col-lg-4 col-6 form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder=""  name="Fname"  required defaultValue={userTempInfo.shipToFirstName}/>
                </div> 
                <div className="col-lg-4 col-6 form-group">
                    <label>Last name</label>
                      <input type="text" className="form-control" placeholder=""  name="Lname"  required defaultValue={userTempInfo.shipToLastName}/>
                </div> 
                <div className="col-lg-4 col-12 form-group">
                <label>Contact number</label>
                <input type="number"  className="form-control"
                // pattern="^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$" 
                name="Pnumber" required defaultValue={userTempInfo.ShipToContactNumber}>
                </input>
            </div>
            </div>
            {
            businessday.map((data,index)=>
            (
              <div className="form-check col-10 form-group" key={index}>
              <input className="form-check-input" type="radio" name="exampleRadios" id={'exampleRadios'+(index+ 1)} value={"option"+(index+ 1)} required/>
              <label className="form-check-label" htmlFor={"exampleRadios"+(index+ 1)}>
                {data}, 10:00AM - 16:00PM
              </label>
              </div> 
            )
           )}
           <div className="form-row">
                <div className="col-10 form-group">
                <p className="businessHint">*Except for all public holidays</p >
                </div>
            </div>
            <div className="form-row">
                <div className="col-10 form-group">
                    <h6 className="text-muted">Pick up address</h6>
                     <h6>
                        Stadium Sports Sunshine <br/>
                        61 Technology Drive,
                        Sunshine West, VIC, 3020</h6>
                </div> 
            </div> 
       
            <h6 className="text-muted">Payment methods</h6>
            <div className="form-check col-10 form-group">
            <input className="form-check-input" type="radio" name="payRadios" id="exampleRadios01" value='cash' onChange={this.handleCashChecked} required/>
            <label className="form-check-label" htmlFor="exampleRadios01">
              Pay in cash when you pick up
            </label>
            </div>
            <div className="form-check col-10 form-group">
            <input className="form-check-input" type="radio" name="payRadios" id="exampleRadios02" value="" onChange={this.handleOnlineChecked}/>
            <label className="form-check-label" htmlFor="exampleRadios02">
              Process to online payment
            </label>
            </div>

            <div className="form-row">
            <div className="form-group col-10 col-lg-10 col-md-10">
              <button className="btn btn-primary confirmBtn" type="submit">Confirm</button>
              </div>
            </div>
            </Fragment>
            }
            </div>
        );
    }
    handleCashChecked = (e) =>{
        this.props.handleCashChecked(e);
      }
    handleOnlineChecked = (e) =>{
    this.props.handleOnlineChecked(e);
    }
}

export default pickup;