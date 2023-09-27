import React from 'react';
import Header from "../components/global/header.jsx";
import Courses from './Courses.jsx';
import MyCourses from "../components/dasboard/MyCourses.jsx"
import Aside from "../components/global/aside.jsx"
import { Outlet } from 'react-router-dom';
import "../assets/styles/dasboard/dasboard.css"


function Dasboard() {
  return (
    <>
      <main>
        <Aside/>
        <section className='body'>
          <Header/>
          <MyCourses />
          <Courses/>
        </section>
      </main>
    </>
  );
}

export default Dasboard