import React, { Component } from 'react';
import { func, arrayOf, string, shape, number } from 'prop-types';
import { connect } from 'react-redux';
import { receiveCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  state = {
    valueExpenseInput: '',
    descriptionExpenseInput: '',
    currencySelect: 'USD',
    methodSelect: 'Dinheiro',
    tagSelect: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const quotationsJson = await this.getQuotaionsExchangesAPI();
    const arrayJson = Object.keys(quotationsJson);
    dispatch(receiveCurrencies(arrayJson));
  }

  getQuotaionsExchangesAPI = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    delete json.USDT;
    return json;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getCurrencyValueSelect = async (currency) => {
    const quotationsJson = await this.getQuotaionsExchangesAPI();
    const quotationsJsonArray = Object.values(quotationsJson);
    console.log(quotationsJsonArray);
  };

  buildingNewExpense = async () => {
    const { valueExpenseInput, descriptionExpenseInput,
      currencySelect, methodSelect, tagSelect } = this.state;
    const { expenses } = this.props;
    const getCurrency = await this.getCurrencyValueSelect(currencySelect);
    console.log(getCurrency);
    // return {
    //   id: expenses.length === 0 ? 0 : expenses[expenses.length - 1],
    // };
  };

  handleFormExpenseButtonClick = () => {
    const { dispatch } = this.props;
    const newExpense = this.buildingNewExpense();
  };

  render() {
    const {
      valueExpenseInput, descriptionExpenseInput,
      currencySelect, methodSelect, tagSelect,
    } = this.state;
    const { currencies } = this.props;
    return (
      <section>
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
            Adicionar Despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(string).isRequired,
  expenses: arrayOf(shape({
    id: number,

  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
