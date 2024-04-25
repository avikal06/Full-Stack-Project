import React from 'react';
import ReactDOM from 'react-dom';

import SideMenu from './components/sidemenu';
import Topbar from './components/topbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/home';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Topbar />
    <SideMenu />
    <Home />
  </React.StrictMode>
);
