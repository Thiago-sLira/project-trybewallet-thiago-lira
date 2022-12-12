import React, { Component } from 'react';
import { arrayOf, string, shape, number, func } from 'prop-types';
import { connect } from 'react-redux';
import { receiveExpenseIdToEdit, receiveExpenses } from '../redux/actions';

class Table extends Component {
  handleDeleteExpenseClick = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(receiveExpenses(newExpenses));
  };

  handleEditExpenseClick = (id) => {
    const { dispatch } = this.props;
    dispatch(receiveExpenseIdToEdit(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(({
              exchangeRates, currency, value, description, id, tag, method,
            }) => {
              const expenseRate = exchangeRates[currency].ask;
              const valueExchangeCurrency = Number(expenseRate * value).toFixed(2);
              const nameCurrencyCoin = exchangeRates[currency].name;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ (Math.round(value * 100) / 100).toFixed(2) }</td>
                  <td>{ nameCurrencyCoin }</td>
                  <td>{ Number(expenseRate).toFixed(2) }</td>
                  <td>{ valueExchangeCurrency }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleDeleteExpenseClick(id) }
                    >
                      Excluir
                    </button>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.handleEditExpenseClick(id) }
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

Table.defaultProps = {
  expenses: [{
    id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
    exchangesRates: {},
  }],
};

Table.propTypes = {
  dispatch: func.isRequired,
  expenses: arrayOf(shape({
    id: number,
    value: string,
    description: string,
    currency: string,
    method: string,
    tag: string,
    exchangesRates: shape({}),
  })),
};

export default connect(mapStateToProps)(Table);
