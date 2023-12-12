import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* other routes */}
    </Routes>
  );
}

export default App;
