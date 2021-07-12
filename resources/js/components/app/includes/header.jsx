import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";

class Header extends Component {
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
          
        <div className="upper-header bg-greylight">
            <div className="container">
                <div className="row">
                    <div className="col-12 d-none d-lg-block">
                        <ul className="list-inline list-item-style mt-0 float-left pl-1">
                            <li className="list-inline-item pl-0"><a href="#">+234 (0)1 700 PAGE(7243)</a></li>
                            <li className="list-inline-item"><a href="#">customer@pagefinancials.com</a></li>
                        </ul>

                        <ul className="list-inline list-item-style mt-0 float-right">
                        {window.localStorage.getItem('user') ? (
                            <div><li className="list-inline-item"><Link to="/profile"><i className="ti-user mr-2"></i> My Account</Link></li>
                            <li className="list-inline-item"><a style={{cursor: "pointer"}} onClick={this.logoutUser}><i className="ti-power-off mr-2"></i> Logout</a></li></div>
                        ) : (
                            <div><li className="list-inline-item"><Link to="/register"><i className="ti-user mr-2"></i> Create Account</Link></li>
                            <li className="list-inline-item"><Link to="/login"><i className="ti-user mr-2"></i> Login</Link></li></div>
                        )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="header-wrapper shadow-xs">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 navbar"></div>
                    <div className="col-lg-4 text-right">
                    {window.localStorage.getItem('user') ? (
                        <div><Link to="/credit-wallet"><button className="header-btn bg-dark fw-500 text-white font-xssss">Fund Account</button></Link>
                        <Link to="/transfer" className="header-btn bg-current fw-500 text-white font-xssss">Transfer</Link></div>
                    ) : (
                        <div><Link to="/login"><button className="header-btn bg-dark fw-500 text-white font-xssss">Login</button></Link>
                        <Link to="/register"><button className="header-btn bg-current fw-500 text-white font-xssss">Register</button></Link></div>
                    )}
                    </div>
                </div>
            </div>
        </div>
          
        </Fragment>
    );
  }
}

export default Header;