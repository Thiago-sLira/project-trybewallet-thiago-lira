// Esse reducer será responsável por tratar as informações da pessoa usuária
import { RECEIVE_USER_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_USER_EMAIL: return {
    ...state,
    user: {
      email: action.payload,
    },
  };
  default: return state;
  }
};

export default user;
