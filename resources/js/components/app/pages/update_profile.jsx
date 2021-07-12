import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";

import Scripts from '../scripts/scripts.js';
import Header from '../includes/header.jsx';
import Side from '../includes/side.jsx';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      base_url: this.props.base_url,
      api_url: this.props.api_url,
    }
    this.fetchUser = this.fetchUser.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
  }


  componentDidMount () {
      this.fetchUser();
  }
  
    async fetchUser() {
        await axios('/api/profile/' + window.localStorage.getItem('user'))
        .then(response => {
            if (!response.data == 200) {
                return (this.errorMessage = 'Could not fetch user');
            }
            const user = response.data.data;
            this.setState({user});
        })
        .catch(error => {});
    }

    updateAccount () {
        open_loader('#page');
            var form = $("#update-form")[0];
            var _data = new FormData(form);
            axios.post('api/update-profile', _data)
        .then((response) => {
        if (response.data.status == 200) {
            toastr.success(response.data.message);
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
                    <Side/>

                    <div className="col-lg-9">
                        <div className="dashboard-tab cart-wrapper p-5 bg-white rounded-lg shadow-xs">
                            <div className="row">
                                <div className="col-lg-4 offset-sm-4 text-center">
                                    <figure className="avatar ml-auto mr-auto mb-0 mt-2 w100"><img src="assets/images/t-1.jpg" alt="image" className="shadow-sm rounded-lg w-100" /></figure>
                                    <h2 className="fw-900 font-sm text-grey-900 mt-3">{this.state.user.name}</h2>
                                    <h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">ID: {this.state.user.ref_number}</h4>    
                                </div>
                            </div>  
                            <form id="update-form">
                                <div className="row">
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xsss">First Name</label>
                                            <input type="text" name="first_name" value={this.state.user.first_name} className="form-control" />
                                        </div>        
                                    </div>

                                    <div className="col-lg-4 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xsss">Middle Name</label>
                                            <input type="text" name="other_name" value={this.state.user.other_name} className="form-control" />
                                        </div>        
                                    </div>

                                    <div className="col-lg-4 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xsss">Last Name</label>
                                            <input type="text" name="last_name" value={this.state.user.last_name} className="form-control" />
                                        </div>        
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xsss">Email</label>
                                            <input type="text" name="email" value={this.state.user.email} className="form-control"/>
                                        </div>        
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xsss">Phone</label>
                                            <input type="text" name="phone_number" value={this.state.user.phone_number} className="form-control" />
                                        </div>        
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xsss">Country</label>
                                            <input type="text" name="country" value={this.state.user.country} className="form-control" />
                                        </div>        
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xsss">State</label>
                                            <input type="text" name="state" value={this.state.user.state} className="form-control" />
                                        </div>        
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xsss">City</label>
                                            <input type="text" name="city" value={this.state.user.city} className="form-control" />
                                        </div>        
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xsss">Address</label>
                                            <input type="text" name="address" value={this.state.user.address} className="form-control" />
                                        </div>        
                                    </div>
                                </div>

                                
                                   <div className="col-lg-12 mb-0 mt-2 pl-0">
                                        <input type="hidden" name="user_id" value={this.state.user.id} className="form-control" />
                                        <button type="button" onClick={this.updateAccount} className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block">Save</button>
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

export default Profile;