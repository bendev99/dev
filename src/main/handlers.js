const { ipcMain } = require("electron");
const database = require("../db/database");

const registerHandlers = () => {
  // ====================
  //      PRODUITS
  // ====================
  ipcMain.handle("get-produits", () => {
    return database.getProduits();
  });

  ipcMain.handle("get-produit", (event, id) => {
    return database.getProduit(id);
  });

  ipcMain.handle("add-produit", (event, produit) => {
    const { nom, quantite, prix, unite } = produit;
    database.addProduit(nom, quantite, prix, unite);
  });

  ipcMain.handle("update-produit", (event, produit) => {
    const { id, nom, quantite, prix, unite } = produit;
    database.updateProduit(id, nom, quantite, prix, unite);
  });

  ipcMain.handle("delete-produit", (event, id) => {
    return database.deleteProduit(id);
  });

  // ====================
  //      UNITES
  // ====================
  ipcMain.handle("get-unites", () => {
    return database.getUnites();
  });

  ipcMain.handle("get-unite", (event, id) => {
    return database.getUnite(id);
  });

  ipcMain.handle("add-unite", (event, unite) => {
    const { label, value } = unite;
    database.addUnite(label, value);
  });

  ipcMain.handle("update-unite", (event, unite) => {
    const { id, label, value } = unite;
    database.updateUnite(id, label, value);
  });

  ipcMain.handle("delete-unite", (event, id) => {
    return database.deleteUnite(id);
  });
};

module.exports = { registerHandlers };
