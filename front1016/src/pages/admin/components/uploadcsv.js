import React, { Component, Fragment } from 'react';
import CSVReader from 'react-csv-reader';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from "../store";
class uploadcsv extends Component {
    render() {
        const {webOn,fileName,fillResult} = this.props
        let tempFileName = []
        for(let i=0;i<fileName.length;i++){
            if(tempFileName.length===0){
                tempFileName.push(fileName[i])
            }  
            else{
                for(let j in tempFileName){   
                    if(j!==fileName[i]){
                        tempFileName.push(fileName[i])
                    }
                }
            }    
        }
        const papaparseOptions = {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header =>
              header
                .toLowerCase()
                .replace(/\W/g, '_')
          }
        return (
            <Fragment>
                <div className='uploadCsvWrapper mt-4'>
                <div className="row">
                    <div className="col-7">
                    <CSVReader
                    cssClass="csv-reader-input"
                    label="click choose file to upload mydeal CSV file"
                    onFileLoaded={this.handleForce}
                    onError={this.handleDarkSideForce}
                    parserOptions={papaparseOptions}
                    inputId="ObiWan"
                    inputStyle={{color: 'red'}}
                    />
                    </div>
                <div className="col-5">
                {
                    fileName.length === tempFileName.length?<button className="btn btn-primary" onClick={this.handleClick}>Confirm Upload</button>:<Fragment><button className="btn btn-primary" onClick={this.handleClick} disabled>Confirm Upload</button><p style={{color:'red'}}>Please refresh this page, you need to upload file with different fileName.</p></Fragment>
                }
                </div>
                </div>
                {
                    webOn?webOn:null
                }
                <div className="row">
                    <div className="col-7"/>
                    <div className="col-5">
                        <button className="btn btn-success" onClick={this.handleFillClick}>Fill Category Primary</button>
                        <div className="fillHint">{fillResult}</div>
                    </div>
                </div>
            </div>
            </Fragment>
        )
      }
      handleForce = (data,fileInfo)=>{
        this.props.setdataAction(data,fileInfo.name);
        console.log(data);
      }
      handleClick = ()=>{
        const {csvData} = this.props;
        // for(let i =0;i<19;i++){
        //     csvfinalData.push(csvData[i])
        // }
        this.props.webOnAction(csvData)
      }
      handleFillClick = () =>{
          this.props.fillCatprimaryAction()
      }
}
const mapStateToProps = (state)=>{
    return {
        webOn:state.adminReducer.webOn,
        csvData:state.adminReducer.csvData,
        fileName:state.adminReducer.fileName,
        fillResult:state.adminReducer.fillResult
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        setdataAction:bindActionCreators(actionCreator.setdataAction,dispatch),
        webOnAction:bindActionCreators(actionCreator.webOnAction,dispatch),
        fillCatprimaryAction:bindActionCreators(actionCreator.fillCatprimaryAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(uploadcsv);