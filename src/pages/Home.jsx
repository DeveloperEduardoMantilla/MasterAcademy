import React from "react";
import Header from "../components/home/header";
import "../assets/styles/home/home.css"

export default function Home(){
    return(
        <>
            <Header/>
            <div className="container">
                <div className="content">
                    <p>Contenido del home de la pagina de MasterAcademy</p>
                </div>
            </div>
        </>
    );
}
