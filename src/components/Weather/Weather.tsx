import React, { FC, useEffect, useState } from 'react';
import './weather.scss';
import { getWeather } from '../../api/api';
import Sun from '../../image/sun.png';
import Clouds from '../../image/clouds.png';
import Rain from '../../image/rain.png';
import Celsius from '../../image/celsius.png';
import LowTemp from '../../image/low-temperature.png';
import HightTemp from '../../image/hight-temperature.png';
import ControlTemp from '../../image/control-temperature.png';
import Pressure from '../../image/pressure.png';
import Humidity from '../../image/humidity.png';


interface Props {
  city: string;
}

export const Weather: FC<Props> = ({city}) => {

  const [weather, setWeather] = useState<Weather | null>(null);

  const Respons = async () => {
    const responsWeather = await getWeather(city);
    setWeather(responsWeather);
  }

  useEffect(() => {
    Respons();
  }, [city]);

  return (
    <>
      <h1 className='city_title'>{weather?.name}</h1>
      <div className='weather'>
        <div className='weather__main'>
          <span className='weather__main--date'>Today</span>

          <div className='weather__main--tempblock'>
            <span className='weather__main--temp'>
              {weather?.main.temp}
              <img 
                src={Celsius}
                alt="Gradus"
                className='weather__main--image'
              />
            </span>
            {weather?.weather[0].main === 'Clear' ? 
              <img 
                src={Sun}
                alt="Sun"
                className='weather__main--image'
              /> :
              weather?.weather[0].main === 'Clouds' ? 
              <img
                src={Clouds}
                alt="Clouds"
                className='weather__main--image'
              /> :
              weather?.weather[0].main === 'Rain' ? 
              <img
                src={Rain}
                alt="Rain"
                className='weather__main--image'
              /> :
              null}
          </div>
          
          <div className="container">
            <div className="weather__wrapper">
              <img 
                src={Pressure}
                className='weather__main--image'
                alt="Pressure"
              />
              <span className='weather__main--text'>{weather?.main.pressure} гПа</span>
            </div>

            <div className="weather__wrapper">
              <img
                src={Humidity}
                className='weather__main--image'
                alt="Humidity"
              />
              <span className='weather__main--text'>{weather?.main.humidity} %</span>
            </div>
          </div>
        </div>

        <div className='weather__description'>
          <div className="weather__wrapper">
              <img 
                src={HightTemp}
                className='weather__description--tempimage weather__description--firstimage'
                alt="HightTemp"
              />
              <span className='weather__description--text'>MAX: {weather?.main.temp_max}</span>
              <img 
                src={Celsius}
                alt="Gradus"
                className='weather__description--tempimage'
              />
            </div>

          <div className="weather__wrapper">
            <img 
              src={LowTemp}
              className='weather__description--tempimage'
              alt="LowTemp"
            />
            <span className='weather__description--text'>MIN: {weather?.main.temp_min}</span>
            <img 
                src={Celsius}
                alt="Gradus"
                className='weather__description--tempimage'
              />
          </div>

          <div className="weather__wrapper">
            <img
              src={ControlTemp}
              className='weather__description--tempimage'
              alt="Feels Like"
            />
            <span className='weather__description--text'>Feels Like: {weather?.main.feels_like}</span>
            <img 
                src={Celsius}
                alt="Gradus"
                className='weather__description--tempimage'
              />
          </div>
        </div>
      </div>
    </>
  );
}