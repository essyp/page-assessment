import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import Header from '../includes/header.jsx';
import Footer from '../includes/footer.jsx';


import Scripts from '../scripts/scripts.js';

class Home extends Component {
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
            <Header
                base_url={this.state.base_url}
                api_url={this.state.api_url}
            />
           
        <div className="banner-wrapper style1 bg-image-contain" style={{backgroundImage: 'url(assets/images/banner-illu.jpg)'}}>
            <div className="tab-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 tab-container">
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        
            <Scripts />
        </Fragment>
    );
  }
}

export default Home;