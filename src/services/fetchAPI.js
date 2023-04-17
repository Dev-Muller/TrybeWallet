export const getFetch = async () => {
  const API = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await API.json();
  // const { USDT, ...data} = await API.json();
  delete data.USDT;
  // delete explicado pelo Clecio turma 29
  // console.log(data
  return data;
};
