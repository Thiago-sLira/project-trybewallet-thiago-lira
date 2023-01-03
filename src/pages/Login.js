import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { FaWallet } from 'react-icons/fa';
import { receiveUserEmail } from '../redux/actions/index';
import './Login.css';

const SIX = 6;
class Login extends Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    isButtonDisabled: true,
    emailWarningMessage: false,
    passwordWarningMessage: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.handleInputsValidation();
    });
  };

  showValidInputWarning = (verifyPasswordInput, verifyEmailInput) => {
    const { inputEmail, inputPassword } = this.state;

    if (inputEmail.length !== 0 && !verifyEmailInput) {
      this.setState({ emailWarningMessage: true });
    } else {
      this.setState({ emailWarningMessage: false });
    }
    if (inputPassword.length !== 0 && !verifyPasswordInput) {
      this.setState({ passwordWarningMessage: true });
    } else {
      this.setState({ passwordWarningMessage: false });
    }
  };

  handleInputsValidation = () => {
    const { inputEmail, inputPassword } = this.state;

    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    const verifyEmailInput = emailRegex.test(inputEmail);

    const verifyPasswordInput = inputPassword.length >= SIX;

    this.showValidInputWarning(verifyPasswordInput, verifyEmailInput);
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
    const {
      inputEmail, inputPassword, isButtonDisabled,
      emailWarningMessage, passwordWarningMessage,
    } = this.state;
    return (
      <main>
        <div className="backgroundImage" />
        <h1>
          <FaWallet />
          {' '}
          Trybe Wallet
        </h1>
        <form>
          <fieldset>
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
              { emailWarningMessage && (<small>Digite um email válido</small>) }
            </label>
          </fieldset>
          <fieldset>
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
              { passwordWarningMessage && (<small>Digite uma senha válida</small>) }
            </label>
          </fieldset>
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleButtonLoginClick }
          >
            Entrar
          </button>
        </form>
      </main>
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
