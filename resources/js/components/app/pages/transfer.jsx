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
    this.transferFund = this.transferFund.bind(this);
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

    transferFund () {
        open_loader('#page');
            var form = $("#transfer-form")[0];
            var _data = new FormData(form);
            axios.post('api/transfer-fund', _data)
        .then((response) => {
        if (response.data.status == 200) {
            toastr.success(response.data.message);
            this.props.history.push('/transactions');
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
                              
                            <form id="transfer-form">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4 className="mb-4 font-xs fw-700 mont-font mt-3">Transfer Fund</h4>
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xssss">From (Account No)</label>
                                            <input type="text" value={this.state.user.wallet ? this.state.user.wallet.account_no : ''} className="form-control" readOnly/>
                                        </div>        
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xssss">To (Account No)</label>
                                            <input type="text" name="account_no" className="form-control" />
                                        </div>        
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <div className="form-gorup">
                                            <label className="mont-font fw-600 font-xssss">Amount</label>
                                            <input type="number" name="amount" className="form-control"/>
                                        </div>        
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 mb-0">
                                    <input type="hidden" name="wallet_id" value={this.state.user.wallet ? this.state.user.wallet.id : ''} className="form-control"/>
                                        <button type="button" onClick={this.transferFund} className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block">Proceed</button>
                                    </div>
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