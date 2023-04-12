import { getFetch } from '../../services/fetchAPI';

// Coloque aqui suas actions
export const EMAIL = 'email';
export const TOTAL = 'total';
export const CURRENCY = 'currency';

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

export const fetchThunk = () => async (dispatch) => {
  const moedas = await getFetch();
  dispatch(currency(moedas));
};
