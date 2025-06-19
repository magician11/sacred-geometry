import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import Menu from './Menu';
import SacredGeometry from './SacredGeometry';
import ErrorBoundary from './ErrorBoundary';

// Proper RTK slice - more consistent with Redux Toolkit patterns
const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    showMenu: false
  },
  reducers: {
    setShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    toggleMenu: state => {
      state.showMenu = !state.showMenu;
    }
  }
});

// Export actions for use in components
export const { setShowMenu, toggleMenu } = menuSlice.actions;

// Configure store with proper RTK slice
const store = configureStore({
  reducer: {
    menu: menuSlice.reducer
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production'
});

const App = () => (
  <Router>
    <Provider store={store}>
      <ErrorBoundary>
        <Routes>
          {/* More explicit routes - you could expand this if needed */}
          <Route path="/" element={<SacredGeometry />} />
          <Route path="/seed-of-life" element={<SacredGeometry />} />
          <Route path="/flower-of-life" element={<SacredGeometry />} />
          <Route path="/cube" element={<SacredGeometry />} />
          <Route path="/merkaba" element={<SacredGeometry />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<SacredGeometry />} />
        </Routes>
        <Menu />
      </ErrorBoundary>
    </Provider>
  </Router>
);

export default App;
