import {react} from "react"
import { Link } from "react-router-dom";
import "../../assets/styles/courses/course.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBook, faArrowRightFromBracket,faBookmark,faUser} from "@fortawesome/free-solid-svg-icons";

export default function Course({title,description,urlImg,state}){

    const courseUrl = `/dashboard/ViewCourse/${title}`;
    return (
        <>
        
          <Link to={courseUrl} className="course-link">
            <section className="course">
            <div className="capa"  style={{backgroundImage: `url(${urlImg})`}}></div>
              <div className="description">
                <h1>{title}</h1>
                <p>{description}</p>
                {
                  !state? (
                    <button className="btn"><FontAwesomeIcon className="rotate-vert-center" icon={faBookmark} style={{color: "#fff",}}/></button>
                  ): null
                }
              </div>
            </section>
          </Link>
        </>
    )
}