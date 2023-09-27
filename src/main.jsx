import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Login from './pages/Login.jsx';
import Home from "./pages/Home.jsx";
import Dasboard from './pages/Dashboard.jsx';
import Protected from './assets/middleware/Protected.jsx';
import DasHome from "./components/dashboard/DasHome.jsx";

import "../src/assets/styles/main.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Protected/>}>
          <Route path="dashboard" element={<Dasboard/>}>

          </Route>
          
        </Route>
        <Route path="login" element={<Login/>} />   
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>)