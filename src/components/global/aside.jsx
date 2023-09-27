import react from "react";
import "../../assets/styles/dasboard/aside.css"
import { Link } from "react-router-dom";

export default function Aside(){
    return(
        <>
        <div className="aside">
            <p className="title">Master Academy</p>
            <Link className="to">Home</Link>
            <Link className="to">Services</Link>
            <Link className="to">Contact</Link>
            <Link className="to">Out</Link>
        </div>
        </>
    )
}