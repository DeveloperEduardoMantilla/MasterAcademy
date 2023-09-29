import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../components/global/header.jsx";
import Aside from "../components/global/aside.jsx"
import "../assets/styles/dasboard/dasboard.css"

function Main() {
  return (
    <>
      <main>
      <Aside/>
        <section className='body'>
          <Header/>
          <Outlet/>
        </section>
      </main>
    </>
  );
}

export default Main