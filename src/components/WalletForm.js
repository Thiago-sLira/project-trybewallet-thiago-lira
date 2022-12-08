import React, { Component } from 'react';

class WalletForm extends Component {
  state = {
    valueExpenseInput: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valueExpenseInput } = this.state;
    return (
      <section>
        <fieldset>
          <form>
            <label htmlFor="input-value-expense">
              <input
                type="text"
                id="input-value-expense"
                value={ valueExpenseInput }
                name="valueExpenseInput"
                onChange={ this.handleChange }
                placeholder="Valor da despesa"
              />
            </label>
          </form>
        </fieldset>
      </section>
    );
  }
}

export default WalletForm;
