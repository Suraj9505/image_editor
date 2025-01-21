// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import CanvasEditor from "./components/CanvasEditor";

const App = () => {
  return (
    <div className="container mt-5">
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/canvas/:id" element={<CanvasEditor />} />
      </Routes>
    </div>
  );
};

export default App;
