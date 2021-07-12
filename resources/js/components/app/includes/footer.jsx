import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base_url: this.props.base_url,
      api_url: this.props.api_url,
    }
  }
  
  render() {
    return (
        <Fragment>
          <div className="footer-wrapper mt-0 bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-md-12 col-lg-4 col-sm-9 col-xs-12 md-mb25">
                                <a href="index.html" className="logo"><img src="assets/images/page_logo.png" alt="logo"/></a>
                                <ul className="list-inline">
                                    <li className="list-inline-item mr-3"><a href="#"><i className="ti-facebook"></i></a></li>
                                    <li className="list-inline-item mr-3"><a href="#"><i className="ti-twitter-alt"></i></a></li>
                                    <li className="list-inline-item mr-3"><a href="#"><i className="ti-linkedin"></i></a></li>
                                    <li className="list-inline-item"><a href="#"><i className="ti-instagram"></i></a></li>
                                </ul>
                            </div>
                            <div className="col-md-3 col-lg-2 col-sm-3 col-xs-6 md-mb25"></div>
                            <div className="col-md-3 col-lg-2 col-sm-4 col-xs-6"></div>
                            <div className="col-md-3 col-lg-2 col-sm-4 col-xs-6"></div>
                            <div className="col-md-3 col-lg-2 col-sm-4 col-xs-6">
                                <h5 className="mb-3">Office</h5>
                                <p style={{width: '100%'}}>23, Norman Williams Street, <br/> S/W Ikoyi, Lagos <br/> customer@pagefinancials.com <br/>+234 (0)1 700 PAGE(7243)</p>
                            </div>
                        </div>
                        <div className="middle-footer mt-5 pt-4"></div>
                    </div>
                    <div className="col-sm-12 lower-footer pt-0"></div>
                    <div className="col-sm-6 col-xs-12">
                        <p className="copyright-text">© 2021 copyright. All rights reserved.</p>
                    </div>
                    <div className="col-sm-6 col-xs-12 text-right">
                        <p className="copyright-text float-right">Design by <a href="#">Francis Mogbana</a></p>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
  }
}

export default Footer;