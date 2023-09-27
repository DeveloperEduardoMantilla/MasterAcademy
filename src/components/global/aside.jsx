import react from "react";
import "../../assets/styles/dasboard/aside.css"
import { Link } from "react-router-dom";

export default function Aside(){
    return(
        <>
        <div className="aside">
            <p className="title">Master Academy</p>
            <Link className="to">Home</Link>
            <Link className="to">Courses</Link>
            <Link className="to">My Courses</Link>
            <Link className="to">Exit</Link>
        </div>
        </>
    )
}