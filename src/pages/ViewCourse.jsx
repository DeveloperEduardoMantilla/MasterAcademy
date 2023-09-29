import React from 'react';
import Header from "../components/global/header.jsx";
import Aside from "../components/global/aside.jsx"
import "../assets/styles/dasboard/dasboard.css"
import Secciones from "../components/courses/Secciones.jsx"
import "../assets/styles/courses/viewCourse.css"

function ViewCourse() {
  return (
    <>
      <main>
      <Aside/>
        <section className='body'>
          <Header/>
          <h2>ViewCourse</h2>
          <Secciones />
        </section>
      </main>
    </>
  );
}

export default ViewCourse