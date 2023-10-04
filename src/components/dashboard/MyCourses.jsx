import {useEffect, useState} from "react";

import Course from "./Course.jsx";
import Loading from "../global/loading.jsx";

import "../../assets/styles/courses/myCourses.css"


export default function MyCourses(){
    const ipBackEnd = import.meta.env.VITE_IP_BACKEND;
    const portBackEnd = import.meta.env.VITE_PORT_BACKEND;
    const ipCourses = import.meta.env.VITE_IP_COURSES;
    const portCourses = import.meta.env.VITE_PORT_COURSES;

    const [loading, setLoading] = useState(true)
    const [dataMyCourses, setDataMyCourses] = useState([])
    const [coursesData, setCoursesData] = useState([])

    const obtenerCursosSeleccionados = (todosLosCursos, cursosSeleccionados) => {
        const arrayDeNombres = cursosSeleccionados.map(objeto => objeto.folder);
        console.log(arrayDeNombres);
        return todosLosCursos.filter(curso => cursosSeleccionados.includes(curso.folder));
    };

    const getUser = async() =>{
            setLoading(true)
            let options = {
                method: "GET",
                credentials: "include" 
            };
            let response = await(await fetch(`http://${ipBackEnd}:${portBackEnd}/dashboard/userLogout`, options)).json();
            let ruta = `http://${ipBackEnd}:${portBackEnd}/dashboard/courseregistration/${response.id}`;
            let coursesRegistrated = await(await fetch(ruta, options)).json();
            setDataMyCourses(coursesRegistrated.message);
            setLoading(false);
    }

    useEffect(()=>{
        if(Object.keys(dataMyCourses).length==0){
            getUser();
        }
    },[dataMyCourses])

    useEffect(() => {
        fetch(`http://${ipCourses}:${portCourses}/cursos/all`)
          .then((response) => response.json())
          .then((data) => {
            setCoursesData(data);
          })
          .catch((error) => {
            console.log("Error => " + error);
          });
    }, []);

    return(
        <>
            {loading ? <Loading/> :
            <section className="myCourses">
                <h2> <img src="https://lukaszadam.com/assets/downloads/javascript_illustration.svg"  width={"70px"}/>My Courses</h2>
                <div className="myCoursesContent">
                    {   
                        coursesData.map((course, key) => (
                            <Course key={key} title={course.folder} description={course.nameCourse} urlImg={course.imagenCourse} state={false} />
                        ))
                    }
                </div>
            </section>

            }
            
        </>
    )
}