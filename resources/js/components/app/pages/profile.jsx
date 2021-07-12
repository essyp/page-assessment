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
                        <div className="dashboard-tab p-4 rounded-lg shadow-xs bg-white">
                            
                            <div className="row">
                                <div className="col-lg-6 mb-5">
                                    <div className="card border-0 rounded-xxl bg-white theme-light-bg shadow-md">
                                        <div className="card-body">
                                            <div class="row">
                                                <div class="text-center">
                                                    {/* <figure className="avatar ml-auto mr-auto mb-0 mt-2 w100"><img src="assets/images/t-1.jpg" alt="image" class="shadow-sm rounded-lg w-100" /></figure> */}
                                                    <h2 className="text-grey-900 fw-900 display1-size mt-2 mb-1 ls-3 lh-1">{this.state.user.first_name} {this.state.user.last_name}</h2>
                                                    <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0">ID: {this.state.user.ref_number}</h4>    
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-5">
                                    <div className="card border-0 rounded-xxl bg-white theme-light-bg shadow-md">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h4 className="fw-900 text-success font-xsss mt-0 mb-0 "></h4>
                                                    <h2 className="text-grey-900 fw-900 display1-size mt-2 mb-1 ls-3 lh-1">₦{this.state.user.wallet ? this.state.user.wallet.balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''} </h2>
                                                    <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0"> Wallet Balance</h4>                             
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="col-lg-4 mb-3">
                                    <div className="card border-0 w-100 p-0 rounded-xxl bg-white theme-light-bg shadow-md">
                                        <div className="card-body p-4">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h4 className="fw-900 text-success font-xsss mt-0 mb-0 ">-27%</h4>
                                                    <h2 className="text-grey-900 fw-900 display1-size mt-2 mb-1 ls-3 lh-1">4455 </h2>
                                                    <h4 className="fw-700 text-grey-500 font-xssss ls-3 text-uppercase mb-0 mt-0"> UNITS SALE</h4>                             
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="col-lg-12 mt-3 cart-wrapper">
                                    <h3>Latest Transactions</h3>
                                    <div className="table-content table-responsive shadow-md">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Trans. ref.</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Comment</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.user.transaction && this.state.user.transaction.map((data, index) => ( 
                                                <tr>
                                                    <td>{data.ref_id}</td>
                                                    <td>{data.type == "credit" ? "Credit" : "Debit"}</td>
                                                    <td>₦{data.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                                    <td>{data.note}</td>
                                                    <td>{data.status == 1 ? "success" : "failed"}</td>
                                                    <td>{data.created_at}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        
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