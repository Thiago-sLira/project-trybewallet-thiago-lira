// Coloque aqui suas actions
export const RECEIVE_USER_EMAIL = 'RECEIVE_USER_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const receiveUserEmail = (userEmail) => ({
  type: RECEIVE_USER_EMAIL,
  payload: userEmail,
});

export const receiveCurrencies = (currency) => ({
  type: RECEIVE_CURRENCIES,
  payload: currency,
});
