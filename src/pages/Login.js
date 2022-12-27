import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { receiveUserEmail } from '../redux/actions/index';

const SIX = 6;
class Login extends Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    isButtonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleInputsValidation);
  };

  handleInputsValidation = () => {
    const { inputEmail, inputPassword } = this.state;

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const verifyEmailInput = emailRegex.test(inputEmail);

    const verifyPasswordInput = inputPassword.length >= SIX;

    if (verifyEmailInput && verifyPasswordInput) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  handleButtonLoginClick = () => {
    const { dispatch, history } = this.props;
    const { inputEmail } = this.state;

    dispatch(receiveUserEmail(inputEmail));

    history.push('/carteira');

    this.setState({ inputEmail: '', inputPassword: '' });
  };

  render() {
    const { inputEmail, inputPassword, isButtonDisabled } = this.state;
    return (
      <div className="login-container">
        <h1>Trybe</h1>
        <form>
          <label htmlFor="input-user-email">
            <input
              type="email"
              id="input-user-email"
              value={ inputEmail }
              name="inputEmail"
              onChange={ this.handleChange }
              data-testid="email-input"
              placeholder="Email"
            />
          </label>
          <label htmlFor="input-user-password">
            <input
              type="password"
              id="input-user-password"
              value={ inputPassword }
              name="inputPassword"
              onChange={ this.handleChange }
              data-testid="password-input"
              placeholder="Senha"
            />
          </label>
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleButtonLoginClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
  dispatch: func.isRequired,
};

export default connect()(Login);
