import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";

import Scripts from '../scripts/scripts.js';
import Header from '../includes/header.jsx';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base_url: this.props.base_url,
      api_url: this.props.api_url,
    }
  }

  componentWillUnmount() {
    $("head").find('script').remove(); 
  }
  
  render() {
    return (
        <Fragment>
        <Header
                base_url={this.state.base_url}
                api_url={this.state.api_url}
            />
    <div className="breadcrumb-area shadow dark text-center bg-fixed text-light" style={{backgroundImage: "url(assets/img/banner/8.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Contact Us</h1>
                    <ul className="breadcrumb">
                        <li><a href="/"><i className="fas fa-home"></i> Home</a></li>
                        <li><a href="javascript:void(0);">Page</a></li>
                        <li className="active">Contact</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
    <div className="contact-info-area default-padding">
        <div className="container">
            <div className="row">
                
                <div className="contact-info">
                    <div className="col-md-4 col-sm-4">
                        <div className="item">
                            <div className="icon">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            <div className="info">
                                <h4>Call Us</h4>
                                <span>+324 119 2343</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <div className="item">
                            <div className="icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="info">
                                <h4>Address</h4>
                                <span>+324 119 2343</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                        <div className="item">
                            <div className="icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="info">
                                <h4>Email Us</h4>
                                <span>info@yourdomain.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="seperator col-md-12">
                    <span className="border"></span>
                </div>

                <div className="maps-form">
                    <div className="col-md-6 maps">
                        <h3>Our Location</h3>
                        <div className="google-maps">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d14767.262289338461!2d70.79414485000001!3d22.284975!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1424308883981"></iframe>
                        </div>
                    </div>
                    <div className="col-md-6 form">
                        <div className="heading">
                            <h3>Contact Us</h3>
                            <p>
                                Occasional terminated insensible and inhabiting gay. So know do fond to half on. Now who promise was justice new winding
                            </p>
                        </div>
                        <form action="" method="POST" className="contact-form">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="form-group">
                                        <input className="form-control" id="name" name="name" placeholder="Name" type="text"/>
                                        <span className="alert-error"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="form-group">
                                        <input className="form-control" id="email" name="email" placeholder="Email*" type="email"/>
                                        <span className="alert-error"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="form-group">
                                        <input className="form-control" id="phone" name="phone" placeholder="Phone" type="text"/>
                                        <span className="alert-error"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="form-group comments">
                                        <textarea className="form-control" id="comments" name="comments" placeholder="Tell Me About Courses *"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <button type="button">
                                        Send Message <i className="fa fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="col-md-12 alert-notification">
                                <div id="message" className="alert-msg"></div>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    </Fragment>
    );
  }
}

export default Contact;