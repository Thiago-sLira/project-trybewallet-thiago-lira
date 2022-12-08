import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <h5 data-testid="email-field">{ `Email: ${userEmail}` }</h5>
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
