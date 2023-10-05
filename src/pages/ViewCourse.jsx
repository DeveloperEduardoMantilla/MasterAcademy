import { React, useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import "../assets/styles/dasboard/dasboard.css";
import "../assets/styles/courses/viewCourse.css";
import Loading from "../components/global/loading.jsx";
import Swal from 'sweetalert2'

function ViewCourse() {
  const ipBackEnd = import.meta.env.VITE_IP_BACKEND;
  const portBackEnd = import.meta.env.VITE_PORT_BACKEND;
  const ipCourses = import.meta.env.VITE_IP_COURSES;
  const portCourses = import.meta.env.VITE_PORT_COURSES;

  const [loading, setLoading] = useState(true);
  const [buttonState, setButtonState]= useState(false);
  const [stateRegistrated, setstateRegistrated]= useState(false);
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
      let response = await(await fetch(`http://${ipBackEnd}:${portBackEnd}/dashboard/userLogout`, options)).json();
      let date = new Date;
      let fecha = date.toLocaleString(undefined,{hour12: true});
      
      let data = {
        "course":nameCurse,
        "date":fecha.toString(),
        "state":"0",
        "userId":response.id
      }
      
      let optionsPost = {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",  
      }}

      await fetch(`http://${ipBackEnd}:${portBackEnd}/dashboard/courseregistration`, optionsPost);

      setButtonState(true)
      Swal.fire({
        position: 'bottom-end', 
        icon: 'success',
        title: 'Registro con exito',
        toast: true, 
        showConfirmButton: false, 
        timer: 3000, 
        timerProgressBar: true
      }) 
    } catch (error) {
      console.error("Error al consumir la API userLogout: " + error);
      throw error;
    }
  }

  const validateRegistratedUser =async ()=>{
    setLoading(true);
    let optionsValidate = {
      method: "GET",
      credentials: "include"
    };
    let dataUser = await(await fetch(`http://${ipBackEnd}:${portBackEnd}/dashboard/userLogout`, optionsValidate)).json();

    let data={
        "userId":dataUser.id,
        "course":nameCurse
    }
    let options = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",  
    }}


    let response = await(await fetch(`http://${ipBackEnd}:${portBackEnd}/dashboard/validationRegistred`, options)).json();

    if(response.data != "null"){
      if(response.data[0].state==true){
        setstateRegistrated(true)
      }
      setButtonState(true)
    }else{
      setButtonState(false)
    }
    setLoading(false);
  }

  const getCourse =() =>{
    fetch(`http://${ipCourses}:${portCourses}/cursos/all`)
    .then((response) => response.json())
    .then((data) => {
      const cursoEncontrado = filterCurse(data, nameCurse);
      setCursoEncontrado(cursoEncontrado);
    })
    .catch((error) => {
      console.log("Error => " + error);
    });
  }

  useEffect(() => { 
    validateRegistratedUser();
    getCourse();

  }, []);

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
              {stateRegistrated?<Link className="btn btn-primary" to={`/dashboard/ViewCourse/${cursoEncontrado.folder}/view`} >Ver Curso</Link>:buttonState?<button style={{"backgroundColor":"green"}}>En espera</button>:<button onClick={registerCourse}>Inscríbete ahora</button>}
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