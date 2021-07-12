import React from 'react';
import {  Link  } from "react-router-dom";
import { Fragment } from "react";
function NoMatch (props) {
    return (
     <Fragment>
    <div className="breadcrumb-area shadow dark text-center bg-fixed text-light" style={{ backgroundImage: "url(assets/img/banner/26.jpg)" }}>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Error Page</h1>
                    <ul className="breadcrumb">
                        <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li><a href="javascript:void(0);">Page</a></li>
                        <li className="active">404</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <div className="error-page-area default-padding">
        <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2 text-center content">
                    <h1>404</h1>
                    <h2>Sorry Page Was Not Found!</h2>
                    <p>
                        The page you are looking is not available or has been removed. Try going to Home Page by using the button below.
                    </p>
                    <a className="btn btn-dark effect btn-md" href="/">Back To Home</a>
                    <a className="btn btn-dark border btn-md" href="contact">Contact Us</a>
                    <ul>
                        <li className="facebook">
                            <a href="javascript:void(0);"><i className="fab fa-facebook-f"></i></a>
                        </li>
                        <li className="twitter">
                            <a href="javascript:void(0);"><i className="fab fa-twitter"></i></a>
                        </li>
                        <li className="linkedin">
                            <a href="javascript:void(0);"><i className="fab fa-linkedin-in"></i></a>
                        </li>
                        <li className="pinterest">
                            <a href="javascript:void(0);"><i className="fab fa-pinterest"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </Fragment>
    )
};
export default NoMatch;