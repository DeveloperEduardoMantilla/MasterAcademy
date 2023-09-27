import react from "react";
import Course from "../../pages/Course.jsx";
import "../../assets/styles/courses/myCourses.css"

export default function MyCourses(){
    return(
        <>
            <section className="myCourses">
                <h2>My Courses</h2>
                <div className="myCoursesContent">
                    <Course/>
                    <Course/>
                    <Course/>
                </div>
            </section>
        </>
    )
}