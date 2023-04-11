// Esse reducer será responsável por tratar as informações da pessoa usuária
import { CURRENCY, EMAIL, TOTAL } from '../actions/index';

const INITIAL_STATE = {
  email: '',
  total: 0,
  currency: 'BRL',
};

function userReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
  // case USER_INFO:
  //   return { ...state, ...payload };
  case EMAIL:
    return {
      ...state,
      email: payload,
    };
  case TOTAL:
    return {
      ...state,
      total: payload,
    };
  case CURRENCY:
    return {
      ...state,
      currency: payload,
    };
  default:
    return state;
  }
}
export default userReducer;
