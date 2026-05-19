const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getProduits: () => ipcRenderer.invoke("get-produits"),
  getProduit: (id) => ipcRenderer.invoke("get-produit", id),
  addProduit: (produit) => ipcRenderer.invoke("add-produit", produit),
  updateProduit: (produit) => ipcRenderer.invoke("update-produit", produit),
  deleteProduit: (id) => ipcRenderer.invoke("delete-produit", id),

  getUnites: () => ipcRenderer.invoke("get-unites"),
  getUnite: (id) => ipcRenderer.invoke("get-unite", id),
  addUnite: (unite) => ipcRenderer.invoke("add-unite", unite),
  updateUnite: (unite) => ipcRenderer.invoke("update-unite", unite),
  deleteUnite: (id) => ipcRenderer.invoke("delete-unite", id),
});
