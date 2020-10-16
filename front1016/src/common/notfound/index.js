import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import NotFoundImg from '../../images/404.png'

class NotFoundPage extends React.Component{
    render(){
        return(
           <div className="notFoundWrapper">
            <div className="img-wrap">
                <img src={NotFoundImg} alt='' className="notFoundImg"/>
            </div>
            <p className="notFoundInfo info-wrap">The page you are looking at doesn't exist.</p>
            <div className="container">
            <Link to="/" style={{ textDecoration: 'none' }}>
            <button className="GoBackBtn">GO TO HOME</button>
            </Link>
            </div>
          </div>
        )
    }
}
export default NotFoundPage;