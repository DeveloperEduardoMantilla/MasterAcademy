import React from 'react';
import "../assets/styles/login.css"
import imgLogin from "../assets/img/login/login.png"
import discord from "../assets/img/login/discord.png"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

async function  logueoDiscord(){
  try{
    let result =await fetch("http://localhost:5010");
    if(result.ok){
      window.location.href= "http://localhost:5010/login"
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
              <img src={imgLogin} alt="" />
              <p>MasterAcademy is a web-based software development project with an educational approach that allows users called students as a role within the system to acquire knowledge managed by administrators.</p>
          </div>
          <div className="content-md2">
              <h3>Bienvenidos a Master Academy</h3>
              <p>MasterAcademy is a web-based software development project with an educational approach that allows users called students as a role within the system to acquire knowledge managed by administrators.</p>
              <div>
                <button className='btn btn-ma' onClick={logueoDiscord}><img className='discord-img' src={discord}/>Login Discord</button>
                <Link className='btn btn-cancelar' to={"/"}>Cancelar</Link>
              </div>
          </div>
      </div>
    </div>
  );
}
