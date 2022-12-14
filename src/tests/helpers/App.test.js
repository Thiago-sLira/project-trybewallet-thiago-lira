import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';

describe('Testando o componente Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('se a tela Login é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', { level: 1, name: /trybe/i });
    const inputEmail = screen.getByRole('textbox');
    const inputPassoword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    expect(title).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassoword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });
  test('se o botão de "Entrar" é habilitado corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox');
    const inputPassoword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    expect(buttonLogin).toBeDisabled();

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassoword, '123');

    expect(buttonLogin).toBeDisabled();

    userEvent.type(inputPassoword, '456');

    expect(buttonLogin).not.toBeDisabled();
  });
  test.only('se ao clicar no botão com texte e senha, a página é redirecionada para "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByRole('textbox');
    const inputPassoword = screen.getByPlaceholderText(/senha/i);
    const buttonLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassoword, '1234567');

    expect(buttonLogin).not.toBeDisabled();
    act(() => {
      userEvent.click(screen.getByRole('button'));
    });

    expect(history.location.pathname).toBe('/carteira');
  });
  test('se a página Wallet é renderizada corretamente com Header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const userEmail = screen.getByRole('heading', { name: /email:/i });
    const totalZero = screen.getByRole('heading', { name: /email:/i });
    const BRL = screen.getByRole('heading', { name: /email:/i });

    expect(userEmail).toBeInTheDocument();
    expect(totalZero).toBeInTheDocument();
    expect(BRL).toBeInTheDocument();
  });
  test('se a página Wallet é renderizada corretamente com WalletForm', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByRole('spinbutton', { name: /valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /descrição:/i });
    const inputCurrency = screen.getByRole('combobox', { name: /moeda:/i });
    const inputMethod = screen.getByRole('combobox', { name: /método de pagamento/i });
    const inputTag = screen.getByRole('combobox', { name: /categoria:/i });
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(addExpenseButton).toBeInTheDocument();
  });
  test('se a página Wallet é renderizada corretamente com Table', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(history.location.pathname).toBe('/carteira');

    const table = screen.getByRole('table');
    const columnDescription = screen.getByRole('columnheader', { name: /descrição/i });
    const columnTag = screen.getByRole('columnheader', { name: /tag/i });
    const columnMethod = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const columnValue = screen.getByRole('columnheader', { name: 'Valor' });
    const columnCurrency = screen.getByRole('columnheader', { name: 'Moeda' });
    const columnExchangeRate = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const columnValueExchanged = screen.getByRole('columnheader', { name: /valor convertido/i });
    const columnExchageCurrency = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const columnEditExclude = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(table).toBeInTheDocument();
    expect(columnDescription).toBeInTheDocument();
    expect(columnTag).toBeInTheDocument();
    expect(columnMethod).toBeInTheDocument();
    expect(columnValue).toBeInTheDocument();
    expect(columnCurrency).toBeInTheDocument();
    expect(columnExchangeRate).toBeInTheDocument();
    expect(columnValueExchanged).toBeInTheDocument();
    expect(columnExchageCurrency).toBeInTheDocument();
    expect(columnEditExclude).toBeInTheDocument();
  });

  test('se ao digitar nos inputs e clicar no botão, uma nova despesa é adicionada', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByRole('spinbutton', { name: /valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /descrição:/i });
    const inputMethod = screen.getByRole('combobox', { name: /método de pagamento/i });
    const inputTag = screen.getByRole('combobox', { name: /categoria:/i });
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.type(inputValue, '200');
      userEvent.type(inputDescription, 'Fazendo os testes da aplicação');
      userEvent.selectOptions(inputMethod, 'Cartão de crédito');
      userEvent.selectOptions(inputTag, 'Lazer');

      userEvent.click(addExpenseButton);

      userEvent.type(inputValue, '50');
      userEvent.type(inputDescription, 'Nova despesa para testar');
      userEvent.selectOptions(inputMethod, 'Dinheiro');
      userEvent.selectOptions(inputTag, 'Transporte');

      userEvent.click(addExpenseButton);
    });

    waitFor(async () => {
      expect(screen.getByRole('cell', { name: /fazendo os testes da aplicação/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /nova despesa para testar/i })).toBeInTheDocument();
    });

    expect(global.fetch).toBeCalledTimes(3);
  });
  test('se ao clicar no botão de editar, a despesa é editada', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByRole('spinbutton', { name: /valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /descrição:/i });
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '100');
    userEvent.type(inputDescription, 'Despesa para teste');
    userEvent.click(addExpenseButton);

    waitFor(() => {
      expect(screen.getByRole('cell', { name: /despesa para teste/i })).toBeInTheDocument();
    });

    const editButton = screen.getByRole('button', { name: /editar/i });
    userEvent.click(editButton);

    waitFor(() => {
      expect(screen.getByRole('button', { name: 'Editar despesa' })).toBeInTheDocument();
    });

    userEvent.type(inputValue, '250');
    userEvent.click(addExpenseButton);

    expect(screen.getByRole('cell', { name: /250\.00/i })).toBeInTheDocument();
  });
  test('se ao clicar no botão de excluir, a despesa é excluída', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByRole('spinbutton', { name: /valor:/i });
    const inputDescription = screen.getByRole('textbox', { name: /descrição:/i });
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '100');
    userEvent.type(inputDescription, 'Despesa para teste');
    userEvent.click(addExpenseButton);

    waitFor(() => {
      expect(screen.getByRole('cell', { name: /despesa para teste/i })).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    userEvent.click(deleteButton);

    expect(screen.queryByRole('cell', { name: /despesa para teste/i })).not.toBeInTheDocument();
  });
});
