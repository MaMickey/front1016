import React, { Component } from "react";
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import '../style.css';
import {
    faCommentDots,
    faTruck,
    faStar,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Notice extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body noticeTitle">
            <div className="itemside">
              <div className="aside">
                <span className="icon-sm rounded-circle starBg">
                <FontAwesomeIcon icon={faStar}  className="white"/>
                </span>
              </div>
              <div className="info">
                <p className="title">Satify all your sports needs</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body noticeTitle">
            <div className="itemside">
              <div className="aside">
                <span className="icon-sm rounded-circle bg-secondary">
                 <FontAwesomeIcon icon={faCommentDots} className="white"/>
                </span>
              </div>
              <div className="info">
                <p className="title">Considerate customer support </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body noticeTitle">
            <div className="itemside">
              <div className="aside">
                <span className="icon-sm rounded-circle truckBg">
                 <FontAwesomeIcon icon={faTruck}  className="white"/>
                </span>
              </div>
              <div className="info">
                <p className="title">Fast delivery to your home</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notice;
