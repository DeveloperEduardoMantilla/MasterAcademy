import Home from "../../pages/Home.jsx";
import { Link } from "react-router-dom";
import {useState, useEffect, React} from "react"
import "../../assets/styles/global/header.css"
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

function btnSidebar(){
    const aside = document.getElementById('aside');

    aside.classList.toggle('show');
}

export default function Header(){
  const [UserData, setUserData] = useState([]);
  useEffect(() => {
    let ruta="http://localhost:5010/dashboard/userLogout";
    fetch(ruta, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log("Error 23 => " + error);
      });
  }, []);
  
    return(
        <>
        <header>
          <nav className="navbar navbar-expand-sm navbar-dark">
            <div className="container">
              <div className="btnHeader">
                <button onClick={btnSidebar}><FontAwesomeIcon className="rotate-vert-center" icon={faBars} style={{color: "#2E86C1",}}/></button>
              </div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <p className="nav-link">{UserData.username}</p>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle pe-5 me-5" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={UserData.profile} />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to={"/dashboard/profile"}>Profile</Link></li>
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
