import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.5.0";
import "./assets/demo/demo.css?v=1.5.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
import Layout from './components/LayoutArea/Layout/Layout';

ReactDOM.render(
  <React.Fragment>
    <Layout />
    </React.Fragment>,
  document.getElementById('root')
);

reportWebVitals();
