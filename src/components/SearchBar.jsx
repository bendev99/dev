import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  return (
    <div className="flex gap-3 bg-white w-full p-3 items-center justify-between rounded-xl shadow-md">
      <div className="flex gap-3 relative items-center w-full">
        <BiSearch className="absolute mx-3 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="input pl-8 max-w-md"
        />
      </div>

      <div className="flex gap-5 mx-5 w-full items-center">
        <select name="produit" id="produit" className="input">
          <option value="all">Tous les produits</option>
          <option value="attention">Faible</option>
          <option value="critique">Critique</option>
          <option value="rupture">En rupture</option>
        </select>
        <select name="trie" id="trie" className="input ">
          <option value="nom">Nom</option>
          <option value="prix">Prix</option>
          <option value="quantite">Quantité</option>
        </select>

        <button className="btn">Historique</button>
        <button className="btn">Entree/Sortie</button>
      </div>
    </div>
  );
};

export default SearchBar;
