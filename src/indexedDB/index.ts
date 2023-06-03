const dbName = "SPQDB";
const storeName = "store";

const openDB = () => {
  let request: IDBOpenDBRequest;
  let db: IDBDatabase;
  const indexedDB: IDBFactory =
    window.indexedDB ||
    (<any>window).mozIndexedDB ||
    (<any>window).webkitIndexedDB ||
    (<any>window).msIndexedDB;

  return new Promise<IDBDatabase>((resolve, reject) => {
    request = indexedDB.open(dbName);

    request.onupgradeneeded = () => {
      db = request.result;
      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      reject(`IndexedDB error: ${request.error}`);
    };
  });
};

export const getAllData = () =>
  new Promise<any[]>((resolve, reject) => {
    openDB().then((db) => {
      const request = db
        .transaction(storeName, "readonly")
        .objectStore(storeName)
        .getAll();

      request.onsuccess = (event: any) => resolve(event.target.result);
      request.onerror = (error: any) => reject(error);
    });
  });

export const getData = (key: number) =>
  new Promise<any>((resolve, reject) => {
    openDB().then((db) => {
      const request = db
        .transaction(storeName, "readonly")
        .objectStore(storeName)
        .get(key);

      request.onsuccess = (event: any) => resolve(event.target.result);
      request.onerror = (error: any) => reject(error);
    });
  });

export const upsert = (value: any) =>
  new Promise<any>((resolve, reject) => {
    openDB().then((db) => {
      const request = db
        .transaction(storeName, "readwrite")
        .objectStore(storeName)
        .put(value);

      request.onsuccess = (event: any) => resolve(event.target.result);
      request.onerror = (error: any) => reject(error);
    });
  });

export const bulkUpsert = (values: any[]) =>
  new Promise<any>((resolve, reject) => {
    openDB().then((db) => {
      const tr = db.transaction(storeName, "readwrite", {
        durability: "relaxed",
      });
      const store = tr.objectStore(storeName);

      for (let i = 0; i < values.length; i++) {
        store.put(values[i]);
      }

      tr.oncomplete = (event: any) => resolve(event.target.result);
      tr.onerror = (error: any) => reject(error);
    });
  });

export const remove = (key: number) =>
  new Promise<any>((resolve, reject) => {
    openDB().then((db) => {
      const request = db
        .transaction(storeName, "readwrite")
        .objectStore(storeName)
        .delete(key);

      request.onsuccess = (event: any) => resolve(event.target.result);
      request.onerror = (error: any) => reject(error);
    });
  });

export const bulkRemove = (keys: number[]) =>
  new Promise<any>((resolve, reject) => {
    openDB().then((db) => {
      const tr = db.transaction(storeName, "readwrite", {
        durability: "relaxed",
      });
      const store = tr.objectStore(storeName);

      for (let i = 0; i < keys.length; i++) {
        store.delete(keys[i]);
      }

      tr.oncomplete = (event: any) => resolve(event.target.result);
      tr.onerror = (error: any) => reject(error);
    });
  });

export const clear = () =>
  new Promise<any>((resolve, reject) => {
    openDB().then((db) => {
      const request = db
        .transaction(storeName, "readwrite")
        .objectStore(storeName)
        .clear();

      request.onsuccess = () => resolve("Cleared");
      request.onerror = (error: any) => reject(error);
    });
  });
