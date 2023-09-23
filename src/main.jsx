import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Login from './pages/Login.jsx';
import Home from "./pages/Home.jsx";
import Dasboard from './pages/Dasboard.jsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const root = createBrowserRouter([
  {
    path:"/home",
    element: <Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/dasboard",
    element:<Dasboard/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={root} />
  </React.StrictMode>
)