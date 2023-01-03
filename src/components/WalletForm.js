import React, { Component } from 'react';
import { func, arrayOf, string, shape, number, bool } from 'prop-types';
import { connect } from 'react-redux';
import {
  receiveCurrencies, receiveExpenses, receiveExpensesEdited,
} from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    valueExpenseInput: '0.00',
    descriptionExpenseInput: '',
    currencySelect: 'USD',
    methodSelect: 'Dinheiro',
    tagSelect: 'Alimentação',
    editorLocalStateControl: true,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const quotationsJson = await this.getQuotaionsExchangesAPI();
    const arrayJson = Object.keys(quotationsJson);
    dispatch(receiveCurrencies(arrayJson));
  }

  componentDidUpdate() {
    this.handleEditExpenseButton();
  }

  handleEditExpenseButton = () => {
    const { expenses, idToEdit, editor } = this.props;
    const { editorLocalStateControl } = this.state;
    if (editor && editorLocalStateControl) {
      const expenseSelectedToEdit = expenses.find(({ id }) => id === idToEdit);
      this.setState({
        editorLocalStateControl: false,
        valueExpenseInput: expenseSelectedToEdit.value,
        descriptionExpenseInput: expenseSelectedToEdit.description,
        currencySelect: expenseSelectedToEdit.currency,
        methodSelect: expenseSelectedToEdit.method,
        tagSelect: expenseSelectedToEdit.tag,
      });
    }
  };

  cleaningTheFields = () => {
    this.setState({
      valueExpenseInput: '',
      descriptionExpenseInput: '',
      editorLocalStateControl: true,
      // currencySelect: 'USD',
      // methodSelect: 'Dinheiro',
      // tagSelect: 'Alimentação',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getQuotaionsExchangesAPI = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    delete json.USDT;
    return json;
  };

  buildingNewExpense = async (expenses) => {
    const { valueExpenseInput, descriptionExpenseInput,
      currencySelect, methodSelect, tagSelect } = this.state;

    const quotationsJson = await this.getQuotaionsExchangesAPI();

    return ({
      value: valueExpenseInput,
      currency: currencySelect,
      method: methodSelect,
      tag: tagSelect,
      description: descriptionExpenseInput,
      id: expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1,
      exchangeRates: quotationsJson,
    });
  };

  buildingExpensesEdited = (expenses, idToEdit) => {
    const { valueExpenseInput, descriptionExpenseInput,
      currencySelect, methodSelect, tagSelect } = this.state;

    expenses.forEach((expense) => {
      if (expense.id === idToEdit) {
        expense.value = valueExpenseInput;
        expense.currency = currencySelect;
        expense.method = methodSelect;
        expense.tag = tagSelect;
        expense.description = descriptionExpenseInput;
      }
    });
    return expenses;
  };

  handleFormExpenseButtonClick = async () => {
    const { dispatch, expenses, editor, idToEdit } = this.props;

    if (editor) {
      const newExpenses = this.buildingExpensesEdited(expenses, idToEdit);
      dispatch(receiveExpensesEdited(newExpenses));
      this.cleaningTheFields();
    } else {
      const newExpenses = await this.buildingNewExpense(expenses);
      dispatch(receiveExpenses([...expenses, newExpenses]));
      this.cleaningTheFields();
    }
  };

  render() {
    const {
      valueExpenseInput, descriptionExpenseInput,
      currencySelect, methodSelect, tagSelect,
    } = this.state;
    const { currencies, editor } = this.props;
    return (
      <aside>
        <form>
          <label htmlFor="input-value-expense">
            Valor:
            <input
              type="number"
              id="input-value-expense"
              value={ valueExpenseInput }
              name="valueExpenseInput"
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="input-description-expense">
            Descrição:
            <input
              type="text"
              id="input-description-expense"
              value={ descriptionExpenseInput }
              name="descriptionExpenseInput"
              onChange={ this.handleChange }
              data-testid="description-input"
              placeholder="Descrição da despesa"
            />
          </label>
          <label htmlFor="select-currency">
            Moeda:
            <select
              id="select-currency"
              name="currencySelect"
              value={ currencySelect }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {currencies.map((code) => (
                <option key={ code } value={ code }>{ code }</option>
              ))}
            </select>
          </label>
          <label htmlFor="select-method">
            Método de Pagamento
            <select
              id="select-method"
              name="methodSelect"
              value={ methodSelect }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="select-tag">
            Categoria:
            <select
              id="select-tag"
              name="tagSelect"
              value={ tagSelect }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleFormExpenseButtonClick }
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </aside>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, expenses, idToEdit, editor } }) => ({
  currencies,
  expenses,
  idToEdit,
  editor,
});

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  editor: bool.isRequired,
  idToEdit: number.isRequired,
  expenses: arrayOf(shape({
    id: number,
    value: string,
    description: string,
    currency: string,
    method: string,
    tag: string,
    exchangesRates: shape({}),
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
