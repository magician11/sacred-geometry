import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Menu from "./Menu";
import SacredGeometry from "./SacredGeometry";

// Simple slice for the menu state
const menuSlice = {
  name: "menu",
  initialState: {
    showMenu: false,
  },
  reducers: {
    setShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
  },
};

const store = configureStore({
  reducer: {
    menu: (state = menuSlice.initialState, action) => {
      switch (action.type) {
        case "menu/setShowMenu":
          return { ...state, showMenu: action.payload };
        default:
          return state;
      }
    },
  },
});

const App = () => (
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<SacredGeometry />} />
      </Routes>
      <Menu />
    </Provider>
  </Router>
);

export default App;
