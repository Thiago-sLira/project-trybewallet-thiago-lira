// Esse reducer será responsável por tratar as informações da pessoa usuária
import { RECEIVE_USER_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_USER_EMAIL: return {
    ...state,
    email: action.payload,
  };
  default: return state;
  }
};

export default user;
