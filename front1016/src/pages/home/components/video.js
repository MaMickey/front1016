import React, { Component } from "react";
import YouTube from 'react-youtube';
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
class video extends Component {
    render() {
        const opts = {
            height: '390',
            // width: '800',
            width: '100%',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0,
            },
          };
        return (
            <div className="videoWrapper">
                <div className="videoTitle">Videos of using our equipments</div>
                <div className="row">
                <div className="col-md-6 videoBody">
                <div className="card-product-grid mb-0">
                 <YouTube videoId="qAzTEb7syBk" opts={opts} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-product-grid mb-0">
                 <YouTube videoId="I9ALMfFaiIE" opts={opts}/>
                </div>
              </div>
              </div>

            </div>
        );
    }
}

export default video;