import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const exchange = 'BRL';
    const { userEmail } = this.props;
    return (
      <header>
        <section>
          <h5 data-testid="email-field">{ `Email: ${userEmail}` }</h5>
          <h5 data-testid="total-field">{ `Despesa Total: ${0}` }</h5>
          <h5 data-testid="header-currency-field">{ `${exchange}` }</h5>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  userEmail: globalState.user.email,
});

Header.propTypes = {
  userEmail: string.isRequired,
};

export default connect(mapStateToProps)(Header);
