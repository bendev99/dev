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

  // ====================
  //      IMPRESSION
  // ====================
  ipcMain.handle("print-invoice", async (event, invoiceData) => {
    try {
      const escpos = require("escpos");
      escpos.USB = require("escpos-usb");

      const device = new escpos.USB();
      const printer = new escpos.Printer(device);

      // Ouverture USB
      await new Promise((resolve, reject) => {
        device.open((err) => (err ? reject(err) : resolve()));
      });

      console.log("✅ Connexion USB établie");

      // === Construction du ticket avec méthodes VALIDES ===

      // En-tête centré
      printer
        .align("ct")
        .font("a")
        .text(invoiceData.storeName || "MON MAGASIN")
        .text(`Ticket: ${invoiceData.ticketId || "N/A"}`)
        .text(`Date: ${new Date().toLocaleString()}`)
        .text("--------------------------------") // Séparateur manuel
        .control("LF") // Saut de ligne
        .align("lt")
        .font("b");

      // Articles (alignés à gauche)
      invoiceData.items?.forEach((item) => {
        const name = String(item.name).substring(0, 20).padEnd(20, " ");
        const qty = String(item.qty).padStart(3, " ");
        const total = (item.qty * item.price).toFixed(2).padStart(8, " ");
        printer.text(`${name} ${qty} ${total}`).control("LF");
      });

      // Total & pied de page
      printer
        .text("--------------------------------")
        .control("LF")
        .align("rt")
        .font("a")
        .size(1, 1)
        .text(`TOTAL: ${Number(invoiceData.total).toFixed(2)} €`)
        .size(0, 0)
        .control("LF")
        .align("ct")
        .text("Merci de votre visite !")
        .control("LF")
        .control("LF") // Double saut avant coupe
        .cut() // Coupe le papier (flush le buffer)
        .close(); // Ferme la connexion USB

      return { success: true };
    } catch (err) {
      console.error("❌ Erreur impression:", err);
      return {
        success: false,
        error: err.message || "Échec de l'impression",
      };
    }
  });
};

module.exports = { registerHandlers };
