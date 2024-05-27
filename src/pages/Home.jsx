import React from "react";
import { Sidebar } from "../components";
import { NavLink } from "react-router-dom";

function Home() {

  return (
    <div className="flex flex-row space-x-2 items-start px-4 pt-4 h-[calc(100vh-45px)]">
    <Sidebar/>
    <div className="hero w-full h-full">
        
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold">Welcome to ByteScribe</h1>
          <p className="py-6">
          Elevate your coding experience with our lightweight, minimalistic yet powerpacked code editor, supporting a wide range of languages and offering a rich theme library. Dive into seamless development with integrated <NavLink to="/sandbox" className="text-cyan-500">code playground</NavLink> feature designed for effortless creativity and productivity.
          </p>
          <NavLink to="/editor">
          <button className="btn btn-primary">Code It Up !</button>
          </NavLink>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;
