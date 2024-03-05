/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../Animations/Spinner";
import {useAuth} from '../Context/Authcontext'
import Chart_fill from '../assets/Chart_fill.png'
import User from '../assets/User.png'
import Folder from '../assets/Folder.png'
import Calendar from '../assets/Calendar.png'
import Setting from '../assets/Setting.png'
import Control from '../assets/control.png'
import Logo from '../assets/logo.png'

const Index = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {logout} = useAuth()
  const Menus = [
    { title: "Inicio", src: Chart_fill, path: "/" },
    { title: "Clientes", src: User, gap: true, path: "/clientes" },
    { title: "Turnos Clientes", src: Folder, path: "/turnos-clientes" },
    { title: "Horarios Disponibles", src: Calendar, path: "/horarios" },
    { title: "Alta de usuario", src: Setting, gap: true, path: "/agregarUsuario" },
    { title: "Cerrar Sesión", src: Control, gap: true, action: "logout" },
  ];

  const handleNavigate = (path, action) => {
    setLoading(true);
  
    if (action === "logout") {
      setTimeout(() => {
        logout();
        navigate('/login'); 

      }, 1000); 
    } else {
      setTimeout(() => {
        setLoading(false);
        navigate(path);
      }, 3000);
    }
  };



  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src={Control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Panel de Gestión
          </h1>
        </div>
        <ul className="pt-6">
  {Menus.map((menu, index) => (
    <li
      key={index}
      className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
${menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
    >
      <button
        onClick={() => handleNavigate(menu.path, menu.action)}
        className="flex gap-x-4 items-center w-full text-left"
      >
        {menu.src && (
          <img
            src={menu.src}
            alt={menu.title}
            className="w-6 h-6"
          />
        )}
        <span
          className={`${!open && "hidden"} origin-left duration-200`}
        >
          {menu.title}
        </span>
      </button>
    </li>
  ))}
</ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
