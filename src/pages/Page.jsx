import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { CiEdit, CiTrash } from "react-icons/ci";

import UniteForm from "../components/UniteForm";
import ProduitForm from "../components/ProduitForm";

const Page = () => {
  const [produits, setProduits] = useState([]);
  const [unites, setUnites] = useState([]);

  const [openProdModal, setOpenProdModal] = useState(false);
  const [openUnitModal, setOpenUnitModal] = useState(false);

  const [currentUnite, setCurrentUnite] = useState(null);
  const [currentProduit, setCurrentProduit] = useState(null);

  // Chargement des produits et unités depuis la base de données
  const loadProduits = async () => {
    const data = await window.api.getProduits();
    console.log("Produits charge :", data);

    setProduits(data);
  };
  const loadUnites = async () => {
    const data = await window.api.getUnites();
    console.log("Unites charge :", data);

    setUnites(data);
  };

  // Suppression d'une unité ou d'un produit
  const deleteUnite = async (id) => {
    await window.api.deleteUnite(id).then(() => {
      toast.success("Unité supprimée avec succès");
      loadUnites();
    });
  };
  const deleteProduit = async (id) => {
    await window.api.deleteProduit(id).then(() => {
      toast.success("Produit supprimé avec succès");
      loadProduits();
    });
  };

  const handleAddProduit = () => {
    setCurrentProduit(null);
    setOpenProdModal(true);
  };
  const handleAddUnite = () => {
    setCurrentUnite(null);
    setOpenUnitModal(true);
  };

  // Modification d'une unité
  const handleEditProduit = async (id) => {
    const data = await window.api.getProduit(id);
    setCurrentProduit(data);
    setOpenProdModal(true);
  };
  const handleEditUnite = async (id) => {
    const data = await window.api.getUnite(id);
    setCurrentUnite(data);
    setOpenUnitModal(true);
  };

  useEffect(() => {
    loadProduits();
    loadUnites();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-5">
      <div className="flex flex-col gap-1">
        {Array.isArray(produits) && produits.length === 0 && (
          <p>Aucun produit trouvé</p>
        )}

        {Array.isArray(produits) &&
          produits.map((produit) => (
            <div key={produit.id} className="flex gap-3 justify-between w-md">
              <li>
                {produit.nom} - {produit.quantite} {produit.unite} -{" "}
                {produit.prix} Ar
              </li>
              <div className="flex gap-1">
                <Button
                  variant="outlined"
                  onClick={() => handleEditProduit(produit.id)}
                >
                  <CiEdit />
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => deleteProduit(produit.id)}
                >
                  <CiTrash />
                </Button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-col gap-1">
        {Array.isArray(unites) && unites.length === 0 && (
          <p>Aucune unité trouvée</p>
        )}

        {Array.isArray(unites) &&
          unites.map((unite) => (
            <div key={unite.id} className="flex gap-3 justify-between w-md">
              <li>
                {unite.label} - {unite.value}
              </li>
              <div className="flex gap-1">
                <Button
                  variant="outlined"
                  onClick={() => handleEditUnite(unite.id)}
                >
                  <CiEdit />
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => deleteUnite(unite.id)}
                >
                  <CiTrash />
                </Button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex gap-5">
        <button onClick={() => setOpenProdModal(true)} className="btn">
          Ajouter un produit
        </button>

        <button onClick={handleAddUnite} className="btn">
          Ajouter une unité
        </button>
      </div>

      {openProdModal && (
        <ProduitForm
          produit={currentProduit}
          onCancel={() => {
            setOpenProdModal(false);
            setCurrentProduit(null);
          }}
          onSuccess={() => {
            setOpenProdModal(false);
            setCurrentProduit(null);
            loadProduits();
          }}
        />
      )}

      {openUnitModal && (
        <UniteForm
          unite={currentUnite}
          onCancel={() => {
            setOpenUnitModal(false);
            setCurrentUnite(null);
          }}
          onSuccess={() => {
            setOpenUnitModal(false);
            setCurrentUnite(null);
            loadUnites();
          }}
        />
      )}
    </div>
  );
};

export default Page;
