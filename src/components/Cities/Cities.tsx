import React, { FC } from 'react';
import CityImage from '../../image/city.png';
import classNames from 'classnames';
import './cities.scss';
import Delete from '../../image/delete.png';
import { IndexedDb } from '../../IndexedDB/Indexeddb';

interface Props {
  currentCity: any
  setCity: (city: string) => void 
  setAllCity: (param: any) => void
  allCity: any
  weather: Weather | null
}

export const Cities: FC<Props> = ({currentCity, setCity, setAllCity, allCity, weather}) => {

  const deleteCity = async(param: string) => {
    const newCity = allCity.filter(function(f: any) { return f.label !== param })
    console.log(newCity);
    setAllCity(newCity);
    setCity(newCity[0].label);
    const open = await new IndexedDb('City', 1);
    await open.delete();
    for (let i in newCity) {
      await open.add(newCity[i]);
    }
  }

  return (
  <> 
    <h1 className='citiesTitle'>Choose City</h1>
    <ul className='citiesList'>
      {currentCity.map((City: any,) => (
      <div className='wrapper'>
        <li className={classNames(
        'citiesList__item',
        { 'citiesList__active': weather?.name.toUpperCase() === City.label }
      )} onClick={(() => { setCity(City.label); })}>
        {City.label}
          <img
            className='citiesList__item--image'
            src={CityImage}
            alt="City" 
          />
        </li>
        {allCity.length > 1 && 
          <img 
          src={Delete} 
          className='citiesList__item--delete'
          alt="Delete City"
          onClick={(() => { 
            deleteCity(City.label) 
          })}
          />
        }
        </div>
      ))}
    </ul>
  </>
  )
}