/// <reference types="react-scripts" />

type Weather = {
  name: string,
  base: string,
  wind: {
    deg: number;
    speed: number;
  };
  weather:
    [{
      description: string,
      main: string,
    }],
  main: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number,
  }
}

