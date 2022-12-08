// Coloque aqui suas actions
export const RECEIVE_USER_EMAIL = 'RECEIVE_USER_EMAIL';
export const RECEIVE_WALLET_EXPENSE = 'RECEIVE_WALLET_EXPENSE';

export const receiveUserEmail = (userEmail) => ({
  type: RECEIVE_USER_EMAIL,
  payload: userEmail,
});

export const receiveWalletExpense = (expense) => ({
  type: RECEIVE_USER_EMAIL,
  payload: expense,
});

// { currencies, expenses, editor, idToEdit }
