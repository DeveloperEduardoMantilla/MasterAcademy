import {useState, useEffect} from "react"
import Course from "./Course.jsx"
import "../../assets/styles/dasboard/courses.css";

export default function Courses(){
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.128.23:5010/cursos/all')
      .then((response) => response.json())
      .then((data) => {
        setCoursesData(data.courses);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

    return (
        <>
        <section className='courses'>
          <h2><img src="https://lukaszadam.com/assets/downloads/desk-illustration-2.svg"  width={"70px"}/> Courses available </h2>
          <div className="courses-content">
              {Array.isArray(coursesData) ? (
              coursesData.map((course) => (
                <Course key={course.id} title={course.folder} description={course.nameCourse} urlImg={course.imagenCourse} />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>
        </>
    )
}