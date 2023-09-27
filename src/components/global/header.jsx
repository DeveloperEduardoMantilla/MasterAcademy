import Home from "../../pages/Home.jsx";
import { Link } from "react-router-dom";
import "../../assets/styles/global/header.css"
import foto from "../../assets/img/profile.png";

async function exit(){
    try{
        document.cookie = "MasterAcademy-Session=; max-age=0;";
        window.location.href= "http://localhost:5173/"
    }catch(e){
        console.log(e.message);
    }
}

export default function Header(){
    return(
        <>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
      
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle pe-5 me-5" to={<Home/>} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={foto} />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" to={<Home/>}>Settings</a></li>
                      <li><a className="dropdown-item" onClick={exit}>Exit</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        </>
    )
}
