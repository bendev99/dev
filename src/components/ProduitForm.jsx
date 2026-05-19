import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";

const ProduitForm = ({ produit, onSuccess, onCancel }) => {
  const isEdit = Boolean(produit?.id);

  const [nomProduit, setNomProduit] = useState("");
  const [quantiteProduit, setQuantiteProduit] = useState("");
  const [prixProduit, setPrixProduit] = useState("");
  const [uniteProduit, setUniteProduit] = useState("pcs");

  const [unites, setUnites] = useState([]);

  const loadUnites = async () => {
    const data = await window.api.getUnites();
    setUnites(data);
  };

  // Synchronisation PROPS → STATE
  useEffect(() => {
    loadUnites();

    if (isEdit) {
      setNomProduit(produit.nom || "");
      setQuantiteProduit(produit.quantite || "");
      setPrixProduit(produit.prix || "");
      setUniteProduit(produit.unite || "");
    } else {
      setNomProduit("");
      setQuantiteProduit("");
      setPrixProduit("");
      setUniteProduit("");
    }
  }, [produit, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await window.api.updateProduit({
        id: produit.id,
        nom: nomProduit,
        quantite: quantiteProduit,
        prix: prixProduit,
        unite: uniteProduit,
      });

      toast.success("Produit modifiée avec succès");
    } else {
      await window.api.addProduit({
        nom: nomProduit,
        quantite: quantiteProduit,
        prix: prixProduit,
        unite: uniteProduit,
      });

      toast.success("Produit ajoutée avec succès");
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="form-card">
        <h2 className="text-xl font-semibold">
          {isEdit ? "Modifier le produit" : "Ajouter un produit"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-5">
          <div className="space-y-3">
            <div>
              <label className="text-gray-600 mx-1">Nom du produit</label>
              <input
                type="text"
                placeholder="Ex : Riz, Sucre, etc..."
                value={nomProduit}
                onChange={(e) => setNomProduit(e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="text-gray-600 mx-1">Prix unitaire (Ar)</label>
              <input
                type="number"
                min={0}
                placeholder="Ex : 5000"
                value={prixProduit}
                onChange={(e) => setPrixProduit(e.target.value)}
                className="input"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div>
              <label className="text-gray-600 mx-1">Quantité</label>
              <input
                type="number"
                min={0}
                placeholder="Ex : 10"
                value={quantiteProduit}
                onChange={(e) => setQuantiteProduit(e.target.value)}
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mx-1">Unité</label>
              <select
                name="unite"
                value={uniteProduit}
                onChange={(e) => setUniteProduit(e.target.value)}
                className="input text-gray-600"
              >
                {unites.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 justify-center mt-3 mx-10">
            <button type="submit" className="btn w-full">
              {isEdit ? "Modifier" : "Ajouter"}
            </button>

            <button
              onClick={onCancel}
              className="btn w-full bg-red-300 hover:bg-red-400"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProduitForm;
