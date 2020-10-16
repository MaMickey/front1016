import React, { Component } from 'react';
import Success from './components/success';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class index extends Component {
    render() {
        return (
            <div>
                <Success/>
            </div>
        );
    }
    componentDidMount() {
        document.querySelector('body').scrollTo(0,0)
    }
}
const mapStateToProps = state=>{
    return {
    }
}
const mapDispatchToProps = dispatch =>{
    return{

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(index);