import {react} from "react"
import "../../assets/styles/courses/course.css"

export default function Course({title,description,urlImg}){
    return (
        <>
          <section className="course">
          <div className="capa"  style={{backgroundImage: `url(${urlImg})`}}></div>
            <div className="description">
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            {/*<div className="details">
            <div className="category">
                <h3>Front-End</h3>
              </div>
              <div className="date">
                <h4>2023-10-15</h4>
              </div>
            </div>*/}
            
            
          </section>
        </>
    )
}