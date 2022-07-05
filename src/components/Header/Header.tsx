import React, { FC, useState } from 'react';
import './header.scss'
import HeaderLogo from '../../image/logo.gif';
import RightLogo from '../../image/rainbow.gif';
import Add from '../../image/add.png';
import { checkCity } from '../../api/api';
import { createDatabase } from '../../IndexedDB/Indexeddb';

interface Props {
  city: string
  allCity: any
  setCity: (param: string) => void
  setAllCity: (param: any) => void
  checkState: (state: any, element: string) => boolean
}

export const Header: FC<Props> = ({ city, setCity, allCity, setAllCity, checkState}) => {

  const [validation,setValidation] = useState(true);
  const [search,setSearch] = useState('');

  const change = (event: any) => {
    setSearch(event.target.value.toUpperCase());
  };

  const add = () => {
    createDatabase('add', {value: search, label:search});
  };

  const getCity = async (event: any) => {
    event.preventDefault();
    if (search.trim() === '') {
      setValidation(false);
    } else {
      setValidation(true);
      add();
      const respons = await checkCity(search);
      if (checkState(allCity, search) === true) {
        alert('The city has already been added')
      } else if (respons.cod === 200) {
        setCity(search);
        setAllCity([{value: search, label:search},...allCity]);
      } else {
        alert('City not Found');
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
        
          <form className='header__wrapper--search' onSubmit={getCity}>
            {!validation && <span className='header__wrapper--error'>Enter the correct city!</span>}
            <label>
              <input 
                className='header__wrapper--input'
                type="text" 
                required onChange={change} 
                value={search}
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