import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./scrollToTop";

import Main from "./pages/main";
import Login from "./pages/login";
import Join from "./pages/join";
import RegisterOwner from "./adminPages/register/registerOwner";
import LoginAdmin from "./adminPages/login/loginAdmin";
import LoginWorker from "./pages/login/loginWorker";


function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/registerOwner" element={<RegisterOwner />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/loginWorker" element={<LoginWorker />} />
      </Routes>
    </>
  );
}

export default App;
