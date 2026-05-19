import React from "react";
import { BiTask } from "react-icons/bi";

const Card = ({ icon, title, produits, children }) => {
  return (
    <div className="card w-full h-full min-h-30 hover:scale-101 transition-all duration-300">
      <span className="flex gap-2 items-center justify-center">
        {icon}
        <p className="text-xl font-semibold">{title}</p>
      </span>
      {children}
    </div>
  );
};

export default Card;
