import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../redux/reducer';

import Menu from './Menu';
import SacredGeometry from './SacredGeometry';

const store = createStore(rootReducer);

const App = () => (
  <Router>
    <Provider store={store}>
      <SacredGeometry />
      <Menu />
    </Provider>
  </Router>
);

export default App;
