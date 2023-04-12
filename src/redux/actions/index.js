import { getFetch } from '../../services/fetchAPI';

// Coloque aqui suas actions
export const EMAIL = 'email';
export const TOTAL = 'total';
export const CURRENCY = 'currency';
export const EXPENSES = 'expenses';

export const emailLogin = (payload) => ({
  type: EMAIL,
  payload,
});

export const totalValue = (payload) => ({
  type: TOTAL,
  payload,
});

export const currency = (payload) => ({
  type: CURRENCY,
  payload: Object.keys(payload),
});

export const expenses = (payload) => ({
  type: EXPENSES,
  payload,
});

export const fetchThunk = () => async (dispatch) => {
  const moedas = await getFetch();
  dispatch(currency(moedas));
};

export const fetchRatesThunk = (payload) => async (dispatch) => {
  const exchangeRates = await getFetch();
  const moedas = { ...payload, exchangeRates };
  dispatch(expenses(moedas));
};
