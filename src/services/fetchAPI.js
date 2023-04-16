export const getFetch = async () => {
  const API = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await API.json();
  console.log(data);
  // delete data.USDT;
  // delete explicado pelo Clecio da turma 29.
  return data;
};
