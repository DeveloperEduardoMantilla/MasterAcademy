import react from "react";
import "../../assets/styles/dasboard/aside.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBook, faArrowRightFromBracket,faBookmark,faUser} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Aside(){
    return(
        <>
        <div className="aside" id="aside">
            <p className="title">Master <br/> Academy</p>
            <div className="items">
                <div className="item">
                    <FontAwesomeIcon className="rotate-vert-center" icon={faHouse} style={{color: "#F1C40F",}}/>
                    <Link className="to" to={"/dashboard"}> Home</Link>
                </div>
                <div className="item">
                    <FontAwesomeIcon className="rotate-vert-center" icon={faBook} style={{color: "#2E86C1",}}/>
                    <Link className="to"  to={"/courses"}> Courses</Link>
                </div>
                <div className="item">
                    <FontAwesomeIcon className="rotate-vert-center" icon={faBookmark} style={{color: "#8E44AD",}}/>
                    <Link className="to"  to={"/mycourses"}> My Course</Link>
                </div>
                <div className="item">
                    <FontAwesomeIcon className="rotate-vert-center" icon={faUser} style={{color: "#117A65",}}/>
                    <Link className="to" to={"/profile"}> Profile</Link>
                </div>
                <div className="item">
                    <FontAwesomeIcon className="rotate-vert-center" icon={faArrowRightFromBracket} style={{color: "#E74C3C",}}/>
                    <Link className="to" to={"/"}> Exit</Link>
                </div>
            </div>
            
        </div>
        </>
    )
}