import React from 'react';
import "../assets/styles/login.css"
import imgLogin from "../assets/img/login/monitor.svg"
import discord from "../assets/img/login/discord.png"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

async function  logueoDiscord(){
  const ipBackEnd = import.meta.env.VITE_IP_BACKEND;
  const portBackEnd =import.meta.env.VITE_PORT_BACKEND;
  try{
    document.cookie = "MasterAcademy-Session=; max-age=0;";
    let result =await fetch(`http://${ipBackEnd}:${portBackEnd}`);
    if(result.ok){
      window.location.href= `http://${ipBackEnd}:${portBackEnd}/login`
    }
  }catch(e){
    Swal.fire({
      position: 'bottom-end', 
      icon: 'error',
      title: 'Servidor no disponible',
      text:"Por favor comunicate con el administrador del sistema.",
      toast: true, 
      showConfirmButton: false, 
      timer: 3000, 
      timerProgressBar: true
    })
  } 
}

export default function Login() {
  return (
    <div className="login">
      <div className="content-login">
          <div className="content-md1">
              <img src={imgLogin} />
              <p>MasterAcademy is a web-based software development project with an educational approach that allows users called students as a role within the system to acquire knowledge managed by administrators.</p>
          </div>
          <div className="content-md2">
              <h3>Welcome to<br/> Master Academy</h3>
              <p>MasterAcademy is a web-based software development project with an educational approach that allows users called students as a role within the system to acquire knowledge managed by administrators.</p>
              <div className='buttons'>
                <button onClick={logueoDiscord} className="btn btn-ingresar">Login Discord</button>
                <Link className='btn btn-cancelar' to={"/"}>Cancel</Link>
              </div>
          </div>
      </div>
    </div>
  );
}
