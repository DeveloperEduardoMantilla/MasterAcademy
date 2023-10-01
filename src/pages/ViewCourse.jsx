import { React, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Secciones from "../components/courses/Secciones.jsx";
import "../assets/styles/dasboard/dasboard.css";
import "../assets/styles/courses/viewCourse.css";
import Loading from "../components/global/loading.jsx";

function ViewCourse() {
  const [loading, setLoading] = useState(true);
  const [cursoEncontrado, setCursoEncontrado] = useState(null);
  const { nameCurse } = useParams();

  function filterCurse(courses, nombreCurso) {
    return courses.find(objeto => objeto.folder === nombreCurso);
  }

  useEffect(() => {
    fetch('http://192.168.128.23:5010/cursos/all')
      .then((response) => response.json())
      .then((data) => {
        const cursoEncontrado = filterCurse(data, nameCurse);
        console.log(cursoEncontrado);
        setCursoEncontrado(cursoEncontrado);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error => " + error);
        setLoading(true);
      });
  }, [nameCurse]); // Agregado nameCurse como dependencia para que useEffect se ejecute cuando cambie

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
              <button>Inscríbete ahora</button>
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