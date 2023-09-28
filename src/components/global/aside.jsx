import react from "react";
import "../../assets/styles/dasboard/aside.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBook, faArrowRightFromBracket,faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Aside(){
    return(
        <>
        <div className="aside">
            <p className="title">Master <br/> Academy</p>
            <div className="items">
                <div className="item">
                    <FontAwesomeIcon icon={faHouse} style={{color: "#3498DB",}}/>
                    <Link className="to" to={"/dashboard"}> Home</Link>
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faBook} style={{color: "#28B463",}}/>
                    <Link className="to"  to={"/courses"}> Courses</Link>
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faBookmark} style={{color: "#D4AC0D",}}/>
                    <Link className="to"  to={"/mycourses"}> My Course</Link>
                </div>
                <div className="item">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} style={{color: "#E74C3C",}}/>
                    <Link className="to" to={"/"}> Exit</Link>
                </div>
            </div>
            
        </div>
        </>
    )
}