const reqbase = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "dev.db");
const db = new reqbase(dbPath);

// ==============================
//      CREATION DES TABLES
// ==============================
db.exec(`
  CREATE TABLE IF NOT EXISTS produits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    quantite INTEGER NOT NULL DEFAULT 0,
    prix REAL NOT NULL,
    unite TEXT NOT NULL DEFAULT 'pcs',
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS unites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    value TEXT NOT NULL
  );
`);

// ====================
//      PRODUITS
// ====================
const getProduits = () => {
  const req = db.prepare("SELECT * FROM produits ORDER BY nom ASC");
  return req.all();
};

const getProduit = (id) => {
  const req = db.prepare("SELECT * FROM produits WHERE id = ?");
  return req.get(id);
};

const addProduit = (nom, quantite, prix, unite = "pcs") => {
  const req = db.prepare(
    "INSERT INTO produits (nom, quantite, prix, unite) VALUES (?, ?, ?, ?)",
  );
  return req.run(nom, quantite, prix, unite);
};

const updateProduit = (id, nom, quantite, prix, unite) => {
  const req = db.prepare(
    "UPDATE produits SET nom = ?, quantite = ?, prix = ?, unite = ? WHERE id = ?",
  );
  return req.run(nom, quantite, prix, unite, id);
};

const deleteProduit = (id) => {
  const req = db.prepare("DELETE FROM produits WHERE id = ?");
  return req.run(id);
};

// ====================
//      UNITES
// ====================
const getUnites = () => {
  const req = db.prepare("SELECT * FROM unites");
  return req.all();
};

const getUnite = (id) => {
  const req = db.prepare("SELECT * FROM unites WHERE id = ?");
  return req.get(id);
};

const addUnite = (label, value) => {
  const req = db.prepare("INSERT INTO unites (label, value) VALUES (?, ?)");
  return req.run(label, value);
};

const updateUnite = (id, label, value) => {
  const req = db.prepare("UPDATE unites SET label = ?, value = ? WHERE id = ?");
  return req.run(label, value, id);
};

const deleteUnite = (id) => {
  const req = db.prepare("DELETE FROM unites WHERE id = ?");
  return req.run(id);
};

module.exports = {
  // PRODUITS
  getProduits,
  getProduit,
  addProduit,
  updateProduit,
  deleteProduit,

  // UNITES
  getUnites,
  getUnite,
  addUnite,
  updateUnite,
  deleteUnite,
};
