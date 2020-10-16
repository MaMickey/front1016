import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import tennisImg from '../../../images/products/tennis.jpg';
import tabletennisImg from '../../../images/products/table tennis.jpg';
import FitnessOlyImg from '../../../images/products/Fitness Olympic Weights.jpg';
import FitnessWeiImg from '../../../images/products/Fitness Weights.jpg';
import GymEquipImg from '../../../images/products/Gym Equipment.jpg';
import BoxingImg from '../../../images/products/Boxing.jpg';
import YogaImg from '../../../images/products/Yoga Gymnastics.jpg';
import BadmintonImg from '../../../images/products/badminton.jpg';
class products extends Component {
  render() {
    const productLabel = [
      "Badminton",
      "Fitness Weights",
      "Fitness Olympic Weights",
      "Gym Equipment",
      "Boxing",
      "Yoga Gymnastics",
      "Tennis",
      "Table Tennis",
    ];
    const pic = [
      BadmintonImg,
      FitnessWeiImg,
      FitnessOlyImg,
      GymEquipImg,
      BoxingImg,
      YogaImg,
      tennisImg,
      tabletennisImg,
    ];
    return (
      <div className="ProductWrapper">
        <div className="row ProductRow">
          {productLabel.map((label, index) => {
            return (
              <div className="col-md-3 col-lg-3 col-6 d-lg-block d-md-block" key={index}>
                <div className="card-product-grid mb-3">
                  <div className="img-wrap">
                    <Link to={`/products/searchByCategory-${label}/1`} >
                      <div className="ProductItemImg">
                        <img
                        // style={{ backgroundImage: "url(" + pic[index] + ")" }}
                        src={pic[index]}  className="bgImg"/>
                        </div>
                    </Link>
                  </div>
                  <div className="info-wrap text-center">
                    {productLabel[index]}
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(null, null)(products);
