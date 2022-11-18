import React from "react";
import { LABS } from "./constants";

import { SideNavigation } from "./layout/SideNavigation";
import { Route, Routes } from "react-router-dom";

import "antd/dist/antd.css";
import "./App.css";

const App = () => {
  return (
    <div id="root-container">
      <SideNavigation />
      <div style={{ width: '100%' }}>
      <Routes>
        {Object.values(LABS).map(({ url, element }) => (
          <Route path={url} element={element} />
        ))}
      </Routes>
      </div>
    </div>
  );
};

export default App;
