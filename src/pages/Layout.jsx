import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Sidebar from "../components/Sidebar";
import Inventaires from "../components/Inventaires";
import Achats from "./Achats";
import Historique from "./Historique";
import Parametre from "./Parametre";
import AppBar from "../components/AppBar";

import { BiHome } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import {
  AiOutlineHistory,
  AiOutlineSetting,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Page from "./Page";

const Layout = () => {
  const [activeSide, setActiveSide] = useState("home");

  const renderPage = () => {
    switch (activeSide) {
      case "home":
        return <Dashboard />;
      case "inventaires":
        return <Inventaires />;
      case "achats":
        return <Achats />;
      case "history":
        return <Historique />;
      case "settings":
        return <Parametre />;
      default:
        return <Dashboard />;
    }
  };

  const titlePage = () => {
    switch (activeSide) {
      case "home":
        return (
          <div className="flex gap-2 items-center">
            <BiHome size={24} />
            <h1>Tableau de bord</h1>
          </div>
        );
      case "inventaires":
        return (
          <div className="flex gap-2 items-center">
            <MdOutlineInventory2 size={24} />
            <h1>Liste des inventaires</h1>
          </div>
        );
      case "achats":
        return (
          <div className="flex gap-2 items-center">
            <AiOutlineShoppingCart size={24} />
            <h1>Liste des achats</h1>
          </div>
        );
      case "history":
        return (
          <div className="flex gap-2 items-center">
            <AiOutlineHistory size={24} />
            <h1>Historique des mouvements</h1>
          </div>
        );
      case "settings":
        return (
          <div className="flex gap-2 items-center">
            <AiOutlineSetting size={24} />
            <h1>Paramètres</h1>
          </div>
        );
      default:
        return (
          <div className="flex gap-2 items-center">
            <BiHome size={24} />
            <h1>Tableau de bord</h1>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen max-w-screen bg-gray-100">
      <Sidebar activePage={activeSide} onNavigate={setActiveSide} />

      <main className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ml-56">
        <AppBar title={titlePage()} />
        {renderPage()}
      </main>
    </div>
  );
};

export default Layout;
