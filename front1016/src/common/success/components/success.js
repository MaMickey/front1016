import React, { Component } from 'react';
import '../style.css'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link,withRouter } from 'react-router-dom';

class success extends Component {
    render() {
        return (
            <div className="SuccOrderWrapper">
                {
                    this.props.location.state ? <div className="card col-12">
                    <div className="SuccOrdertitle mt-4">
                        Order completed successfully! <FontAwesomeIcon icon={faCheckCircle}/>
                    </div>
                    <div className="card-body">
                        <div className="SuccOrderbody mt-4"> Your order number is {this.props.location.state.SRNumber } </div>
                    </div>
                    <div className="SuccOrdersection"/>
                    <div className="SuccOrderbtn mb-4">
                    <button className="btn btn-primary" onClick={this.handleClick}>View your order</button>
                    </div>
                </div>: this.props.history.push('/')
                }
           
            </div>
        );
    }
    handleClick= () =>{
        this.props.history.push('/order')
    }
}

export default withRouter(success);