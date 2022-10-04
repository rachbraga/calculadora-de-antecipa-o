import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/index";

const Application = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default Application;
