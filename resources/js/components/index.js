import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router  } from "react-router-dom";
import App from './app/index.jsx';
import ScrollToTop from './app/helpers/scroll.js';

const rootElement = document.getElementById('root');

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
          base_url: 'https://page-assessment.herokuapp.com/', // Use this to link all files and images
          api_url: 'https://page-assessment.herokuapp.com/api/', // For send ajax request
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
  
    render() {
      return (
          <Router>
            <ScrollToTop>
              <App base_url={this.state.base_url} api_url={this.state.api_url} />
            </ScrollToTop>
          </Router>
      );
    }
}


if (rootElement) {
    ReactDOM.render(<Main />, rootElement);
}
