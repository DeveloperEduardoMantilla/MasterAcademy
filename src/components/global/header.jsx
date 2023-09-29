import Home from "../../pages/Home.jsx";
import { Link } from "react-router-dom";
import "../../assets/styles/global/header.css"
import foto from "../../assets/img/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";

async function exit(){
    try{
        document.cookie = "MasterAcademy-Session=; max-age=0;";
        window.location.href= "http://localhost:5173/"
    }catch(e){
        console.log(e.message);
    }
}

function saludar(){
    const aside = document.getElementById('aside');

    aside.classList.toggle('show');
}

export default function Header(){
    return(
        <>
        <header>
          <nav className="navbar navbar-expand-sm navbar-dark">
            <div className="container">
              <div className="btnHeader">
                <button onClick={saludar}><FontAwesomeIcon className="rotate-vert-center" icon={faBars} style={{color: "#2E86C1",}}/></button>
              </div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <p className="nav-link">eduardo.5253</p>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle pe-5 me-5" to={<Home/>} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="https://cdn.discordapp.com/avatars/606870241720401959/dcc4677ea230feaa46fc8a3810a6d08a.png" />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" to={<Home/>}>Profile</a></li>
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
