import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import {
    faArrowUp
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/ui.css";
import "../../css/responsive.css";
import "../../css/bootstrap.css";
import './style.css';

class Backtop extends Component {
    handleScrollTop() {
        window.scroll(0,0);
    }
    render() {
        return (
            <div className="backtopWrapper">
                {
                    this.props.showScroll ?  <button className="btn btn-primary" onClick={this.handleScrollTop}><FontAwesomeIcon icon={faArrowUp} /></button> : null
                }      
            </div>
        );
    }
    componentDidMount(){
        this.bindEvents();
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }
    bindEvents(){
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }
}
const mapStateToProps = (state) =>({
    showScroll:state.backtopReducer.showScroll
})
const mapDispatchToProps = (dispatch) =>({
    changeScrollTopShow(){
        if (document.documentElement.scrollTop > 500){
            dispatch(actionCreator.toggleTopShow(true))
        }else{
            dispatch(actionCreator.toggleTopShow(false))
        }
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Backtop);