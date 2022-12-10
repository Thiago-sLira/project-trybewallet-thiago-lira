import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, number } from 'prop-types';

class Header extends Component {
  render() {
    const exchange = 'BRL';
    const { userEmail, totalExpenses } = this.props;
    return (
      <header>
        <section>
          <h5 data-testid="email-field">{ `Email: ${userEmail}` }</h5>
          <h5 data-testid="total-field">{ `Despesa Total: ${totalExpenses}` }</h5>
          <h5 data-testid="header-currency-field">{ `${exchange}` }</h5>
        </section>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  userEmail: user.email,
  totalExpenses: wallet.totalExpenses,
});

Header.propTypes = {
  userEmail: string.isRequired,
  totalExpenses: number.isRequired,
};

export default connect(mapStateToProps)(Header);
