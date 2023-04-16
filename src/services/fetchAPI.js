export const getFetch = async () => {
  const API = await fetch('https://economia.awesomeapi.com.br/json/all');
  const { USDT, ...data } = await API.json();
  return data;
};
