import {useEffect, useState} from "react";

import Course from "./Course.jsx";
import Loading from "../global/loading.jsx";

import "../../assets/styles/courses/myCourses.css"


export default function MyCourses(){

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
            let response = await(await fetch("http://localhost:5010/dashboard/userLogout", options)).json();
            let ruta = `http://localhost:5010/dashboard/courseregistration/${response.id}`;
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
        fetch('http://192.168.128.23:5010/cursos/all')
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