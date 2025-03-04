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
import { useEffect } from "react";
import { useDispatch } from "react-redux";


import GoogleMap from "./pages/googleMap";
import GoogleMapApi from "./pages/googleMapApi";
import GoogleMapApiAddress from "./pages/googleMapApiAddress";
import Clender from "./pages/celender";


import WorkPattern from "./pages/workPattern";
import WorkTime from "./pages/workTime";
import WorkerList from "./pages/workerList";


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
        <Route path="/company" element={<RegisterOwner />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/loginWorker" element={<LoginWorker />} />
        <Route path="/isAdmin" element={<IsAdmin />} />
        <Route path="/isWorker" element={<IsWorker />} />
        <Route path="/googlemap" element={<GoogleMap />} />
        <Route path="/googlemapApi" element={<GoogleMapApi />} />
        <Route path="/googleMapApiAddress" element={<GoogleMapApiAddress />} />

        <Route path="/calender" element={<Clender />} />
        <Route path="/workPattern" element={<WorkPattern />} />
        <Route path="/workTime" element={<WorkTime />} />
        <Route path="/workerList" element={<WorkerList />} />

      </Routes>
    </>
  );
}

export default App;
