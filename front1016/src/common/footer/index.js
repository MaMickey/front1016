import React, { Component } from "react";
// import {Link} from 'react-router-dom';
import './style.css';

class Footer extends Component {
    render() {
      return (
        <div className=" section-footer FooterWrapper" id="theFooter">
            <div className="container Contact"> Contact Us: service@xinsports.com.au <br />Copyright 2020 Xin Sports - © All rights reserved</div>
        
        </div>
      )
    }
}
export default Footer;