import Dexie, { Table } from "dexie";

const dbName = "SPQDB";
const storeName = "store";

class Store extends Dexie {
  store!: Table;
  constructor() {
    super(dbName);
    this.version(1).stores({
      [storeName]: "++id",
    });
  }
}

export const db = new Store();

export const initDB = async (fields: string) => {
  db.close();
  db.on("blocked", () => false); // Silence console warning of blocked event.
  await db.delete();
  db.version(1).stores({ [storeName]: fields });
  await db.open();
};
