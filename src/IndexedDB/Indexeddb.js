const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;

export const createDatabase = (type, object) => {

    if (!indexedDB) throw new Error("Your browser doesn't support IndexedBD");

    let request = window.indexedDB.open('City', 1);

    request.onerror = (e) => {
    };

    request.onsuccess = (e) => {
        db = request.result;
        if (type === 'get') {
          getStudent();
        } else if (type === 'delete') {
          DeleteStore();
        }
        else if (type === 'add') {
          addStudent(object);
        }
        
    };

    request.onupgradeneeded = (e) => {

      const db = request.result;
  
      const objectStore = db.createObjectStore('city', {keyPath: 'value'});
  
      objectStore.createIndex('label', 'label', { unique: false });

      objectStore.put({ value: 'KYIV', label: 'KYIV' });

      objectStore.transaction.oncompleted = (e)=> {
      }
  
  };

}

export const addStudent = (object) =>{

  const transaction = db.transaction('city', 'readwrite');

  transaction.oncomplete = function(event) {
  };

  transaction.onerror = function(event) {
  };

  const objectStore = transaction.objectStore('city');

  const request = objectStore.add(object);

  request.onsuccess = ()=> {
  };

  request.onerror = (err)=> {
  };
}

export const getStudent = () =>{
  const request = db.transaction('city')
                   .objectStore('city')
                   .getAll();

    request.onsuccess = ()=> {
        const students = request.result;

        for (let i in students) {
          Options.push(students[i])
        }
    };

    request.onerror = (err)=> {
    };
}

function DeleteStore(){
  const request = db.transaction('city', 'readwrite')
                    .objectStore('city')
                    .clear();

  request.onsuccess = ()=> {
  };

  request.onerror = (err)=> {
  };
}

export let Options = [];
