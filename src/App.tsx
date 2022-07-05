import React, { useEffect, useState } from 'react';
import { getLocation } from './api/api';
import { Weather } from './components/Weather/Weather';
import { Pagination } from './components/Pagination/Pagination';
import { Cities } from './components/Cities/Cities';
import { Header } from './components/Header/Header'
import { createDatabase } from './IndexedDB/Indexeddb';
import { Options } from './IndexedDB/Indexeddb';

function App() {
  let options = Options;

  const [allCity,setAllCity] = useState(options);
  const [city,setCity] = useState("Kyiv");
  const [currentPage,setCurrentPage] = useState(1);
  const [cityPerPage] = useState(6);
  
  const checkState = (state: any, element: string) => {
    for (let i in state) {
      if (state[i].label === element) {
          return true;
      };
    }
    return false;
  }

  const location = () => {
    navigator.geolocation.getCurrentPosition(async function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const respons = await getLocation(lat, lon);
      const name = respons.name.toUpperCase();
      if (!checkState(options, name)) {
        options.unshift({value: name, label:name});
      };
      setCity(name);
      
    });
  }

  const add = () => {
    for (let i in allCity) {
      createDatabase('add', allCity[i]);
    };
  }

  useEffect(() => {
    createDatabase('get');
    add();
    location();
  }, []);


  const lastCityIndex = currentPage * cityPerPage;
  const firstCityIndex = lastCityIndex - cityPerPage;
  const currentCity = allCity.slice(firstCityIndex, lastCityIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="app">
      <Header
        city={city}
        allCity={allCity}
        setAllCity={setAllCity}
        setCity={setCity}
        checkState={checkState}
      />
      <Weather
        city={city}
      />

      <Cities
        currentCity={currentCity}
        city={city}
        setCity={setCity}
        allCity={allCity}
        setAllCity={setAllCity}
      />
      {allCity.length > 6 &&
        <Pagination
          cityPerPage={cityPerPage}
          totalCity={allCity.length}
          paginate={paginate}
        />
      }
    </div>
  );
}

export default App;
