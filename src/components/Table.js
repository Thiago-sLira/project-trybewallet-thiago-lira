import React, { Component } from 'react';
import { arrayOf, string, shape, number } from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
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
