import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationFlow from './Pages/RegistrationFlow';
import HomePage from "./Pages/HomePage"; // Import HomePage
import "../src/App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<RegistrationFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
