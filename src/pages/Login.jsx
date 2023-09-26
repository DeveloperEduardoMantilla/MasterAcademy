import React from 'react';
import "../assets/styles/login.css"
import imgLogin from "../assets/img/login/login.png"
import discord from "../assets/img/login/discord.png"

async function  logueoDiscord(){
  try{
    let result =await fetch("http://localhost:5010");
    console.log(result);
    if(result.ok){
      window.location.href= "http://localhost:5010/login"
    }
  }catch(e){
    console.log(`Error => ${e.message}`);
  } 
}

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
              <button className='btn btn-ma' onClick={logueoDiscord}><img className='discord-img' src={discord}/>Login Discord</button>
              <div className='alert alert-danger'>asdasd</div>
          </div>
      </div>
    </div>
  );
}

export default Login