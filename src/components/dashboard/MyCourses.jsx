import react from "react";
import Course from "./Course.jsx";
import "../../assets/styles/courses/myCourses.css"
export default function MyCourses(){
    return(
        <>
            <section className="myCourses">
                <h2> <img src="https://lukaszadam.com/assets/downloads/javascript_illustration.svg"  width={"70px"}/>My Courses</h2>
                <div className="myCoursesContent">
                    <Course/>
                    <Course/>
                    <Course/>
                </div>
            </section>
        </>
    )
}