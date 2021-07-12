import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";

class Side extends Component {
    constructor(props) {
        super(props);
        this.state = {
        base_url: this.props.base_url,
        api_url: this.props.api_url,
        }
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser(event) {
        event.preventDefault();
      open_loader('#page');
      axios('api/logout')
      .then((response) => {
          if (response.data.status === 200) {
              localStorage.removeItem('user');
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
          
            <div className="col-lg-3">
                <div className="dashboard-nav bg-white rounded-lg shadow-xs">
                    <a href="#" className="dash-menu d-none d-block-md"><i className="ti-package font-sm mr-2"></i> Menu <i className="ti-angle-down font-xsss float-right "></i></a>
                    <ul className="dash-menu-ul">
                        <li className="d-block rounded-lg active"><Link to="/profile"><i className="ti-package font-sm"></i><span> Dashboard</span></Link></li>
                        <li className="d-block rounded-lg"><Link to="/profile-details"><i className="ti-user font-sm"></i><span> Account Details</span></Link></li>
                        <li className="d-block rounded-lg "><Link to="/change-password"><i className="ti-lock font-sm"></i><span>Change Password</span></Link></li>
                        <li className="d-block rounded-lg "><Link to="/transactions"><i className="ti-credit-card font-sm"></i><span> Transactions</span></Link></li>
                        <li className="d-block rounded-lg "><Link to="/credit-wallet"><i className="ti-credit-card font-sm"></i><span> Credit Wallet</span></Link></li>
                        <li className="d-block rounded-lg "><Link to="/transfer"><i className="ti-credit-card font-sm"></i><span> Transfer Fund</span></Link></li>
                        <li className="d-block rounded-lg"><a style={{cursor: "pointer"}} onClick={this.logoutUser}><i className="ti-power-off font-sm"></i><span> Logout</span></a></li>

                        <div className="card d-none-md w-100 mt-3 shadow-none pt-0 border-0">
                            <div className="card-body b-r-15 overflow-hidden position-relative bg-lightblue rounded-lg p-4 z-index bg-no-repeat bg-image-right" style={{backgroundImage: 'url(assets/images/menu-bg.png)' }}>
                                <h3 className="text-grey-700 font-md lh-2 fw-900 mb-3">Credit <br/>Wallet</h3>
                                <Link to="/credit-wallet"><button type="button" className="btn b-r-15 bg-white shadow-lg fw-700 font-xssss lh-30 w100 text-center text-grey-900">CREDIT</button></Link>
                            </div>
                        </div>
                    </ul>
                </div> 
            </div>
          
        </Fragment>
    );
  }
}

export default Side;