import { React, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Secciones from "../components/courses/Secciones.jsx";
import "../assets/styles/dasboard/dasboard.css";
import "../assets/styles/courses/viewCourse.css";
import Loading from "../components/global/loading.jsx";
import Swal from 'sweetalert2'

function ViewCourse() {
  const [loading, setLoading] = useState(true);
  const [cursoEncontrado, setCursoEncontrado] = useState(null);
  const { nameCurse } = useParams();

  function filterCurse(courses, nombreCurso) {
    return courses.find(objeto => objeto.folder === nombreCurso);
  }

  async function registerCourse(){

    try {
      let options = {
        method: "GET",
        credentials: "include"
      };

      let response = await fetch("http://localhost:5010/dashboard/userLogout", options);
      let date = new Date;
      let fecha = date.toLocaleString(undefined,{hour12: true});

      let data = await response.json();
      
      data = {
        "course":nameCurse,
        "date":fecha.toString(),
        "state":"0",
        "userId":data.id
      }
      
      let optionsPost = {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",  
      }}

      let newRegistrated = await fetch("http://localhost:5010/dashboard/courseregistration", optionsPost);
      let responsenewRegistrated = await newRegistrated.json();
     
    } catch (error) {
      console.error("Error al consumir la API userLogout: " + error);
      throw error;
    }

    Swal.fire({
      position: 'bottom-end', 
      icon: 'success',
      title: 'Registro con exito',
      toast: true, 
      showConfirmButton: false, 
      timer: 3000, 
      timerProgressBar: true
    }) 

  }

    
  useEffect(() => {
    fetch('http://192.168.128.23:5010/cursos/all')
      .then((response) => response.json())
      .then((data) => {
        const cursoEncontrado = filterCurse(data, nameCurse);
        setCursoEncontrado(cursoEncontrado);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error => " + error);
        setLoading(true);
      });

      
  }, [nameCurse]);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : cursoEncontrado ? (
        <div key={cursoEncontrado.id} className="content-viewCourse">
          <div className="datails-viewCourse">
            <div className="details-course">
              <h1>{cursoEncontrado.folder}</h1>
              <h2>{cursoEncontrado.nameCourse}</h2>
              <button onClick={registerCourse}>Inscríbete ahora</button>
            </div>
            <div className="img-course">
              <img width={"100%"} src={cursoEncontrado.imagenCourse} alt={cursoEncontrado.nameCourse} />
              <div className="itemco itemco-1"></div>
              <div className="itemco itemco-2"></div>
              <div className="itemco itemco-3"></div>
            </div>
            <div className="view-that"></div>
          </div>
        </div>
      ) : (
        <p>Curso no encontrado</p>
      )}
    </>
  );
}

export default ViewCourse;