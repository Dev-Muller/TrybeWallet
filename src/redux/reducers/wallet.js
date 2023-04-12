// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY, EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  // total: 0,
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  const { payload, type } = action;
  switch (type) {
  // case TOTAL:
  //   return {
  //     ...state,
  //     total: payload,
  //   };
  case CURRENCY:
    return {
      ...state,
      currencies: payload,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  default:
    return state;
  }
}
export default walletReducer;
