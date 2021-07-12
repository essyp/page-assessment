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
      user: [],
      base_url: this.props.base_url,
      api_url: this.props.api_url,
    }
    this.fetchUser = this.fetchUser.bind(this);
  }


  componentDidMount () {
      this.fetchUser();
  }
  
    async fetchUser() {
        await axios('/api/transactions/' + window.localStorage.getItem('user'))
        .then(response => {
            if (!response.data == 200) {
                return (this.errorMessage = 'Could not fetch transactions');
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
                           
                                <div className="col-lg-12 mt-3 cart-wrapper">
                                    <div class="col-lg-12">
                                        <h4 class="mb-4 font-xs fw-700 mont-font mt-3">Transaction History</h4>
                                    </div>
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
                                                {this.state.user ? this.state.user.map((data, index) => ( 
                                                <tr>
                                                    <td>{data.ref_id}</td>
                                                    <td>{data.type == "credit" ? "Credit" : "Debit"}</td>
                                                    <td>₦{data.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                                    <td>{data.note}</td>
                                                    <td>{data.status == 1 ? "success" : "failed"}</td>
                                                    <td>{data.created_at}</td>
                                                </tr>
                                                )) : ''}
                                            </tbody>
                                        </table>
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