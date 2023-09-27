import {react} from "react"
import Course from "../pages/Course.jsx"
import "../assets/styles/dasboard/courses.css";

export default function Courses(){
    return (
        <>
        <section className='courses'>
          <h2>Courses available </h2>
          <div className="courses-content">
            <Course/>
            <Course/>
            <Course/>
            <Course/>
            <Course/>
            <Course/>
          </div>
        </section>
        </>
    )
}