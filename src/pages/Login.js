import React, { Component } from 'react';

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
    });
  };

  verifyEmail = (email) => {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(email);
  };

  render() {
    const { inputEmail, inputPassword, isButtonDisabled } = this.state;
    return (
      <div>
        <fieldset>
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
              />
            </label>
            <button
              type="button"
              disabled={ isButtonDisabled }
            >
              Entrar
            </button>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default Login;
