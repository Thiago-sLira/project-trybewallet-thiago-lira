// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_USER_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_USER_EMAIL: return {
    ...state,
    email: action.payload,
  };
  default: return state;
  }
};

export default wallet;
