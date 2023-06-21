import Dexie, { Table } from "dexie";

const dbName = "SPQDB";

class Store extends Dexie {
  source!: Table;
  store!: Table;
  constructor() {
    super(dbName);
    this.version(1).stores({
      source: "++id",
      store: "++id",
    });
  }
}

export const db = new Store();

export const initDB = async (fields: string) => {
  db.close();
  db.on("blocked", () => false); // Silence console warning of blocked event.
  await db.delete();
  db.version(1).stores({ source: "++id", store: fields });
  await db.open();
};
