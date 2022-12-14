// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCIES, RECEIVE_EXPENSE_EDITED, RECEIVE_ID_EXPENSE_TO_EDIT,
  RECEIVE_NEW_EXPENSE, RECEIVE_TOTAL_EXPENSE_VALUE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalExpenses: '0',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES: return {
    ...state,
    currencies: action.payload,
  };
  case RECEIVE_NEW_EXPENSE: return {
    ...state,
    expenses: action.payload,
  };
  case RECEIVE_TOTAL_EXPENSE_VALUE: return {
    ...state,
    totalExpenses: action.payload,
  };
  case RECEIVE_ID_EXPENSE_TO_EDIT: return {
    ...state,
    idToEdit: action.payload,
    editor: true,
  };
  case RECEIVE_EXPENSE_EDITED: return {
    ...state,
    expenses: [...action.payload],
    editor: false,
  };
  default: return state;
  }
};

export default wallet;
