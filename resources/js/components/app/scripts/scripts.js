import React, { Component } from 'react'; 
import {Helmet} from "react-helmet"; 

class Scripts extends Component { 
    constructor(props) { 
        super(props); 
        this.state = {
          base_url: this.props.base_url,
          api_url: this.props.api_url,
        }
    } 
    render() { 
        return ( 
            <Helmet> 
                <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
                <script src="assets/js/plugin.js"></script>
                <script src="assets/js/apexcharts.min.js"></script> 
                <script src="assets/js/chart.js"></script> 
                <script src="assets/js/scripts.js"></script>
                <script src="assets/js/toastr.min.js"></script>
                <script src="assets/js/waitMe.min.js"></script>
               
                {/* <script src='assets/js/vendors.js'></script>  */}
            </Helmet> 
        ); 
    } 
} 
export default Scripts;