import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './pages/Login.jsx';

import Dasboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import Profile from "./pages/Profile.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
import Protected from './assets/middleware/PrivateRoute.jsx';
import RenderCourse from './pages/RenderCourse.jsx'
import Users from './pages/users.jsx';
import Main from "./pages/Main.jsx";
import CourseRequest from './pages/CourseRequest.jsx';
import "../src/assets/styles/main.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

          <Route element={<Protected />}>
            <Route path="dashboard" element={<Main/>}>
              <Route index element={<Dasboard/>}></Route>
              <Route path="courses" element={<Courses/>}></Route>
              <Route path="ViewCourse/:nameCurse" element={<ViewCourse/>}></Route>
              <Route path="ViewCourse/:nameCurse/view" element={<RenderCourse/>}></Route>
              <Route path="profile" element={<Profile/>}></Route>
              <Route path="users" element={<Users/>}></Route>
              <Route path="courseRequest" element={<CourseRequest/>}></Route>
            </Route>
          </Route>

          <Route path="login" element={<Login/>} />   
          <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>)


