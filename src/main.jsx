import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './pages/Login.jsx';
import Home from "./pages/Home.jsx";
import Dasboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import MyCourses from './pages/MyCourses.jsx';
import Profile from "./pages/Profile.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
import Protected from './assets/middleware/PrivateRoute.jsx';
import Users from './pages/users.jsx';
import Main from "./pages/Main.jsx";

import "../src/assets/styles/main.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

          <Route element={<Protected />}>
            <Route path="dashboard" element={<Main/>}>
              <Route index element={<Dasboard/>}></Route>
              <Route path="courses" element={<Courses/>}></Route>
              <Route path="mycourses" element={<MyCourses/>}></Route>
              <Route path="ViewCourse/:nameCurse" element={<ViewCourse/>}></Route>
              <Route path="profile" element={<Profile/>}></Route>
              <Route path="users" element={<Users/>}></Route>
            </Route>
          </Route>

          <Route path="login" element={<Login/>} />   
          <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>)


