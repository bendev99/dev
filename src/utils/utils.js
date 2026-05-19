import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineHistory,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineInventory2, MdSettings } from "react-icons/md";

const MENU = [
  { id: "home", icon: AiOutlineHome, title: "Dashboard" },
  {
    id: "inventaires",
    icon: MdOutlineInventory2,
    title: "Inventaires",
  },
  { id: "achats", icon: AiOutlineShoppingCart, title: "Achats" },
  { id: "history", icon: AiOutlineHistory, title: "Historique" },
  { id: "settings", icon: AiOutlineSetting, title: "Paramètres" },
];

const ProduitStatut = ({ p }) => {
  if (p.length > 2) {
    return "Disponible";
  }

  if (p.length <= 2) {
    return "Attention";
  }

  if (p.length <= 1) {
    return "Critique";
  }
  if (p.length === 0) {
    return "Rupture";
  }
};

export { MENU };
