import React from 'react';
import "../assets/styles/login.css"
import imgLogin from "../assets/img/login/login.png"
import discord from "../assets/img/login/discord.png"

function Login() {
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
              <button className='btn btn-ma'><img className='discord-img' src={discord}/>Login Discord</button>
          </div>
      </div>
    </div>
  );
}

export default Login