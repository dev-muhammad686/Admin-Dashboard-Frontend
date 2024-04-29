import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Calender from "./pages/calender/Calender";
import Appointments from "./pages/apointments/Appointments";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  // const admin = true
  return (
    <>
      <Router>
        <Routes>
          {
            !admin
            ?
            <>
            <Route  exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route exact path="/calender" element={<Navigate to="/login" />} />
            <Route exact path="/appointments" element={<Navigate to="/login" />}/>
            </>
            :
            <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Navigate to="/" />} />
            <Route exact path="/calender" element={<Calender/> } />
            <Route exact path="/appointments" element={<Appointments/>}/>
            </>
          }

            {/* <Route path="students">
              <Route index element={<List/>} />
              <Route path=":studentId" element={<Single/>} />
              <Route path="new" element={<New/>} />
            </Route> */}

            {/* <Route path="products">
              <Route index element={<List/>} />
              <Route path=":productId" element={<Single/>} />
              <Route path="new" element={<New/>} />
            </Route> */}
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
