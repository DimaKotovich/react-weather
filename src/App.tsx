import React, { useEffect, useState } from 'react';
import { getLocation } from './api/api';
import { Weather } from './components/Weather/Weather';
import { Pagination } from './components/Pagination/Pagination';
import { Cities } from './components/Cities/Cities';
import { Header } from './components/Header/Header'
import { IndexedDb } from './IndexedDB/Indexeddb';

function App() {

  const [allCity,setAllCity] = useState([{}]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city,setCity] = useState("");
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

  const location = async () => {
    navigator.geolocation.getCurrentPosition(async function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const respons = await getLocation(lat, lon);
      const name = respons.name.toUpperCase();
      const open = await new IndexedDb('City', 1);
      const get = await open.get();
      if (!checkState(get, name) && !checkState(allCity, name)) {
        console.log('Location');
        await open.add({value: name, label:name});
        allCity.unshift({value: name, label:name});
      }
      setWeather(respons);
    });
  }

  const connectDB = async () => {
    const open = await new IndexedDb('City', 1);
    const get = await open.get();

    await setCity(get[get.length-1].value);
    await setAllCity(get);
    setCurrentPage(Math.ceil(get.length/6));
  }

  useEffect(() => {
    location();
    setTimeout(connectDB, 200);
  }, []);

  

  const lastCityIndex = currentPage * cityPerPage;
  const firstCityIndex = lastCityIndex - cityPerPage;
  const currentCity = allCity.slice(firstCityIndex, lastCityIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  return (
    <div className="app">
      <Header
        allCity={allCity}
        setAllCity={setAllCity}
        checkState={checkState}
        setWeather={setWeather}
      />

      <Weather
        city={city}
        weather={weather}
        setWeather={setWeather}
      />

      <Cities
        currentCity={currentCity}
        setCity={setCity}
        allCity={allCity}
        setAllCity={setAllCity}
        weather={weather}
      />
      {allCity.length > 6 &&
        <Pagination
          cityPerPage={cityPerPage}
          totalCity={allCity.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      }
    </div>
  );
}

export default App;
