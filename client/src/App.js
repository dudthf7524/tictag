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

import IsAdmin from "./pages/isAdmin";
import IsWorker from "./pages/isWorker";

import { USER_AUTH_REQUEST } from "./reducers/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: USER_AUTH_REQUEST,
    });
  }, []);
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
        <Route path="/isAdmin" element={<IsAdmin />} />
        <Route path="/isWorker" element={<IsWorker />} />
      </Routes>
    </>
  );
}

export default App;
