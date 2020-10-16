import React, { Component } from 'react';
import Switch from "react-switch";

class Vipswitch extends Component {
    render() {
        const {vipChecked} = this.props;
      return (
        <div className="mt-2">
            <Switch
                checked={vipChecked}
                onChange={this.props.handleVipClick}
                handleDiameter={24}
                // offColor="#08f"
                offColor='#bad6e8'
                // onColor="#0ff"
                onColor="#5499c7"
                // offHandleColor="#0ff"
                offHandleColor="#5499c7"
                // onHandleColor="#08f"
                onHandleColor='#bad6e8'
                height={30}
                width={60}
                className="react-switch"
                id="small-radius-switch"
            />
        </div>
      );
    }
  }
export default Vipswitch;