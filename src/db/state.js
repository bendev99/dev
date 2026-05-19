const db = require("better-sqlite3")("base.db");

const items = [
  { item: "Item 1", quantity: 10 },
  { item: "Item 2", quantity: 5 },
  { item: "Item 3", quantity: 20 },
];

const createTable = () => {
  const sql = `
    CREATE TABLE inventaires (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item TEXT NOT NULL,
      quantity INTEGER
    )
  `;
  db.prepare(sql).run();
};

const insertInventaire = (item, quantity) => {
  return db
    .prepare("INSERT INTO inventaires (item, quantity) VALUES (?, ?)")
    .run(item, quantity);
};

const getInventaires = () => {
  const sql = `
    SELECT * FROM inventaires
  `;
  const inventaires = db.prepare(sql).all();
  console.log(inventaires);

  return inventaires;
};

const updateInventaire = (id, item, quantity) => {
  const sql = `
    UPDATE inventaires
    SET item = ?, quantity = ?
    WHERE id = ?
  `;
  db.prepare(sql).run(item, quantity, id);
};

const deleteInventaire = (id) => {
  const sql = `
    DELETE FROM inventaires
    WHERE id = ?
  `;
  db.prepare(sql).run(id);
};

const deleteAllInventaires = () => {
  const sql = `
    DELETE FROM inventaires
  `;
  db.prepare(sql).run();
};

const deleteTable = () => {
  const sql = `
    DROP TABLE IF EXISTS inventaires
  `;
  db.prepare(sql).run();
};

const getInventaire = (id) => {
  const sql = `SELECT * FROM inventaires WHERE id = ?`;

  // const data = db.prepare(sql).all(id);
  const data = db.prepare(sql).get(id); // C'est pareil (mais plus precis)
  console.log(data);
};

// insertInventaire("Item 4", 8);
getInventaire(2);
