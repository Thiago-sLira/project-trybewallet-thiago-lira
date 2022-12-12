import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, func, shape } from 'prop-types';
import { receiveTotalExpenseValue } from '../redux/actions';

class Header extends Component {
  componentDidUpdate() {
    this.updateTotalExpenses();
  }

  updateTotalExpenses = () => {
    const { dispatch, expenses } = this.props;

    const sumTotalExpenses = expenses.reduce((totalExpense, {
      currency, exchangeRates, value,
    }) => {
      const expenseRate = exchangeRates[currency].ask;
      const valueExchangeCurrency = Number(expenseRate * value);
      return totalExpense + valueExchangeCurrency;
    }, 0);

    dispatch(receiveTotalExpenseValue(
      (Math.round(sumTotalExpenses * 100) / 100).toFixed(2),
    ));
  };

  render() {
    const exchange = 'BRL';
    const { userEmail, totalExpenses } = this.props;
    return (
      <header>
        <section>
          <h5 data-testid="email-field">{ `Email: ${userEmail}` }</h5>
          <h5 data-testid="total-field">{ `${totalExpenses}` }</h5>
          <h5 data-testid="header-currency-field">{ `${exchange}` }</h5>
        </section>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  userEmail: user.email,
  totalExpenses: wallet.totalExpenses,
  expenses: wallet.expenses,
});

Header.propTypes = {
  userEmail: string.isRequired,
  totalExpenses: string.isRequired,
  dispatch: func.isRequired,
  expenses: arrayOf(shape({
    value: string,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
