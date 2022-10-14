import React, { FC, useState } from 'react';
import './header.scss'
import HeaderLogo from '../../image/logo.gif';
import RightLogo from '../../image/rainbow.gif';
import Add from '../../image/add.png';
import Search from '../../image/search.png';
import { getWeather } from '../../api/api';
import { IndexedDb } from '../../IndexedDB/Indexeddb';

interface Props {
  allCity: any
  setAllCity: (param: any) => void
  checkState: (state: any, element: string) => boolean
  setWeather: (param: any) => void
}

export const Header: FC<Props> = ({allCity, setAllCity, checkState, setWeather}) => {

  const [validation,setValidation] = useState(true);
  const [search,setSearch] = useState('');

  const change = (event: any) => {
    setSearch(event.target.value.toUpperCase());
  };

  const add = async(city: string) => {
    const open = await new IndexedDb('City', 1);
    await open.add({value: city, label: city});
  };

  const getCity = async (event: any) => {
    event.preventDefault();
    if (search.trim() === '') {
      setValidation(false);
    } else {
      setValidation(true);
      if (checkState(allCity, search) === true) {
        alert('The city has already been added')
      } else {
        const respons = await getWeather(search);
        if (respons.cod === 200) {
          setWeather(respons);
          setAllCity([{value: respons.name.toUpperCase(), label:respons.name.toUpperCase()},...allCity]);
          add(respons.name.toUpperCase());
        } else {
          alert('City not Found');
        }
      } 
    }
    setSearch('');
  }

  return (
    <>
      <header className='header'>
        <div className='header__wrapper'>
          <img
            className='header__wrapper--logo'
            src={HeaderLogo} 
            alt="Left Logo" 
          />
          <h1 className='header__wrapper--title'>React-Weather</h1>
        </div>
        <div className='header__wrapper'>
          <img 
            src={Search}
            alt="Search"
            className='header__wrapper--searchImage'
          />
          <form className='header__wrapper--search' onSubmit={getCity}>
            {!validation && <span className='header__wrapper--error'>Enter the correct city!</span>}
            <label>
              <input 
                className='header__wrapper--input'
                type="text" 
                required onChange={change} 
                value={search}
                placeholder='ADD CITY'
              />
            </label>
            <button className='header__wrapper--button' type="submit">
              <img 
                className='header__wrapper--img'
                src={Add}
                alt="Add City" />
            </button>
          </form>

          <img
            className='header__wrapper--logo'
            src={RightLogo}
            alt="Right Logo"
          />
        </div>
      </header>
  </>
  )
}