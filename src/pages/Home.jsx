import React from "react";
import Header from "../components/home/header";
import "../assets/styles/home/home.css"

function Home(){
    return(
        <>
            <Header/>
            <div className="container">
                <div className="content">
                    <p>Contenido del home de la pagina de MasterAcademy</p>
                </div>
            </div>
        </>
    )
}

export default Home;