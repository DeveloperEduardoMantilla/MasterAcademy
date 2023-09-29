import React from 'react';
import Courses from '../components/dashboard/Courses.jsx';
import MyCourses from "../components/dashboard/MyCourses.jsx"
import "../assets/styles/dasboard/dasboard.css"

function Dasboard() {
  return (
    <>
      <MyCourses />
      <Courses/>
    </>
  );
}

export default Dasboard