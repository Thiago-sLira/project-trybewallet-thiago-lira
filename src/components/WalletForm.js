import React, { Component } from 'react';

class WalletForm extends Component {
  state = {
    valueExpenseInput: '',
    descriptionExpenseInput: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valueExpenseInput, descriptionExpenseInput } = this.state;
    return (
      <section>
        <fieldset>
          <form>
            <label htmlFor="input-value-expense">
              <input
                type="number"
                id="input-value-expense"
                value={ valueExpenseInput }
                name="valueExpenseInput"
                onChange={ this.handleChange }
                data-testid="value-input"
              />
            </label>
            <label htmlFor="input-description-expense">
              <input
                type="text"
                id="input-description-expense"
                value={ descriptionExpenseInput }
                name="descriptionExpenseInput"
                onChange={ this.handleChange }
                data-testid="description-input"
                placeholder="Descrição da despesa"
              />
            </label>
          </form>
        </fieldset>
      </section>
    );
  }
}

export default WalletForm;
