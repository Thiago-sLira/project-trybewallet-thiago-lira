// Coloque aqui suas actions
export const RECEIVE_USER_EMAIL = 'RECEIVE_USER_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const RECEIVE_NEW_EXPENSE = 'RECEIVE_NEW_EXPENSE';
export const RECEIVE_TOTAL_EXPENSE_VALUE = 'RECEIVE_TOTAL_EXPENSE_VALUE';
export const RECEIVE_ID_EXPENSE_TO_EDIT = 'RECEIVE_ID_EXPENSE_TO_EDIT';
export const RECEIVE_EXPENSE_EDITED = 'RECEIVE_EXPENSE_EDITED';

export const receiveUserEmail = (userEmail) => ({
  type: RECEIVE_USER_EMAIL,
  payload: userEmail,
});

export const receiveCurrencies = (currency) => ({
  type: RECEIVE_CURRENCIES,
  payload: currency,
});

export const receiveExpenses = (newExpense) => ({
  type: RECEIVE_NEW_EXPENSE,
  payload: newExpense,
});

export const receiveTotalExpenseValue = (totalExpense) => ({
  type: RECEIVE_TOTAL_EXPENSE_VALUE,
  payload: totalExpense,
});

export const receiveExpenseIdToEdit = (id) => ({
  type: RECEIVE_ID_EXPENSE_TO_EDIT,
  payload: id,
});

export const receiveExpensesEdited = (newExpenses) => ({
  type: RECEIVE_EXPENSE_EDITED,
  payload: newExpenses,
});
