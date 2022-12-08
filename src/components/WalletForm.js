import React, { Component } from 'react';
import { func, arrayOf, shape, string } from 'prop-types';
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
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const json = await response.json();
    delete json.USDT;
    const arrayJson = Object.values(json);
    dispatch(receiveCurrencies(arrayJson));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
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
            >
              {currencies.map(({ code }) => (
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
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: func.isRequired,
  currencies: arrayOf(shape({
    code: string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
