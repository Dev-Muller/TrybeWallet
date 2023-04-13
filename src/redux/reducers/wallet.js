// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY,
  EDIT_EXPENSE, EXPENSES, REMOVE_EXPENSE, FINISH_EDIT } from '../actions/index';

const INITIAL_STATE = {
  // total: 0,
  currencies: [],
  expenses: [],
  isEditing: false,
  editedId: 0,
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
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      isEditing: true,
      editedId: payload,
    };
  case FINISH_EDIT:
    return {
      ...state,
      isEditing: false,
      editedId: 0,
      expenses: payload,
    };
  default:
    return state;
  }
}
export default walletReducer;
