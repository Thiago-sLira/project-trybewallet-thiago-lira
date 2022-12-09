// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCIES, RECEIVE_NEW_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [{ id: 0 }, { id: 1 }], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
//   console.log(action.payload);
  switch (action.type) {
  case RECEIVE_CURRENCIES: return {
    ...state,
    currencies: action.payload,
  };
  case RECEIVE_NEW_EXPENSE: return {
    ...state,
    expenses: action.payload,
  };
  default: return state;
  }
};

export default wallet;
