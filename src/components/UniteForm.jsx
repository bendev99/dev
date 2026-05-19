import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UniteForm = ({ unite, onSuccess, onCancel }) => {
  const isEdit = Boolean(unite?.id);

  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  // Synchronisation PROPS → STATE
  useEffect(() => {
    if (isEdit) {
      setLabel(unite.label || "");
      setValue(unite.value || "");
    } else {
      setLabel("");
      setValue("");
    }
  }, [unite, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await window.api.updateUnite({
        id: unite.id,
        label: label,
        value: value,
      });

      toast.success("Unité modifiée avec succès");
    } else {
      await window.api.addUnite({
        label: label,
        value: value,
      });

      toast.success("Unité ajoutée avec succès");
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="form-card">
        <h2 className="text-xl font-semibold">
          {isEdit ? "Modifier l’unité" : "Ajouter une unité"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="space-y-2 mx-5">
            <div className="">
              <label className="text-gray-600 mx-1">Nom de la mesure</label>
              <input
                id="label"
                type="text"
                placeholder="Ex : Kilogramme"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="input"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-600 mx-1">Abréviation</label>
              <input
                id="value"
                type="text"
                placeholder="Ex : kg"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 justify-center mt-3 mx-10">
            <button type="onSubmit" className="btn w-full">
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

export default UniteForm;
