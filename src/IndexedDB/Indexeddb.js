const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

export class IndexedDb {

  constructor(dbName, dbVersion, dbUpgrade) {

    return new Promise((resolve, reject) => {

      this.db = null;

      if (!('indexedDB' in window)) reject('not supported');

      const dbOpen = indexedDB.open('City', 1);

      dbOpen.onupgradeneeded = (e) => {
        const db = dbOpen.result;
        console.log(1)
        const objectStore = db.createObjectStore('city', {keyPath: 'value'});
    
        objectStore.createIndex('label', 'label', { unique: false });
  
        objectStore.put({ value: 'KYIV', label: 'KYIV' });
  
        objectStore.transaction.oncompleted = (e)=> {
        }
    
    };

      if (dbUpgrade) {
        console.log(true);
        dbOpen.onupgradeneeded = e => {
          dbUpgrade(dbOpen.result, e.oldVersion, e.newVersion);
        };
      }

      dbOpen.onsuccess = () => {
        this.db = dbOpen.result;
        resolve( this );
      };

      dbOpen.onerror = e => {
        reject(`IndexedDB error: ${ e.target.errorCode }`);
      };

    });

  }

  get() {
    return new Promise((resolve, reject) => {

      const request = this.db.transaction('city')
                       .objectStore('city')
                       .getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };

    });

  }

  delete() {

    return new Promise((resolve, reject) => {

      const request = this.db.transaction('city', 'readwrite')
                       .objectStore('city')
                       .clear();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  add(object) {
    return new Promise((resolve, reject) => {

      const transaction = this.db.transaction('city', 'readwrite');

    transaction.oncomplete = function(event) {
    };

    transaction.onerror = function(event) {
    };

    const objectStore = transaction.objectStore('city');

    const request = objectStore.add(object);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}

