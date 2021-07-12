import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import Header from '../includes/header.jsx';


import Scripts from '../scripts/scripts.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base_url: this.props.base_url,
      api_url: this.props.api_url,
    }
    this.signIn = this.signIn.bind(this);
  }

  signIn () {
    open_loader('#page');
        const form = $("#login-form")[0];
        const _data = new FormData(form);
        axios.post('api/login', _data)
    .then((response) => {
        if (response.data.status === 200) {
            toastr.success(response.data.message);
            window.localStorage.setItem('user', response.data.data.ref_number)
            this.props.history.push('/profile');
            close_loader('#page');
        }
    }).catch((error) =>{
        toastr.error(error.response.data.message);
        close_loader('#page');
    })
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
        {...this.props}
    />
        <div className="dashboard-wrapper bg-greylight">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2"></div>

                    <div className="col-lg-8">
                        <div className="dashboard-tab cart-wrapper p-5 bg-white rounded-lg shadow-xs">
                            <form id="login-form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h2 className="mb-4 font-xs fw-700 mont-font mt-3"> Account Login </h2>
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
                                            <label className="mont-font fw-600 font-xssss">Account Password</label>
                                            <input type="password" name="password" className="form-control" required/>
                                        </div>        
                                    </div>                                     
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-0">
                                        <button type="button" onClick={this.signIn} className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block">Login</button>
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

export default Login;