import React, { Component ,Fragment} from 'react';
import '../style.css';
class delivery extends Component {
    render() {
        const {userTempInfo,doPayment,changeAddress,CityList,postcode,pickupChecked} = this.props
        return (
            <div>
                <Fragment>
                {
                pickupChecked?null:<Fragment>
                <h6 className="text-muted ml-1">Register address</h6>
                </Fragment>}
                {userTempInfo.map((item,index)=>(
                (
                    item.AddressType==='R'?
                    <div className="card mb-4" key={item.RN} id={"thecard"+(index+1)}>
                    <div className="card-body">
                <div className="col-12">
                    <div>Name: {item.FirstName} {item.LastName}</div>
                </div> 
                <div className="col-lg-12 d-md-none d-lg-block d-none">
                    <div>Contact number: {item.ContactNumber} </div>
                </div> 
                <div className="col-12 col-md-12  d-lg-none d-block d-md-block">
                    <div>Contact number:</div>
                    <div>{item.ContactNumber} </div>
                </div> 
                <div className="col-lg-12 d-md-none d-lg-block d-none">
                    <div>Post to address: {item.Address1},  {item.City}, {item.State}, {item.Postcode}, Australia {item.Address2?'('+ item.Address2 + ')':null}</div>
                </div> 
                
                <div className="col-md-12 col-12 d-md-none d-md-block d-lg-none d-block">
                    <div>Post to address:</div>
                    <div>{item.Address1},  {item.City}, {item.State}, {item.Postcode}, Australia {item.Address2?'('+ item.Address2 + ')':null}</div>
                </div> 
                <div className="col-12 mt-1">
                <button className="btn btn-primary btn-sm defaultAddressBtn" id="defaultAddressBtn" onClick={this.handleAddressClick.bind(this,item,index)}>Post to this address</button>
                </div></div></div>:null
                )
                ))}
                {userTempInfo.length>1?
                <Fragment>
                <h6 className="text-muted ml-1">Post to address</h6>
                <div className="scroller">
                  <div className="mb-4 row ml-1">
                {
                  userTempInfo.map((item,index)=>(
                    item.AddressType==='P'?<Fragment key={item.RN}>
                    <div className="card col-lg-3 col-md-5 col-10 m-2"  id={"thecard"+(index+1)}>
                    <div className="card-body">
                      <strong className="d-inline-block col-10">Post to address{index}</strong>
                  <div className="col-12">
                    <div>Name: {item.FirstName} {item.LastName}</div>
                  </div> 
                  <div className="col-lg-12 d-md-none d-lg-block d-none">
                    <div>Contact number: {item.ContactNumber} </div>
                  </div> 
                  <div className="col-12 col-md-12  d-lg-none d-block d-md-block">
                    <div>Contact number:</div>
                    <div>{item.ContactNumber} </div>
                  </div> 
                  <div className="col-lg-12 d-md-none d-lg-block d-none">
                    <div>Post to address: {item.Address1},  {item.City}, {item.State}, {item.Postcode}, Australia {item.Address2?'('+ item.Address2 + ')':null}</div>
                  </div> 
                  
                  <div className="col-md-12 col-12 d-md-none d-md-block d-lg-none d-block">
                    <div>Post to address:</div>
                    <div>{item.Address1},  {item.City}, {item.State}, {item.Postcode}, Australia {item.Address2?'('+ item.Address2 + ')':null}</div>
                  </div> 
                  <div className="col-12 mt-1">
                  <button className="btn btn-primary btn-sm defaultAddressBtn" id="defaultAddressBtn" onClick={this.handleAddressClick.bind(this,item,index)}>Post to this address</button>
                  </div></div></div></Fragment>:null
                  ))
                }
                </div>
                </div></Fragment>:null}
                {
                  doPayment?null:<div className="form-row ml-2">
                  <input type="checkbox" value='' id="checkbox1" className="checkbox" onChange={this.pickAddressChange}></input>
                  <h6 htmlFor="checkbox1" className="d-inline-block text-muted col-10 mb-2">Use a new address</h6>
                  </div>
                }
                 {
                  changeAddress?<Fragment>
                     <form onSubmit={this.props.handleSubmit} id='deliveryForm' className="ml-3">   
                    <div className="form-row">
                    <div className="col-5 form-group">
                        <label>First name</label>
                          <input type="text" className="form-control" placeholder=""  name="Fname" id="Fname" required/>
                    </div> 
                    <div className="col-5 form-group">
                        <label>Last name</label>
                          <input type="text" className="form-control" placeholder=""  name="Lname" id="Lname" required/>
                    </div> 
                    </div>
                    <div className="form-row">
                    <div className="col-10 form-group">
                        <label>Contact number</label>
                        <input type="number"  className="form-control" id="Pnumber" 
                        // pattern="^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$" 
                        name="Pnumber" required>
                        </input>
                    </div>
                    </div> 
                    <div className="form-row">
                    <div className="col-10 form-group">
                        <label>Post to address</label>
                        <input type="text" className="form-control" placeholder="" id="address" name="address"  required/>
                    </div> 
                    </div>
                    <div className="form-row">
                    <div className="col-10 form-group">
                        <label>Additional address information (Optional)</label>
                        <input type="text" className="form-control" id="Oaddress" placeholder=""  name="Oaddress"/>
                    </div> 
                    </div>
                    <div className="form-row">
                    <div className="form-group col-5">
                      <label>Postcode</label>
                          <input type="text" className="form-control" placeholder=""  name="postcode" onChange={this.handlePostCode} id="postcode" required/>
                          {
                          CityList[0] === 'does not exist'&&postcode!==''?<div className="form-text accHint">postcode does not exist!</div>:null
                          }
                      </div>
                      <div className="form-group col-5">
                        <label>State</label>
                        <select id="inputState" className="form-control"  name="state" onChange={this.handleStateChange} required>
                            <option value={userTempInfo.shipToState} >{userTempInfo.shipToState} </option>
                            <option value="ACT">ACT</option>
                            <option value="VIC">VIC</option>
                            <option value="NSW">NSW</option>
                            <option value="NT">NT</option>
                            <option value="QLD">QLD</option>
                            <option value="SA">SA</option>
                            <option value="TAS">TAS</option>
                            <option value="WA">WA</option>
                        </select>
                      </div> 
                  </div> 
                  <div className="form-row">
                  <div className="form-group col-10 col-lg-5 col-md-10">
                        <label>Suburb</label>
                        {
                          CityList[0] === 'does not exist'?<select id="inputSuburb" className="form-control"  name="city" required>
                          <option value='' >does not exist</option>
                          
                      </select>:<select id="inputSuburb" className="form-control"  name="city" onChange={this.handleSuburbChange} required>
                      {/* userTempInfo.PostCode !== this.props.postcode&& */}
                      {
                        this.props.postcode===''?<option value={userTempInfo.shipToCity}>{userTempInfo.shipToCity}</option>:null
                      }    
                      {
                          CityList.map((item,index)=>(
                              <option value={item} key={index}>{item}</option>
                          ))
                      }  
                      </select>
                        }
                      </div> 
                      <div className="form-group col-10 col-lg-5 col-md-10">
                        <label>Country</label>
                        <select id="inputCountry" className="form-control"  name="country" required >
                          {/* <option> Choose...</option> */}
                            <option value="Australia">Australia</option>   
                        </select>
                      </div> 
                  </div> 
                  <div className="form-row">
                    <div className="form-group col-10 col-lg-10 col-md-10">
                      <button className="btn btn-primary confirmBtn" type="submit">Confirm</button>
                    </div>
                  </div> 
                  </form>
                  </Fragment>:null
                 }
               
            </Fragment>
            </div>
        );
    }
    handleAddressClick = (item, index)=>{
        // this.props.handleSubmit(item);
        document.getElementById('checkbox2').disabled = true;
        document.getElementById('checkbox1').disabled = true;
        let btn = document.getElementsByClassName('btn btn-primary btn-sm defaultAddressBtn')
        for (var i = 0; i < btn.length; i++) {
          btn.item(i).disabled = true;
         }
         this.props.handleAddressClick(item)
         document.getElementById('thecard'+ (index+1)).style.background = '#f5f5f5e7';
         document.getElementById('thecard'+ (index+1)).style.border = '2px solid rgba(80, 126, 238, 0.5)';
      }
    handleSuburbChange = (e) =>{
        this.props.handleSuburbChange(e);
    }
    handleStateChange = (e) =>{
        const value = e.target.value
        this.props.handleStateChange(value);
        //   document.querySelector('#inputState').addEventListener('change',function(){
        //     this.props.handleStateChange(document.querySelector('#inputState').value);
        // });
    }
    handlePostCode = (e)=>{
        this.props.handlePostCode(e.target.value);
      }
    pickAddressChange=(e)=>{
        this.props.pickAddressChange(e);
      }
}

export default delivery;