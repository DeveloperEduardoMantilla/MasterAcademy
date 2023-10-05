import { Link } from "react-router-dom";
import {useState, useEffect, React} from "react"
import "../../assets/styles/global/header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";

async function exit(){
    try{
        const ipFrontEnd = import.meta.env.VITE_IP_FRONTEND;
        const portFrontEnd = import.meta.env.VITE_PORT_FRONTEND;
        document.cookie = "MasterAcademy-Session=; max-age=0;";
        window.location.href= `http://${ipFrontEnd}:${portFrontEnd}/`
    }catch(e){
        console.log(e.message);
    }
}

function btnSidebar(){
    const aside = document.getElementById('aside');
    aside.classList.toggle('show');
}

export default function Header(){
  const ipBackEnd = import.meta.env.VITE_IP_BACKEND;
  const portBackEnd = import.meta.env.VITE_PORT_BACKEND; 

  const [UserData, setUserData] = useState([]);
  useEffect(() => {
    let ruta=`http://${ipBackEnd}:${portBackEnd}/dashboard/userLogout`;
    fetch(ruta, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((e) => {
        console.log("Error data =>",e);
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
