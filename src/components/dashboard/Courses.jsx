import {useState, useEffect} from "react"
import Course from "./Course.jsx"
import "../../assets/styles/dasboard/courses.css";
import Loading from "../global/loading.jsx";

export default function Courses(){
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true)
  const ipCourses =import.meta.env.VITE_IP_COURSES;
  const portCourses =import.meta.env.VITE_PORT_COURSES;
  
  useEffect(() => {

    fetch(`http://${ipCourses}:${portCourses}/cursos/all`)
      .then((response) => response.json())
      .then((data) => {
        setCoursesData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error => " + error);
        setLoading(true);
      });
  }, []);

    return (
        <>
        <section className='courses'>
          <h2><img src="https://lukaszadam.com/assets/downloads/desk-illustration-2.svg"  width={"70px"}/> Courses available </h2>
          <div className="courses-content">
            {loading ? (
              <Loading/>
            ): (
              coursesData.map((course, key) => (
                <Course key={key} title={course.folder} description={course.nameCourse} urlImg={course.imagenCourse} state={false} />
              ))
            )} 
          </div>
        </section>
        </>
    )
}