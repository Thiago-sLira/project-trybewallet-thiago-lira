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
          <tfoot>
            {expenses.map(({ exchangeRates, currency, value }) => {
              const expenseRate = exchangeRates[currency].ask;
              const valueExchangeCurrency = Number(expenseRate * value);
            })}
          </tfoot>
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
