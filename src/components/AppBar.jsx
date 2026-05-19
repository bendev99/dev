import React from "react";
import { BiBox, BiUser } from "react-icons/bi";

const AppBar = ({ title }) => {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="flex w-full bg-white p-5 shadow items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-md text-gray-400 font-semibold mx-auto">{today}</p>
      <div className="bg-teal-500 p-2 items-center justify-center rounded-full">
        <BiUser size={32} />
      </div>
    </nav>
  );
};

export default AppBar;
