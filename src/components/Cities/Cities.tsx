import React, { FC } from 'react';
import CityImage from '../../image/city.png';
import classNames from 'classnames';
import './cities.scss';
import { createDatabase } from '../../IndexedDB/Indexeddb';
import Delete from '../../image/delete.png';

interface Props {
  currentCity: any
  city: string
  setCity: (city: string) => void 
  setAllCity: (param: any) => void
  allCity: any
}

export const Cities: FC<Props> = ({currentCity, city , setCity, setAllCity, allCity}) => {

  const deleteCity = (param: string) => {
    const newCity = allCity.filter(function(f: any) { return f.label !== param })
    setAllCity(newCity);
    setCity(newCity[0].label);
    createDatabase('delete')
    for (let i in newCity) {
      createDatabase('add', newCity[i]);
    }
  }

  return (
  <> 
    <h1 className='citiesTitle'>Choose City</h1>
    <ul className='citiesList'>
      {currentCity.map((City: any) => (
        <div className='wrapper'>
          <li className={classNames(
          'citiesList__item',
          { 'citiesList__active': city === City.label }
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