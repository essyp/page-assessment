import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";

import Scripts from '../scripts/scripts.js';
import Header from '../includes/header';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base_url: this.props.base_url,
      api_url: this.props.api_url,
    }
    this.createAccount = this.createAccount.bind(this);
  }

  componentWillUnmount() {
    $("head").find('script').remove(); 
  }
  

    createAccount () {
        open_loader('#page');
            var form = $("#register-form")[0];
            var _data = new FormData(form);
            axios.post('api/register', _data)
        .then((response) => {
        if (response.data.status == 200) {
            toastr.success(response.data.message);
            this.props.history.push('/login');
            close_loader('#page');
        }
        }).catch((error) =>{
            toastr.error(error.response.data.message);
            close_loader('#page');
        })
    }

  
  render() {
    return (
        <Fragment>
        <Header
            base_url={this.state.base_url}
            api_url={this.state.api_url}
        />
        <div className="dashboard-wrapper bg-greylight">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2"></div>

                    <div className="col-lg-8">
                        <div className="dashboard-tab cart-wrapper p-5 bg-white rounded-lg shadow-xs">
                            <form id="register-form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h2 className="mb-4 font-xs fw-700 mont-font mt-3">Create Account</h2>
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xssss">First Name</label>
                                            <input type="text" name="first_name" className="form-control" required/>
                                        </div>        
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xssss">Last Name</label>
                                            <input type="text" name="last_name" className="form-control" required/>
                                        </div>        
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xssss">Email Address</label>
                                            <input type="email" name="email" className="form-control" required/>
                                        </div>        
                                    </div>                                     
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xssss">Phone Number</label>
                                            <input type="tel" name="phone_number" className="form-control" required/>
                                        </div>        
                                    </div>                                     
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xssss">Account Password</label>
                                            <input type="password" name="password" className="form-control" required/>
                                        </div>        
                                    </div>                                     
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xssss">Confirm Password</label>
                                            <input type="password" name="password_confirmation" className="form-control" required/>
                                        </div>        
                                    </div>                                     
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-0">
                                        <button type="button" onClick={this.createAccount} className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block">Save</button>
                                    </div>
                                </div>
                                 
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                </div>
            </div>
        </div>
    </Fragment>
    );
  }
}

export default Register;