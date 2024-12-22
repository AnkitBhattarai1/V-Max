import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationFlow from "./Pages/RegistrationFlow";
import HomePage from "./Pages/HomePage"; // Your homepage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationFlow />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
