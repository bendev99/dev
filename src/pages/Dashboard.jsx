import { useEffect, useState } from "react";
import { BiTask, BiX, BiXCircle } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import {
  MdAdd,
  MdInventory,
  MdOutlineAutoGraph,
  MdOutlineErrorOutline,
  MdOutlineShoppingCart,
  MdOutlineWarningAmber,
} from "react-icons/md";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

const Dashboard = () => {
  const [produits, setProduits] = useState([]);

  const [showBtn, setShowBtn] = useState(false);

  // Chargement des produits
  const loadProduits = async () => {
    const data = await window.api.getProduits();

    setProduits(data);
  };
  const produitsChange = () => {
    if (produits.length) {
      loadProduits();
    }
  };
  useEffect(() => {
    loadProduits();
  }, [produitsChange]);

  const normProd = produits.filter((p) => Number(p.quantite) >= 3);
  const attentionProd = produits.filter((p) => Number(p.quantite) === 2);
  const critiqueProd = produits.filter((p) => Number(p.quantite) === 1);
  const ruptureProd = produits.filter((p) => Number(p.quantite) === 0);

  return (
    <div className="flex flex-col gap-3 mx-5 my-3">
      {/* RESUME */}
      <div className="grid grid-cols-3 gap-5 items-center justify-around w-full">
        {/* CARD POUR LE QUANTITE DE PRODUIT ENREGISTREE */}
        <Card
          icon={<BiTask size={20} />}
          title="Produits enregistres"
          produits={produits}
          children={
            <p className="font-bold text-2xl">{produits.length} Produits</p>
          }
        />

        {/* CARD POUR LES MOUVEMENTS */}
        <Card
          icon={<MdOutlineAutoGraph size={20} />}
          title="Mouvements"
          produits={produits}
          children={
            <div className="flex gap-16 text-center">
              <div className="flec flex-col text-teal-500">
                <p>Entrée</p>
                <p>10</p>
              </div>
              <div className="border-l border-gray-200"></div>
              <div className="flec flex-col text-red-500">
                <p>Sortie</p>
                <p>5</p>
              </div>
            </div>
          }
        />

        {/* CARD POUR L'ETAT DES INVENTAIRES */}
        <Card
          icon={<MdInventory size={20} />}
          title="Etat des produits"
          children={
            <div className="flex gap-6">
              <span className="flex flex-col gap-1 text-center">
                <p className="text-sm text-orange-400 flex items-center gap-1">
                  <MdOutlineWarningAmber className="text-orange-400" />
                  Attention
                </p>
                <p className="text-orange-400 text-md">
                  {attentionProd.length}
                </p>
              </span>

              <div className="border-l border-l-gray-200"></div>

              <span className="flex flex-col gap-1 text-center">
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <MdOutlineErrorOutline className="text-red-400" />
                  Critique
                </p>
                <p className="text-red-400 text-md">{critiqueProd.length}</p>
              </span>

              <div className="border-l border-l-gray-200"></div>

              <span className="flex flex-col gap-1 text-center">
                <p className="text-sm text-red-700 flex items-center gap-1">
                  <BiXCircle className="text-red-700" />
                  Rupture
                </p>
                <p className="text-red-700 text-md">{ruptureProd.length}</p>
              </span>
            </div>
          }
        />
      </div>

      {/* HERO SECTION */}
      <div className="flex w-full gap-3 items-center justify-around mt-3 p-5">
        <div className="card min-h-120">
          <p className="text-xl font-semibold">Details de vos produits</p>
          <div className="flex flex-col gap-3 w-full items-center">
            <div className="flex flex-col gap-3 w-full items">
              <p className="flex w-full text-left font-medium">
                Produits en rupture
              </p>
              <div className="bg-gray-50 px-5 rounded-md">
                {ruptureProd.map((p) => (
                  <div
                    key={p.id}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <p className="text-xl font-stretch-50%">{p.nom}</p>
                      <p className="text-red-600 text-xs bg-red-200 px-1 rounded-md mb-2">
                        rupture
                      </p>
                    </div>
                    <p className="flex items-center text-red-500 text-xl font-bold">
                      {p.quantite} {p.unite}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full items">
              <p className="flex w-full text-left font-medium">
                Produits critique
              </p>
              <div className="bg-gray-50 px-5 rounded-md">
                {critiqueProd.map((p) => (
                  <div
                    key={p.id}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <p className="text-xl font-stretch-50%">{p.nom}</p>
                      <p className="text-red-400 text-xs bg-orange-100 px-1 rounded-md mb-2">
                        critique
                      </p>
                    </div>
                    <p className="flex items-center text-red-400 text-xl font-bold">
                      {p.quantite} {p.unite}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full items">
              <p className="flex w-full text-left font-medium">
                Produits en alerte
              </p>
              <div className="bg-gray-50 px-5 rounded-md">
                {attentionProd.map((p) => (
                  <div
                    key={p.id}
                    className="w-full flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <p className="text-xl font-stretch-50%">{p.nom}</p>
                      <p className="text-orange-400 text-xs bg-yellow-200 px-1 rounded-md mb-2">
                        alerte
                      </p>
                    </div>
                    <p className="flex items-center text-yellow-600 text-xl font-bold">
                      {p.quantite} {p.unite}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card min-h-120">Graphique entree/sortie</div>
      </div>

      <div className="flex fixed bottom-3 right-3 z-50">
        <button
          className="btn flex w-16 h-16 rounded-full items-center justify-center"
          onClick={() => setShowBtn(!showBtn)}
        >
          {showBtn ? <BiX size={32} /> : <MdAdd size={32} />}
        </button>

        {showBtn && (
          <div className="absolute flex flex-col bottom-18 right-0 w-max gap-3 mr-5 transition-all duration-500 overflow-auto">
            <button className="btn">Ajouter un produit</button>
            <button className="btn">Ajouter une unité</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
