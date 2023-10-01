import {useEffect, useState} from "react";

import Course from "./Course.jsx";
import Loading from "../global/loading.jsx";
import "../../assets/styles/courses/myCourses.css"


export default function MyCourses(){
    const [loading, setLoading] = useState(true)

    useState(()=>{
        
    })
    return(
        <>
            
            <section className="myCourses">
                <h2> <img src="https://lukaszadam.com/assets/downloads/javascript_illustration.svg"  width={"70px"}/>My Courses</h2>
                <div className="myCoursesContent">
                    {loading ? <Loading/> : <Course state={true}/>}
                </div>
            </section>
        </>
    )
}