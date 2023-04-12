// Esse reducer será responsável por tratar as informações da pessoa usuária
import { EMAIL } from '../actions/index';

const INITIAL_STATE = {
  email: '',
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
  default:
    return state;
  }
}
export default userReducer;
