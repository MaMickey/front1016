import React, { Fragment }  from "react";
import "./style.css";
import * as XLSX from "xlsx";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from "./store";
import Uploadcsv from './components/uploadcsv';
import Operation from './components/operation';
import Navigation from './components/navigation';
import KoganAPI from './components/koganAPI';
import KoganShip from './components/koganShip';
class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: "",

    };
  }

  // handleClick(e) {
  //   this.refs.fileUploader.click();
  // }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    // console.log('a',file);
    this.setState({ file });

    // console.log('b',this.state.file);
  }

  readFile() {
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      // console.log("Data>>>" + data);// shows that excel data is read
      // console.log(this.convertToJson(data)); // shows data in json format
      this.convertToJson(data)
    };
    reader.readAsBinaryString(f);
  }

  convertToJson(csv) {
    var lines = csv.split("\n");
    var result = [];
    // lines[0][-1] = [lines[0][-1] ]
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length-1; i++) {
      // lines[i]
      var obj = {};
      var currentline = lines[i].split(",");
      for(let k =0;k<currentline.length;k++){  
        if(k>5){
      currentline[5]=currentline[5]+currentline[k]
        }
      }
      //62
      currentline = currentline.slice(0,6)
      for (var j = 0; j < headers.length; j++) {
        if(j === headers.length-1){}
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    //return result; //JavaScript object

    // for(let q = 0;q<result.length;q++){
    //   let results = result.slice(q,q+1)
    //   this.props.putawayAction(results)
    // }
    // let results = result.slice(0,1)
    // this.props.putawayAction(result)

    return JSON.stringify(result); //JSON
  }
  render() {
    const {msg,customerLevel,option1,option2,option3,option4} = this.props;
    console.log(customerLevel)
    if(sessionStorage.getItem('isLogin') === 'true'){
      if(customerLevel === '6'){
        return (
          <Fragment>
            <div className="admin-wrapper">
            <div className='row'>
            <div className="admin-left col-3">
              <Navigation handleOption1Click={this.handleOption1Click}
                          handleOption2Click={this.handleOption2Click}
                          handleOption3Click={this.handleOption3Click}
                          handleOption4Click={this.handleOption4Click}
              />
            </div>
               {/* <div>
                  <input
                    type="file"
                    id="file"
                    ref="fileUploader"
                    onChange={this.filePathset.bind(this)}
                  />
                  <button
                    onClick={() => {
                      this.readFile();
                    }}
                  >
                    putaway
                  </button>
                  <div>
                    {
                      msg !==''?msg:null
                    }
                  </div>
                </div> */}
              
          <div className='admin-center col-7'>
          {
            option1===false&&option2===false&&option3===false&&option4===false?<h1>WELCOME TO XINSPORTS</h1>:null
          }
          {
            option2 ===true? <Uploadcsv />:null
          }
          {
            option1===true?<Operation />:null
          }
          {
            option3===true?<KoganAPI />:null
          }
          {
            option4===true?<KoganShip />:null
          }
          </div>
          <div className='admin-right col2'></div>
          </div>
          </div>
       </Fragment>
      );
      }else{
        return (<div><Link to="/" /></div>)
      }
    }else{
      return (<div><Link to="/" /></div>)
    }
    
  }
  componentDidMount(){
    let email = ''
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
          }
        else{
            email = '0'
        }
     this.props.getUserLevelAction(email)
  }
  handleOption1Click=()=>{
    this.props.Option1ClickAction()
  }
  handleOption2Click=()=>{
    this.props.Option2ClickAction()
  }
  handleOption3Click=()=>{
    this.props.Option3ClickAction()
  }
  handleOption4Click=()=>{
    this.props.Option4ClickAction()
  }
}

const mapStateToProps = (state) =>{
  return {
    msg:state.adminReducer.putaway,
    customerLevel:state.adminReducer.customerLevel,
    option1:state.adminReducer.option1,
    option2:state.adminReducer.option2,
    option3:state.adminReducer.option3,
    option4:state.adminReducer.option4,
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    getUserLevelAction:bindActionCreators(actionCreator.getUserLevelAction,dispatch),
    putawayAction:bindActionCreators(actionCreator.putawayAction,dispatch),
    Option1ClickAction:bindActionCreators(actionCreator.Option1ClickAction,dispatch),
    Option2ClickAction:bindActionCreators(actionCreator.Option2ClickAction,dispatch),
    Option3ClickAction:bindActionCreators(actionCreator.Option3ClickAction,dispatch),Option4ClickAction:bindActionCreators(actionCreator.Option4ClickAction,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ExcelToJson);