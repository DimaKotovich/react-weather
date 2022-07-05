const API_KEY = '6ce3ee29aa55fc7445a578beee20914f';
const URL = `https://api.openweathermap.org/data/2.5/weather`

export const getWeather = async (city: string) => {
  const response = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);

  return response.json();
};

export const checkCity = async (city: string) => {
  const response = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);

  return response.json();
};

export const getLocation = async (lat: number, lon: number) => {
  const response = await fetch(`${URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

  return response.json();
};