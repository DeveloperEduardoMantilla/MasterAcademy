import React from 'react';
import Header from "../components/global/header.jsx";
import Courses from '../components/dashboard/Courses.jsx';
import MyCourses from "../components/dashboard/MyCourses.jsx"
import Aside from "../components/global/aside.jsx"
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