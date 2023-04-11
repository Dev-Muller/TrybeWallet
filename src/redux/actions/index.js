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
  payload,
});

// export const USER_INFO = 'user_info';
// export const userAction = (param) => ({
//   type: USER_INFO,
//   payload: param,
// });
