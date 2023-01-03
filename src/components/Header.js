import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, func, shape } from 'prop-types';
import { FaUserAlt, FaWallet } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { receiveTotalExpenseValue } from '../redux/actions';
import './Header.css';

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
    const { userEmail, totalExpenses } = this.props;
    return (
      <header>
        <h3>
          <FaWallet />
          {' '}
          Trybe Wallet
        </h3>
        <h3 data-testid="total-field">
          <GiTwoCoins />
          { `Total de despesas: ${totalExpenses} BRL` }
        </h3>
        <h4 data-testid="email-field">
          <FaUserAlt />
          { `email: ${userEmail}` }
        </h4>
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
