import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './Menu';
import SacredGeometry from './SacredGeometry';

export default () => {
  return (
    <Router>
      <SacredGeometry />
      <Menu />
    </Router>
  );
};
